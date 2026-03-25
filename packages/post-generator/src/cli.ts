import * as fs from "fs";
import * as path from "path";
import { generatePostImage } from "./index";
import type { Platform, ThemeName, ImageFormat, PostLayout } from "./types";

function parseArgs(argv: string[]) {
  const args: Record<string, string> = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : "true";
      args[key] = value;
    }
  }
  return args;
}

const HELP = `
Social Post Engine — Image Generator

Usage:
  pnpm generate [options]

Options:
  --platform      Platform: linkedin, twitter, instagram, instagram-story (default: linkedin)
  --title         Post title (required)
  --subtitle      Post subtitle
  --author        Author name
  --date          Date string
  --theme         Theme: light (default: light)
  --accent        Custom accent color (hex, e.g. #ff6600)
  --layout        Layout variant for LinkedIn: linkedin-profile, before-after,
                  checklist, myth-reality, accent-sidebar, grid-points
  --before-points Pipe-separated before points for before-after layout (e.g. "Bad|Worse")
  --after-points  Pipe-separated after points for before-after layout (e.g. "Good|Better")
  --layout-data   JSON string with layout-specific content data
  --format        Output format: png, jpeg, webp (default: png)
  --output        Output file path (default: output/<platform>-<theme>.<format>)
  --help          Show this help

Examples:
  pnpm generate --platform linkedin --title "Hello World" --theme brand
  pnpm generate --platform twitter --title "New Post" --subtitle "Check it out" --author "mybrand"
  pnpm generate --platform instagram --title "Tips & Tricks" --theme light --format jpeg
`;

async function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log(HELP);
    return;
  }

  const platform = (args.platform ?? "linkedin") as Platform;
  const title = args.title;
  const subtitle = args.subtitle;
  const author = args.author;
  const date = args.date;
  const theme = (args.theme ?? "light") as ThemeName;
  const accentColor = args.accent;
  const layout = args.layout as PostLayout | undefined;
  const beforePoints = args["before-points"]?.split("|");
  const afterPoints = args["after-points"]?.split("|");
  const layoutData = args["layout-data"];
  const format = (args.format ?? "png") as ImageFormat;

  if (!title) {
    console.error("Error: --title is required\n");
    console.log(HELP);
    process.exit(1);
  }

  console.log(`Generating ${platform} image (${theme} theme, ${format})...`);

  const result = await generatePostImage({
    platform,
    title,
    subtitle,
    author,
    date,
    theme,
    accentColor,
    format,
    layout,
    beforePoints,
    afterPoints,
    layoutData,
  });

  // Always resolve paths relative to the monorepo root (3 levels up from src/)
  const monorepoRoot = path.resolve(__dirname, "../../..");
  const outputDir = path.join(monorepoRoot, "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = args.output
    ? path.resolve(monorepoRoot, args.output)
    : path.join(outputDir, `${platform}-${theme}.${format}`);
  const outputDirForFile = path.dirname(outputPath);
  if (!fs.existsSync(outputDirForFile)) {
    fs.mkdirSync(outputDirForFile, { recursive: true });
  }

  fs.writeFileSync(outputPath, result.buffer);
  console.log(`Saved: ${outputPath} (${result.width}x${result.height}, ${result.mimeType})`);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
