# CLAUDE.md — festiVal

**festiVal** is an Angular web application that serves as an information portal for the main music festivals in the Valencian Community (Valencia, Alicante, and Castellón provinces of Spain). Users can discover festivals and consult dates, locations, music genres, artist line-ups, starting prices, and official links. The primary UI language is **Spanish (es-ES)**, with Valencian (`ca-ES-valencia`) and English (`en-GB`) on the roadmap.

## Technologies

- **Angular 21** (standalone components, Signals, `@defer`, `NgOptimizedImage`)
- **TypeScript** 5.x (strict mode)
- **HTML5** semantic markup
- **SCSS** with design tokens and CSS custom properties
- **Angular CLI** 21.x for tooling
- **Vitest** for unit tests (configured by Angular CLI)
- **Playwright** planned for E2E
- **Angular Universal** planned for SSR / prerendering of SEO-critical routes

## Project scripts

- To start the dev server: `npm start` (equivalent to `ng serve`, serves on `http://localhost:4200`).
- To build for production: `npm run build` (artifacts in `dist/`).
- To run unit tests: `npm test`.
- To lint: `npm run lint`.
- For watch mode without a server: `npm run watch`.

**Do not** invoke `ng serve --open` in unattended sessions: it opens the user's browser and is unnecessary for programmatically validating changes. For visual verification, use the `/verify` skill which follows the project's steps.

## Configuration

- Environment configuration lives in `src/environments/` (`environment.ts`, `environment.prod.ts`). **That** is where base URLs, feature flags, and endpoints belong — never hardcode them in services.
- The default locale is registered in `src/app/app.config.ts` with `registerLocaleData(localeEs)` and `LOCALE_ID: 'es-ES'`.
- Translations live in `src/assets/i18n/{es,ca,en}.json`. The `es-ES` locale is the source of truth and must never diverge in keys from `ca` and `en` (see the **contenido** agent).
- Bundle budgets are defined in `angular.json` under `budgets`. Initial < 250 KB gzipped, lazy chunks < 80 KB.

## Agents

To keep the architecture scalable and responsibilities clear, the project defines five specialized agents in `.claude/agents/`:

- **`prueba`** 🧪 — Unit, component, and E2E tests (Vitest, Angular Testing Library, Playwright), `axe-core` for a11y, pre-merge validation. Consult it whenever services, components, pipes, guards, or critical flows are touched.
- **`sistemas`** 🏗️ — Architecture, service layer, state management (Signals / NgRx SignalStore), routing, HTTP interceptors, SSR, environments, DTO contracts. Consult it when a change crosses a component boundary or touches data flow.
- **`vistas`** 🎨 — Presentational components, design system, theming, SCSS, responsive layout, animations, visual accessibility. Consult it for any change to templates, styles, or visual experience.
- **`contenido`** 📝 — Internationalization, festival catalogue curation (slugs, dates, line-up, prices), UX microcopy, editorial style guide. Consult it whenever copy or i18n keys are added or festival data is updated (FIB, Arenal Sound, Medusa, Low, SanSan, Reggaeton Beach…).
- **`rendimiento`** ⚡ — Core Web Vitals (LCP, CLS, INP), bundles, SSR / prerendering, JSON-LD `Event` schema, sitemap, canonicals, Open Graph, hreflang. Consult it for any change that could move metrics or affect SEO.

Each agent explicitly declares who it collaborates with to avoid overlapping responsibilities.

## Skills

The project defines reusable skills in `.claude/skills/` that document patterns specific to this application. It is **imperative** to consult the matching skill before touching the area it covers:

