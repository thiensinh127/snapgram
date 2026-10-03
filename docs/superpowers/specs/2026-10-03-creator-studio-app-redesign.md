# Creator Studio app redesign

## Goal

Give every Snapgram route a coherent Creator Studio experience: modern,
professional, image-led, responsive, and accessible, while preserving every
existing Appwrite schema, route, and data operation.

## Visual system

- Background: `#080B14`; elevated surfaces: `#111827` and `#182238`.
- Primary actions: electric blue `#5B8CFF`, hover `#3D6FE8`; secondary accent:
  mint `#2DD4BF`.
- Text uses `#F8FAFC`, supporting text `#A8B4CC`, and visible focus rings.
- Reusable primitives provide page framing, headers, content panels, tabs,
  empty states, input panels, and media grids.
- Motion is short and purposeful (entrance, reveal, interaction feedback) and
  disabled for `prefers-reduced-motion`.

## Responsive shell

- Mobile uses the existing compact topbar and floating dock, with safe bottom
  padding on every scrollable page.
- Tablet uses an icon sidebar. Desktop expands it to a labelled sidebar.
- Content has route-specific max widths; grids change columns without creating
  horizontal overflow or covering action controls.

## Discovery: Explore and Saved

- Explore gains a creator-style heading, focused search panel, and responsive
  media grid with consistent image ratios.
- Search, loading, empty, and error states share the same presentation.
- Saved shows an item count, a clear saved-media grid, and an empty state that
  links to Explore.

## Identity: Profile, profile editing, post detail, and post editing

- Profile uses a structured identity header, compact statistics, clear tabs,
  and a responsive media gallery.
- Update Profile follows the Creator Studio form panel pattern, with a visible
  avatar uploader and grouped fields.
- Post Detail emphasizes media and author context; its action bar and metadata
  match feed cards.
- Edit Post reuses the Create Post studio pattern and preserves all existing
  submit/cancel behavior.

## Access: Sign in and Sign up

- Desktop auth uses a branded visual panel plus a focused form panel.
- Mobile uses a single readable column with the same fields and validation.
- No authentication flow, field, or Appwrite call changes.

## States and performance

- Each redesigned route provides usable loading, empty, and error feedback.
- Images preserve a fixed responsive aspect ratio and lazy-load when below the
  fold.
- No runtime dependencies are added. Existing React Query data boundaries and
  Appwrite APIs remain unchanged.

## Delivery

1. Discovery: Explore and Saved.
2. Identity: Profile, Update Profile, Post Detail, and Edit Post.
3. Access: Sign in and Sign up.

Each delivery group uses its own branch from the current `main`, runs tests,
lint, and production build, then is committed, pushed, and merged to `main`.
