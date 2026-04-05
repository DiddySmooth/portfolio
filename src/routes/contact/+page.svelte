<script>
  let form = { firstName: '', lastName: '', email: '', subject: '', message: '' };
  let touched = { firstName: false, lastName: false, email: false, subject: false, message: false };
  let submitting = false;
  let submitted = false;

  const validators = {
    firstName: (v) => v.trim().length >= 1,
    lastName:  (v) => v.trim().length >= 1,
    email:     (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    subject:   (v) => v !== '',
    message:   (v) => v.trim().length >= 20
  };

  $: fieldErrors = {
    firstName: touched.firstName && !validators.firstName(form.firstName),
    lastName:  touched.lastName  && !validators.lastName(form.lastName),
    email:     touched.email     && !validators.email(form.email),
    subject:   touched.subject   && !validators.subject(form.subject),
    message:   touched.message   && !validators.message(form.message)
  };

  function touch(field) {
    touched[field] = true;
    touched = touched;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Touch all fields to reveal any errors
    touched = { firstName: true, lastName: true, email: true, subject: true, message: true };
    const allValid = Object.keys(validators).every((k) => validators[k](form[k]));
    if (!allValid) return;

    submitting = true;
    await new Promise((r) => setTimeout(r, 1300));
    submitting = false;
    submitted = true;
  }

  function resetForm() {
    form = { firstName: '', lastName: '', email: '', subject: '', message: '' };
    touched = { firstName: false, lastName: false, email: false, subject: false, message: false };
    submitting = false;
    submitted = false;
  }
</script>

<svelte:head>
  <title>Grayson McClead — Contact</title>
  <meta name="description" content="Get in touch with Grayson McClead for work opportunities, consulting, or just to say hello." />
</svelte:head>

<main>
  <!-- ── Contact Hero ── -->
  <section class="contact-hero" aria-labelledby="contact-heading">
    <div class="container">
      <div class="status-badge" role="status" aria-label="Availability: Currently available for work">
        <span class="status-dot" aria-hidden="true"></span>
        Available for Work
      </div>
      <h1 class="contact-hero-title" id="contact-heading">
        Let's Build<br />Something Great
      </h1>
      <p class="contact-hero-desc">
        I'm currently open to senior / lead engineering roles and select freelance projects. If you have an interesting
        problem, I'd love to hear about it.
      </p>
    </div>
  </section>

  <!-- ── Contact Layout ── -->
  <div class="container">
    <div class="contact-layout">

      <!-- ── Info Sidebar ── -->
      <aside class="contact-info" aria-label="Contact information">
        <div>
          <h2 class="contact-info-title">Get In Touch</h2>
          <p class="contact-info-desc">
            Response time is usually within 24 hours on weekdays. Every message is read personally — no bots.
          </p>
        </div>

        <div class="contact-details">
          <div class="contact-detail-item">
            <div class="contact-detail-icon" aria-hidden="true">📍</div>
            <div>
              <div class="contact-detail-label">Location</div>
              <div class="contact-detail-text">Portland, Oregon, USA</div>
            </div>
          </div>
          <div class="contact-detail-item">
            <div class="contact-detail-icon" aria-hidden="true">📧</div>
            <div>
              <div class="contact-detail-label">Email</div>
              <div class="contact-detail-text">hello@jordan.dev</div>
            </div>
          </div>
          <div class="contact-detail-item">
            <div class="contact-detail-icon" aria-hidden="true">⏰</div>
            <div>
              <div class="contact-detail-label">Timezone</div>
              <div class="contact-detail-text">Pacific Time (PT) — UTC−7</div>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="social-links-section">
          <span class="social-links-label" id="social-links-label">Find me online</span>
          <div class="social-links" aria-labelledby="social-links-label">

            <a href="#" class="social-link" aria-label="View GitHub profile" rel="noopener noreferrer" target="_blank">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>

            <a href="#" class="social-link" aria-label="View LinkedIn profile" rel="noopener noreferrer" target="_blank">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>

            <a href="#" class="social-link" aria-label="View Twitter / X profile" rel="noopener noreferrer" target="_blank">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter / X
            </a>

          </div>
        </div>
      </aside>

      <!-- ── Contact Form ── -->
      <div class="contact-form-wrapper" role="region" aria-labelledby="form-heading">
        <h2 class="form-heading" id="form-heading">Send a Message</h2>

        {#if !submitted}
          <form class="contact-form" id="contactForm" novalidate aria-label="Contact form" on:submit={handleSubmit}>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="firstName">
                  First Name <span class="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text" id="firstName" name="firstName"
                  class="form-input"
                  class:error={fieldErrors.firstName}
                  placeholder="Jordan"
                  autocomplete="given-name"
                  required
                  aria-required="true"
                  aria-describedby="firstNameError"
                  aria-invalid={fieldErrors.firstName ? 'true' : undefined}
                  bind:value={form.firstName}
                  on:blur={() => touch('firstName')}
                />
                <span class="form-error" class:visible={fieldErrors.firstName} id="firstNameError" role="alert">
                  Please enter your first name.
                </span>
              </div>
              <div class="form-group">
                <label class="form-label" for="lastName">
                  Last Name <span class="required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text" id="lastName" name="lastName"
                  class="form-input"
                  class:error={fieldErrors.lastName}
                  placeholder="Smith"
                  autocomplete="family-name"
                  required
                  aria-required="true"
                  aria-describedby="lastNameError"
                  aria-invalid={fieldErrors.lastName ? 'true' : undefined}
                  bind:value={form.lastName}
                  on:blur={() => touch('lastName')}
                />
                <span class="form-error" class:visible={fieldErrors.lastName} id="lastNameError" role="alert">
                  Please enter your last name.
                </span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">
                Email Address <span class="required" aria-hidden="true">*</span>
              </label>
              <input
                type="email" id="email" name="email"
                class="form-input"
                class:error={fieldErrors.email}
                placeholder="you@example.com"
                autocomplete="email"
                required
                aria-required="true"
                aria-describedby="emailError"
                aria-invalid={fieldErrors.email ? 'true' : undefined}
                bind:value={form.email}
                on:blur={() => touch('email')}
              />
              <span class="form-error" class:visible={fieldErrors.email} id="emailError" role="alert">
                Please enter a valid email address.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="subject">
                Subject <span class="required" aria-hidden="true">*</span>
              </label>
              <select
                id="subject" name="subject"
                class="form-select"
                class:error={fieldErrors.subject}
                required
                aria-required="true"
                aria-describedby="subjectError"
                aria-invalid={fieldErrors.subject ? 'true' : undefined}
                bind:value={form.subject}
                on:blur={() => touch('subject')}
              >
                <option value="" disabled>Select a topic…</option>
                <option value="job">Job Opportunity</option>
                <option value="freelance">Freelance / Contract Work</option>
                <option value="consulting">Technical Consulting</option>
                <option value="blog">Blog Feedback</option>
                <option value="other">Just Saying Hi</option>
              </select>
              <span class="form-error" class:visible={fieldErrors.subject} id="subjectError" role="alert">
                Please select a subject.
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">
                Message <span class="required" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message" name="message"
                class="form-textarea"
                class:error={fieldErrors.message}
                placeholder="Tell me about your project, role, or question…"
                required
                aria-required="true"
                minlength="20"
                aria-describedby="messageError"
                aria-invalid={fieldErrors.message ? 'true' : undefined}
                bind:value={form.message}
                on:blur={() => touch('message')}
              ></textarea>
              <span class="form-error" class:visible={fieldErrors.message} id="messageError" role="alert">
                Message must be at least 20 characters.
              </span>
            </div>

            <button type="submit" class="btn-submit" disabled={submitting}>
              {#if submitting}
                <svg class="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path stroke-opacity=".3" d="M12 2a10 10 0 1 0 10 10"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                </svg>
                Sending…
              {:else}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Send Message
              {/if}
            </button>

          </form>
        {:else}
          <!-- Success State -->
          <div class="form-success visible" aria-live="assertive" role="status">
            <div class="success-icon" aria-hidden="true">✉️</div>
            <h3 class="success-title">Message Sent!</h3>
            <p class="success-desc">Thanks for reaching out. I'll get back to you within 24 hours.</p>
            <button class="btn btn-outline" on:click={resetForm} style="margin-top: 0.5rem;">
              Send Another Message
            </button>
          </div>
        {/if}
      </div>

    </div>
  </div>
</main>
