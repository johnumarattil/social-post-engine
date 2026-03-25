import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import type { Platform, ThemeName } from "./types";

const MONOREPO_ROOT = path.resolve(__dirname, "../../..");
const OUTPUT_DIR = path.join(MONOREPO_ROOT, "posts");

export function imageOutputPath(postId: string, platform: Platform, theme: ThemeName): string {
  const platformDir = path.join(OUTPUT_DIR, platform);
  return path.join(platformDir, `${postId}-${platform}-${theme}.png`);
}

export function generateImage(opts: {
  platform: Platform;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  theme?: ThemeName;
  accentColor?: string;
  layout?: string;
  beforePoints?: string[];
  afterPoints?: string[];
  layoutData?: Record<string, unknown>;
  output: string;
}): string {
  if (!fs.existsSync(path.dirname(opts.output))) {
    fs.mkdirSync(path.dirname(opts.output), { recursive: true });
  }

  const args: string[] = [
    "pnpm",
    "--filter",
    "@social-post-engine/post-generator",
    "generate",
    "--platform",
    opts.platform,
    "--title",
    JSON.stringify(opts.title),
    "--theme",
    opts.theme ?? "light",
    "--output",
    opts.output,
  ];

  if (opts.subtitle) {
    args.push("--subtitle", JSON.stringify(opts.subtitle));
  }
  if (opts.author) {
    args.push("--author", JSON.stringify(opts.author));
  }
  if (opts.date) {
    args.push("--date", JSON.stringify(opts.date));
  }
  if (opts.accentColor) {
    args.push("--accent", opts.accentColor);
  }
  if (opts.layout) {
    args.push("--layout", opts.layout);
  }
  if (opts.beforePoints?.length) {
    args.push("--before-points", JSON.stringify(opts.beforePoints.join("|")));
  }
  if (opts.afterPoints?.length) {
    args.push("--after-points", JSON.stringify(opts.afterPoints.join("|")));
  }
  if (opts.layoutData) {
    args.push("--layout-data", JSON.stringify(JSON.stringify(opts.layoutData)));
  }

  const cmd = args.join(" ");
  console.log(`  Running: ${cmd}`);
  execSync(cmd, { cwd: MONOREPO_ROOT, stdio: "inherit" });

  return opts.output;
}
