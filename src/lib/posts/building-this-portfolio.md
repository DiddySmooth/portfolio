---
title: "Building This Portfolio with SvelteKit"
date: "2026-03-31"
category: devlog
tags: svelte sveltekit vite typescript markdown gray-matter static-site
excerpt: "How I rebuilt my portfolio from scratch — static HTML to a SvelteKit site with a markdown-powered blog, reactive search, and a single global stylesheet."
readTime: 7 min read
---

I've had a plain HTML/CSS portfolio sitting around longer than I care to admit. It worked, but adding anything new meant editing raw HTML, and there was no real blog to write on. So I rebuilt it from scratch with SvelteKit.

This post covers the decisions that shaped the final result.

## Why SvelteKit?

I considered the usual suspects — Next.js, Astro, Nuxt — but landed on SvelteKit for a few reasons:

- **No virtual DOM overhead.** Svelte compiles to vanilla JS. For a personal site, that's the correct tradeoff: tiny bundles, instant paint.
- **File-based routing out of the box.** No router config. A file at `src/routes/contact/+page.svelte` is just `/contact`.
- **`adapter-static` is perfect here.** This site has no dynamic server requirements — it's prerendered HTML/CSS/JS, deployable anywhere.

The full site builds in under 5 seconds and ships as static files with no runtime dependency.

## Static Prerendering

One line in `+layout.js` enables full static export:

```js
export const prerender = true;
```

SvelteKit walks every route at build time and writes `.html` files. For dynamic routes like `/blog/[slug]`, you export an `entries()` function that tells the builder which slugs exist:

```js
export function entries() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
```

At build time, SvelteKit calls `entries()`, then calls `load()` for each slug, and outputs a static HTML file per post. Zero server needed at runtime.

## Markdown-Powered Blog

Posts live as `.md` files in `src/lib/posts/`. Vite's `import.meta.glob` pulls them all in at build time:

```js
const rawPosts = import.meta.glob('/src/lib/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});
```

From there, `gray-matter` parses the YAML frontmatter and `marked` converts the markdown body to HTML:

```js
import matter from 'gray-matter';
import { marked } from 'marked';

const { data, content } = matter(raw);
const html = marked.parse(content);
```

No databases, no CMS, no API calls. A new post is just a new `.md` file with a frontmatter block:

```yaml
---
title: "Post Title"
date: "2026-04-01"
category: tutorials
tags: react typescript
excerpt: "Short description shown on the blog card."
readTime: 5 min read
---
```

Drop the file in, rebuild, done.

## Reactive Search Without a State Library

The blog index has live search and category filtering. In React I'd reach for `useState` and `useEffect`. In Svelte, reactive statements (`$:`) handle this without any imports:

```svelte
<script>
  let search = '';
  let activeFilter = 'all';

  $: filteredPosts = data.posts.filter((post) => {
    const matchFilter = activeFilter === 'all' || post.category === activeFilter;
    const query = search.toLowerCase().trim();
    return (
      matchFilter &&
      (!query ||
        post.title.toLowerCase().includes(query) ||
        post.tags.includes(query))
    );
  });
</script>

<input bind:value={search} placeholder="Search articles…" />
```

`filteredPosts` recomputes automatically whenever `search` or `activeFilter` changes. No `useEffect`, no dependency arrays, no stale closure bugs.

## Single Global Stylesheet

I kept one global `src/app.css` instead of scoped component styles. For a site this size, global CSS with custom properties is simpler to reason about than per-component styles:

```css
:root {
  --evergreen:   #132a13;
  --hunter-green: #31572c;
  --fern:        #4f772d;
  --palm-leaf:   #90a955;
  --lime-cream:  #ecf39e;
}
```

Every component reads from these variables, so tweaking the palette is a single-file change.

## Mobile Nav Without a Library

The hamburger nav closes on outside click using `bind:this` — a direct reference to the DOM node — rather than a click listener on `document`:

```svelte
<script>
  let navEl;
  function handleWindowClick(e) {
    if (navOpen && !navEl.contains(e.target)) navOpen = false;
  }
</script>

<svelte:window on:click={handleWindowClick} />
<nav bind:this={navEl}>...</nav>
```

This avoids the a11y lint warning Svelte raises when you put `on:click` on a non-interactive element, and it's simpler than a click-outside directive.

## What I'd Do Differently

- **Add syntax highlighting.** `marked` renders code blocks as plain `<pre><code>`, no token colors. Shiki or Prism would fix that.
- **RSS feed.** Easy with SvelteKit — a `src/routes/rss.xml/+server.js` that returns the posts as XML.
- **OG image generation.** Auto-generated social preview cards per post would be a nice touch.

## Stack

| Layer | Tool |
|---|---|
| Framework | SvelteKit 2 |
| Build | Vite 5 |
| Markdown parsing | gray-matter + marked |
| CSS | Vanilla CSS, custom properties |
| Deployment | Static files (adapter-static) |

None of this is groundbreaking — it's a deliberately boring stack. For a personal site, boring is correct.
