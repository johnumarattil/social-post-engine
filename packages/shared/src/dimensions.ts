export type Platform =
  | "linkedin"
  | "twitter"
  | "instagram"
  | "instagram-story"
  | "youtube"
  | "youtube-short"
  | "tiktok";

export const PLATFORM_DIMENSIONS: Record<Platform, { width: number; height: number }> = {
  linkedin: { width: 1080, height: 1080 },
  twitter: { width: 1200, height: 675 },
  instagram: { width: 1080, height: 1080 },
  "instagram-story": { width: 1080, height: 1920 },
  youtube: { width: 1920, height: 1080 },
  "youtube-short": { width: 1080, height: 1920 },
  tiktok: { width: 1080, height: 1920 },
};
