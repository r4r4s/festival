# 🗂️ Project Structure

Canonical, **non-negotiable** folder structure for the **festiVal** Angular application.

## Purpose

Guarantee that the project layout remains identical across every feature, contributor, and AI-assisted change. Predictable structure makes navigation, code review, lazy loading, and onboarding trivial — and prevents the slow drift toward inconsistency that kills mid-size Angular codebases.

This skill is **MANDATORY**. Before creating, moving, or renaming any file or folder, consult this document. Any deviation must be discussed and, if accepted, the deviation is added here — never left undocumented.

---

## Top-level layout

```
festiVal/
├── .claude/                   # AI-assisted development (agents + skills) — do not move
├── scripts/                   # Node build scripts (e.g. WebP converter — see [[performance-optimization]])
├── src/
│   ├── app/                   # application code (see below)
│   ├── assets/                # static assets shipped with the app
│   │   ├── images/            # generated WebP output — committed, never hand-edited
│   │   ├── images-src/        # source PNG/JPEG — committed, never shipped to the user
│   │   ├── icons/             # SVG icon set (additional to Lucide)
│   │   ├── i18n/              # translation files: es.json (source), ca.json, en.json
│   │   └── maps/              # MapLibre style JSON (see [[maps]])
│   ├── environments/          # environment.ts, environment.prod.ts
│   ├── styles/                # global SCSS (see "Styles" section)
│   ├── index.html
│   ├── main.ts
│   └── styles.scss            # entry point importing src/styles/*
├── public/                    # static files served as-is (favicon, robots.txt, sitemap.xml)
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── README.md
└── CLAUDE.md
```

Festival posters live in **Sanity**, not in `src/assets/`. See [[performance-optimization]] for the image source split.

---

## `src/app/` — application structure

```
src/app/
├── core/                      # global singletons — provided once at root
│   ├── interceptors/          # HttpInterceptors (auth, error, logging, cache)
│   ├── handlers/              # ErrorHandler implementations
│   ├── initializers/          # APP_INITIALIZER factories
│   └── tokens/                # InjectionTokens
├── shared/                    # reusable stateless utilities
│   ├── pipes/                 # generic pipes (truncate, safe-html)
│   ├── directives/            # generic directives
│   ├── utils/                 # pure functions, no Angular dependencies
│   └── testing/               # test helpers reused across specs
├── components/                # standalone presentational components (DUMB — no HTTP, no store)
│   ├── festival-card/
│   ├── festival-hero/
│   ├── lineup-grid/
│   ├── filter-chip/
│   ├── search-bar/
│   ├── date-range-badge/
│   ├── empty-state/
│   ├── skeleton-loader/
│   └── festival-toast/
├── pages/                     # smart components — one folder per route
│   ├── home/
│   ├── festival-list/
│   ├── festival-detail/
│   ├── artist-detail/
│   └── about/
├── services/                  # typed HTTP services
│   ├── festival.service.ts
│   ├── artist.service.ts
│   └── venue.service.ts
├── stores/                    # state stores (Signals / NgRx SignalStore)
│   ├── festivals.store.ts
│   ├── filters.store.ts
│   └── favourites.store.ts
├── models/                    # DTO interfaces and domain types
│   ├── festival.model.ts
│   ├── artist.model.ts
│   ├── venue.model.ts
│   └── festival-error.model.ts
├── pipes/                     # domain-specific pipes (Spanish dates, genre formatting)
├── guards/                    # functional CanMatchFn
├── resolvers/                 # ResolveFn for SSR-friendly hydration
├── app.routes.ts              # route configuration with loadComponent
├── app.config.ts              # providers, LOCALE_ID, interceptors
├── app.ts                     # root component class
├── app.html
└── app.scss
```

### Per-component folder

Every component folder — both in `components/` and `pages/` — has **exactly** this shape, following the Angular 21 CLI convention (no `.component` suffix):

```
<name>/
├── <name>.ts
├── <name>.html
├── <name>.scss
└── <name>.spec.ts
```

No `index.ts` barrel files. No co-located sub-components — extract them to their own folder under `components/`.

---

## `src/styles/` — global stylesheets

