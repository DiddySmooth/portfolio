import { getAllPosts } from '$lib/posts.server.js';

export function load() {
  return { posts: getAllPosts() };
}
