---
title: "Wyrmdle: A Daily Character-Guessing Game for Fantasy Readers"
date: "2026-08-04"
category: devlog
tags: svelte python azure cloudflare static-site epub nlp serverless
excerpt: "Wordle clones live and die by their clue mechanic. Wyrmdle's is one I hadn't seen done: the most-mentioned character names in a real book, counted straight from the text. A look at the no-backend architecture, the epub-parsing pipeline, and everything that fought back along the way."
readTime: 9 min read
---

**Live at [wyrmdle.com](https://wyrmdle.com)** · Svelte, Python, Azure, and roughly $10 a year in running costs.

## The idea

Wordle clones live and die by their clue mechanic. Wyrmdle's clue is one I hadn't seen done: the most-mentioned character names in a book, counted from the actual text. Each day there's a secret fantasy novel. You start with one name, and it's deliberately the least famous of the top six (the obscure sidekick, not the hero). Every wrong guess or skip reveals the next most-mentioned character, climbing toward the protagonist, along with a metadata hint: publication year, series status, the author's initials, the title's first letter. Six guesses, a shareable emoji grid, streaks, an archive of past days, and a "you beat 67% of today's readers" distribution when you finish.

The counts are real. I own the books as epubs, and a local pipeline reads them, counts the names, and publishes only the derived data. The text itself never leaves my machine, which is what makes the project copyright-comfortable: a list of character names with frequencies is trivia about a book, not the book.

---

## Architecture: aggressively no-backend

The whole system is three pieces, and only one of them is ever running for me:

- A static Svelte app served from Azure Blob Storage's static-website mode, behind Cloudflare's free tier for HTTPS and caching.
- A local Python toolchain (CLI plus a point-and-click admin panel) that turns epubs into puzzle JSON and uploads it to the same storage container.
- One tiny Azure Function whose only job is incrementing the daily guess-distribution stats, because a static page cannot safely do "+1" to a shared counter.

The frontend fetches `puzzles/<date>.json` for the day, `index.json` for the archive, and `books.json` for the guess autocomplete. Game state, streaks, and history live in `localStorage`. There are no accounts, no database, no servers to patch. Anyone curious enough to open dev tools can read today's answer, and I decided early that I genuinely do not care: it's a game about book love, not anti-cheat engineering.

---

## Tech choices, and why

### Svelte + Vite, not SvelteKit, not React

The game is one screen of highly interactive state, which is Svelte's sweet spot. It compiles away, so the bundle stays small, and there's no server-side anything, so SvelteKit's routing, SSR, and endpoints would all have been turned off. Plain Vite + Svelte builds to static files that upload anywhere.

### Python for the pipeline

An epub is a zip of HTML, so extraction is `zipfile` plus BeautifulSoup. The interesting part is deciding which capitalized words are character names. The heuristic that works: a real name appears capitalized mid-sentence far more often than it ever appears lowercase, while ordinary words that merely start sentences fail that ratio. Add a stopword list for honorifics and you get a shockingly clean top-15 from a novel.

Two things still need a human: fictional world-terms ("House", "Mars" in *Red Rising* rank like characters), and first-person narrators, whose names barely appear in their own books. Darrow is the eleventh most-mentioned name in *Red Rising* because he spends the book saying "I". So the tool ends every ingest with a review step: merge aliases, delete non-characters, and drag the narrator up to the protagonist slot, because row order is the reveal order.

### A local web admin panel over a CLI

The CLI came first, but the daily workflow (drop epub, tidy names, pick a date, publish) wanted buttons. The panel is a single HTML page served by Python's standard-library HTTP server on localhost: no framework, no new dependencies, and the browser does the UI work. It also autofills book metadata from the epub's own OPF manifest (title, author, year, even Calibre series tags) with an Open Library lookup as backup.

### Azure Blob static hosting

I already had Azure. Static-website mode serves the site and the data from the same origin (no CORS), costs pennies, and the publish step is just uploading JSON with the storage SDK. The custom domain works through Cloudflare's free proxy, which also terminates HTTPS; Azure validates domain ownership through an `asverify` CNAME since the proxy hides the direct record.

### One serverless function for community stats

Players' browsers POST an anonymous `{date, result}` when they finish. The function reads the day's stats JSON, adds one, and writes it back with an ETag precondition in a retry loop, so two simultaneous finishes never lose a count. Reads cost nothing: the stats file lands in the same static container the site already serves. The free grant on consumption plans makes this effectively $0.

### Design: a library ledger, not a web app

The visual language is ink on parchment: EB Garamond for anything bookish, hairline-ruled rows instead of rounded cards, hints rendered as italic marginalia, letterpress-style buttons, and a bibliographic answer line ("Pierce Brown, 2014. Red Rising Saga, book 1."). The goal was for the page to feel typeset rather than templated.

---

## Things that fought back

Every project has a war-story section. Mine, in order of hair loss:

- **Curly apostrophes.** The name extractor's stopword list had `i'm` with a straight apostrophe. Real epubs use `’`. "I'm" was briefly the second most-mentioned character in *Red Rising*.
- **PowerShell's `Compress-Archive` writes backslash paths into zips.** Linux cannot extract that layout, which silently bricked the Azure Function deployment. Zips bound for Linux get built with Python's `zipfile` now.
- **Linux consumption Function Apps simply would not start** in my subscription and region: endless 503s, zero telemetry, even on a pristine app with a known-good package. The same code deployed to a Windows consumption plan on the first try. Sometimes the fix is changing the question.
- **Windows shells split URLs on `&`.** Passing a SAS URL as an app setting through the `az` CLI shredded it into fragments at every ampersand. The setting ended up going through the ARM REST API from Python instead.

---

## The numbers

Storage plus bandwidth rounds to pennies per month at hobby scale. The function lives inside the free grant. The domain is about $10 a year. Revenue-wise it's a hobby with beer money ambitions: an Amazon affiliate "get this book" link on the result screen (which genuinely helps players who just lost to a book they now want to read) and an AdSense slot.

## Stack Summary

| Layer | Tool |
|---|---|
| Frontend | Svelte + Vite (static build, no SvelteKit) |
| Puzzle pipeline | Python, zipfile, BeautifulSoup |
| Admin panel | Python stdlib HTTP server, plain HTML |
| Hosting | Azure Blob Storage (static website) |
| CDN / HTTPS | Cloudflare (free tier) |
| Stats counter | Azure Function, ETag-guarded read/write |
| Running cost | ~$10/year (domain), storage + function within free tiers |

---

## What I'd tell someone building their own -dle

Make the daily loop frictionless and the share grid spoiler-free; those two things are the whole growth engine. Keep the answer client-side and stop worrying about cheaters. And pick a clue mechanic that rewards the superfans: watching someone identify *Red Rising* from "Titus, 188 mentions" in one guess is exactly the kind of flex that makes people send the link to a friend.
