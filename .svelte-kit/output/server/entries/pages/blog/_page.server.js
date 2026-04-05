import { g as getAllPosts } from "../../../chunks/posts.server.js";
function load() {
  return { posts: getAllPosts() };
}
export {
  load
};
