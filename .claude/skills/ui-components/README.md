# 🧩 UI Components

Reusable presentational component library for **festiVal**.

## Purpose

Provide a consistent, accessible, composable set of building blocks for the dark, premium portal surface defined in [[theming-styling]] and the [[vistas]] agent.

## Core components

| Component                   | Role                                                            |
| --------------------------- | --------------------------------------------------------------- |
| `NavBarComponent`           | Top navigation, glass panel, brand mark + primary nav + CTA.    |
| `ButtonComponent`           | Variants: `primary` (gradient), `secondary` (glass), `ghost`.   |
| `BadgeComponent`            | Variants: `neutral`, `violet`, `live` (green, with pulse).      |
| `FestivalCardComponent`     | Poster, dates, ciudad chip, génaros, precio desde, hover-lift.  |
| `FestivalHeroComponent`     | Full-bleed banner for detail pages, radial glow backdrop.       |
| `LineupGridComponent`       | Tier-based typography for headliners → mid → emerging.          |
| `FilterChipComponent`       | Toggleable chip; selected state uses `--accent-violet-soft`.    |
| `SearchBarComponent`        | Debounced input with leading icon and clear affordance.         |
| `DateRangeBadgeComponent`   | Formatted Spanish dates (`"12 – 16 jul 2026"`).                 |
| `EmptyStateComponent`       | Illustration slot + heading + body + optional action.           |
| `SkeletonLoaderComponent`   | Pulsing block; respects `prefers-reduced-motion`.               |
| `FestivalToastComponent`    | Transient notification, slides up from bottom-right.            |

## Variants and tokens

- **Buttons** use `--radius-md`, height 40 px (default) / 48 px (large), `--duration-base` transitions.
- **Cards** use `--radius-lg` (16 px), `--shadow-card` resting, `--shadow-elevated` on hover, 2 px upward translate.
- **Badges** use `--radius-pill`, `--text-xs`, `--tracking-wider`, uppercase.
- **Glass panels** apply the `glass()` mixin only when content sits over a colored or textured backdrop (hero, modal overlay).

## Composition rules

- All components are **standalone**, `OnPush`, signal inputs/outputs.
- No HTTP and no store access in components under `src/app/components/`. Smart pages inject services and pass data in via inputs.
- No hardcoded strings — every label goes through the i18n pipe (see [[internationalization]]).
- No hardcoded values for color, spacing, radius, shadow, or motion — only tokens from [[theming-styling]].
- One folder per component, four files only:
  ```
  src/app/components/<name>/
  ├── <name>.component.ts
  ├── <name>.component.html
  ├── <name>.component.scss
  └── <name>.component.spec.ts
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
