# 🎨 Theming & Styling

SCSS architecture and design tokens for **festiVal**.

## Purpose

Provide a single source of truth for colors, spacing, typography, radii, shadows, and motion. The visual identity is a **premium dark product surface** — deep navy/black canvas, violet/blue gradient identity, restrained glassmorphism, generous spacing, and intentional micro-interactions.

This skill defines the **what** (token values) and the **how** (where they live, how they are consumed). Components never inline literal values.

---

## Namespace

All design tokens are exposed as CSS custom properties under the `--fv-*` prefix. The prefix:

- Avoids collisions with third-party CSS that uses unprefixed variables.
- Makes greppable "is this a festiVal token?" trivially answerable.
- Matches the existing `--fv-font-*` family already in production.

SCSS primitive variables keep a `$fv-` prefix where they are exported, raw scalars otherwise.

---

## File layout

```
src/styles/
├── styles.scss          # entry point (the only file `angular.json` references)
├── _reset.scss          # opinionated reset (margin, box-sizing, focus)
├── _tokens.scss         # primitive tokens (raw palette, raw scales) — SCSS only
├── _semantic.scss       # semantic tokens exposed as `--fv-*` CSS custom properties
├── _typography.scss     # type ramp, font sizes, line-heights, tracking
├── _fonts.scss          # @font-face + font-family tokens (Inter, Sora, JetBrains Mono)
├── _spacing.scss        # 4 px base spacing scale
├── _radii.scss          # radius scale
├── _shadows.scss        # elevation system
├── _motion.scss         # easing curves and durations
├── _breakpoints.scss    # media query helpers (sm/md/lg/xl)
├── _mixins.scss         # reusable mixins (glass, focus-ring, container)
└── _animations.scss     # keyframes (fade-up, glow-pulse)
```

`styles.scss` `@use`s these partials at the global scope. Component SCSS imports mixins via `@use 'styles/mixins' as *;` (resolved through `stylePreprocessorOptions.includePaths: ["src"]` in `angular.json`). Components never `@use` `_tokens.scss` or `_semantic.scss` directly — they consume the resulting `--fv-*` CSS variables.

---

## Primitive palette (raw, never used directly in components)

```scss
// Neutrals — deep navy bias, not pure black
$fv-gray-950: #07070C;   // canvas
$fv-gray-900: #0B0B14;   // surface
$fv-gray-850: #11111D;   // elevated
$fv-gray-800: #181826;   // overlay base
$fv-gray-700: #232336;
$fv-gray-600: #2F2F47;
$fv-gray-500: #4A4A66;
$fv-gray-400: #6B6E85;
$fv-gray-300: #9CA0B5;
$fv-gray-200: #C9CCDB;
$fv-gray-100: #E7E9F2;
$fv-gray-50:  #F4F4FA;

// Brand — violet primary, blue secondary
$fv-violet-600: #6D4DF2;
$fv-violet-500: #7C5CFF;   // primary brand
$fv-violet-400: #9D7BFF;
$fv-violet-300: #B9A0FF;

$fv-blue-500:   #4E8CFF;
$fv-blue-400:   #6BA1FF;

// Accent — green is reserved for live/success
$fv-green-500:  #4ADE9D;
$fv-green-400:  #6BE8B0;

// States
$fv-red-500:    #FF5C7A;
$fv-amber-500:  #F5B544;
```

---

## Semantic tokens (these are what components use)

Exposed as CSS custom properties at `:root`:

