# Creator Studio App Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all remaining Snapgram routes into a responsive Creator Studio experience.

**Architecture:** Keep routes, query hooks, and Appwrite operations unchanged. Introduce shared CSS page primitives and apply them to discovery, identity, and access route groups, with each group shipping independently.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, TanStack Query, Appwrite, Lucide React, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-03-creator-studio-app-redesign.md`

## Global Constraints

- Preserve all existing routes, data contracts, and Appwrite calls.
- Use the midnight/electric-blue/mint design system and safe bottom padding.
- Add no runtime dependencies.
- Respect `prefers-reduced-motion` and retain keyboard-visible focus states.

## Review Focus

- Empty search and saved views must have a useful route forward.
- Image grids must not overflow at 360px, tablet, or desktop widths.
- Edit/Profile controls must remain accessible and visible above mobile navigation.
- Auth validation and password visibility controls must preserve their current behavior.
- Page redesign must not trigger additional API requests.

### Task 1: Shared discovery primitives and Explore/Saved

**Files:**
- Modify: `src/globals.css`, `src/_root/pages/Explore.tsx`, `src/_root/pages/Saved.tsx`, `src/components/shared/SearchResult.tsx`, `src/components/shared/GridPostList.tsx`

**Interfaces:**
- Consumes: existing `useGetPosts`, `useSearchPosts`, `useGetCurrentUser`, and `GridPostList` APIs.
- Produces: consistent page headings, search, empty/error states, and responsive media grids.

- [ ] Add failing unit coverage for any extracted pure grid/image aspect helper.
- [ ] Verify the test fails before implementation.
- [ ] Add shared page and empty-state primitives; apply Creator Studio layout to Explore and Saved.
- [ ] Make GridPostList responsive without changing its public props.
- [ ] Verify tests, lint, and production build.
- [ ] Commit Discovery redesign.

### Task 2: Identity pages and media detail

**Files:**
- Modify: `src/_root/pages/Profile.tsx`, `src/_root/pages/UpdateProfile.tsx`, `src/_root/pages/PostDetail.tsx`, `src/_root/pages/EditPost.tsx`, `src/globals.css`

**Interfaces:**
- Consumes: existing profile/post query and mutation hooks.
- Produces: shared identity headers, settings panels, post detail actions, and responsive media layout.

- [ ] Add failing coverage for any extracted pure identity presentation helper.
- [ ] Verify the test fails before implementation.
- [ ] Apply the shared layout primitives while preserving edit/follow/delete behavior.
- [ ] Verify mobile safe padding and desktop columns manually at 360px, 768px, and 1440px.
- [ ] Verify tests, lint, and production build.
- [ ] Commit Identity redesign.

### Task 3: Auth experience

**Files:**
- Modify: `src/_auth/AuthLayout.tsx`, `src/_auth/forms/SigninForm.tsx`, `src/_auth/forms/SignupForm.tsx`, `src/globals.css`

**Interfaces:**
- Consumes: existing authentication validation and mutation hooks.
- Produces: branded responsive auth shell without changing submit behavior.

- [ ] Add failing coverage for any extracted auth presentation helper.
- [ ] Verify the test fails before implementation.
- [ ] Apply branded auth panels, form spacing, and accessible password-control states.
- [ ] Verify sign-in/sign-up form fields and navigation remain unchanged.
- [ ] Verify tests, lint, and production build.
- [ ] Commit Auth redesign.

## Self-review

Task 1 covers discovery and empty states, Task 2 covers identity and media detail, and Task 3 covers authentication. Every spec route is assigned to one task; unchanged query/mutation boundaries prevent new API behavior.
