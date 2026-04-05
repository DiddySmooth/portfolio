import { getAllPosts, getPost } from '$lib/posts.server.js';
import { marked } from 'marked';
import { error } from '@sveltejs/kit';

// Tell SvelteKit which slugs to prerender at build time
export function entries() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function load({ params }) {
  const post = getPost(params.slug);
  if (!post) throw error(404, 'Post not found');

  marked.setOptions({ gfm: true });

  return {
    title:    post.title,
    date:     post.date,
    category: post.category,
    tags:     post.tags ?? '',
    excerpt:  post.excerpt,
    readTime: post.readTime,
    html:     marked.parse(post.content)
  };
}