```scss
:root {
  // Surfaces
  --fv-bg-canvas:        #{$fv-gray-950};
  --fv-bg-surface:       #{$fv-gray-900};
  --fv-bg-elevated:      #{$fv-gray-850};
  --fv-bg-overlay:       rgba(24, 24, 38, 0.6);   // translucent glass

  // Borders — hairline, used everywhere
  --fv-border-subtle:    rgba(255, 255, 255, 0.06);
  --fv-border-default:   rgba(255, 255, 255, 0.10);
  --fv-border-strong:    rgba(255, 255, 255, 0.16);
  --fv-border-accent:    rgba(124, 92, 255, 0.40);

  // Text
  --fv-text-primary:     #{$fv-gray-50};
  --fv-text-secondary:   #{$fv-gray-300};
  --fv-text-muted:       #{$fv-gray-400};
  --fv-text-inverse:     #{$fv-gray-950};

  // Accents
  --fv-accent-violet:      #{$fv-violet-500};
  --fv-accent-violet-soft: rgba(124, 92, 255, 0.16);
  --fv-accent-blue:        #{$fv-blue-500};
  --fv-accent-green:       #{$fv-green-500};   // ONLY for live/success indicators
  --fv-accent-danger:      #{$fv-red-500};

  // Gradients
  --fv-gradient-brand:
    linear-gradient(135deg, #{$fv-violet-500} 0%, #{$fv-blue-500} 100%);
  --fv-gradient-text:
    linear-gradient(135deg, #{$fv-gray-50} 0%, #{$fv-violet-300} 100%);
  --fv-gradient-hero-glow:
    radial-gradient(60% 50% at 50% 0%,
      rgba(124, 92, 255, 0.28) 0%,
      rgba(78, 140, 255, 0.10) 35%,
      transparent 70%);
  --fv-gradient-card-sheen:
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 40%);

  // Shadows — soft, atmospheric, never harsh
  --fv-shadow-card:
    0 1px 2px rgba(0, 0, 0, 0.35),
    0 8px 24px rgba(0, 0, 0, 0.25);
  --fv-shadow-elevated:
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 20px 48px rgba(0, 0, 0, 0.45);
  --fv-shadow-focus:
    0 0 0 2px var(--fv-bg-canvas),
    0 0 0 4px var(--fv-accent-violet);
  --fv-shadow-glow-violet:
    0 0 40px rgba(124, 92, 255, 0.25);
}
```

---

## Spacing scale

4 px base unit, exponential where useful:

```scss
:root {
  --fv-space-0:  0;
  --fv-space-1:  4px;
  --fv-space-2:  8px;
  --fv-space-3:  12px;
  --fv-space-4:  16px;
  --fv-space-5:  24px;
  --fv-space-6:  32px;
  --fv-space-7:  48px;
  --fv-space-8:  64px;
  --fv-space-9:  96px;
  --fv-space-10: 128px;
}
```

---

## Radii

```scss
:root {
  --fv-radius-sm:   8px;   // small chips, badges
  --fv-radius-md:   12px;  // buttons, inputs
  --fv-radius-lg:   16px;  // cards
  --fv-radius-xl:   24px;  // hero panels, modals
  --fv-radius-2xl:  32px;
  --fv-radius-pill: 999px;
}
```

Never mix more than two radii in a single view.

---

## Typography

Font families are tokenized in `_fonts.scss` (see that partial for the role mapping). Sizes, line-heights, and tracking live here:

```scss
:root {
  --fv-text-xs:      12px;
  --fv-text-sm:      14px;
  --fv-text-base:    16px;
  --fv-text-lg:      18px;
  --fv-text-xl:      20px;
  --fv-text-2xl:     24px;
  --fv-text-3xl:     32px;
  --fv-text-4xl:     44px;
  --fv-text-display: 64px;

  --fv-leading-tight:   1.15;
  --fv-leading-snug:    1.3;
  --fv-leading-normal:  1.5;
  --fv-leading-relaxed: 1.65;

  --fv-tracking-tight: -0.02em;
  --fv-tracking-snug:  -0.01em;
  --fv-tracking-wide:   0.08em;
  --fv-tracking-wider:  0.14em;
}
```

### Font families (tokenized in `_fonts.scss`)

