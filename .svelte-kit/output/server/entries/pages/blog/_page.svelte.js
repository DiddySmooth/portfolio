import { c as create_ssr_component, e as escape, b as add_attribute, a as each } from "../../../chunks/ssr.js";
function formatDate(iso) {
  return (/* @__PURE__ */ new Date(iso + "T12:00:00")).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let filteredPosts;
  let { data } = $$props;
  const tagClass = {
    tutorials: "tag-tutorials",
    devlog: "tag-devlog",
    opinion: "tag-opinion"
  };
  const tagLabel = {
    tutorials: "Tutorials",
    devlog: "Dev Log",
    opinion: "Opinion"
  };
  const filters = ["all", "tutorials", "devlog", "opinion"];
  const filterLabel = {
    all: "All",
    tutorials: "Tutorials",
    devlog: "Dev Log",
    opinion: "Opinion"
  };
  let search = "";
  let activeFilter = "all";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  featured = data.posts[0] ?? null;
  filteredPosts = data.posts.filter((post) => {
    const matchFilter = activeFilter === "all";
    const query = search.toLowerCase().trim();
    const matchSearch = !query || post.title.toLowerCase().includes(query) || (post.tags ?? "").includes(query) || post.excerpt.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });
  return `${$$result.head += `<!-- HEAD_svelte-18ks2ql_START -->${$$result.title = `<title>Dev Blog — Grayson McClead</title>`, ""}<meta name="description" content="Technical articles, tutorials, and dev logs by Grayson McClead — a full stack developer building scalable web apps with React, Angular, and .NET."><!-- HEAD_svelte-18ks2ql_END -->`, ""} <main> <section class="page-hero" data-svelte-h="svelte-w4upjk"><div class="container"><span class="page-hero-label">Dev Journal</span> <h1 class="page-hero-title">The Dev Blog</h1> <p class="page-hero-desc">Tutorials, dev logs, and opinions from the trenches of modern full stack development. No fluff — just signal.</p></div></section>  <section class="featured-section" aria-labelledby="featured-heading"><div class="container"><div class="section-header" data-svelte-h="svelte-1kmfguy"><span class="section-label">Featured Article</span> <div class="section-divider" aria-hidden="true"></div></div> ${featured ? `<article class="featured-post"><div class="featured-post-media" aria-hidden="true" data-svelte-h="svelte-10pdimu"><div class="featured-post-art"><div class="featured-art-icon">⚡</div></div> <span class="featured-post-label">Featured</span></div> <div class="featured-post-content"><div class="featured-post-meta"><span class="${"tag " + escape(tagClass[featured.category], true)}">${escape(tagLabel[featured.category])}</span> <span class="featured-post-date">${escape(formatDate(featured.date))}</span> <span class="featured-post-read-time">· ${escape(featured.readTime)}</span></div> <h2 class="featured-post-title" id="featured-heading">${escape(featured.title)}</h2> <p class="featured-post-excerpt">${escape(featured.excerpt)}</p> <a href="${"/blog/" + escape(featured.slug, true)}" class="featured-post-link">Read Full Article
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a></div></article>` : ``}</div></section>  <section class="search-filter-bar" aria-label="Search and filter articles"><div class="container"><div class="search-filter-inner"><div class="search-wrapper"><span class="search-icon" aria-hidden="true" data-svelte-h="svelte-16wv0hs"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span> <input type="search" class="search-input" placeholder="Search articles…" aria-label="Search articles" autocomplete="off" spellcheck="false"${add_attribute("value", search, 0)}></div> <div class="filter-buttons" role="group" aria-label="Filter articles by category">${each(filters, (filter) => {
    return `<button class="${["filter-btn", activeFilter === filter ? "active" : ""].join(" ").trim()}"${add_attribute("aria-pressed", activeFilter === filter ? "true" : void 0, 0)}>${escape(filterLabel[filter])} </button>`;
  })}</div></div></div></section>  <section class="blog-grid-section" aria-labelledby="articles-heading"><div class="container"><div class="blog-grid-header"><h2 class="blog-grid-title" id="articles-heading" data-svelte-h="svelte-1gp8m4n">Recent Articles</h2> <span class="blog-count" aria-live="polite">${escape(filteredPosts.length)} ${escape(filteredPosts.length === 1 ? "article" : "articles")}</span></div> <div class="blog-grid">${filteredPosts.length ? each(filteredPosts, (post) => {
    return `<article class="blog-card"><div class="card-header"><span class="${"tag " + escape(tagClass[post.category], true)}">${escape(tagLabel[post.category])}</span> <span class="card-read-time">${escape(post.readTime)}</span></div> <h3 class="card-title"><a href="${"/blog/" + escape(post.slug, true)}">${escape(post.title)}</a></h3> <p class="card-excerpt">${escape(post.excerpt)}</p> ${post.tags ? `<div class="card-tags">${each(post.tags.split(" ").filter(Boolean), (tech) => {
      return `<span class="tech-pill tech-pill--sm">${escape(tech)}</span>`;
    })} </div>` : ``} <div class="card-footer"><span class="card-date">${escape(formatDate(post.date))}</span> <a href="${"/blog/" + escape(post.slug, true)}" class="card-link">Read More
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> </a></div> </article>`;
  }) : `<div class="empty-state" role="status"><div class="empty-state-icon" aria-hidden="true" data-svelte-h="svelte-ww2fp5">🔍</div> <p>No articles match <strong style="color:var(--lime-cream)">&quot;${escape(search)}&quot;</strong>. Try a different search or
              filter.</p> </div>`}</div></div></section></main>`;
});
export {
  Page as default
};
