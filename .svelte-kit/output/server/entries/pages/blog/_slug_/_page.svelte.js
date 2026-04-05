import { c as create_ssr_component, e as escape, b as add_attribute, a as each } from "../../../../chunks/ssr.js";
function formatDate(iso) {
  return (/* @__PURE__ */ new Date(iso + "T12:00:00")).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let techStack;
  let { data } = $$props;
  const tagLabel = {
    tutorials: "Tutorials",
    devlog: "Dev Log",
    opinion: "Opinion"
  };
  const tagClass = {
    tutorials: "tag-tutorials",
    devlog: "tag-devlog",
    opinion: "tag-opinion"
  };
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  techStack = (data.tags ?? "").split(" ").filter(Boolean);
  return `${$$result.head += `<!-- HEAD_svelte-3ojo5q_START -->${$$result.title = `<title>${escape(data.title)} — Grayson McClead</title>`, ""}<meta name="description"${add_attribute("content", data.excerpt, 0)}><!-- HEAD_svelte-3ojo5q_END -->`, ""} <main><article class="post-page"><div class="container"><header class="post-header"><a href="/blog" class="back-link" data-svelte-h="svelte-vqhbui">← Back to Blog</a> <div class="post-meta"><span class="${"tag " + escape(tagClass[data.category], true)}">${escape(tagLabel[data.category])}</span> <span class="post-date">${escape(formatDate(data.date))}</span> <span class="post-read-time">· ${escape(data.readTime)}</span></div> <h1 class="post-title">${escape(data.title)}</h1> <p class="post-subtitle">${escape(data.excerpt)}</p> ${techStack.length ? `<div class="post-tech-stack" aria-label="Technologies used">${each(techStack, (tech) => {
    return `<span class="tech-pill">${escape(tech)}</span>`;
  })}</div>` : ``}</header> <div class="prose"><!-- HTML_TAG_START -->${data.html}<!-- HTML_TAG_END --></div></div></article></main>`;
});
export {
  Page as default
};