```
src/styles/
├── _tokens.scss               # primitive tokens (raw palette)
├── _semantic.scss             # semantic tokens (--bg-canvas, --text-primary, --accent-violet)
├── _typography.scss           # font families, type ramp, line-heights, tracking
├── _spacing.scss              # 4 px base scale
├── _radii.scss                # border radii
├── _shadows.scss              # elevation system (optional partial — may be inlined in _semantic.scss)
├── _motion.scss               # easing curves, durations, prefers-reduced-motion
├── _breakpoints.scss          # sm 640, md 768, lg 1024, xl 1280
├── _mixins.scss               # glass, focus-ring, container, truncate, line-clamp
├── _animations.scss           # keyframes (fade-up, pulse-soft, live-dot)
└── _reset.scss                # opinionated reset
```

The root `src/styles.scss` is the only file that `@use`s these partials. Component SCSS imports tokens via `@use 'styles/mixins' as *;` (path alias resolved through `stylePreprocessorOptions.includePaths: ["src"]` in `angular.json`).

---

## Naming rules

- **Folders**: kebab-case (`festival-card`, `festival-list`).
- **TypeScript files**: kebab-case with a role suffix (`festival.service.ts`, `festival.model.ts`, `festivals.store.ts`, `auth.guard.ts`, `festival.resolver.ts`).
- **Component files**: `<name>.ts/html/scss/spec.ts` (Angular 21 default — no `.component` suffix).
- **Classes**: PascalCase matching the file name (`FestivalCardComponent`, `FestivalService`).
- **Signal stores**: PascalCase ending in `Store` (`FestivalsStore`).
- **SCSS partials**: leading underscore (`_tokens.scss`).
- **Festival slugs**: kebab-case, lowercase, ASCII (`fib-benicassim`, `arenal-sound`). Immutable once published.
- **i18n keys**: dotted path, lowercase (`festival.detail.lineup.title`).

---

## Placement decision tree

When creating a new file, ask the questions in order — stop at the first **yes**:

1. Is it a global singleton, interceptor, error handler, or initializer? → `src/app/core/`.
2. Is it a stateless utility, generic pipe, or directive with no domain knowledge? → `src/app/shared/`.
3. Is it a smart component bound to a route? → `src/app/pages/<route>/`.
4. Is it a presentational component reusable across pages? → `src/app/components/<name>/`.
5. Is it a service that calls `HttpClient`? → `src/app/services/`.
6. Is it a state store? → `src/app/stores/`.
7. Is it a DTO or domain type? → `src/app/models/`.
8. Is it a domain-specific pipe (dates, genres, currency formatting)? → `src/app/pipes/`.
9. Is it a route guard or resolver? → `src/app/guards/` or `src/app/resolvers/`.
10. None of the above? → **Stop and discuss before creating**. Do not invent a new top-level folder.

---

## Hard rules (NEVER violate)

1. **Never** add a new top-level folder under `src/app/` without updating this document.
2. **Never** place HTTP calls outside `src/app/services/`.
3. **Never** place state mutations outside `src/app/stores/`.
4. **Never** add NgModules — every component, directive, and pipe is **standalone**.
5. **Never** create `index.ts` barrel files. They defeat tree-shaking and obscure imports.
6. **Never** mix smart and dumb components in the same folder.
7. **Never** import from `pages/` into `components/`. Components are leaves; pages compose them.
8. **Never** import from a sibling page (`pages/home` cannot import from `pages/festival-list`). Shared logic moves to `shared/` or a store.
9. **Never** use relative paths deeper than two levels (`../../`). Configure `paths` in `tsconfig.json` and use `@app/...` aliases.
10. **Never** colocate translation strings, colors, or spacing values inside components.

---

## Path aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*":        ["src/app/*"],
      "@core/*":       ["src/app/core/*"],
      "@shared/*":     ["src/app/shared/*"],
      "@components/*": ["src/app/components/*"],
      "@pages/*":      ["src/app/pages/*"],
      "@services/*":   ["src/app/services/*"],
      "@stores/*":     ["src/app/stores/*"],
      "@models/*":     ["src/app/models/*"],
      "@env/*":        ["src/environments/*"],
      "@styles/*":     ["src/styles/*"]
    }
  }
}
```

Imports must always use the alias — never reach into the relative graph beyond a sibling folder.

---

## When the structure must evolve

If a new feature genuinely doesn't fit (e.g. introducing `auth/` when user accounts land, or `admin/` when the back-office arrives):

1. Propose the change in a PR description.
2. Add the new folder to this document with its purpose and placement rule.
3. Update the decision tree above.
4. Update the path aliases in `tsconfig.json`.
5. Update `CLAUDE.md` so all agents see the new convention.

**No silent additions.** The structure is a contract.
