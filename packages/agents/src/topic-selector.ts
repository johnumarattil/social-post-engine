import * as fs from "fs";
import * as path from "path";
import { PRESET_TOPICS, type PresetTopic } from "./preset-topics";
import { getUsedPresetIds, getUsedPresetIdsForPlatform } from "./store";
import type { Platform } from "./types";
import type { TrendingTopic } from "./topic-discovery";

const REFILL_PATH = path.resolve(__dirname, "../../../data/refill-topics.json");

/** Load AI-generated refill topics from disk (if any). */
function loadRefillTopics(): PresetTopic[] {
  if (!fs.existsSync(REFILL_PATH)) return [];
  try {
    const raw = fs.readFileSync(REFILL_PATH, "utf-8");
    return JSON.parse(raw) as PresetTopic[];
  } catch {
    return [];
  }
}

/** Combines static presets + refill file. */
export function getAllPresets(): PresetTopic[] {
  return [...PRESET_TOPICS, ...loadRefillTopics()];
}

/** Returns count of unused preset IDs. */
export function getUnusedCount(): number {
  const used = getUsedPresetIds();
  const all = getAllPresets();
  return all.filter((p) => !used.has(p.id)).length;
}

/** Returns the next N unused presets (oldest/first defined wins). */
export function getNextPresets(count: number): PresetTopic[] {
  const used = getUsedPresetIds();
  const unused = getAllPresets().filter((p) => !used.has(p.id));
  return unused.slice(0, count);
}

/** Returns the next N unused presets for a specific platform. */
export function getNextPresetsForPlatform(platform: Platform, count: number): PresetTopic[] {
  const used = getUsedPresetIdsForPlatform(platform);
  const unused = getAllPresets().filter((p) => !used.has(p.id));
  return unused.slice(0, count);
}

/** Returns count of unused preset IDs for a specific platform. */
export function getUnusedCountForPlatform(platform: Platform): number {
  const used = getUsedPresetIdsForPlatform(platform);
  const all = getAllPresets();
  return all.filter((p) => !used.has(p.id)).length;
}

/** Converts a PresetTopic into a TrendingTopic for the existing caption pipeline. */
export function toTrendingTopic(preset: PresetTopic): TrendingTopic {
  return {
    title: preset.title,
    subtitle: preset.subtitle,
    category: preset.category,
    brief: preset.subtitle,
    angle: preset.angle,
  };
}
