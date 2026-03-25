import * as path from "path";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../../../../.env") });

import { createLogger } from "../logger";
import { readStore, writeStore } from "../store";
import { generateInsight, generateCaption } from "../topic-discovery";
import { wrapTrendingCaption } from "../caption";
import type { TrendingTopic } from "../topic-discovery";
import type { PostAngle } from "../brand-voice";
import type { PendingPost } from "../types";

const logger = createLogger("regen-captions");

// The 5 manually-added posts that bypassed the AI caption pipeline
const TARGET_IDS: Record<string, { category: string; brief: string; angle: PostAngle }> = {
  "3e57e26e-3433-4bc4-8e6e-564b480a92f5": {
    category: "resume-writing",
    brief: "Why quantified results beat job duties on resumes",
    angle: "observation",
  },
  "4f1b302c-d984-4752-ac42-e37664a6d4eb": {
    category: "career-growth",
    brief: "The portfolio career model is replacing traditional single-employer careers",
    angle: "contrarian",
  },
  "2be4d9f1-a8dd-448d-85fe-79fed6c562af": {
    category: "resume-writing",
    brief: "Most resumes are filtered out by ATS before a human ever sees them",
    angle: "observation",
  },
  "53745d3d-0a51-4702-b35f-984dd3e849c0": {
    category: "career-growth",
    brief: "LinkedIn storytelling outperforms headline optimization for engagement",
    angle: "contrarian",
  },
  "851596ea-ea11-4f00-998a-88f6a5d35d6c": {
    category: "job-search",
    brief: "Direct outreach and networking beat mass-applying to job boards",
    angle: "observation",
  },
};

function isAllMode(): boolean {
  return process.argv.includes("--all");
}

function isUnpublishedOnLinkedin(post: PendingPost): boolean {
  const linkedin = post.platforms.linkedin;
  return !linkedin || linkedin.status !== "published";
}

function buildTopicFromPost(
  post: PendingPost,
  meta?: { category: string; brief: string; angle: PostAngle }
): TrendingTopic {
  return {
    title: post.title,
    subtitle: post.subtitle ?? "",
    category: meta?.category ?? "resume-writing",
    brief: meta?.brief ?? post.subtitle ?? post.title,
    angle: meta?.angle ?? "observation",
  };
}

async function main() {
  const store = readStore();
  const allMode = isAllMode();

  let posts: PendingPost[];

  if (allMode) {
    // Regenerate all pending trending/preset posts not yet published on LinkedIn
    posts = store.posts.filter(
      (p) =>
        (p.source === "trending" || p.source === "preset") &&
        isUnpublishedOnLinkedin(p)
    );
    logger.info(`--all mode: found ${posts.length} pending trending/preset posts`);
  } else {
    posts = store.posts.filter((p) => p.id in TARGET_IDS);
  }

  if (posts.length === 0) {
    logger.error("No matching posts found in store");
    process.exit(1);
  }

  logger.info(`Found ${posts.length} posts to regenerate captions for`);

  for (const post of posts) {
    const meta = TARGET_IDS[post.id]; // may be undefined in --all mode
    const topic = buildTopicFromPost(post, meta);
    const category = meta?.category ?? "resume-writing";

    logger.info(`\n--- ${post.title} ---`);
    console.log(`\nBEFORE:\n${post.caption}\n`);

    // Pass 1: Extract a real data point via web search
    const insight = await generateInsight(topic, logger);
    logger.info(`Insight: ${insight}`);

    // Pass 2: Generate brand-voice caption using insight
    const body = await generateCaption(topic, logger, insight);

    // Pass 3: Append category hashtags
    const caption = wrapTrendingCaption(body, category);

    // Update in store
    const storePost = store.posts.find((p) => p.id === post.id);
    if (storePost) {
      storePost.caption = caption;
    }

    console.log(`AFTER:\n${caption}\n`);
    console.log("=".repeat(60));
  }

  writeStore(store);
  logger.info(`Updated ${posts.length} captions in store`);
}

main().catch((err) => {
  logger.error("Failed to regenerate captions", { error: String(err) });
  process.exit(1);
});
