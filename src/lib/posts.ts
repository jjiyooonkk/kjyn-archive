import { getRedis } from './redis';
import { nanoid } from 'nanoid';
import type { Post, SiteMode } from '@/types';

// In-memory fallback
const memStore = new Map<string, string>();

function key(site: SiteMode) {
  return `posts:${site}`;
}

export async function getPosts(site: SiteMode): Promise<Post[]> {
  const redis = getRedis();
  let raw: string | null;
  if (redis) {
    raw = (await redis.get<string>(key(site))) ?? null;
  } else {
    raw = memStore.get(key(site)) ?? null;
  }
  if (!raw) return [];
  const posts: Post[] = typeof raw === 'string' ? JSON.parse(raw) : raw as unknown as Post[];
  return posts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPost(site: SiteMode, id: string): Promise<Post | null> {
  const posts = await getPosts(site);
  return posts.find((p) => p.id === id) ?? null;
}

export async function createPost(
  site: SiteMode,
  data: Omit<Post, 'id' | 'site' | 'createdAt' | 'updatedAt'>
): Promise<Post> {
  const posts = await getPosts(site);
  const now = new Date().toISOString();
  const post: Post = {
    id: nanoid(10),
    site,
    ...data,
    createdAt: now,
    updatedAt: now,
  };
  posts.unshift(post);
  await savePosts(site, posts);
  return post;
}

export async function updatePost(
  site: SiteMode,
  id: string,
  data: Partial<Post>
): Promise<Post | null> {
  const posts = await getPosts(site);
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() };
  await savePosts(site, posts);
  return posts[idx];
}

export async function deletePost(site: SiteMode, id: string): Promise<boolean> {
  const posts = await getPosts(site);
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;
  await savePosts(site, filtered);
  return true;
}

async function savePosts(site: SiteMode, posts: Post[]) {
  const json = JSON.stringify(posts);
  const redis = getRedis();
  if (redis) {
    await redis.set(key(site), json);
  } else {
    memStore.set(key(site), json);
  }
}
