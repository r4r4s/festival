# 🧩 UI Components

Reusable presentational component library for **festiVal**.

## Purpose

Provide a consistent, accessible, composable set of building blocks for the dark, premium portal surface defined in [[theming-styling]] and the [[vistas]] agent.

## Core components

| Component                   | Location                  | Role                                                            |
| --------------------------- | ------------------------- | --------------------------------------------------------------- |
| `NavBarComponent`           | `layout/nav-bar/`         | Top navigation, glass panel, brand mark + primary nav + CTA.    |
| `FooterComponent`           | `layout/footer/`          | Site footer, secondary nav, attribution.                        |
| `ButtonComponent`           | `@shared/ui/button/`      | Variants: `primary` (gradient), `secondary` (glass), `ghost`.   |
| `BadgeComponent`            | `@shared/ui/badge/`       | Variants: `neutral`, `violet`, `live` (green, with pulse).      |
| `FestivalCardComponent`     | `@shared/ui/festival-card/` | Poster, dates, ciudad chip, géneros, precio desde, hover-lift. |
| `SearchBarComponent`        | `@shared/ui/search-bar/`  | Debounced input with leading icon and clear affordance.         |
| `DateRangeBadgeComponent`   | `@shared/ui/date-range-badge/` | Formatted Spanish dates (`"12 – 16 jul 2026"`).            |
| `EmptyStateComponent`       | `@shared/ui/empty-state/` | Illustration slot + heading + body + optional action.           |
| `SkeletonLoaderComponent`   | `@shared/ui/skeleton-loader/` | Pulsing block; respects `prefers-reduced-motion`.           |
| `FestivalToastComponent`    | `@shared/ui/festival-toast/` | Transient notification, slides up from bottom-right.         |
| `FormErrorComponent`        | `@shared/ui/form-error/`  | Reads control state, outputs i18n error message ([[forms-validation]]). |
| `FestivalHeroComponent`     | `festival-detail/ui/`     | Full-bleed banner for detail pages, radial glow backdrop.       |
| `LineupGridComponent`       | `festival-detail/ui/`     | Tier-based typography for headliners → mid → emerging.          |
| `FilterChipComponent`       | `festival-list/ui/`       | Toggleable chip; selected state uses `--accent-violet-soft`.    |

## Variants and tokens

- **Buttons** use `--radius-md`, height 40 px (default) / 48 px (large), `--duration-base` transitions.
- **Cards** use `--radius-lg` (16 px), `--shadow-card` resting, `--shadow-elevated` on hover, 2 px upward translate.
- **Badges** use `--radius-pill`, `--text-xs`, `--tracking-wider`, uppercase.
- **Glass panels** apply the `glass()` mixin only when content sits over a colored or textured backdrop (hero, modal overlay).

## Where components live

Per the feature-sliced structure (see [[project-structure]]):

- **Shared primitives** reused by ≥ 2 features → `@shared/ui/<name>/` (`button`, `badge`, `festival-card`, `search-bar`, `empty-state`, `skeleton-loader`, `festival-toast`, `form-error`).
- **Feature-local presentational components** → `features/<feature>/ui/<name>/` (`festival-hero` and `lineup-grid` live in `festival-detail/ui/`; filter widgets live in `festival-list/ui/`).
- **Shell chrome** (nav, footer) → `layout/`.

A component starts feature-local and moves to `@shared/ui/` the moment a second feature imports it — never anticipatorily.

## Composition rules

- All components are **standalone**, `OnPush`, signal `input()` / `output()`.
- **Presentational components never inject services or stores.** Smart pages (in `features/*/feature/`) inject `data-access/` and pass data down via inputs. Inside a feature, `ui/` may not import from `data-access/`.
- No hardcoded strings — every label goes through the i18n pipe (see [[internationalization]]).
- No hardcoded values for color, spacing, radius, shadow, or motion — only tokens from [[theming-styling]].
- Selector prefix `fv-` (e.g. `fv-festival-card`).
- One folder per component, four files only (Angular 21 convention, no `.component` suffix):
  ```
  <location>/<name>/
  ├── <name>.ts
  ├── <name>.html
  ├── <name>.scss
  └── <name>.spec.ts
  ```

## Interaction baseline

- Hover: subtle background brighten (`--bg-elevated` → mix with 4 % white) and border step (`--border-subtle` → `--border-default`).
- Active: scale `0.98` over `--duration-fast`.
- Focus: `--shadow-focus` ring, never `outline: none` without replacement.
- Disabled: `opacity: 0.5`, no pointer events, no focus ring.

## States

Every list/detail surface ships with these three states designed before being marked done:

- **Loading** — skeleton with the same outer shape.
- **Empty** — `EmptyStateComponent` with a helpful next action.
- **Error** — message + retry CTA, copy via [[internationalization]].
