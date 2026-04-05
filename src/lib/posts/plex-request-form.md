---

title: "Building a Self-Hosted Plex Request App (Angular + Node/Express + Sequelize + Discord)"
date: "2026-03-31"
category: tutorials
tags: angular node express sequelize plex google-oauth discord tmdb rest-api rxjs
template: post
excerpt: "A full walkthrough of my self-hosted Plex request app — Angular 17 frontend, Node/Express backend, Sequelize models, Discord notifications, TMDB search, and a cached recently-added feed."
readTime: 15 min read
---

Managing Plex requests through Discord or group chats falls apart quickly — messages get buried, duplicates happen, and nobody knows what’s already downloading or done.

I wanted something better:

* A **request queue** with status tracking
* **Upvotes** so people can signal interest
* **Discord notifications** when things change
* A **live “recently added” gallery** from Plex

So I built a full-stack app:

* **Frontend:** Angular 17 (standalone components, no state library)
* **Backend:** Node.js + Express + Sequelize
* **Integrations:** Google OAuth, Discord bot, TMDB API, Plex API

This post combines both sides into one cohesive system.

---

## High-Level Architecture

```
Angular SPA (Frontend)
  ├── Google OAuth login
  ├── Request form + gallery
  ├── Recently Added UI
  └── Discord setup flow
            │
            ▼
Node.js / Express API (Backend)
  ├── Request CRUD + voting
  ├── User management
  ├── TMDB proxy search
  ├── Plex recently-added cache
  └── Discord bot integration
            │
            ▼
Database (Sequelize ORM)
  ├── Requests
  ├── Users
  ├── Votes
  └── RecentlyAdded cache
```

---

# Frontend (Angular 17)

## Project Structure

```
app/
  components/
  pages/
  services/
  models/
  environments/
```

Everything is **standalone components** — no shared NgModules. Imports are explicit, which keeps things clean and predictable.

---

## Authentication: Google One Tap

There’s no backend session. Authentication is handled entirely on the client:

```ts
google.accounts.id.initialize({
  client_id: 'your-client-id',
  callback: this.handleLogin.bind(this)
});
```

On login:

* Decode JWT with `jwt-decode`
* Store user info in `localStorage`
* Persist `userId` (`sub`) for API calls

```ts
const decoded = jwtDecode(response.credential);
localStorage.setItem('userId', decoded.sub);
```

The backend trusts this identity (more on that later).

---

## Route Guards

Two layers:

### 1. `authGuard`

* Ensures user exists in `localStorage`
* Rehydrates session after refresh

### 2. `discordSetupGuard`

* Calls backend every navigation
* Ensures user has linked Discord

```ts
canActivate: [authGuard, discordSetupGuard]
```

This guarantees:

* You’re logged in
* You’ve completed Discord setup

---

## Request Form (Reactive + Live Search)

Uses `ReactiveFormsModule` with RxJS:

```ts
this.ticketForm.get('title')?.valueChanges.pipe(
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(term => this.requestService.searchTitle(term))
)
```

### Key details:

* `switchMap` cancels stale requests
* Debounced input prevents API spam
* `skipSearch` avoids overwriting selected results

### Conditional validation:

* `seasons` required only for TV/Anime

---

## Request Gallery (Admin vs User)

Same component, different behavior:

```html
<ng-container *ngIf="isAdmin; else statusText">
  <select [(ngModel)]="request.status" (ngModelChange)="updateStatus(...)">
```

### Admin:

* Inline status dropdown
* Immediate persistence

### User:

* Read-only status

### Upvotes:

* Optimistic update from API response
* No full refetch

---

## Recently Added (Client-Side Pagination)

* Fetch once from backend
* Slice locally into pages of 50

```ts
loadMoreItems() {
  this.visibleItems = this.allItems.slice(0, this.currentIndex + 50);
}
```

### Memory safety:

```ts
takeUntil(this.destroy$)
```

Prevents leaks when navigating away.

---

## Discord Setup Flow

First-time users:

