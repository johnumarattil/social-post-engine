import { getPendingPosts } from "../store";
import type { Platform } from "../types";

function main() {
  const pending = getPendingPosts();

  if (pending.length === 0) {
    console.log("No pending posts to publish.");
    console.log('Run "pnpm agent:autopublish --seed-only" to seed the queue.');
    return;
  }

  console.log(`\n=== ${pending.length} Post(s) Ready to Publish ===\n`);

  for (const post of pending) {
    console.log(`--- Post: ${post.title} ---`);
    console.log(`ID: ${post.id}`);
    console.log(`Source: ${post.source}`);
    console.log(`Theme: ${post.theme}`);
    console.log(`Created: ${post.createdAt}`);
    console.log("");
    console.log("Caption:");
    console.log("```");
    console.log(post.caption);
    console.log("```");
    console.log("");

    const platforms = Object.entries(post.platforms) as [Platform, { imagePath: string; status: string }][];
    for (const [platform, entry] of platforms) {
      if (entry.status === "pending") {
        console.log(`  Platform: ${platform}`);
        console.log(`  Image: ${entry.imagePath}`);
        console.log(`  Status: ${entry.status}`);
        console.log(`  Mark published: pnpm agent:mark-published --id ${post.id} --platform ${platform}`);
        console.log("");
      }
    }
    console.log("---\n");
  }
}

main();
