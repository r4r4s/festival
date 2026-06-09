# CLAUDE.md — festiVAL

**festiVAL** is an Angular web application that serves as an information portal for the main music festivals in the Valencian Community (Valencia, Alicante, and Castellón provinces of Spain). Users can discover festivals and consult dates, locations, music genres, artist line-ups, starting prices, and official links. The primary UI language is **Spanish (es-ES)**, with Valencian (`ca-ES-valencia`) and English (`en-GB`) on the roadmap.

## Technologies

Core framework and language:

- **Angular 21** (standalone components, Signals, `@defer`, `NgOptimizedImage`)
- **TypeScript** 5.x (strict mode)
- **HTML5** semantic markup
- **SCSS** with design tokens and CSS custom properties
- **Angular CLI** 21.x for tooling
- **Vitest** for unit tests (configured by Angular CLI)
- **Playwright** planned for E2E
- **Angular Universal** for SSR / prerendering of SEO-critical routes

Project stack (canonical choices — agents must respect these):

| Layer            | Technology                          | Notes                                                                 |
| ---------------- | ----------------------------------- | --------------------------------------------------------------------- |
| Framework        | Angular 21 + SSR                    | Standalone, Signals-first                                              |
| Icons            | **Lucide** (`@lucide/angular`)      | Single icon system, tree-shakeable, line style consistent with the UI |
| Dates            | **date-fns** + `locale/es`          | Spanish formatting (`"12 – 16 jul 2026"`). Owned by **contenido**     |
| Validation       | **Zod**                             | Boundary validation of HTTP DTOs. Owned by **sistemas**               |
| Maps             | **MapLibre GL JS** + Protomaps tiles | OSS, no Mapbox/Google fees. Used in venue/festival detail pages       |
| Search           | **MiniSearch**                      | Client-side fuzzy search with field boosts (`nombre`, `cabezasDeCartel`) |
| Content (CMS)    | **Sanity**                          | Hosted headless CMS for the festival catalogue                        |
| Hosting          | **Cloudflare Pages + Workers**      | Workers V8 isolates — vigilar el límite de 1 MB gz en plan free       |
| Analytics        | **Cloudflare Web Analytics**        | Privacy-friendly, sin cookies, sin banner RGPD                        |
| Error monitoring | **Sentry**                          | Frontend errors; integrated via the `ErrorHandler` in **error-handling** |

Adoption phasing:

- **MVP** — todo lo de la tabla.
- **Personalization phase** — `@angular/service-worker` (PWA) + `idb-keyval` para favoritos persistentes.
- **User accounts phase** — evaluar Supabase Auth o Better Auth.
- **Multilingual phase** — go-live de `ca-ES-valencia` y `en-GB` con hreflang. La infraestructura base (Transloco + `scripts/i18n-sync.mjs`) ya está integrada desde el MVP; esta fase activa los locales adicionales (no `@angular/localize`, que requiere build por idioma).
- **Ticketing phase** — APIs de Dice / Ticketmaster directas, sin librería intermedia.

Explicitly **out of scope**: Nx/Turborepo, Tailwind, Material/PrimeNG, Algolia/Typesense, GraphQL, Redis, Stripe. Cualquier propuesta de añadirlos debe justificarse contra esta tabla.

## Project scripts

- To start the dev server: `npm start` (equivalent to `ng serve`, serves on `http://localhost:4200`).
- To build for production: `npm run build` (artifacts in `dist/`).
- To run unit tests: `npm test`.
- To lint: `npm run lint`.
- For watch mode without a server: `npm run watch`.

**Do not** invoke `ng serve --open` in unattended sessions: it opens the user's browser and is unnecessary for programmatically validating changes. For visual verification, use the `/verify` skill which follows the project's steps.

## Agent workspace routing

When working as Claude Code, use the `.claude/` folder as the source of truth for agents, skills, and commands.
When working as Codex, use the `.codex/` folder as the source of truth for agents, skills, and commands.

## Pre-commit gate (MANDATORY)

Any commit that touches `src/` **must** pass the following two commands in order, both exiting `0`, **before** `git commit` is invoked:

```bash
npm run lint && npm test -- --run
```

If either fails:

