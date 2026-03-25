import { Font } from "canvacord";
import { join } from "path";

const FONTS_DIR = join(__dirname, "..", "fonts");

const FONT_VARIANTS = [
  { file: "Sora-Regular.ttf", alias: "Sora" },
  { file: "Sora-SemiBold.ttf", alias: "Sora SemiBold" },
  { file: "Sora-Bold.ttf", alias: "Sora Bold" },
  { file: "Sora-ExtraBold.ttf", alias: "Sora ExtraBold" },
  { file: "Lora-Regular.ttf", alias: "Lora" },
  { file: "Lora-Italic.ttf", alias: "Lora Italic" },
  { file: "IBMPlexMono-Regular.ttf", alias: "IBM Plex Mono" },
] as const;

export async function loadBrandFonts(): Promise<void> {
  for (const { file, alias } of FONT_VARIANTS) {
    await Font.fromFile(join(FONTS_DIR, file), alias);
  }
}
