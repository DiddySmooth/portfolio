import matter from 'gray-matter';

// Import all markdown files as raw strings at build time (Vite feature)
const rawPosts = import.meta.glob('/src/lib/posts/*.md', { query: '?raw', import: 'default', eager: true });

/**
 * Returns all post metadata (no content), sorted newest first.
 */
export function getAllPosts() {
  return Object.entries(rawPosts)
    .map(([path, raw]) => {
      const slug = path.split('/').pop().replace('.md', '');
      const { data } = matter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Returns a single post's metadata + raw markdown content, or null if not found.
 */
export function getPost(slug) {
  const path = `/src/lib/posts/${slug}.md`;
  const raw = rawPosts[path];
  if (!raw) return null;
  const { data, content } = matter(raw);
  return { slug, content, ...data };
}
