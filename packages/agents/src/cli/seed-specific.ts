/**
 * One-off script: seed specific preset topics by ID, bypassing queue thresholds.
 * Usage: npx tsx packages/agents/src/cli/seed-specific.ts li-d13-referral-stats li-d20-interview-callback-line ...
 */
import * as path from "path";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../../../../.env") });

import { v4 as uuidv4 } from "uuid";
import { createLogger } from "../logger";
import { generateInsight, generateCaption, generateLayoutData } from "../topic-discovery";
import { wrapTrendingCaption } from "../caption";
import { generateImage, imageOutputPath } from "../generate";
import { addPost, getUsedPresetIds, getUsedPresetIdsForPlatform } from "../store";
import { getAllPresets, toTrendingTopic } from "../topic-selector";
import { generateInstagramCaption } from "../instagram-caption";
import { pickThemeVariant, LAYOUTS_NO_SUBTITLE, loadBrandConfig, type LayoutName } from "@social-post-engine/shared";
import type { PendingPost, Platform, ThemeName } from "../types";

const brandConfig = loadBrandConfig();
const logger = createLogger("seed-specific");

async function main() {
  const targetIds = process.argv.slice(2);
  if (targetIds.length === 0) {
    console.error("Usage: npx tsx seed-specific.ts <preset-id> [preset-id] ...");
    process.exit(1);
  }

  const allPresets = getAllPresets();
  const usedLinkedin = getUsedPresetIdsForPlatform("linkedin");
  const usedInstagram = getUsedPresetIdsForPlatform("instagram");

  for (const targetId of targetIds) {
    const preset = allPresets.find((p) => p.id === targetId);
    if (!preset) {
      logger.error(`Preset not found: ${targetId}`);
      continue;
    }

    // Determine which platforms need seeding
    const platforms: Platform[] = [];
    if (targetId.startsWith("ig-")) {
      if (!usedInstagram.has(targetId)) platforms.push("instagram");
    } else if (targetId.startsWith("li-")) {
      if (!usedLinkedin.has(targetId)) platforms.push("linkedin");
      if (!usedInstagram.has(targetId)) platforms.push("instagram");
    }

    if (platforms.length === 0) {
      logger.info(`Already seeded on all platforms: ${targetId}`);
      continue;
    }

    logger.info(`Seeding ${targetId} on [${platforms.join(", ")}]`);

    const topic = toTrendingTopic(preset);

    // Extract insight
    let insight: string | undefined;
    try {
      insight = await generateInsight(topic, logger);
    } catch (err) {
      logger.warn(`Insight extraction failed: ${err}`);
    }

    for (const platform of platforms) {
      try {
        // Generate caption
        const isInstagram = platform === "instagram";
        const rawCaption = isInstagram
          ? await generateInstagramCaption(topic, logger, insight)
          : await generateCaption(topic, logger, insight);
        const caption = isInstagram ? rawCaption : wrapTrendingCaption(rawCaption, topic.category);

        const layout = preset.layout ?? "before-after";

        // Generate layout data
        let layoutData: Record<string, unknown> | undefined;
        try {
          layoutData = await generateLayoutData(topic, layout, logger);
        } catch (err) {
          logger.warn(`Layout data generation failed, using defaults: ${err}`);
        }

        const id = uuidv4();
        const variant = pickThemeVariant(0);
        const theme = variant.theme as ThemeName;
        const accentColor = variant.accentColor;
        const outputPath = imageOutputPath(id, platform, theme);
        const subtitle = LAYOUTS_NO_SUBTITLE.includes(layout as LayoutName) ? undefined : preset.subtitle;

        generateImage({
          platform,
          title: preset.title,
          subtitle,
          theme,
          accentColor,
          author: brandConfig.brand.name.toLowerCase(),
          date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
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
          date: now.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          theme,
          layout,
          layoutData,
          platforms: {
            [platform]: {
              imagePath: outputPath,
              status: "pending" as const,
              publishedAt: null,
            },
          },
          createdAt: now.toISOString(),
        };

        addPost(post);
        logger.info(`Seeded: [${layout}] ${preset.title} (${platform})`, { id, presetId: preset.id });
      } catch (err) {
        logger.error(`Failed to seed ${preset.title} on ${platform}: ${err}`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
