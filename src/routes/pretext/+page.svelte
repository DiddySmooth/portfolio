<script lang="ts">
  import { onMount } from 'svelte';
  import { prepare, layout, type PreparedText } from '@chenglou/pretext';

  let text = 'Pretext measures multiline text without touching the DOM. Resize the width and see the line count and height update.';
  let fontSize = 16;
  let lineHeight = 24;
  let containerWidth = 360;

  let prepared: PreparedText | null = null;
  let lineCount = 0;
  let height = 0;

  function recompute() {
    if (typeof window === 'undefined') return;

    const font = `${fontSize}px Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    prepared = prepare(text, font);
    const result = layout(prepared, containerWidth, lineHeight);
    lineCount = result.lineCount;
    height = result.height;
  }

  onMount(() => {
    recompute();
  });

  $: recompute();
</script>

<svelte:head>
  <title>Pretext Demo</title>
  <meta name="description" content="Small Pretext demo to experiment with text measurement and layout." />
</svelte:head>

<section class="page pretext-page">
  <header class="page-header">
    <h1>Pretext Playground</h1>
    <p class="lede">
      Experiment with <code>@chenglou/pretext</code> by measuring multiline text without DOM reads. Adjust the text and
      layout controls to see how the height and line count change.
    </p>
  </header>

  <div class="grid">
    <div class="panel">
      <h2>Input</h2>
      <label class="field">
        <span>Text</span>
        <textarea bind:value={text} rows="6" />
      </label>

      <div class="field-row">
        <label class="field">
          <span>Font size (px)</span>
          <input type="number" min="10" max="40" bind:value={fontSize} />
        </label>
        <label class="field">
          <span>Line height (px)</span>
          <input type="number" min="12" max="60" bind:value={lineHeight} />
        </label>
      </div>

      <label class="field">
        <span>Container width (px)</span>
        <input type="range" min="200" max="600" step="10" bind:value={containerWidth} />
        <span class="range-value">{containerWidth}px</span>
      </label>
    </div>

    <div class="panel">
      <h2>Measured layout</h2>
      <div class="stats">
        <div><strong>Lines:</strong> {lineCount}</div>
        <div><strong>Height:</strong> {height}px</div>
      </div>

      <div class="preview-wrapper">
        <div
          class="preview-box"
          style={`width: ${containerWidth}px; line-height: ${lineHeight}px; font-size: ${fontSize}px; height: ${height}px;`}
        >
          {text}
        </div>
      </div>

      <p class="note">
        The box height is driven by Pretext&apos;s <code>layout()</code> result, so adding more text or shrinking the width
        increases the measured height without relying on <code>getBoundingClientRect()</code>.
      </p>
    </div>
  </div>
</section>

<style>
  .pretext-page {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem 1.25rem 3rem;
  }

  .page-header h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .page-header .lede {
    margin: 0;
    color: var(--text-muted, #666);
    max-width: 46rem;
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 1.75rem;
    margin-top: 2rem;
  }

  .panel {
    border-radius: 0.75rem;
    padding: 1.5rem;
    background: var(--panel-bg, #101828);
    color: inherit;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.26);
  }

  .panel h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .field-row {
    display: flex;
    gap: 1rem;
  }

  textarea,
  input[type='number'],
  input[type='range'] {
    font: inherit;
  }

  textarea,
  input[type='number'] {
    border-radius: 0.5rem;
    border: 1px solid rgba(148, 163, 184, 0.6);
    padding: 0.5rem 0.75rem;
    background: rgba(15, 23, 42, 0.8);
    color: inherit;
    resize: vertical;
  }

  textarea:focus,
  input[type='number']:focus {
    outline: 2px solid #38bdf8;
    outline-offset: 1px;
    border-color: transparent;
  }

  input[type='range'] {
    width: 100%;
  }

  .range-value {
    font-size: 0.8rem;
    color: var(--text-muted, #9ca3af);
  }

  .stats {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .preview-wrapper {
    border-radius: 0.75rem;
    background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.16), transparent 60%),
      radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.14), transparent 60%);
    padding: 1.25rem;
  }

  .preview-box {
    border-radius: 0.5rem;
    padding: 0.75rem 0.9rem;
    background: rgba(15, 23, 42, 0.96);
    border: 1px solid rgba(148, 163, 184, 0.45);
    overflow: hidden;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .note {
    margin-top: 0.9rem;
    font-size: 0.8rem;
    color: var(--text-muted, #9ca3af);
  }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    font-size: 0.85em;
  }

  @media (max-width: 780px) {
    .grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
