<script>
  export let data;

  const tagLabel = { tutorials: 'Tutorials', devlog: 'Dev Log', opinion: 'Opinion' };
  const tagClass  = { tutorials: 'tag-tutorials', devlog: 'tag-devlog', opinion: 'tag-opinion' };

  $: techStack = (data.tags ?? '').split(' ').filter(Boolean);

  function formatDate(iso) {
    return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{data.title} — Grayson McClead</title>
  <meta name="description" content={data.excerpt} />
</svelte:head>

<main>
  <article class="post-page">
    <div class="container">

      <header class="post-header">
        <a href="/blog" class="back-link">← Back to Blog</a>
        <div class="post-meta">
          <span class="tag {tagClass[data.category]}">{tagLabel[data.category]}</span>
          <span class="post-date">{formatDate(data.date)}</span>
          <span class="post-read-time">· {data.readTime}</span>
        </div>
        <h1 class="post-title">{data.title}</h1>
        <p class="post-subtitle">{data.excerpt}</p>
        {#if techStack.length}
          <div class="post-tech-stack" aria-label="Technologies used">
            {#each techStack as tech}
              <span class="tech-pill">{tech}</span>
            {/each}
          </div>
        {/if}
      </header>

      <div class="prose">
        {@html data.html}
      </div>

    </div>
  </article>
</main>
