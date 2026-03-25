import { chromium, type BrowserContext } from "playwright";
import * as path from "path";
import * as fs from "fs";
import { loadBrandConfig } from "@social-post-engine/shared";
import type { Logger } from "./logger";

const MONOREPO_ROOT = path.resolve(__dirname, "../../..");
const BROWSER_DATA_DIR = path.join(MONOREPO_ROOT, "browser-data");
const DATA_DIR = path.join(MONOREPO_ROOT, "data");
const SESSION_FLAG = path.join(DATA_DIR, "session-expired.flag");

function getLinkedInComposeUrl(): string {
  const config = loadBrandConfig();
  return `https://www.linkedin.com/showcase/${config.linkedin.showcaseId}/admin/page-posts/published/?share=true`;
}

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

export async function publishToLinkedIn(
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

    // Navigate to showcase admin page with share=true
    logger.info("Navigating to LinkedIn compose", { url: getLinkedInComposeUrl() });
    await page.goto(getLinkedInComposeUrl(), { waitUntil: "domcontentloaded", timeout: 30000 });
    await sleep(3000);

    // Check for login redirect (session expired)
    const currentUrl = page.url();
    if (
      currentUrl.includes("/login") ||
      currentUrl.includes("/checkpoint") ||
      currentUrl.includes("/uas/login")
    ) {
      logger.error("LinkedIn session expired — login redirect detected", { url: currentUrl });
      writeSessionFlag();
      return { success: false, error: "SESSION_EXPIRED", sessionExpired: true };
    }

    // Wait for the share dialog / composer to appear
    logger.info("Waiting for composer to open");
    const textEditor = page.getByRole("textbox", {
      name: /text editor/i,
    });

    // The share=true URL should open the composer automatically.
    // If not, try clicking "Start a post" as fallback.
    try {
      await textEditor.waitFor({ state: "visible", timeout: 10000 });
    } catch {
      logger.warn("Composer not auto-opened, trying Start a post fallback");
      const startPost = page.getByRole("link", { name: /start a post/i }).first();
      try {
        await startPost.click({ timeout: 5000 });
        await textEditor.waitFor({ state: "visible", timeout: 10000 });
      } catch {
        return { success: false, error: "Could not open LinkedIn composer" };
      }
    }

    // Upload image via the "Add media" button
    logger.info("Uploading image", { path: absImagePath });
    const addMediaBtn = page.getByRole("button", { name: /add media/i });

    // Set up filechooser listener BEFORE clicking, then click to trigger it
    const fileChooserPromise = page.waitForEvent("filechooser", { timeout: 15000 });
    await addMediaBtn.click({ timeout: 5000 });

    // After clicking "Add media", LinkedIn may show an upload dialog.
    // Try clicking the dropzone or upload button to trigger filechooser.
    await sleep(2000);
    const uploadArea = page.locator('[data-test-image-video-dropzone]').first();
    const altUpload = page.getByRole("button", { name: /upload from computer/i }).first();
    try {
      await uploadArea.click({ timeout: 3000 });
    } catch {
      try {
        await altUpload.click({ timeout: 3000 });
      } catch {
        logger.warn("No upload area found, filechooser may have already triggered");
      }
    }

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(absImagePath);

    logger.info("Waiting for image upload to complete");
    await sleep(3000);

    // Click "Next" if an editor/crop screen appears
    const nextBtn = page.getByRole("button", { name: /^next$/i });
    try {
      await nextBtn.click({ timeout: 5000 });
      await sleep(1000);
    } catch {
      // "Next" may not appear if no crop dialog
    }

    // Click "Done" if it appears after Next
    const doneBtn = page.getByRole("button", { name: /^done$/i });
    try {
      await doneBtn.click({ timeout: 3000 });
      await sleep(1000);
    } catch {
      // May not appear
    }

    // Type the caption line-by-line so contenteditable gets proper line breaks
    logger.info("Typing caption");
    await textEditor.click();
    const cleanCaption = caption.replace(/\\n/g, '\n');
    const lines = cleanCaption.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) await page.keyboard.press('Enter');
      if (lines[i].length > 0) {
        await textEditor.pressSequentially(lines[i], { delay: 5 });
      }
    }
    await sleep(1000);

    // Click Post
    logger.info("Clicking Post");
    const postBtn = page.getByRole("button", { name: /^post$/i }).first();
    await postBtn.click({ timeout: 5000 });

    // Wait for success indication
    logger.info("Waiting for post confirmation");
    try {
      await page.getByText(/post successful/i).waitFor({ state: "visible", timeout: 15000 });
      logger.info("Post confirmed successful");
    } catch {
      // Check if we're back on the feed (post likely went through)
      await sleep(5000);
      const postUrl = page.url();
      if (postUrl.includes("/feed") || postUrl.includes("/admin")) {
        logger.warn("No success toast, but navigated away from composer — assuming success");
      } else {
        return { success: false, error: "Post confirmation not detected" };
      }
    }

    clearSessionFlag();
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error("LinkedIn publish failed", { error: message });
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

export function isSessionExpired(): boolean {
  return fs.existsSync(SESSION_FLAG);
}
