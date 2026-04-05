/* ============================================================
   Portfolio — script.js
   Handles: mobile nav · blog search & filter · contact form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Navigation ───────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {

    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when clicking outside the menu
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    // Close when a nav link is clicked (useful on mobile)
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });

    function closeNav() {
      navMenu.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }


  /* ── Blog: Live Search & Category Filter ────────────────── */
  const searchInput  = document.getElementById('searchInput');
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const blogCards    = document.querySelectorAll('.blog-card');
  const articleCount = document.getElementById('articleCount');
  const blogGrid     = document.getElementById('blogGrid');

  if (searchInput && blogCards.length) {

    let activeFilter = 'all';

    const updateCount = (n) => {
      if (articleCount) {
        articleCount.textContent = `${n} ${n === 1 ? 'article' : 'articles'}`;
      }
    };

    const filterCards = () => {
      const query = searchInput.value.toLowerCase().trim();
      let visible = 0;

      blogCards.forEach(card => {
        const category = card.dataset.category || '';
        const title    = (card.dataset.title    || '').toLowerCase();
        const tags     = (card.dataset.tags     || '').toLowerCase();
        const excerpt  = card.querySelector('.card-excerpt')?.textContent.toLowerCase() || '';

        const matchFilter = activeFilter === 'all' || category === activeFilter;
        const matchSearch = !query || title.includes(query) || tags.includes(query) || excerpt.includes(query);

        if (matchFilter && matchSearch) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      // Empty state
      const existing = blogGrid?.querySelector('.empty-state');
      if (visible === 0 && blogGrid) {
        if (!existing) {
          const div = document.createElement('div');
          div.className = 'empty-state';
          div.setAttribute('role', 'status');
          div.innerHTML =
            '<div class="empty-state-icon" aria-hidden="true">🔍</div>' +
            '<p>No articles match <strong style="color:var(--lime-cream)">"' +
            escapeHTML(searchInput.value) +
            '"</strong>. Try a different search or filter.</p>';
          blogGrid.appendChild(div);
        }
      } else {
        existing?.remove();
      }

      updateCount(visible);
    };

    // Debounced search input
    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(filterCards, 200);
    });

    // Category filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.removeAttribute('aria-pressed');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        activeFilter = btn.dataset.filter;
        filterCards();
      });
    });

    // Initialize
    updateCount(blogCards.length);
  }


  /* ── Contact Form Validation & Submission ────────────────── */
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');
  const resetFormBtn = document.getElementById('resetFormBtn');
  const submitBtn    = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {

    const FIELDS = {
      firstName: {
        el:       document.getElementById('firstName'),
        errorEl:  document.getElementById('firstNameError'),
        validate: v => v.trim().length >= 1,
      },
      lastName: {
        el:       document.getElementById('lastName'),
        errorEl:  document.getElementById('lastNameError'),
        validate: v => v.trim().length >= 1,
      },
      email: {
        el:       document.getElementById('email'),
        errorEl:  document.getElementById('emailError'),
        validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
      },
      subject: {
        el:       document.getElementById('subject'),
        errorEl:  document.getElementById('subjectError'),
        validate: v => v !== '',
      },
      message: {
        el:       document.getElementById('message'),
        errorEl:  document.getElementById('messageError'),
        validate: v => v.trim().length >= 20,
      },
    };

    const validateField = (key) => {
      const { el, errorEl, validate } = FIELDS[key];
      if (!el) return true;
      const ok = validate(el.value);
      el.classList.toggle('error', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      if (errorEl) errorEl.classList.toggle('visible', !ok);
      return ok;
    };

    // Validate on blur; re-validate on input when field has an error
    Object.keys(FIELDS).forEach(key => {
      const { el } = FIELDS[key];
      if (!el) return;
      el.addEventListener('blur',  () => validateField(key));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) validateField(key);
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all and collect result
      const allValid = Object.keys(FIELDS)
        .map(k => validateField(k))
        .every(Boolean);

      if (!allValid) {
        // Focus the first field with an error
        const first = Object.values(FIELDS).find(f => f.el?.classList.contains('error'));
        first?.el?.focus();
        return;
      }

      // Disable submit and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<svg class="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
        'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<path stroke-opacity=".3" d="M12 2a10 10 0 1 0 10 10"/>' +
        '<path d="M12 2a10 10 0 0 1 10 10"/>' +
        '</svg> Sending…';

      // Simulate network request (replace with real fetch when backend is ready)
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('visible');
          // Move focus to success message for screen readers
          const successTitle = formSuccess.querySelector('.success-title');
          if (successTitle) {
            successTitle.setAttribute('tabindex', '-1');
            successTitle.focus();
          }
        }
      }, 1300);
    });

    // Reset form back to initial state
    resetFormBtn?.addEventListener('click', () => {
      contactForm.reset();
      contactForm.style.display = '';
      formSuccess?.classList.remove('visible');

      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>' +
        '</svg> Send Message';

      Object.values(FIELDS).forEach(({ el, errorEl }) => {
        el?.classList.remove('error');
        el?.removeAttribute('aria-invalid');
        errorEl?.classList.remove('visible');
      });

      // Return focus to the first input
      FIELDS.firstName?.el?.focus();
    });
  }

});


/* ── Utility: HTML-escape user input before inserting into DOM ── */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
