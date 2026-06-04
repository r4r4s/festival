# 🎨 Theming & Styling

SCSS architecture and design tokens for **festiVal**.

## Purpose

Provide a single source of truth for colors, spacing, typography, radii, shadows, and motion. The visual identity is a **premium dark product surface** — deep navy/black canvas, violet/blue gradient identity, restrained glassmorphism, generous spacing, and intentional micro-interactions.

This skill defines the **what** (token values) and the **how** (where they live, how they are consumed). Components never inline literal values.

---

## File layout

```
src/styles/
├── _reset.scss          # opinionated reset (margin, box-sizing, focus)
├── _tokens.scss         # primitive tokens (raw palette, raw scales)
├── _semantic.scss       # semantic tokens (--bg-canvas, --text-primary)
├── _typography.scss     # type ramp, font families, line-heights, tracking
├── _spacing.scss        # spacing scale
├── _radii.scss          # radius scale
├── _shadows.scss        # elevation system
├── _motion.scss         # easing curves and durations
├── _breakpoints.scss    # media query helpers (sm/md/lg/xl)
├── _mixins.scss         # reusable mixins (glass, focus-ring, container)
└── _animations.scss     # keyframes (fade-up, glow-pulse)
```

The entry point `src/styles.scss` only `@use`s these partials. Component SCSS imports tokens via `@use 'styles/mixins' as *;` (path alias `@styles/*` configured in `tsconfig.json`).

---

## Primitive palette (raw, never used directly in components)

```scss
// Neutrals — deep navy bias, not pure black
$gray-950: #07070C;   // canvas
$gray-900: #0B0B14;   // surface
$gray-850: #11111D;   // elevated
$gray-800: #181826;   // overlay base
$gray-700: #232336;
$gray-600: #2F2F47;
$gray-500: #4A4A66;
$gray-400: #6B6E85;
$gray-300: #9CA0B5;
$gray-200: #C9CCDB;
$gray-100: #E7E9F2;
$gray-50:  #F4F4FA;

// Brand — violet primary, blue secondary
$violet-600: #6D4DF2;
$violet-500: #7C5CFF;   // primary brand
$violet-400: #9D7BFF;
$violet-300: #B9A0FF;

$blue-500:   #4E8CFF;
$blue-400:   #6BA1FF;

// Accent — green is reserved for live/success
$green-500:  #4ADE9D;
$green-400:  #6BE8B0;

// States
$red-500:    #FF5C7A;
$amber-500:  #F5B544;
```

---

## Semantic tokens (these are what components use)

Exposed as CSS custom properties at `:root`:

```scss
:root {
  // Surfaces
  --bg-canvas:        #{$gray-950};
  --bg-surface:       #{$gray-900};
  --bg-elevated:      #{$gray-850};
  --bg-overlay:       rgba(24, 24, 38, 0.6);   // translucent glass

  // Borders — hairline, used everywhere
  --border-subtle:    rgba(255, 255, 255, 0.06);
  --border-default:   rgba(255, 255, 255, 0.10);
  --border-strong:    rgba(255, 255, 255, 0.16);
  --border-accent:    rgba(124, 92, 255, 0.40);

  // Text
  --text-primary:     #{$gray-50};
  --text-secondary:   #{$gray-300};
  --text-muted:       #{$gray-400};
  --text-inverse:     #{$gray-950};

  // Accents
  --accent-violet:    #{$violet-500};
  --accent-violet-soft: rgba(124, 92, 255, 0.16);
  --accent-blue:      #{$blue-500};
  --accent-green:     #{$green-500};   // ONLY for live/success indicators
  --accent-danger:    #{$red-500};

  // Gradients
  --gradient-brand:
    linear-gradient(135deg, #{$violet-500} 0%, #{$blue-500} 100%);
  --gradient-text:
    linear-gradient(135deg, #{$gray-50} 0%, #{$violet-300} 100%);
  --gradient-hero-glow:
    radial-gradient(60% 50% at 50% 0%,
      rgba(124, 92, 255, 0.28) 0%,
      rgba(78, 140, 255, 0.10) 35%,
      transparent 70%);
  --gradient-card-sheen:
    linear-gradient(180deg,
      rgba(255, 255, 255, 0.04) 0%,
      transparent 40%);

  // Shadows — soft, atmospheric, never harsh
  --shadow-card:
    0 1px 2px rgba(0, 0, 0, 0.35),
    0 8px 24px rgba(0, 0, 0, 0.25);
  --shadow-elevated:
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 20px 48px rgba(0, 0, 0, 0.45);
  --shadow-focus:
    0 0 0 2px var(--bg-canvas),
    0 0 0 4px var(--accent-violet);
  --shadow-glow-violet:
    0 0 40px rgba(124, 92, 255, 0.25);
}
```

