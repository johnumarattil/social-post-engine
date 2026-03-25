import * as fs from "fs";
import * as path from "path";
import type { Logger } from "./logger";
import type { PresetTopic } from "./preset-topics";
import { getAllPresets, getUnusedCount } from "./topic-selector";
import { discoverTopics } from "./topic-discovery";
import { getTrendingTitles } from "./store";

const REFILL_PATH = path.resolve(__dirname, "../../../data/refill-topics.json");
const REFILL_TARGET = 50;
const REFILL_THRESHOLD = 10;

/**
 * When unused presets drop below REFILL_THRESHOLD, generates enough new
 * topics to bring the total unused back up to REFILL_TARGET.
 * Appends them to data/refill-topics.json.
 * Returns the number of topics added.
 */
export async function refillPresets(logger: Logger): Promise<number> {
  const unusedCount = getUnusedCount();

  if (unusedCount >= REFILL_THRESHOLD) {
    logger.info(`Preset stock OK (${unusedCount} unused) — no refill needed`);
    return 0;
  }

  const needed = REFILL_TARGET - unusedCount;
  logger.info(`Preset stock low (${unusedCount} unused) — generating ${needed} new topics`);

  // Gather all existing titles for dedup
  const allTitles = [
    ...getAllPresets().map((p) => p.title),
    ...getTrendingTitles(),
  ];

  const topics = await discoverTopics(needed, logger, allTitles);

  // Convert TrendingTopics → PresetTopics with generated IDs
  const newPresets: PresetTopic[] = topics.map((t, i) => ({
    id: `refill-${Date.now()}-${i}`,
    title: t.title,
    subtitle: t.subtitle,
    category: t.category,
    angle: t.angle,
  }));

  // Load existing refill file and append
  let existing: PresetTopic[] = [];
  if (fs.existsSync(REFILL_PATH)) {
    try {
      existing = JSON.parse(fs.readFileSync(REFILL_PATH, "utf-8")) as PresetTopic[];
    } catch {
      existing = [];
    }
  }

  const merged = [...existing, ...newPresets];
  const dir = path.dirname(REFILL_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(REFILL_PATH, JSON.stringify(merged, null, 2) + "\n", "utf-8");

  logger.info(`Refill complete: added ${newPresets.length} topics (total refill file: ${merged.length})`);
  return newPresets.length;
}
