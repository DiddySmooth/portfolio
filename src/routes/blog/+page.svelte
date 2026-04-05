<script>
  export let data;

  const tagClass   = { tutorials: 'tag-tutorials', devlog: 'tag-devlog', opinion: 'tag-opinion' };
  const tagLabel   = { tutorials: 'Tutorials', devlog: 'Dev Log', opinion: 'Opinion' };
  const filters    = ['all', 'tutorials', 'devlog', 'opinion'];
  const filterLabel = { all: 'All', tutorials: 'Tutorials', devlog: 'Dev Log', opinion: 'Opinion' };

  function formatDate(iso) {
    return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }

  let search = '';
  let activeFilter = 'all';

  $: featured = data.posts[0] ?? null;
  $: filteredPosts = data.posts.filter((post) => {
    const matchFilter = activeFilter === 'all' || post.category === activeFilter;
    const query = search.toLowerCase().trim();
    const matchSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      (post.tags ?? '').includes(query) ||
      post.excerpt.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });
</script>

<svelte:head>
  <title>Dev Blog — Grayson McClead</title>
  <meta
    name="description"
    content="Technical articles, tutorials, and dev logs by Grayson McClead — a full stack developer building scalable web apps with React, Angular, and .NET."
  />
</svelte:head>

<main>
  <!-- ── Page Hero ── -->
  <section class="page-hero">
    <div class="container">
      <span class="page-hero-label">Dev Journal</span>
      <h1 class="page-hero-title">The Dev Blog</h1>
      <p class="page-hero-desc">
        Tutorials, dev logs, and opinions from the trenches of modern full stack development. No fluff — just signal.
      </p>
    </div>
  </section>

  <!-- ── Featured Post ── -->
  <section class="featured-section" aria-labelledby="featured-heading">
    <div class="container">
      <div class="section-header">
        <span class="section-label">Featured Article</span>
        <div class="section-divider" aria-hidden="true"></div>
      </div>
      {#if featured}
        <article class="featured-post">
          <div class="featured-post-media" aria-hidden="true">
            <div class="featured-post-art">
              <div class="featured-art-icon">⚡</div>
            </div>
            <span class="featured-post-label">Featured</span>
          </div>
          <div class="featured-post-content">
            <div class="featured-post-meta">
              <span class="tag {tagClass[featured.category]}">{tagLabel[featured.category]}</span>
              <span class="featured-post-date">{formatDate(featured.date)}</span>
              <span class="featured-post-read-time">· {featured.readTime}</span>
            </div>
            <h2 class="featured-post-title" id="featured-heading">
              {featured.title}
            </h2>
            <p class="featured-post-excerpt">{featured.excerpt}</p>
            <a href="/blog/{featured.slug}" class="featured-post-link">
              Read Full Article
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </article>
      {/if}
    </div>
  </section>

  <!-- ── Search & Filter ── -->
  <section class="search-filter-bar" aria-label="Search and filter articles">
    <div class="container">
      <div class="search-filter-inner">
        <div class="search-wrapper">
          <span class="search-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="search"
            class="search-input"
            placeholder="Search articles…"
            aria-label="Search articles"
            autocomplete="off"
            spellcheck="false"
            bind:value={search}
          />
        </div>

        <div class="filter-buttons" role="group" aria-label="Filter articles by category">
          {#each filters as filter}
            <button
              class="filter-btn"
              class:active={activeFilter === filter}
              aria-pressed={activeFilter === filter ? 'true' : undefined}
              on:click={() => (activeFilter = filter)}
            >
              {filterLabel[filter]}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- ── Blog Grid ── -->
  <section class="blog-grid-section" aria-labelledby="articles-heading">
    <div class="container">
      <div class="blog-grid-header">
        <h2 class="blog-grid-title" id="articles-heading">Recent Articles</h2>
        <span class="blog-count" aria-live="polite">
          {filteredPosts.length}
          {filteredPosts.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      <div class="blog-grid">
        {#each filteredPosts as post (post.slug)}
          <article class="blog-card">
            <div class="card-header">
              <span class="tag {tagClass[post.category]}">{tagLabel[post.category]}</span>
              <span class="card-read-time">{post.readTime}</span>
            </div>
            <h3 class="card-title">
              <a href="/blog/{post.slug}">{post.title}</a>
            </h3>
            <p class="card-excerpt">{post.excerpt}</p>
            {#if post.tags}
              <div class="card-tags">
                {#each (post.tags).split(' ').filter(Boolean) as tech}
                  <span class="tech-pill tech-pill--sm">{tech}</span>
                {/each}
              </div>
            {/if}
            <div class="card-footer">
              <span class="card-date">{formatDate(post.date)}</span>
              <a href="/blog/{post.slug}" class="card-link">
                Read More
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </article>
        {:else}
          <div class="empty-state" role="status">
            <div class="empty-state-icon" aria-hidden="true">🔍</div>
            <p>
              No articles match <strong style="color:var(--lime-cream)">"{search}"</strong>. Try a different search or
              filter.
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>
</main>
