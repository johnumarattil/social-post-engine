import { loadBrandConfig } from "@social-post-engine/shared";

function getHashtags(category: string | null): string[] {
  const config = loadBrandConfig();
  const categoryTags = category ? config.captions.categoryHashtags[category] ?? [] : [];
  const tags = [...new Set([config.captions.brandHashtag, ...categoryTags])];
  return tags.slice(0, config.captions.maxHashtags);
}

export function wrapTrendingCaption(body: string, category?: string): string {
  const hashtags = getHashtags(category ?? null);
  return `${body}\n\n${hashtags.join(" ")}`;
}
