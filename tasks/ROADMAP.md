# 🗺️ Roadmap

Project roadmap for **festiVAL**. Organized by implementation phases, with priorities and dependency tracking.

---

## 1. MVP Informative

**Status**: Core MVP phase. Foundation for all subsequent phases.

- Festival catalog — Complete data model with slug, name, genres, prices, line-up.
- Search — Client-side fuzzy search (MiniSearch) by festival name and headliners.
- Filters — Province, month, genre, price range. Persistent state via signals.
- Festival detail pages — Individual festival fiches with map, full line-up, official links.
- No authentication — Public information portal; login deferred to Phase 3.

**Acceptance criteria**:
- All 6+ festivals from initial catalogue are discoverable and searchable.
- Detail pages render correctly on mobile (320 px), tablet (768 px), and desktop (1024+ px).
- SSR pre-renders all SEO-critical routes (`/`, `/festivales`, `/festivales/:slug`).
- LCP < 2.5s, CLS < 0.1 on Core Web Vitals.

---

## 2. Personalization

**Status**: Roadmap. Depends on Phase 1 completion.

- Persistent favorites — `idb-keyval` for offline-capable bookmark storage.
- Advanced dark mode — Theme toggle with localStorage persistence. Light mode out of scope (Premium dark only in Phase 2).
- Installable PWA — `@angular/service-worker` with offline fallback and install prompt.

**Acceptance criteria**:
- Favorites persisted across sessions and devices (via IDB).
- Theme toggle works on all routes without page reload.
- PWA installs on Android and iOS; offline browsing of cached routes.

---

## 3. User Accounts

**Status**: Roadmap. Depends on Phase 1 + Phase 2.

- Registration — Email/password signup with email verification.
- Login — Session management via Supabase Auth or Better Auth.
- Ratings — Festival and artist ratings (1–5 stars, persistent per user).
- Comments — User comments on festival and artist pages (moderation roadmap).

**Decisions deferred**:
- Auth backend: Supabase Auth vs. Better Auth vs. custom. Evaluate when Phase 3 starts.
- Moderation tooling: Manual review vs. automated flags. Roadmap for later.

---

## 4. Integrations

**Status**: Roadmap. Depends on Phase 1 completion.

- Spotify artist previews — Listen to top tracks of headliners directly from festival detail.
- Ticketing integrations — Direct API integration with Dice and Ticketmaster for live ticket prices and links.
- Interactive yearly calendar — Discover festivals by month; sync to Google Calendar / Outlook.

**Decisions deferred**:
- Spotify: OAuth flow for user playlists vs. anonymous previews.
- Ticketing: Affiliate revenue model TBD.

---

## 5. Internationalization

**Status**: Roadmap. Can run in parallel with Phase 2 or 3.

- `ca-ES-valencia` (Valencian) — Full translation + locale-aware date/price formatting.
- `en-GB` (English) — Full translation + proper hreflang implementation for SEO.
- Hreflang & canonical URLs — Proper rel links for multi-language indexing.

**Constraints**:
- No Localize (`@angular/localize`); uses **Transloco** or custom MVP with Signals.
- Merge script: propagates `es.json` changes to all 44 supported European locales at commit time (skill: `i18n-commit-policy`).
- URL scheme: slugs remain Spanish (`/festivales/fib-benicassim`); path prefix optional (`/es/`, `/ca/`, `/en/`) or subdomain (`es.festivalapp.com`). Decision TBD Phase 5 start.

**Acceptance criteria**:
- 100% key parity across `es.json`, `ca.json`, `en.json`.
- All dates format per locale (e.g., "12 – 16 jul 2026" in es, "12 – 16 Jul 2026" in en).
- Hreflang links in `<head>` for all three languages on every route.

---

## Architecture & Operations (Ongoing)

- **Theming & design system** — Premium dark surface (navy #0F172A + violet/blue gradient), Sora display font, token namespace `--fv-*`. See [`theming-styling` skill](./.claude/skills/theming-styling/README.md).
- **Performance targets** — LCP ≤ 2.5s, CLS ≤ 0.1, TTI ≤ 3.5s. Bundle budget: initial ≤ 250 KB gzipped, lazy chunks ≤ 80 KB.
- **SEO & metadata** — JSON-LD `Event` schema, Open Graph, title/description per route, sitemap, robots.txt, 301 redirects on slug renames.
- **Error handling** — Normalized `FestivalError`, Sentry integration, user-facing messages via i18n.
- **Testing** — Vitest unit tests, Angular Testing Library component tests, Playwright E2E (roadmap), `axe-core` a11y audits.

---

## Out of Scope (Explicit Decisions)

The following technologies and patterns are **explicitly out of scope** per the project contract. Any proposal to add them must be justified against the canonical tech stack:

- Build: Nx/Turborepo (monorepo not needed).
- CSS: Tailwind, Material/PrimeNG, Bootstrap (SCSS tokens + custom components instead).
- Search: Algolia, Typesense (MiniSearch client-side sufficient for MVP).
- Backend: GraphQL, Redis, direct database access (HTTP DTOs + Zod validation).
- Payments: Stripe (ticketing integrations via Dice/Ticketmaster only).
- Hosting: Multi-region failover, edge compute beyond Cloudflare Workers (Workers V8 isolates fit the free-tier 1 MB limit).

---

## Tracking & Updates

- **Last updated**: 2026-06-06
- **Responsible**: `contenido` agent (roadmap narrative), `rendimiento` agent (SEO/performance milestones), `sistemas` agent (architecture decisions).
- **Process**: Each phase opens in a separate task/PR cycle. Blockers and learnings tracked in commit messages and issue discussions.
