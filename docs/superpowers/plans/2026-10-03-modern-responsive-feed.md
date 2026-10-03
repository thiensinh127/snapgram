# Modern Responsive Feed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a modern mobile-first Snapgram feed with responsive navigation and leaner post loading.

**Architecture:** Keep Appwrite boundaries intact. The existing query layer gains cursor pagination and cache policies; the shared shell and cards receive token-driven responsive styling. A small pure image helper owns Appwrite preview URLs.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, TanStack Query v5, Appwrite, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-03-modern-responsive-feed-design.md`

## Global Constraints

- Preserve existing routes, Appwrite data model, dark theme, and post actions.
- Make mobile the primary layout, with tablet and desktop enhancements at 768px and 1280px.
- Do not add runtime dependencies; Vitest is development-only.
- Keep every interactive control keyboard-accessible with visible focus styling.

## Review Focus

- An Appwrite URL that already has query parameters must retain them when image dimensions are added.
- The feed must stop requesting pages after an empty Appwrite page.
- A 360px viewport must not hide feed actions behind the bottom navigation.
- Like/save updates must not erase cached pages that do not contain the mutated post.
- A failed feed query must offer a retry path rather than an indefinitely blank screen.

### Task 1: Query and image primitives

**Files:**
- Create: `src/lib/images.ts`, `src/lib/images.test.ts`
- Modify: `src/lib/appwrite/api.ts`, `src/lib/react-query/queriesAndMutation.ts`, `package.json`

**Interfaces:**
- Produces: `getPostImageUrl(url: string, width: number): string` for post rendering.
- Produces: `useGetHomePosts()` cursor-backed infinite query for `Home`.

- [ ] Write failing Vitest cases for preview URL dimensions and existing query strings.
- [ ] Run the image test and verify it fails because the helper is missing.
- [ ] Implement `getPostImageUrl` with `URL`/`URLSearchParams`; add Vitest and a `test` script.
- [ ] Run the image test and verify it passes.
- [ ] Change Home fetching to a 10-item cursor query and give stable read queries a five-minute stale time.
- [ ] Commit query and image primitives.

### Task 2: Responsive shell and feed presentation

**Files:**
- Modify: `src/globals.css`, `src/_root/RootLayout.tsx`, `src/components/shared/LeftSidebar.tsx`, `src/components/shared/Topbar.tsx`, `src/components/shared/Bottombar.tsx`, `src/_root/pages/Home.tsx`, `src/components/shared/PostCard.tsx`

**Interfaces:**
- Consumes: `useGetHomePosts()` and `getPostImageUrl()` from Task 1.
- Produces: responsive Home UI with loading, empty, error, and end states.

- [ ] Add a failing component test covering the Home error retry affordance.
- [ ] Run the test and verify it fails before the error state exists.
- [ ] Implement responsive shell tokens and mobile safe-area spacing.
- [ ] Replace the Home fixed list with the infinite feed and observer sentinel.
- [ ] Update PostCard image dimensions, async decoding, preview URL, and accessible action labels.
- [ ] Run component and image tests; run lint and build.
- [ ] Commit responsive UI.

### Task 3: Mutation cache scope and production verification

**Files:**
- Modify: `src/lib/react-query/queriesAndMutation.ts`, `src/components/shared/PostStarts.tsx`

**Interfaces:**
- Consumes: query cache layouts from Task 1.
- Produces: targeted mutation refreshes without broad feed invalidation.

- [ ] Add a failing unit test for updating only cached documents with the mutated post ID.
- [ ] Run the test and verify it fails before the cache helper exists.
- [ ] Implement the minimal shared cache-update helper and use it for like/save mutations.
- [ ] Run the full test suite, lint, and production build.
- [ ] Inspect the responsive Home screen at 360px, 768px, 1024px, and 1440px.
- [ ] Commit verified performance and cache improvements.

## Self-review

Task 1 covers preview URL correctness and pagination primitives; Task 2 covers responsive composition and user-visible feedback; Task 3 limits mutation refresh scope. The plan preserves all existing data boundaries and only adds Vitest as a development dependency. The five review-focus risks each map to a task test or viewport check.
