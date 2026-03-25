import * as path from "path";
import * as fs from "fs";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../../../../.env") });
import { v4 as uuidv4 } from "uuid";
import { createLogger } from "../logger";
import { generateInsight, pickLayout, generateLayoutData } from "../topic-discovery";
import { generateInstagramCaption, wrapInstagramCaption } from "../instagram-caption";
import { generateImage } from "../generate";
import { getPendingPosts, addPost, updatePlatformStatus, getLayoutUsageCounts } from "../store";
import {
  getUnusedCountForPlatform,
  getNextPresetsForPlatform,
  toTrendingTopic,
} from "../topic-selector";
import { refillPresets } from "../topic-refill";
import { publishToInstagram, isInstagramSessionExpired } from "../instagram-publisher";
import { pickThemeVariant, loadBrandConfig } from "@social-post-engine/shared";
import type { PendingPost, Platform, ThemeName } from "../types";

const MONOREPO_ROOT = path.resolve(__dirname, "../../../..");
const INSTAGRAM_OUTPUT_DIR = path.join(MONOREPO_ROOT, "posts", "instagram");

const brandConfig = loadBrandConfig();
const SEED_BATCH = brandConfig.autopublish.instagram.seedBatch;
const TARGET_PLATFORM: Platform = "instagram";

const logger = createLogger("autopublish-instagram");

function getInstagramPending(): PendingPost[] {
  return getPendingPosts().filter((p) => {
    const entry = p.platforms[TARGET_PLATFORM];
    return entry && entry.status === "pending";
  });
}

// Phase 1: Seed queue if below minimum
async function seedQueue(): Promise<void> {
  const pending = getInstagramPending();

  if (pending.length >= SEED_BATCH) {
    logger.info(
      `Queue has ${pending.length} pending Instagram posts — no seeding needed`
    );
    return;
  }

  const deficit = SEED_BATCH - pending.length;
  logger.info(
    `Queue has ${pending.length} pending — seeding ${deficit} new topics`
  );

  // Auto-refill preset stock if running low
  if (getUnusedCountForPlatform(TARGET_PLATFORM) < 10) {
    try {
      await refillPresets(logger);
    } catch (err) {
      logger.error("Preset refill failed, continuing with remaining stock", {
        error: String(err),
      });
    }
  }

  // Pull from curated presets (platform-specific tracking)
  const presets = getNextPresetsForPlatform(TARGET_PLATFORM, deficit);

  if (presets.length === 0) {
    logger.warn("No unused presets available for Instagram — skipping seeding");
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

      // Pass 2: Generate Instagram-optimized caption
      const rawCaption = await generateInstagramCaption(topic, logger, insight);
      const caption = wrapInstagramCaption(rawCaption, topic.category);

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

      // Generate Instagram image (1080x1080)
      const id = uuidv4();
      const themeVariant = pickThemeVariant(added);
      const theme = themeVariant.theme as ThemeName;
      const accentColor = themeVariant.accentColor;
      if (!fs.existsSync(INSTAGRAM_OUTPUT_DIR)) {
        fs.mkdirSync(INSTAGRAM_OUTPUT_DIR, { recursive: true });
      }
      const outputPath = path.join(INSTAGRAM_OUTPUT_DIR, `${id}-instagram-${theme}.png`);

      generateImage({
        platform: TARGET_PLATFORM,
        title: preset.title,
        subtitle: preset.subtitle,
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
        subtitle: preset.subtitle,
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
      logger.info(
        `Seeded: [${layout}] ${preset.title}`,
        { id, presetId: preset.id }
      );
    } catch (err) {
      logger.error(`Failed to seed preset: ${preset.title}`, {
        error: String(err),
      });
    }
  }

  logger.info(`Seeding complete: ${added}/${presets.length} presets added`);

  // Generate markdown preview
  generatePreviewMarkdown();
}

function generatePreviewMarkdown(): void {
  const pending = getInstagramPending();
  if (pending.length === 0) return;

  const sorted = pending.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const lines: string[] = [
    "# Instagram Posts Preview",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Total pending: ${sorted.length}`,
    "",
    "---",
    "",
  ];

  for (let i = 0; i < sorted.length; i++) {
    const post = sorted[i];
    const entry = post.platforms[TARGET_PLATFORM];
    const imgPath = entry?.imagePath ?? "";
    // Use relative path from output/instagram/ for markdown image links
    const imgFilename = path.basename(imgPath);

    lines.push(`## ${i + 1}. ${post.title}`);
    lines.push("");
    if (post.subtitle) {
      lines.push(`*${post.subtitle}*`);
      lines.push("");
    }
    lines.push(`![${post.title}](./${imgFilename})`);
    lines.push("");
    lines.push("### Caption");
    lines.push("");
    lines.push("```");
    lines.push(post.caption);
    lines.push("```");
    lines.push("");
    lines.push(`- **Layout:** ${post.layout ?? "default"}`);
    lines.push(`- **Theme:** ${post.theme}`);
    lines.push(`- **ID:** ${post.id}`);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  const mdPath = path.join(INSTAGRAM_OUTPUT_DIR, "preview.md");
  fs.writeFileSync(mdPath, lines.join("\n"), "utf-8");
  logger.info(`Preview markdown written to ${mdPath}`);
}

// Phase 2: Publish the oldest pending Instagram post
async function publishNext(): Promise<void> {
  if (isInstagramSessionExpired()) {
    logger.error(
      "Skipping publish — instagram-session-expired flag is set. Re-login required."
    );
    return;
  }

  const pending = getInstagramPending();
  if (pending.length === 0) {
    logger.info("No pending Instagram posts to publish");
    return;
  }

  // FIFO — oldest first (by createdAt)
  const sorted = pending.sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const post = sorted[0];
  const entry = post.platforms[TARGET_PLATFORM]!;

  logger.info(`Publishing: ${post.title}`, { id: post.id });

  const headless = process.env.AUTOPUBLISH_HEADLESS !== "false";
  const result = await publishToInstagram({
    imagePath: entry.imagePath,
    caption: post.caption,
    logger: logger.child("instagram"),
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
  logger.info("=== Instagram Autopublish run started ===");

  if (process.argv.includes("--publish-only")) {
    logger.info("--publish-only flag set — skipping seeding");
  } else {
    try {
      await seedQueue();
    } catch (err) {
      logger.error("Phase 1 (seeding) crashed", { error: String(err) });
    }
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

  logger.info("=== Instagram Autopublish run finished ===");
}

main().catch((err) => {
  logger.error("Fatal error", { error: String(err) });
  process.exit(1);
});