1. **Do not commit.**
2. Fix the underlying cause — production code, or the test itself.
3. If the fix is not feasible in the session, **revert** (`git restore` / `git stash`). Never leave broken tests on `main`.
4. Re-run the gate. Only commit when green.

**Never** bypass with `--no-verify`. **Never** disable a test to make the gate pass. Skipping is allowed only with an expiry per the rules in [[testing-patterns]].

The agent **prueba** owns this gate. Pure documentation changes (no files under `src/`) are the only exception.

## Documentation rule (MANDATORY)

Every commit that adds, removes, renames, or moves folders or files **must** update `docs/documentacion.md` in the same commit. This includes:

- Adding the new folder or file to the corresponding tree diagram.
- Describing its purpose in Spanish.
- Adding an entry to the "Historial de cambios estructurales" table at the bottom.

An outdated `docs/documentacion.md` is a bug. This rule applies to humans and Claude alike.

## Markdown review rule (MANDATORY)

Before making any modification, agents **must** review the applicable project `.md` files:

- Always read `CLAUDE.md` for the project contract.
- Read `docs/documentacion.md` before structural changes.
- Read the relevant `.claude/agents/*.md` and `.claude/skills/*/SKILL.md` files for the touched area.

If no specific agent or skill applies, still review `CLAUDE.md` and any nearby `.md` that documents the files being changed.

## Configuration

- Environment configuration lives in `src/environments/` (`environment.ts`, `environment.prod.ts`). **That** is where base URLs, feature flags, and endpoints belong — never hardcode them in services.
- The default locale is registered in `src/app/app.config.ts` with `registerLocaleData(localeEs)` and `LOCALE_ID: 'es-ES'`.
- Translations live in `src/assets/i18n/*.json`. `es.json` is the source of truth and every additional locale file must stay in key parity with it (see the **contenido** agent).
- Bundle budgets are defined in `angular.json` under `budgets`. Initial < 250 KB gzipped, lazy chunks < 80 KB.

## Agents

To keep the architecture scalable and responsibilities clear, the project defines five specialized agents in `.claude/agents/`:

- **`prueba`** 🧪 — Unit, component, and E2E tests (Vitest, Angular Testing Library, Playwright), `axe-core` for a11y, pre-merge validation. Consult it whenever services, components, pipes, guards, or critical flows are touched.
- **`sistemas`** 🏗️ — Architecture, service layer, state management (Signals / NgRx SignalStore), routing, HTTP interceptors, SSR, environments, DTO contracts. Consult it when a change crosses a component boundary or touches data flow.
- **`vistas`** 🎨 — Presentational components, design system, theming, SCSS, responsive layout, animations, visual accessibility. Consult it for any change to templates, styles, or visual experience.
- **`contenido`** 📝 — Internationalization, festival catalogue curation (slugs, dates, line-up, prices), UX microcopy, editorial style guide. Consult it whenever copy or i18n keys are added or festival data is updated (Bigsound, Latin Fest, Medusa, RBF, Reve, Zevra…).
- **`rendimiento`** ⚡ — Core Web Vitals (LCP, CLS, INP), bundles, SSR / prerendering, JSON-LD `Event` schema, sitemap, canonicals, Open Graph, hreflang. Consult it for any change that could move metrics or affect SEO.

Each agent explicitly declares who it collaborates with to avoid overlapping responsibilities.

## Skills

The project defines reusable skills in `.claude/skills/` that document patterns specific to this application. It is **imperative** to consult the matching skill before touching the area it covers:

