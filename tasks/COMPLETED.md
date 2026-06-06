# ✅ Completed

Archive of finished work items, completed phases, and shipped features.

---

## Phase 1: MVP Informative (Baseline)

### Completed Features

- ✅ **Project scaffold** — Angular 21 standalone, feature-sliced architecture, ESLint boundaries.
  - Commit: [`87da017`](https://github.com/R4r4s/festiVAL/commit/87da017)
  - Completed: 2026-06-06

- ✅ **Design system** — Tokens (SCSS primitives + CSS custom properties), dark theme, typography, spacing, shadows, animations.
  - Commits: Feature branch merged to develop.
  - Completed: 2026-06-04

- ✅ **Home page** — Hero image, featured festivals highlight, calls to action.
  - Commits: Multiple feature work.
  - Completed: 2026-06-04

- ✅ **Navigation bar** — Sticky header with logo, menu links (Home, Festivals, Calendar, Explore, About), search icon, theme toggle.
  - Commit: Feature branch merged.
  - Completed: 2026-06-04

- ✅ **Festival catalogue** — Zod schema, data structure, initial 6+ festivals hardcoded/mocked.
  - Completed: 2026-06-04

- ✅ **i18n MVP** — TranslationService + translate pipe, es.json as source, ca.json and en.json for parity.
  - Commits: Feature branch.
  - Completed: 2026-06-06

- ✅ **Routing scaffold** — App routes, lazy-loaded features, route guards placeholder.
  - Completed: 2026-06-04

### In Progress / Not Yet Started

- ⏳ **Search** — MiniSearch integration, fuzzy matching, field boosts.
- ⏳ **Filters** — Province, month, genre, price range UI components.
- ⏳ **Festival detail page** — Individual festival fiches with map, full line-up.
- ⏳ **SSR + prerendering** — Angular Universal setup, prerender static routes.
- ⏳ **Sanity CMS integration** — Replace hardcoded data with live catalog from Sanity.

---

## Q2 2026

### Milestones Completed

- 2026-06-04: Design system finalized, tokens system in place.
- 2026-06-04: Nav-bar with theme toggle and router integration.
- 2026-06-06: i18n MVP with translate pipe and locale files.

---

## Ongoing Quality

- ✅ **Code reviews** — All PRs reviewed before merge.
- ✅ **Testing gate** — Pre-commit linting + unit tests enforced.
- ✅ **Documentation** — Architecture docs kept in sync with code.

---

## Release Timeline

| Version | Date | Highlights |
| --- | --- | --- |
| 0.1.0 (MVP) | TBD | Festival catalogue, search, filters, detail pages |
| 0.2.0 (Personalization) | TBD | Favorites, PWA, theme persistence |
| 0.3.0 (Accounts) | TBD | Registration, login, ratings, comments |
| 0.4.0 (Integrations) | TBD | Spotify, ticketing, calendar |
| 1.0.0 (i18n) | TBD | Valencian + English full support, hreflang |

---

## Notes

- **Cadence**: Items move from `IN_PROGRESS.md` → `COMPLETED.md` at end of sprint or upon merge to main.
- **Retention**: Completed items stay here for 2–3 sprints (historical reference), then archived to git history.
- **Linking**: All items include commit or PR links for traceability.

---

## Last Updated

2026-06-06
