import * as path from "path";
import { config } from "dotenv";
config({ path: path.resolve(__dirname, "../../../../.env") });
import { chromium } from "playwright";

const MONOREPO_ROOT = path.resolve(__dirname, "../../../..");
const BROWSER_DATA_DIR = path.join(MONOREPO_ROOT, "browser-data");

async function main(): Promise<void> {
  const headless = process.env.AUTOPUBLISH_HEADLESS !== "false";
  let context;

  try {
    context = await chromium.launchPersistentContext(BROWSER_DATA_DIR, {
      headless,
      args: ["--disable-blink-features=AutomationControlled", "--no-sandbox"],
    });

    const page = context.pages()[0] || (await context.newPage());
    await page.goto("https://www.linkedin.com/feed/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Wait for page to settle
    await new Promise((r) => setTimeout(r, 3000));

    const url = page.url();
    if (
      url.includes("/login") ||
      url.includes("/checkpoint") ||
      url.includes("/uas/login")
    ) {
      console.log("EXPIRED");
      process.exit(1);
    }

    console.log("VALID");
    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err instanceof Error ? err.message : String(err));
    process.exit(2);
  } finally {
    if (context) {
      try {
        await context.close();
      } catch {
        // ignore
      }
    }
  }
}

main();