- **`project-structure`** 🗂️ — **MANDATORY.** Canonical folder layout, naming rules, placement decision tree, path aliases. Consult **before** creating, moving, or renaming any file. The structure is a contract that must remain stable.
- **`state-management`** — Signal patterns, NgRx SignalStore, persistence of filters and favourites.
- **`api-integration`** — Typed HTTP services, DTOs, interceptors, caching.
- **`sanity-cms`** — Festival catalogue from Sanity (headless CMS) via `@sanity/client`: GROQ queries, read-only client in `data-access`, Zod validation at the boundary.
- **`routing-navigation`** — Spanish URL schema (`/festivales/:slug`), lazy loading, resolvers, functional guards.
- **`ui-components`** — Catalogue of reusable components (`FestivalCard`, `FestivalHero`, `LineupGrid`, `FilterChip`…).
- **`forms-validation`** — Typed Reactive Forms, custom validators (DNI, date/price ranges), errors via i18n.
- **`internationalization`** — `es-ES` by default, dotted keys, ICU MessageFormat, `ca` and `en` locales on the roadmap.
- **`performance-optimization`** — OnPush, `@defer`, `NgOptimizedImage`, budgets, SSR.
- **`testing-patterns`** — Testing layers, HTTP mocking, `data-testid`, coverage.
- **`accessibility`** — WCAG 2.1 AA, contrast, visible focus, minimal ARIA, keyboard navigation.
- **`asset-organization`** — **MANDATORY when touching images or image folders.** Folder structure, naming rules, duplicate cleanup, and audit expectations for repository assets.
- **`theming-styling`** — Primitive and semantic tokens (`--fv-*` namespace), premium dark surface with deep navy canvas and violet/blue gradient identity. Light mode out of scope until the roadmap reaches it.
- **`liquid-glass`** — Premium Liquid Glass visual system: semi-transparent surfaces with soft blur, layered depth, edge glow, and atmospheric effects. Use when implementing glassmorphic components, overlays, or translucent surfaces requiring premium appearance.
- **`cross-device-compat`** — Cross-browser and cross-device compatibility layer: browser targets (`.browserslistrc`), `-webkit-backdrop-filter` rule, `color-mix()` fallback strategy with the `@compat` marker, hover guards for touch, `prefers-reduced-motion`, touch targets. Consulted automatically by the autocommit gate (B.10–B.11). Use whenever touching SCSS that uses `backdrop-filter`, `color-mix()`, animations, or hover effects.
- **`seo-meta`** — Title/description per route, JSON-LD `Event`, canonicals, sitemap, Open Graph.
- **`error-handling`** — Normalized `FestivalError`, `HttpInterceptor` + global `ErrorHandler`, user-facing messages via i18n.
- **`search`** — Client-side fuzzy search with MiniSearch, field boosts, diacritic-stripping for Spanish.
- **`maps`** — MapLibre GL JS + Protomaps tiles, lazy-loaded, SSR-safe, accessible with text equivalents.
- **`design-responsive-validation`** 🎨 — **MANDATORY for every UI task.** Bans generic AI-looking layouts, requires a distinctive festiVAL identity, enforces responsive checks across desktop / laptop / tablet / mobile (320 px floor), and demands a Design & Responsive Validation Report at task completion.
- **`i18n-commit-policy`** 🌍 — **MANDATORY at commit time.** During normal development only `es.json` is edited; at commit / finalization the matching keys are propagated to every supported locale (`ca`, `en`), JSON parity is verified with `npm run i18n:check`, and an i18n Commit Translation Report is emitted before `git commit` runs.

## Architecture

The project uses a **feature-sliced** structure with **enforced module boundaries**. The full contract — folder tree, decision tree, hard rules, and ESLint boundary enforcement — lives in the [[project-structure]] skill. Summary:

```
src/app/
├── core/        # cross-cutting singletons (interceptors, ErrorHandler, initializers, SSR helpers)
├── layout/      # the app shell (shell, nav-bar, footer), loaded eagerly
├── features/    # vertical slices, each a lazy chunk — home, festival-list, festival-detail, ...
│   └── <feature>/
│       ├── feature/        # smart, route-bound page
│       ├── ui/             # dumb presentational components local to this feature
│       ├── data-access/    # stores, services, resolvers, Zod schemas
│       └── <feature>.routes.ts   # the feature's ONLY public surface
└── shared/      # reused across ≥ 2 features; never imports a feature
    ├── ui/ data-access/ domain/ pipes/ directives/ util/ testing/
```

Dependency rule (one-directional, lint-enforced via `eslint-plugin-boundaries`):
`features → shared → ∅`, `features → core`, `layout → shared/core`. **A feature never imports another feature.** A feature's only public surface is its `<feature>.routes.ts`.

### Architectural principles

