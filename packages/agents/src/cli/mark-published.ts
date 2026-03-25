import { updatePlatformStatus } from "../store";
import type { Platform } from "../types";

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

  if (!args.id || !args.platform) {
    console.error("Usage: pnpm agent:mark-published --id <uuid> --platform <platform>");
    process.exit(1);
  }

  const id = args.id;
  const platform = args.platform as Platform;
  const timestamp = new Date().toISOString();

  const updated = updatePlatformStatus(id, platform, "published", timestamp);

  if (updated) {
    console.log(`Marked ${platform} as published for post ${id} at ${timestamp}`);
  } else {
    console.error(`Failed: post ${id} or platform ${platform} not found in store.`);
    process.exit(1);
  }
}

main();
