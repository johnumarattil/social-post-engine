import * as path from "path";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../../../../.env") });
import { v4 as uuidv4 } from "uuid";
import { createLogger } from "../logger";
import { generateInsight, generateCaption, pickLayout, generateLayoutData } from "../topic-discovery";
import { wrapTrendingCaption } from "../caption";
import { generateImage, imageOutputPath } from "../generate";
import { getPendingPosts, addPost, updatePlatformStatus, getLayoutUsageCounts } from "../store";
import { getUnusedCount, getNextPresets, toTrendingTopic } from "../topic-selector";
import { refillPresets } from "../topic-refill";
import { publishToLinkedIn, isSessionExpired } from "../linkedin-publisher";
import { pickThemeVariant, LAYOUTS_NO_SUBTITLE, loadBrandConfig, type LayoutName } from "@social-post-engine/shared";
import type { PendingPost, Platform, ThemeName } from "../types";

const brandConfig = loadBrandConfig();
const SEED_BATCH = brandConfig.autopublish.linkedin.seedBatch;
const TARGET_PLATFORM: Platform = "linkedin";

const logger = createLogger("autopublish");

function getLinkedInPending(): PendingPost[] {
  return getPendingPosts().filter((p) => {
    const entry = p.platforms[TARGET_PLATFORM];
    return entry && entry.status === "pending";
  });
}

// Phase 1: Seed queue if below minimum
async function seedQueue(): Promise<void> {
  const pending = getLinkedInPending();

  if (pending.length >= SEED_BATCH) {
    logger.info(`Queue has ${pending.length} pending LinkedIn posts — no seeding needed`);
    return;
  }

  const deficit = SEED_BATCH - pending.length;
  logger.info(`Queue has ${pending.length} pending — seeding ${deficit} new topics`);

  // Auto-refill preset stock if running low
  if (getUnusedCount() < 10) {
    try {
      await refillPresets(logger);
    } catch (err) {
      logger.error("Preset refill failed, continuing with remaining stock", { error: String(err) });
    }
  }

  // Pull from curated presets
  const presets = getNextPresets(deficit);

  if (presets.length === 0) {
    logger.warn("No unused presets available — skipping seeding");
    return;
  }

  let added = 0;
  for (const preset of presets) {
    try {
      const topic = toTrendingTopic(preset);

      // Pass 1: Extract a concrete insight via web search
      let insight: string | undefined;
      try {
        insight = await generateInsight(topic, logger);
        logger.info(`Insight extracted for: ${topic.title}`);
      } catch (err) {
        logger.warn(`Insight extraction failed, proceeding without: ${err}`);
      }

      // Pass 2: Generate caption built around the insight
      const rawCaption = await generateCaption(topic, logger, insight);
      const caption = wrapTrendingCaption(rawCaption, topic.category);

      // Use preset layout hint if available, else AI picks
      const layoutCounts = getLayoutUsageCounts();
      const layout = preset.layout
        ? preset.layout
        : preset.beforePoints
          ? "before-after"
          : await pickLayout(topic, layoutCounts, logger);

      // Generate layout-specific content
      let layoutData: Record<string, unknown> | undefined;
      try {
        layoutData = await generateLayoutData(topic, layout, logger);
      } catch (err) {
        logger.warn(`Layout data generation failed, using defaults: ${err}`);
      }

      // Generate LinkedIn image
      const id = uuidv4();
      const variant = pickThemeVariant(added);
      const theme = variant.theme as ThemeName;
      const accentColor = variant.accentColor;
      const outputPath = imageOutputPath(id, TARGET_PLATFORM, theme);

      const subtitle = LAYOUTS_NO_SUBTITLE.includes(layout as LayoutName) ? undefined : preset.subtitle;

      generateImage({
        platform: TARGET_PLATFORM,
        title: preset.title,
        subtitle,
        theme,
        accentColor,
        author: brandConfig.brand.name.toLowerCase(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        output: outputPath,
        layout,
        beforePoints: preset.beforePoints,
        afterPoints: preset.afterPoints,
        layoutData,
      });

      const now = new Date();
      const post: PendingPost = {
        id,
        source: "preset",
        presetId: preset.id,
        title: preset.title,
        subtitle,
        caption,
        author: brandConfig.brand.name.toLowerCase(),
        date: now.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        theme,
        layout,
        layoutData,
        platforms: {
          [TARGET_PLATFORM]: {
            imagePath: outputPath,
            status: "pending",
            publishedAt: null,
          },
        },
        createdAt: now.toISOString(),
      };

      addPost(post);
      added++;
      logger.info(`Seeded: [${layout}] ${preset.title}`, { id, presetId: preset.id });
    } catch (err) {
      logger.error(`Failed to seed preset: ${preset.title}`, {
        error: String(err),
      });
    }
  }

  logger.info(`Seeding complete: ${added}/${presets.length} presets added`);
}

// Phase 2: Publish the oldest pending LinkedIn post
async function publishNext(): Promise<void> {
  if (isSessionExpired()) {
    logger.error("Skipping publish — session-expired flag is set. Re-login required.");
    return;
  }

  const pending = getLinkedInPending();
  if (pending.length === 0) {
    logger.info("No pending LinkedIn posts to publish");
    return;
  }

  // FIFO — oldest first (by createdAt)
  const sorted = pending.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const post = sorted[0];
  const entry = post.platforms[TARGET_PLATFORM]!;

  logger.info(`Publishing: ${post.title}`, { id: post.id });

  const headless = process.env.AUTOPUBLISH_HEADLESS !== "false";
  const result = await publishToLinkedIn({
    imagePath: entry.imagePath,
    caption: post.caption,
    logger: logger.child("linkedin"),
    headless,
  });

  if (result.success) {
    const now = new Date().toISOString();
    updatePlatformStatus(post.id, TARGET_PLATFORM, "published", now);
    logger.info("Published successfully", { id: post.id });
  } else if (result.sessionExpired) {
    logger.error("Session expired — flagged for manual re-login", {
      id: post.id,
    });
  } else {
    updatePlatformStatus(post.id, TARGET_PLATFORM, "failed");
    logger.error("Publish failed", { id: post.id, error: result.error });
  }
}

async function main(): Promise<void> {
  logger.info("=== Autopublish run started ===");

  try {
    await seedQueue();
  } catch (err) {
    logger.error("Phase 1 (seeding) crashed", { error: String(err) });
  }

  if (process.argv.includes("--seed-only")) {
    logger.info("--seed-only flag set — skipping publish");
  } else {
    try {
      await publishNext();
    } catch (err) {
      logger.error("Phase 2 (publish) crashed", { error: String(err) });
    }
  }

  logger.info("=== Autopublish run finished ===");
}

main().catch((err) => {
  logger.error("Fatal error", { error: String(err) });
  process.exit(1);
});
