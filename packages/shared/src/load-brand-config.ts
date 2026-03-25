import * as path from "path";
import * as fs from "fs";
import type { BrandConfig } from "./brand-config";

let cachedConfig: BrandConfig | null = null;

/**
 * Loads brand.config.ts from the project root.
 * Falls back to brand.config.example.ts if no user config exists.
 * Caches the result for subsequent calls.
 */
export function loadBrandConfig(): BrandConfig {
  if (cachedConfig) return cachedConfig;

  // Walk up from this file to find the project root (where brand.config.* lives)
  const projectRoot = findProjectRoot(__dirname);

  const userConfig = path.join(projectRoot, "brand.config.ts");
  const exampleConfig = path.join(projectRoot, "brand.config.example.ts");

  let configPath: string;
  if (fs.existsSync(userConfig)) {
    configPath = userConfig;
  } else if (fs.existsSync(exampleConfig)) {
    configPath = exampleConfig;
  } else {
    throw new Error(
      "No brand config found. Copy brand.config.example.ts to brand.config.ts and customize it."
    );
  }

  // Use require() for CommonJS compatibility with tsx
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require(configPath);
  cachedConfig = mod.config as BrandConfig;

  if (!cachedConfig?.brand?.name) {
    throw new Error(`Invalid brand config at ${configPath}: missing brand.name`);
  }

  return cachedConfig;
}

function findProjectRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (
      fs.existsSync(path.join(dir, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(dir, "brand.config.ts")) ||
      fs.existsSync(path.join(dir, "brand.config.example.ts"))
    ) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  // Fallback: assume 3 levels up from packages/shared/src/ or packages/shared/dist/
  return path.resolve(startDir, "../../..");
}
