# Modern responsive feed

## Goal

Make Snapgram feel current, youthful, and professional while keeping the
existing Appwrite data model and routes. The primary experience is mobile;
large screens gain a calm, productive three-column composition.

## Product and visual direction

- Use a layered charcoal surface instead of large areas of pure black.
- Keep violet as the brand action color and pair it with a restrained cyan
  highlight. Colour is never the only state indicator.
- Use a rounded, editorial card system: clear author metadata, readable
  captions, generous image space, and obvious primary actions.
- Preserve the existing dark theme, logo, routes, and supported post actions.

## Responsive shell

| Viewport | Navigation | Content |
| --- | --- | --- |
| Under 768px | Compact top bar and fixed bottom navigation with safe-area padding | Feed has 16px gutters; post cards and controls use 44px touch targets. |
| 768px–1279px | Collapsed icon sidebar | Feed is centred and capped at 680px. |
| 1280px and up | Full sidebar plus an optional lightweight discovery rail | Feed remains capped at 680px so reading lines and images stay intentional. |

The application shell uses `min-h-dvh`, reserves room for the mobile bottom
bar, and lets the main content area scroll independently. The desktop sidebar
remains visible without taking excess horizontal space.

## Feed and post cards

- Home switches from one fixed 20-item fetch to the existing cursor-driven
  infinite-query pattern, with an Intersection Observer sentinel and a clear
  loading/end state.
- A card uses a consistent image aspect ratio and explicit width/height
  dimensions. Images lazy-load below the fold and decode asynchronously.
- Image URLs request a display-sized Appwrite preview when supported, reducing
  transfer cost. The original remains available for detail views.
- Post actions receive accessible labels, clear hover/focus states, and
  optimistic local cache updates for likes and saves.
- Empty and error states give a practical next action instead of an empty page.

## Data and performance

- Use cursor pagination with a small page size for Home and Explore.
- Give stable read queries a sensible `staleTime` so navigating back does not
  immediately refetch identical content.
- Replace broad invalidation after like/save with targeted cache updates;
  invalidate only where a mutation cannot be represented locally.
- Apply `Query.limit` to user posts and search. Follow-on pagination can reuse
  the same cursor strategy once those views need it.
- Fix storage bucket usage so file deletion targets the configured bucket.

## Boundaries and files

- `globals.css` owns tokens, responsive layout primitives, and component
  styles; it does not own data behavior.
- `RootLayout`, `LeftSidebar`, `Topbar`, and `Bottombar` own navigation layout.
- `Home` owns feed pagination UI; `PostCard` owns post presentation and image
  rendering.
- `queriesAndMutation.ts` owns cache policies and mutation cache updates;
  `api.ts` owns Appwrite query and storage calls.

## Quality checks

Run lint and production build. Add focused tests for any extracted pure cache
or image-url helpers. Validate the Home screen at 360px, 768px, 1024px, and
1440px with keyboard navigation and reduced-motion-safe transitions.

## Git workflow

Every task starts from the latest `main` in a named branch. Work is committed
and pushed to its branch, verified, then merged into `main`; the merged main
branch is verified and pushed. This task uses `feat/modern-responsive-feed`.
