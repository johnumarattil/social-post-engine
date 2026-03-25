import { v4 as uuidv4 } from "uuid";
import { addPost } from "../store";
import { loadBrandConfig } from "@social-post-engine/shared";
import type { PendingPost, Platform, ThemeName } from "../types";

function parseArgs(argv: string[]): Record<string, string> {
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

function main() {
  const args = parseArgs(process.argv);
  const brandConfig = loadBrandConfig();

  if (!args.title || !args.caption || !args.platforms || !args.images) {
    console.error(
      'Usage: pnpm agent:add-post --title "..." --caption "..." --platforms "linkedin,twitter" --images "/path1.png,/path2.png" [--source trending] [--theme light] [--subtitle "..."]'
    );
    process.exit(1);
  }

  const id = uuidv4();
  const platforms = args.platforms.split(",").map((s) => s.trim()) as Platform[];
  const images = args.images.split(",").map((s) => s.trim());
  const theme = (args.theme ?? "light") as ThemeName;
  const source = (args.source ?? "trending") as "trending" | "preset";

  if (platforms.length !== images.length) {
    console.error(`Mismatch: ${platforms.length} platform(s) but ${images.length} image path(s).`);
    process.exit(1);
  }

  const platformEntries: PendingPost["platforms"] = {};
  for (let i = 0; i < platforms.length; i++) {
    platformEntries[platforms[i]] = {
      imagePath: images[i],
      status: "pending",
      publishedAt: null,
    };
  }

  const now = new Date();
  const date = now.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const post: PendingPost = {
    id,
    source,
    title: args.title,
    subtitle: args.subtitle,
    caption: args.caption.replace(/\\n/g, '\n'),
    author: brandConfig.brand.name.toLowerCase(),
    date,
    theme,
    platforms: platformEntries,
    createdAt: now.toISOString(),
  };

  addPost(post);
  console.log(`Added post: ${args.title} (${id})`);
  console.log(`Platforms: ${platforms.join(", ")}`);
  console.log(`Source: ${source}`);
}

main();
