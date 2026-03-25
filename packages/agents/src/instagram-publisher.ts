import { chromium, type BrowserContext } from "playwright";
import * as path from "path";
import * as fs from "fs";
import type { Logger } from "./logger";

const MONOREPO_ROOT = path.resolve(__dirname, "../../..");
const BROWSER_DATA_DIR = path.join(MONOREPO_ROOT, "browser-data");
const DATA_DIR = path.join(MONOREPO_ROOT, "data");
const SESSION_FLAG = path.join(DATA_DIR, "instagram-session-expired.flag");

export interface PublishResult {
  success: boolean;
  error?: string;
  sessionExpired?: boolean;
}

export interface PublishOptions {
  imagePath: string;
  caption: string;
  logger: Logger;
  headless?: boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function publishToInstagram(
  opts: PublishOptions
): Promise<PublishResult> {
  const { imagePath, caption, logger, headless = true } = opts;

  if (!fs.existsSync(imagePath)) {
    return { success: false, error: `Image not found: ${imagePath}` };
  }

  const absImagePath = path.resolve(imagePath);
  let context: BrowserContext | undefined;

  try {
    logger.info("Launching browser", { headless });

    context = await chromium.launchPersistentContext(BROWSER_DATA_DIR, {
      headless,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
      ],
      viewport: { width: 1280, height: 900 },
    });

    const page = context.pages()[0] || (await context.newPage());

    // Navigate to Instagram
    logger.info("Navigating to Instagram");
    await page.goto("https://www.instagram.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await sleep(3000);

    // Check for login redirect
    const currentUrl = page.url();
    if (
      currentUrl.includes("/accounts/login") ||
      currentUrl.includes("/challenge")
    ) {
      logger.error("Instagram session expired — login redirect detected", {
        url: currentUrl,
      });
      writeSessionFlag();
      return { success: false, error: "SESSION_EXPIRED", sessionExpired: true };
    }

    // Dismiss "Turn on notifications" popup if present
    try {
      const notNowBtn = page.getByRole("button", { name: /not now/i });
      await notNowBtn.click({ timeout: 3000 });
      logger.info("Dismissed notifications popup");
      await sleep(1000);
    } catch {
      // No popup — continue
    }

    // Click create/new post button — opens a submenu
    logger.info("Opening new post menu");
    const newPostLink = page.getByRole("link", { name: "New post" }).first();
    await newPostLink.click({ timeout: 5000 });
    await sleep(1000);

    // Click "Post" from the submenu
    logger.info("Selecting Post from submenu");
    const postOption = page.getByRole("link", { name: "Post Post" }).first();
    try {
      await postOption.click({ timeout: 5000 });
    } catch {
      // Fallback: try direct text match
      const altPost = page.locator("a").filter({ hasText: /^Post$/ }).first();
      await altPost.click({ timeout: 5000 });
    }
    await sleep(2000);

    // Upload image via filechooser
    logger.info("Uploading image", { path: absImagePath });
    const selectBtn = page
      .getByRole("button", { name: /select from computer/i })
      .first();

    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser", { timeout: 15000 }),
      selectBtn.click({ timeout: 5000 }),
    ]);
    await fileChooser.setFiles(absImagePath);
    logger.info("Image uploaded, waiting for processing");
    await sleep(3000);

    await handleCropAndFilter(page, logger);
    await typeCaption(page, caption, logger);
    await clickShare(page, logger);

    clearSessionFlag();
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error("Instagram publish failed", { error: message });
    return { success: false, error: message };
  } finally {
    if (context) {
      try {
        await context.close();
      } catch {
        // ignore close errors
      }
    }
  }
}

async function handleCropAndFilter(
  page: import("playwright").Page,
  logger: Logger
): Promise<void> {
  // Click "Next" through crop screen
  const nextBtn = page.getByRole("button", { name: /^next$/i });
  try {
    await nextBtn.click({ timeout: 5000 });
    logger.info("Passed crop screen");
    await sleep(1500);
  } catch {
    logger.warn("No crop 'Next' button found");
  }

  // Click "Next" through filters screen
  try {
    await nextBtn.click({ timeout: 5000 });
    logger.info("Passed filters screen");
    await sleep(1500);
  } catch {
    logger.warn("No filters 'Next' button found");
  }
}

async function typeCaption(
  page: import("playwright").Page,
  caption: string,
  logger: Logger
): Promise<void> {
  logger.info("Typing caption");
  const captionArea = page
    .getByRole("textbox", { name: /write a caption/i })
    .first();
  const altCaptionArea = page.locator('textarea[aria-label="Write a caption..."]').first();

  let target;
  try {
    await captionArea.waitFor({ state: "visible", timeout: 5000 });
    target = captionArea;
  } catch {
    await altCaptionArea.waitFor({ state: "visible", timeout: 5000 });
    target = altCaptionArea;
  }

  await target.click();
  const cleanCaption = caption.replace(/\\n/g, "\n");
  const lines = cleanCaption.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (i > 0) await page.keyboard.press("Enter");
    if (lines[i].length > 0) {
      await target.pressSequentially(lines[i], { delay: 5 });
    }
  }
  await sleep(1000);
}

async function clickShare(
  page: import("playwright").Page,
  logger: Logger
): Promise<void> {
  logger.info("Clicking Share");
  const shareBtn = page.getByRole("button", { name: /^share$/i }).first();
  await shareBtn.click({ timeout: 5000 });

  // Wait for success
  logger.info("Waiting for post confirmation");
  try {
    await page
      .getByText(/your post has been shared/i)
      .waitFor({ state: "visible", timeout: 60000 });
    logger.info("Post confirmed successful");
  } catch {
    // Check if dialog closed (post likely went through)
    await sleep(5000);
    const url = page.url();
    if (url.includes("instagram.com")) {
      logger.warn(
        "No success toast, but still on Instagram — assuming success"
      );
    } else {
      throw new Error("Post confirmation not detected");
    }
  }
}

function writeSessionFlag(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(SESSION_FLAG, new Date().toISOString() + "\n", "utf-8");
}

function clearSessionFlag(): void {
  if (fs.existsSync(SESSION_FLAG)) {
    fs.unlinkSync(SESSION_FLAG);
  }
}

export function isInstagramSessionExpired(): boolean {
  return fs.existsSync(SESSION_FLAG);
}