| Token                  | Family          | Use                                 |
| ---------------------- | --------------- | ----------------------------------- |
| `--fv-font-ui`         | Inter           | Body, UI text, default              |
| `--fv-font-data`       | Inter           | Data display, structured content    |
| `--fv-font-heading`    | Sora            | Section titles, component headings  |
| `--fv-font-brand`      | Sora            | Brand-level usage                   |
| `--fv-font-hero`       | Inter           | Hero text (default)                 |
| `--fv-font-hero-emphasis` | Sora         | Hero text with emphasis             |
| `--fv-font-mono`       | JetBrains Mono  | Dates, IDs, code, technical values  |

### Type roles

| Role             | Font token              | Size                | Weight | Tracking              |
| ---------------- | ----------------------- | ------------------- | ------ | --------------------- |
| Display          | `--fv-font-hero-emphasis` | `--fv-text-display` | 600    | `--fv-tracking-tight` |
| H1               | `--fv-font-heading`     | `--fv-text-4xl`     | 600    | `--fv-tracking-tight` |
| H2               | `--fv-font-heading`     | `--fv-text-3xl`     | 600    | `--fv-tracking-snug`  |
| H3               | `--fv-font-heading`     | `--fv-text-2xl`     | 500    | `--fv-tracking-snug`  |
| Body             | `--fv-font-ui`          | `--fv-text-base`    | 400    | normal                |
| Body small       | `--fv-font-ui`          | `--fv-text-sm`      | 400    | normal                |
| Eyebrow / label  | `--fv-font-ui`          | `--fv-text-xs`      | 500    | `--fv-tracking-wider`, `text-transform: uppercase` |
| Code             | `--fv-font-mono`        | `--fv-text-sm`      | 400    | normal                |

Wide tracking only for eyebrows and small caps labels. Body text is never letter-spaced.

---

## Motion

```scss
:root {
  --fv-duration-fast: 150ms;
  --fv-duration-base: 240ms;
  --fv-duration-slow: 400ms;

  --fv-ease-standard:   cubic-bezier(0.2, 0.8, 0.2, 1);
  --fv-ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --fv-ease-in:         cubic-bezier(0.4, 0, 1, 1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Breakpoints

Mobile-first only. Exposed as a SCSS map (consumed by `@include from(...)`), not as CSS variables — media queries cannot read custom properties.

```scss
$fv-breakpoints: (
  sm:  640px,
  md:  768px,
  lg:  1024px,
  xl:  1280px,
  2xl: 1440px
);

@mixin from($bp) {
  @media (min-width: map.get($fv-breakpoints, $bp)) { @content; }
}
```

Usage: `@include from(md) { ... }`.

---

## Reusable mixins

```scss
// Glass panel — translucent surface with hairline border and blur
@mixin glass($alpha: 0.6) {
  background: rgba(17, 17, 29, $alpha);
  border: 1px solid var(--fv-border-subtle);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
}

// Focus ring — used by all interactive elements
@mixin focus-ring {
  &:focus-visible {
    outline: none;
    box-shadow: var(--fv-shadow-focus);
    transition: box-shadow var(--fv-duration-fast) var(--fv-ease-standard);
  }
}

// Container — max-width with consistent gutters
@mixin container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--fv-space-5);

  @include from(md) { padding-inline: var(--fv-space-6); }
  @include from(lg) { padding-inline: var(--fv-space-7); }
}
```

---

## Hard rules

1. Components **never** reference primitive `$fv-gray-*` / `$fv-violet-*` SCSS variables. Always semantic `--fv-*` CSS variables.
2. Components **never** hardcode colors, radii, spacings, durations, or font families.
3. `--fv-accent-green` is reserved for live/success states. Never decorative.
4. Glass surfaces require depth behind them. Never apply `glass()` to a full-screen background.
5. No more than **two accent hues** per view (violet + blue is the default pair).
6. No heavy drop shadows (`rgba(0,0,0,0.5)` with 30 px blur). Shadows are atmospheric.
7. Light mode is **out of scope** for now. Do not author light-mode overrides until it lands on the roadmap.

---

## Future light mode

When light mode is introduced, override semantic tokens inside `[data-theme="light"]`. Primitives stay constant; only semantics flip. Do not duplicate the palette.