---

## Spacing scale

4 px base unit, exponential where useful:

```scss
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;
}
```

---

## Radii

```scss
:root {
  --radius-sm:   8px;   // small chips, badges
  --radius-md:   12px;  // buttons, inputs
  --radius-lg:   16px;  // cards
  --radius-xl:   24px;  // hero panels, modals
  --radius-2xl:  32px;
  --radius-pill: 999px;
}
```

Never mix more than two radii in a single view.

---

## Typography

```scss
:root {
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;

  --text-xs:      12px;
  --text-sm:      14px;
  --text-base:    16px;
  --text-lg:      18px;
  --text-xl:      20px;
  --text-2xl:     24px;
  --text-3xl:     32px;
  --text-4xl:     44px;
  --text-display: 64px;

  --leading-tight:  1.15;
  --leading-snug:   1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;

  --tracking-tight: -0.02em;
  --tracking-snug:  -0.01em;
  --tracking-wide:  0.08em;
  --tracking-wider: 0.14em;
}
```

### Type roles

| Role             | Family   | Size              | Weight | Tracking          |
| ---------------- | -------- | ----------------- | ------ | ----------------- |
| Display          | display  | `--text-display`  | 600    | `--tracking-tight` |
| H1               | display  | `--text-4xl`      | 600    | `--tracking-tight` |
| H2               | display  | `--text-3xl`      | 600    | `--tracking-snug`  |
| H3               | display  | `--text-2xl`      | 500    | `--tracking-snug`  |
| Body             | body     | `--text-base`     | 400    | normal             |
| Body small       | body     | `--text-sm`       | 400    | normal             |
| Eyebrow / label  | body     | `--text-xs`       | 500    | `--tracking-wider`, `text-transform: uppercase` |
| Code             | mono     | `--text-sm`       | 400    | normal             |

Wide tracking only for eyebrows and small caps labels. Body text is never letter-spaced.

---

## Motion

```scss
:root {
  --duration-fast:  150ms;
  --duration-base:  240ms;
  --duration-slow:  400ms;

  --ease-standard:  cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:        cubic-bezier(0.4, 0, 1, 1);
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

Mobile-first only:

```scss
$breakpoints: (
  sm:  640px,
  md:  768px,
  lg:  1024px,
  xl:  1280px,
  2xl: 1440px
);

@mixin from($bp) {
  @media (min-width: map.get($breakpoints, $bp)) { @content; }
}
```

Usage: `@include from(md) { ... }`.

---

## Reusable mixins

```scss
// Glass panel — translucent surface with hairline border and blur
@mixin glass($alpha: 0.6) {
  background: rgba(17, 17, 29, $alpha);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
}

// Focus ring — used by all interactive elements
@mixin focus-ring {
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
    transition: box-shadow var(--duration-fast) var(--ease-standard);
  }
}

// Container — max-width with consistent gutters
@mixin container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--space-5);

  @include from(md) { padding-inline: var(--space-6); }
  @include from(lg) { padding-inline: var(--space-7); }
}
```

---

## Hard rules

1. Components **never** reference primitive `$gray-*` / `$violet-*` variables. Always semantic CSS variables.
2. Components **never** hardcode colors, radii, spacings, or durations.
3. `--accent-green` is reserved for live/success states. Never decorative.
4. Glass surfaces require depth behind them. Never apply `glass()` to a full-screen background.
5. No more than **two accent hues** per view (violet + blue is the default pair).
6. No heavy drop shadows (`rgba(0,0,0,0.5)` with 30 px blur). Shadows are atmospheric.
7. Light mode is **out of scope** for now. Do not author light-mode overrides until it lands on the roadmap.

---

## Future light mode

When light mode is introduced, override semantic tokens inside `[data-theme="light"]`. Primitives stay constant; only semantics flip. Do not duplicate the palette.