- **`project-structure`** 🗂️ — **MANDATORY.** Canonical folder layout, naming rules, placement decision tree, path aliases. Consult **before** creating, moving, or renaming any file. The structure is a contract that must remain stable.
- **`state-management`** — Signal patterns, NgRx SignalStore, persistence of filters and favourites.
- **`api-integration`** — Typed HTTP services, DTOs, interceptors, caching.
- **`routing-navigation`** — Spanish URL schema (`/festivales/:slug`), lazy loading, resolvers, functional guards.
- **`ui-components`** — Catalogue of reusable components (`FestivalCard`, `FestivalHero`, `LineupGrid`, `FilterChip`…).
- **`forms-validation`** — Typed Reactive Forms, custom validators (DNI, date/price ranges), errors via i18n.
- **`internationalization`** — `es-ES` by default, dotted keys, ICU MessageFormat, `ca` and `en` locales on the roadmap.
- **`performance-optimization`** — OnPush, `@defer`, `NgOptimizedImage`, budgets, SSR.
- **`testing-patterns`** — Testing layers, HTTP mocking, `data-testid`, coverage.
- **`accessibility`** — WCAG 2.1 AA, contrast, visible focus, minimal ARIA, keyboard navigation.
- **`theming-styling`** — Primitive and semantic tokens, dark mode, Mediterranean palette (blue + citrus orange).
- **`seo-meta`** — Title/description per route, JSON-LD `Event`, canonicals, sitemap, Open Graph.
- **`error-handling`** — Normalized `FestivalError`, `HttpInterceptor` + global `ErrorHandler`, user-facing messages via i18n.

## Architecture

The entire application hangs from `src/app/` under the following **feature-first** convention:

```
src/app/
├── core/              # global singletons: HttpInterceptors, ErrorHandler, APP_INITIALIZER
├── shared/            # reusable stateless utilities and pipes
├── components/        # standalone presentational components (dumb)
├── pages/             # smart components per route (home, festival-list, festival-detail, about)
├── services/          # typed HTTP services (FestivalService, ArtistService, VenueService)
├── models/            # DTO interfaces (Festival, Artist, Venue, FestivalError)
├── stores/            # Signal stores and NgRx SignalStore
├── pipes/             # custom pipes (Spanish date formatting, genres)
├── guards/            # functional CanMatchFn
├── app.routes.ts      # route configuration with loadComponent
├── app.config.ts      # providers, LOCALE_ID, interceptors
└── app.component.ts
```

### Architectural principles

- **Standalone components** in all new code — no NgModules.
- **Unidirectional data flow**: HTTP → service → store → component → template. Components never call `HttpClient` directly.
- **Typing at the boundary**: every DTO that crosses the network has an `interface` in `src/app/models/`.
- **Immutability** of state: mutations only inside store methods; selectors are pure.
- **No premature abstraction**: three concrete usages before extracting a generic helper.
- **Strings never hardcoded**: all copy flows through the i18n pipe.
- **Tokens never hardcoded**: no literal colors or spacings; always via CSS custom properties or SCSS variables.

### The festival catalogue

The core of the domain is the `Festival` entity:

```ts
interface Festival {
  slug: string;            // "fib-benicassim" — stable, indexed by search engines
  nombre: string;          // "FIB" — official name, not translated
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

festiVal is a **public information portal**, not transactional: it does not sell tickets and does not require registration in its first phase. The typical user is a music lover from the Valencian Community who wants to decide which festival to attend this summer and needs to quickly compare dates, prices, and line-ups from a mobile device.

### Festivals in the initial catalogue

- **FIB** (Benicàssim, Castellón) — indie, rock, electronic.
- **Arenal Sound** (Burriana, Castellón) — pop, indie, electronic.
- **Medusa Festival** (Cullera, Valencia) — electronic.
- **Low Festival** (Benidorm, Alicante) — indie.
- **SanSan Festival** (Benicàssim, Castellón) — indie.
- **Reggaeton Beach Festival** (Benidorm/Cullera) — reggaeton, urban.
- (… expandable season by season by the **contenido** agent)

### Roadmap (high level)

The portal will evolve in these phases:

1. **Information MVP** — catalogue, search, filters, detail pages. No auth.
2. **Personalization** — persisted favourites, dark mode, installable PWA.
3. **User accounts** — registration, login, ratings, comments.
4. **Integrations** — Spotify (preview artists), ticketing (Dice, Ticketmaster), interactive yearly calendar.
5. **Multilingual** — `ca-ES-valencia` and `en-GB` live with hreflang.

Each phase will open new areas (auth, user persistence, admin panel) that **may require additional agents** (`seguridad`, `devops`); they will be evaluated when they arrive.
