import { readStore } from "../store";
import { generateImage } from "../generate";
import type { Platform, PendingPost, PlatformEntry } from "../types";

function main() {
  const store = readStore();

  // Collect all (post, platform) pairs that are pending
  const jobs: { post: PendingPost; platform: Platform; entry: PlatformEntry }[] = [];

  for (const post of store.posts) {
    for (const [plat, entry] of Object.entries(post.platforms)) {
      if (entry && entry.status === "pending") {
        jobs.push({ post, platform: plat as Platform, entry });
      }
    }
  }

  console.log(`Found ${jobs.length} pending images to regenerate.\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < jobs.length; i++) {
    const { post, platform, entry } = jobs[i];
    const label = `[${i + 1}/${jobs.length}]`;
    console.log(`${label} Regenerating ${post.layout ?? "default"} for "${post.title}" (${platform})`);

    try {
      generateImage({
        platform,
        title: post.title,
        subtitle: post.subtitle,
        author: post.author,
        date: post.date,
        theme: post.theme,
        layout: post.layout,
        layoutData: post.layoutData,
        output: entry.imagePath,
      });
      success++;
    } catch (err) {
      failed++;
      console.error(`${label} FAILED: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\nDone. ${success} succeeded, ${failed} failed.`);
}

main();