- **Feature isolation**: features never import each other; shared code is promoted to `shared/` (threshold: 2 uses, never anticipatory).
- **Standalone components** in all new code — no NgModules, no barrel files.
- **Lazy by default**: every feature is loaded via `loadChildren` from `app.routes.ts`.
- **Unidirectional data flow**: HTTP → service → store → component → template. Components never call `HttpClient` directly; only `data-access/` folders touch the network.
- **Typing + validation at the boundary**: every DTO is a Zod schema in `@shared/domain` (or a feature's `data-access/`), parsed once at the HTTP edge. See [[api-integration]].
- **Immutability** of state: mutations only inside store methods; selectors are pure.
- **Path aliases always**: `@core`, `@layout`, `@features`, `@shared/*`. No relative import climbs above a feature root.
- **Strings never hardcoded**: all copy flows through the i18n pipe.
- **Tokens never hardcoded**: no literal colors or spacings; always design tokens. See [[theming-styling]].

### The festival catalogue

The core of the domain is the `Festival` entity, declared as a Zod schema in `@shared/domain/festival.model.ts` (the schema lives next to the inferred type — see [[api-integration]]). Shape:

```ts
interface Festival {
  slug: string;            // "bigsound" — stable, indexed by search engines
  nombre: string;          // "Bigsound Festival" — official name, not translated
  provincia: 'Valencia' | 'Alicante' | 'Castellón';
  ciudad: string;
  fechaInicio: string;     // ISO-8601, converted to Date at the boundary
  fechaFin: string;
  generos: string[];       // ['indie', 'electrónica'] — lowercase
  cartel: Artist[];        // ordered by tier (headliners → emerging)
  precioDesde: number;     // EUR
  urlOficial: string;
  poster: { src: string; alt: string };
  ubicacion: { lat: number; lng: number };
}
```

Slugs are **immutable once published** — breaking them breaks SEO. Any renaming is coordinated by **rendimiento** with a 301 redirect.

### URL schema

| Route                       | View                                            |
| --------------------------- | ----------------------------------------------- |
| `/`                         | Home with featured festivals                    |
| `/festivales`               | Listing + filters (province, month, genre)      |
| `/festivales/:slug`         | Festival detail                                 |
| `/festivales/:slug/cartel`  | Full line-up                                    |
| `/artistas/:slug`           | Artist profile                                  |
| `/provincia/:provincia`     | Listing filtered by province                    |
| `/sobre-nosotros`           | Static page                                     |

URL paths remain in Spanish on purpose — they are user-facing, shareable, and SEO-relevant for Spanish queries.

## The application

festiVAL is a **public information portal**, not transactional: it does not sell tickets and does not require registration in its first phase. The typical user is a music lover from the Valencian Community who wants to decide which festival to attend this summer and needs to quickly compare dates, prices, and line-ups from a mobile device.

### Festivals in the initial catalogue

The home carousel (`featured-festivals`), the `home.featured.cards.*` i18n keys, and the
`src/assets/images/festivals/<slug>/` folders are the source of truth for this seed catalogue:

- **Bigsound Festival** (`bigsound`) — Valencia.
- **Latin Fest** (`latin-fest`) — Valencia (también Benidorm) — latin, reggaeton.
- **Medusa Festival** (`medusa`) — Cullera, Valencia — electronic.
- **Reggaeton Beach Festival** (`rbf`) — Benidorm, Alicante — reggaeton, urban.
- **Reve Festival** (`reve`) — Valencia (Roig Arena).
- **Zevra Festival** (`zevra`) — Cullera, Valencia.
- (… expandable season by season by the **contenido** agent)

### Roadmap (high level)

The portal will evolve in these phases:

1. **Information MVP** — catalogue, search, filters, detail pages. No auth.
2. **Personalization** — persisted favourites, dark mode, installable PWA.
3. **User accounts** — registration, login, ratings, comments.
4. **Integrations** — Spotify (preview artists), ticketing (Dice, Ticketmaster), interactive yearly calendar.
5. **Multilingual** — `ca-ES-valencia` and `en-GB` live with hreflang.

Each phase will open new areas (auth, user persistence, admin panel) that **may require additional agents** (`seguridad`, `devops`); they will be evaluated when they arrive.
