<script>
  import '../app.css';
  import { page } from '$app/stores';

  let navOpen = false;
  let navEl;

  function toggleNav() {
    navOpen = !navOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = navOpen ? 'hidden' : '';
    }
  }

  function closeNav() {
    navOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  function handleWindowClick(e) {
    if (navOpen && navEl && !navEl.contains(e.target)) closeNav();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') closeNav();
  }
</script>

<svelte:window on:keydown={handleKeydown} on:click={handleWindowClick} />

<nav class="navbar" bind:this={navEl}>
  <div class="nav-container">
    <a href="/" class="nav-logo" aria-label="Grayson McClead — Home">
      <span class="logo-bracket">&lt;</span><span class="logo-name">grayson.dev</span><span class="logo-bracket">/&gt;</span>
    </a>

    <div
      class="nav-menu"
      class:open={navOpen}
      id="navMenu"
      role="navigation"
      aria-label="Main navigation"
    >
      <a
        href="/"
        class="nav-link"
        class:active={$page.url.pathname === '/'}
        aria-current={$page.url.pathname === '/' ? 'page' : undefined}
        on:click={closeNav}
      >About</a>
      <a
        href="/blog"
        class="nav-link"
        class:active={$page.url.pathname.startsWith('/blog')}
        aria-current={$page.url.pathname.startsWith('/blog') ? 'page' : undefined}
        on:click={closeNav}
      >Blog</a>
      <a
        href="/contact"
        class="nav-link"
        class:active={$page.url.pathname === '/contact'}
        aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}
        on:click={closeNav}
      >Contact</a>
      <a
        href="/pretext"
        class="nav-link"
        class:active={$page.url.pathname === '/pretext'}
        aria-current={$page.url.pathname === '/pretext' ? 'page' : undefined}
        on:click={closeNav}
      >Pretext demo</a>
    </div>

    <button
      class="nav-toggle"
      class:active={navOpen}
      on:click={toggleNav}
      aria-label="Toggle navigation menu"
      aria-expanded={String(navOpen)}
      aria-controls="navMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>
</nav>

<slot />

<footer class="footer">
  <div class="footer-inner">
    <p class="footer-text">© 2026 Grayson McClead. Crafted with care and a lot of coffee.</p>
    <nav class="footer-links" aria-label="Footer">
      <a href="/">Blog</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</footer>
