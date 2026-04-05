import { g as getAllPosts, a as getPost } from "../../../../chunks/posts.server.js";
import { marked } from "marked";
import { error } from "@sveltejs/kit";
function entries() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
function load({ params }) {
  const post = getPost(params.slug);
  if (!post) throw error(404, "Post not found");
  marked.setOptions({ gfm: true });
  return {
    title: post.title,
    date: post.date,
    category: post.category,
    tags: post.tags ?? "",
    excerpt: post.excerpt,
    readTime: post.readTime,
    html: marked.parse(post.content)
  };
}
export {
  entries,
  load
};