1. Enter Discord username
2. Backend resolves to Discord ID
3. Stored in DB

This enables:

* Direct DM notifications later

Guard enforces this as mandatory.

---

## Service Layer

### `RequestService`

* Requests CRUD
* Upvotes
* TMDB search

### `UserService`

* Auth state via `BehaviorSubject`
* User profile + Discord linking

### `PlexService`

* Recently added + history
* Normalized error handling

---

# Backend (Node.js + Express)

## Project Structure

```
routes/
controllers/
models/
services/
```

Mounted routes:

```
/request
/request-user
/recently-added
```

---

## Data Model (Sequelize)

### Requests

* `title`, `format`, `status`
* `notes`, `devNotes`
* `userId`

### Users

* Google identity (`sub`, `email`, etc.)
* `discordId`

### Votes

* `requestId`
* `userId`

### RecentlyAdded

* Cached Plex metadata

---

## Requests API

### Routes

```
GET    /request
POST   /request/create
PATCH  /request/:id/status
POST   /request/:id/upvote
GET    /request/search/:term
DELETE /request/:id
```

---

## Creating Requests

```js
await models.Requests.create(requestData);
```

Then notify admin via Discord:

```js
await discordService.sendDirectMessage(adminId, message);
```

---

## Fetching Requests (Enriched)

Single query returns:

* User info
* Upvote count
* `hasVoted` boolean

This avoids multiple API calls on the frontend.

---

## Status Updates

```js
await request.update({ status });
```

If user has Discord linked:

```js
await discordService.notifyRequestUpdate(...)
```

---

## Upvotes (Deduplicated)

```js
if (existingVote) return 400;
```

Then:

* Insert vote
* Return updated count

---

## TMDB Search Proxy

```js
GET /request/search/:term
```

* Calls TMDB
* Returns raw results

Frontend decides how to render.

---

## User System (Google → App → Discord)

### Create user

```
POST /request-user/create
```

### Fetch user

```
GET /request-user/user/:email
```

### Discord linking:

* Resolve username → Discord ID
* Store for notifications

---

## Plex “Recently Added” Cache

### Endpoint

```
GET /recently-added
```

### Behavior:

* Localhost → can trigger refresh
* Production → read cache only

---

## Sync Strategy

1. Try:

```
/library/recentlyAdded
```

2. Fallback:

```
/library/sections/{key}/recentlyAdded
```

---

## Normalization

Each item:

* Title cleanup (e.g. seasons)
* Image → base64
* Stored via `upsert`

Cleanup:

* Remove items older than 14 days

---

## Response Format

```json
{
  "MediaContainer": {
    "Metadata": [],
    "size": 50
  }
}
```

Matches Plex format → frontend reuse.

---

## Discord Integration

Single `discord.js` client:

### Features:

* Find user by username
* Send DMs
* Notify status changes

### Used for:

* New request alerts (admin)
* Status updates (users)

---

# What I’d Improve

## Backend

### 1. Hardcoded Admin

* Move to roles system

### 2. No Auth Layer

* Add JWT verification
* Prevent spoofing

### 3. TMDB Key in Source

* Move to env config

### 4. Discord Guild Assumption

* Explicit guild config

---

## Frontend

### 1. LocalStorage Identity

* Centralize in `UserService`

### 2. Admin Check

* Replace email check with roles

---

# Final Thoughts

This project hits a sweet spot:

* **Simple enough** for a home server
* **Powerful enough** to replace messy group chats
* **Flexible enough** to extend later

The key design decisions that made it work well:

* Keep backend **thin and focused**
* Push UI complexity to Angular
* Cache anything expensive (Plex)
* Use Discord for **real-time UX without extra UI work**

If you’re running Plex for friends or family, this kind of system dramatically improves the experience — both for you and for everyone requesting content.

---

If you want, I can help you:

* Add **role-based auth properly**
* Dockerize the whole stack
* Add **Sonarr/Radarr auto-download integration**
* Or turn this into a **public SaaS-style app**

Just tell me 👍
