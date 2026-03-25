import * as fs from "fs";
import * as path from "path";
import type { PendingPost, PostStore, Platform, PostStatus } from "./types";

const STORE_DIR = path.resolve(__dirname, "../../../data");
const STORE_PATH = path.join(STORE_DIR, "pending-posts.json");

function ensureDir(): void {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

export function readStore(): PostStore {
  ensureDir();
  if (!fs.existsSync(STORE_PATH)) {
    return { posts: [] };
  }
  const raw = fs.readFileSync(STORE_PATH, "utf-8");
  return JSON.parse(raw) as PostStore;
}

export function writeStore(store: PostStore): void {
  ensureDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2) + "\n", "utf-8");
}

export function addPost(post: PendingPost): void {
  const store = readStore();
  store.posts.push(post);
  writeStore(store);
}

export function updatePlatformStatus(
  id: string,
  platform: Platform,
  status: PostStatus,
  publishedAt?: string
): boolean {
  const store = readStore();
  const post = store.posts.find((p) => p.id === id);
  if (!post) return false;

  const entry = post.platforms[platform];
  if (!entry) return false;

  entry.status = status;
  entry.publishedAt = publishedAt ?? null;
  writeStore(store);
  return true;
}

export function getPendingPosts(): PendingPost[] {
  const store = readStore();
  return store.posts.filter((p) =>
    Object.values(p.platforms).some((e) => e && e.status === "pending")
  );
}

export function getAllPosts(): PendingPost[] {
  return readStore().posts;
}

export function getTrendingTitles(): string[] {
  const store = readStore();
  return store.posts
    .filter((p) => p.source === "trending")
    .map((p) => p.title);
}

export function getUsedPresetIds(): Set<string> {
  const store = readStore();
  const ids = new Set<string>();
  for (const post of store.posts) {
    if (post.source === "preset" && post.presetId) {
      ids.add(post.presetId);
    }
  }
  return ids;
}

export function getUsedPresetIdsForPlatform(platform: Platform): Set<string> {
  const store = readStore();
  const ids = new Set<string>();
  for (const post of store.posts) {
    if (post.source === "preset" && post.presetId && post.platforms[platform]) {
      ids.add(post.presetId);
    }
  }
  return ids;
}

export function getLayoutUsageCounts(): Record<string, number> {
  const store = readStore();
  const counts: Record<string, number> = {};
  for (const post of store.posts) {
    if (post.layout) {
      counts[post.layout] = (counts[post.layout] ?? 0) + 1;
    }
  }
  return counts;
}

