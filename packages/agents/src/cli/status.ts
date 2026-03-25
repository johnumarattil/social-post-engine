import { getAllPosts } from "../store";
import type { Platform } from "../types";

function main() {
  const posts = getAllPosts();

  if (posts.length === 0) {
    console.log("\nNo posts in the store.");
    console.log('Run "pnpm agent:autopublish --seed-only" to seed the queue.\n');
    return;
  }

  let totalPending = 0;
  let totalPublished = 0;
  let totalFailed = 0;

  for (const post of posts) {
    for (const entry of Object.values(post.platforms)) {
      if (!entry) continue;
      if (entry.status === "pending") totalPending++;
      else if (entry.status === "published") totalPublished++;
      else if (entry.status === "failed") totalFailed++;
    }
  }

  console.log(`\n=== Post Store Status ===`);
  console.log(`Total posts: ${posts.length}`);
  console.log(`Platform entries — Pending: ${totalPending} | Published: ${totalPublished} | Failed: ${totalFailed}`);
  console.log("");

  for (const post of posts) {
    console.log(`  ${post.title}`);
    console.log(`    ID: ${post.id}`);
    console.log(`    Source: ${post.source} | Theme: ${post.theme} | Created: ${post.createdAt}`);

    const platforms = Object.entries(post.platforms) as [Platform, { imagePath: string; status: string; publishedAt: string | null }][];
    for (const [platform, entry] of platforms) {
      const pubAt = entry.publishedAt ? ` (${entry.publishedAt})` : "";
      console.log(`    ${platform}: ${entry.status}${pubAt}`);
    }
    console.log("");
  }
}

main();
