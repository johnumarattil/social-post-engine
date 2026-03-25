import { Font } from "canvacord";
import { loadBrandFonts } from "./fonts";
import { LinkedInPost } from "./templates/linkedin";
import { TwitterPost } from "./templates/twitter";
import { InstagramPost } from "./templates/instagram";
import { InstagramStory } from "./templates/instagram-story";
import { LinkedInLayoutPost } from "./templates/linkedin-layouts/index";
import { InstagramLayoutPost } from "./templates/instagram-layouts/index";
import type { GenerateOptions, GenerateResult, Platform, PostLayout } from "./types";

export { LinkedInPost } from "./templates/linkedin";
export { TwitterPost } from "./templates/twitter";
export { InstagramPost } from "./templates/instagram";
export { InstagramStory } from "./templates/instagram-story";
export { LinkedInLayoutPost } from "./templates/linkedin-layouts/index";
export { InstagramLayoutPost } from "./templates/instagram-layouts/index";
export { themes, getTheme } from "./themes";
export type { Theme } from "./themes";
export type { GenerateOptions, GenerateResult, Platform, ThemeName, ImageFormat, PostLayout } from "./types";

const PLATFORM_DIMENSIONS: Record<Platform, { width: number; height: number }> = {
  linkedin: { width: 1080, height: 1080 },
  twitter: { width: 1200, height: 675 },
  instagram: { width: 1080, height: 1080 },
  "instagram-story": { width: 1080, height: 1920 },
};

const MIME_TYPES: Record<string, string> = {
  png: "image/png",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

let fontsLoaded = false;

function createBuilder(platform: Platform, layout?: PostLayout) {
  if (platform === "linkedin" && layout && layout !== "default") {
    return new LinkedInLayoutPost(layout);
  }
  if (platform === "instagram" && layout && layout !== "default") {
    return new InstagramLayoutPost(layout);
  }

  switch (platform) {
    case "linkedin":
      return new LinkedInPost();
    case "twitter":
      return new TwitterPost();
    case "instagram":
      return new InstagramPost();
    case "instagram-story":
      return new InstagramStory();
    default:
      throw new Error(
        `Unknown platform: ${platform}. Use: linkedin, twitter, instagram, instagram-story`
      );
  }
}

export async function generatePostImage(options: GenerateOptions): Promise<GenerateResult> {
  const {
    platform,
    title,
    subtitle,
    author,
    date,
    theme = "light",
    accentColor,
    format = "png",
    layout,
    beforePoints,
    afterPoints,
    layoutData,
  } = options;

  if (!fontsLoaded) {
    Font.loadDefault();
    await loadBrandFonts();
    fontsLoaded = true;
  }

  const builder = createBuilder(platform, layout);
  builder.bootstrap({ title, subtitle, author, date, theme, accentColor, beforePoints, afterPoints, layoutData });

  const buffer = await builder.build({ format });
  const dimensions = PLATFORM_DIMENSIONS[platform];

  return {
    buffer: buffer as Buffer,
    format,
    width: dimensions.width,
    height: dimensions.height,
    mimeType: MIME_TYPES[format] ?? "image/png",
  };
}
