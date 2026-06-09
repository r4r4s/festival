---
name: liquid-glass
description: >-
  Premium Liquid Glass visual system for festiVAL: semi-transparent surfaces with soft blur,
  layered depth, edge glow, and accessibility. Use when implementing glassmorphic components,
  card overlays, panels, or any translucent surface requiring premium appearance.
---

# 🌊 Liquid Glass

Premium Liquid Glass visual system for **festiVAL**.

## Purpose

Define how translucent, premium glass surfaces must be designed and implemented across the entire festiVAL application. The Liquid Glass system creates depth, atmospheric lighting, and a premium festival experience while remaining consistent with the existing design system.

This skill **builds on top of** the festiVAL design system (not replaces it). All colors, tokens, and effects are sourced from existing design tokens in `_tokens.scss` and `_semantic.scss`.

---

## Design Principles

### Glass Surface

- **Semi-transparent surfaces** with controlled opacity
- **Soft background blur** using `backdrop-filter`
- **Layered depth** through elevation and stacking
- **Premium appearance** via subtle refinement
- **Smooth edges** with consistent border radius
- **Subtle reflections** using highlight overlays

### Lighting

- **Soft edge glow** sourced from brand colors
- **Internal highlights** creating light refraction feeling
- **Atmospheric depth** through shadow and blur layering
- **Restrained brightness** avoiding harsh white overlays

### Visual Consistency

- **Consistent border radius** across all glass components
- **Consistent spacing** following the festiVAL spacing scale
- **Consistent elevation system** with semantic tokens
- **Consistent shadows** from the design system

### Restrictions

**Avoid:**

- Fake glossy Apple-style reflections
- Excessive blur (max 16px)
- Strong white overlays (max 0.04 opacity)
- Cheap glassmorphism effects
- Random gradients outside the design system
- Flat black blocks without translucency
- Neon colors or arbitrary hues

---

## Color System Rules (MANDATORY)

Liquid Glass components **MUST** use ONLY colors defined in the festiVAL Design System.

**Never introduce:**

- New accent colors
- RGB experiments outside the token system
- Random gradients
- Tailwind palettes
- Designer-created colors

### Allowed Colors

#### Primary Brand (Core Glass Sources)

- `#4E8CFF` — Primary Blue
- `#6BA1FF` — Secondary Blue
- `--fv-gradient-brand` — Linear gradient (Mediterranean + Primary Blue)

#### Neutral Palette

All colors defined in `_tokens.scss` and `_semantic.scss`:

```scss
$fv-gray-950: #07070C;    // canvas
$fv-gray-900: #0B0B14;    // surface
$fv-gray-850: #11111D;    // elevated
$fv-gray-800: #181826;    // overlay base
$fv-gray-700: #232336;
$fv-gray-600: #2F2F47;
$fv-gray-500: #4A4A66;
// ... and lighter grays
```

#### State Colors

- `#4ADE9D` — Success / Live indicators only
- `#FF5C7A` — Danger / Error
- `#F5B544` — Warning

#### Mediterranean Accent Colors

- `#FF4D4D` — Coral (reserved for future use)
- `#FF8A3D` — Orange (reserved for future use)
- `#2D9CDB` — Mediterranean Blue (secondary glass source)

### Preferred Liquid Glass Glow Sources (in order of preference)

1. `#4E8CFF` (Primary Blue — most common)
2. `#6BA1FF` (Secondary Blue)
3. `--fv-gradient-brand` (Brand gradient)
4. `--fv-gradient-hero-glow` (Hero radial glow)

### Forbidden Colors

**Never use:**

- Purple
- Magenta
- Pink
- Neon cyan
- Neon green
- Random gradients
- Colors not defined in `_tokens.scss`
- Colors not defined in `_semantic.scss`

The Liquid Glass implementation must always feel like a native part of festiVAL's visual identity.

---

## Before Implementation: Color Question (MANDATORY)

Before implementing any new Liquid Glass feature, ask the user:

**"Which festiVal accent should drive the glass effect?"**

Available options:

1. **Primary Blue** (`#4E8CFF`) — **Default**
2. **Secondary Blue** (`#6BA1FF`)
3. **Brand Gradient** (`--fv-gradient-brand`)
4. **Mediterranean Blue** (`#2D9CDB`)

If no color is specified, always use:

- **`#4E8CFF`** (Primary Blue) as the default accent

---

## CSS / SCSS Guidelines

### Reusable Design Tokens

Create reusable design tokens for the following properties. Add them to `src/styles/_semantic.scss` under a `/* --- Liquid Glass --- */` section:

```scss
// Glass base opacity and blur
--fv-glass-alpha:        0.6;      // 60% opacity
--fv-glass-blur:         16px;     // backdrop blur
--fv-glass-saturate:     140%;     // color saturation boost

// Glass borders and overlays
--fv-glass-border:       1px solid var(--fv-border-subtle);
--fv-glass-highlight:    rgba(255, 255, 255, 0.04);

// Glass shadows and elevation
--fv-glass-shadow-sm:    0 4px 12px rgba(0, 0, 0, 0.2);
--fv-glass-shadow-md:    0 8px 24px rgba(0, 0, 0, 0.3);
--fv-glass-shadow-lg:    0 16px 40px rgba(0, 0, 0, 0.4);

// Glow effects (by accent color)
--fv-glass-glow-blue:    0 0 20px rgba(78, 140, 255, 0.2);
--fv-glass-glow-med:     0 0 20px rgba(45, 156, 219, 0.2);
```

### Prefer CSS Variables and Semantic Tokens

**Always:**

- Use CSS variables (`--fv-*`)
- Use semantic tokens from `_semantic.scss`
- Reference design tokens in `_tokens.scss`
- Keep values DRY and maintainable

**Never:**

- Hardcode color values in components
- Hardcode blur or opacity values
- Duplicate SCSS across components
- Use magic numbers for spacing or radius

---

## Utility File

Create or update: **`src/styles/utilities/_liquid-glass.scss`**

This file contains reusable utility classes for glass effects. Each utility should be minimal, composable, and prefix-namespaced with `.liquid-glass-*`.

### Base Utilities

```scss
// --- Liquid Glass Base Effect ---

.liquid-glass {
  background: rgba($fv-gray-850, var(--fv-glass-alpha));
  border: var(--fv-glass-border);
  backdrop-filter: blur(var(--fv-glass-blur)) saturate(var(--fv-glass-saturate));
  -webkit-backdrop-filter: blur(var(--fv-glass-blur)) saturate(var(--fv-glass-saturate));
}

// --- Liquid Glass Card ---
// Use for elevated card surfaces, modals, popovers

.liquid-glass-card {
  @extend .liquid-glass;
  border-radius: var(--fv-radius-2);
  box-shadow: var(--fv-glass-shadow-md);
  padding: var(--fv-space-4);
}

// --- Liquid Glass Button ---
// Use for interactive glass buttons with hover states

.liquid-glass-button {
  @extend .liquid-glass;
  border-radius: var(--fv-radius-1);
  padding: var(--fv-space-3) var(--fv-space-4);
  cursor: pointer;
  transition: 
    background-color var(--fv-duration-fast) var(--fv-ease-standard),
    box-shadow var(--fv-duration-fast) var(--fv-ease-standard);
  
  &:hover {
    background: rgba($fv-gray-850, calc(var(--fv-glass-alpha) + 0.05));
    box-shadow: var(--fv-glass-glow-blue);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: var(--fv-shadow-focus);
  }
}

// --- Liquid Glass Panel ---
// Use for information panels, sidebar sections, detail views

.liquid-glass-panel {
  @extend .liquid-glass;
  border-radius: var(--fv-radius-2);
  box-shadow: var(--fv-glass-shadow-sm);
  padding: var(--fv-space-5);
}

// --- Liquid Glass Map Overlay ---
// Use for overlays on maps, full-screen backgrounds (with depth layer behind)

.liquid-glass-map-overlay {
  @extend .liquid-glass;
  border-radius: var(--fv-radius-2);
  box-shadow: var(--fv-glass-shadow-lg);
  position: absolute;
  backdrop-filter: blur(var(--fv-glass-blur)) saturate(var(--fv-glass-saturate));
}

// --- Glow Variants (Add to any glass utility) ---

.liquid-glass--glow-blue {
  box-shadow: var(--fv-glass-glow-blue);
}

.liquid-glass--glow-med {
  box-shadow: var(--fv-glass-glow-med);
}

// --- Highlight Layer (Premium shine effect) ---

.liquid-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: var(--fv-glass-highlight);
  border-radius: inherit;
  pointer-events: none;
}
```

Import this utility file in `src/styles/styles.scss`:

```scss
@use 'utilities/liquid-glass';
```

---

## Angular Rules

When implementing Liquid Glass in Angular:

### Component Structure

```typescript
// ✓ DO: Use utility classes
<div class="liquid-glass-card">
  <h3>Festival Lineup</h3>
  <p>Artists for this year's event</p>
</div>

// ✓ DO: Extend utilities with BEM modifiers
<button class="liquid-glass-button liquid-glass--glow-blue">
  View Details
</button>

// ✗ DON'T: Create component-specific styles
.my-custom-glass {
  background: rgba(17, 17, 29, 0.6);
  backdrop-filter: blur(16px);
  // — duplicates .liquid-glass
}
```

### Best Practices

- **Reuse utility classes** — avoid duplicating `.liquid-glass` across components
- **Reuse design tokens** — never hardcode values
- **Prefer shared utilities** — if a glass style is used in multiple components, add it to `_liquid-glass.scss`
- **Avoid component-specific SCSS** — unless absolutely necessary for layout or positioning
- **Follow existing project architecture** — use `@shared/ui` for reusable glass components

---

## Accessibility Rules

**Always:**

- Maintain **WCAG 2.1 AA** contrast ratios
- Preserve **readability** over visual effects
- Keep **focus indicators visible** and prominent
- Support **keyboard navigation** for all interactive glass elements
- Test with screen readers for glass overlays / modals

### Contrast Checking

If a glass surface reduces text contrast:

1. **Increase opacity** of the glass background
2. **Reduce blur** amount
3. **Adjust text color** (use `--fv-text-primary` for primary text)
4. **Add a background layer** behind text if necessary

**Accessibility always takes priority over visual effects.**

### Testing

- Use `axe-core` to verify contrast
- Test with zoom levels 200% and 400%
- Verify focus states are clearly visible
- Test with keyboard navigation only
- Test with screen reader (VoiceOver, NVDA, Jaws)

---

## Safari Compatibility

Liquid Glass uses `backdrop-filter` and sometimes `color-mix()` — both require explicit Safari handling.

### backdrop-filter (MANDATORY)

**Always** declare `-webkit-backdrop-filter` before `backdrop-filter`:

```scss
// ✓ Correct
-webkit-backdrop-filter: blur(var(--fv-glass-blur)) saturate(var(--fv-glass-saturate));
backdrop-filter: blur(var(--fv-glass-blur)) saturate(var(--fv-glass-saturate));

// ✗ Wrong — glass effect invisible in Safari
backdrop-filter: blur(16px);
```

The `glass()` mixin in `_mixins.scss` already handles this. Use it whenever possible instead of writing `backdrop-filter` directly.

### color-mix() fallbacks

`color-mix(in srgb, …)` requires Safari 16.2+. When using it inside Liquid Glass components, always declare a static `rgba()` fallback on the same property **before** the `color-mix()` line:

```scss
// ✓ Correct cascade pattern — last valid rule wins
background: rgba(17, 17, 29, 0.6);   // Safari < 16.2 fallback
background: color-mix(in srgb, var(--fv-bg-elevated) 60%, transparent); // modern

// ✓ For dynamic CSS variables (--var inside color-mix) use @supports
background: var(--fv-bg-elevated);   // flat fallback

@supports (color: color-mix(in srgb, red 50%, blue)) {
  background: color-mix(in srgb, var(--fv-bg-elevated) 60%, transparent);
}
```

Use the hex reference table in `src/styles/_safari-compat.scss` to find the static rgba values for each semantic token.

### filter: blur() transition

When transitioning `blur()` off, use `blur(0px)` not `blur(0)` for smoother Safari rendering:

```scss
// ✓ Correct
.card--active { filter: blur(0px); }

// ✗ May stutter in Safari
.card--active { filter: blur(0); }
```

---

## Performance Rules

Avoid expensive rendering. Liquid Glass effects rely on `backdrop-filter`, which is hardware-accelerated but can be costly if overused.

### Rules

- **Use backdrop-filter sparingly** — limit to 3–4 glass layers on screen at once
- **Blur only important surfaces** — use lower blur values (12px instead of 20px) for less critical elements
- **Never animate blur values** — animate only `transform` and `opacity` instead
- **Animate transform and opacity** — these properties use GPU acceleration
- **Test on desktop and mobile** — verify performance on low-end devices
- **Avoid stacking many glass layers** — 2–3 layers max in any viewport

### Performance Checklist

- [ ] Run Lighthouse on deployed page
- [ ] Verify no jank on `blur` application
- [ ] Test on mobile (iOS Safari, Chrome Android)
- [ ] Measure FCP, LCP, CLS with performance tools
- [ ] Ensure bundle size doesn't increase

Liquid Glass must remain performant and smooth.

---

## Implementation Examples

### Example 1: Festival Card with Glass Effect

**HTML Template:**

```html
<article class="liquid-glass-card festival-card">
  <div class="festival-card__header">
    <h3 class="festival-card__title">Bigsound Festival 2026</h3>
    <span class="festival-card__date">12 – 16 jul</span>
  </div>
  <p class="festival-card__description">
    The main electronic music festival in Valencia
  </p>
  <footer class="festival-card__footer">
    <span class="festival-card__price">Desde €45</span>
    <a href="/festivales/bigsound" class="festival-card__link">
      View Details
    </a>
  </footer>
</article>
```

**Component Styles:**

```scss
.festival-card {
  display: flex;
  flex-direction: column;
  gap: var(--fv-space-3);
  max-width: 300px;
  color: var(--fv-text-primary);
  transition: transform var(--fv-duration-standard) var(--fv-ease-standard);

  &:hover {
    transform: translateY(-4px);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: var(--fv-space-3);
  }

  &__title {
    font-size: var(--fv-font-lg);
    font-weight: 600;
    margin: 0;
  }

  &__date {
    font-size: var(--fv-font-sm);
    color: var(--fv-text-secondary);
  }

  &__description {
    margin: 0;
    color: var(--fv-text-secondary);
    line-height: var(--fv-line-height-relaxed);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  &__price {
    font-weight: 600;
    color: var(--fv-accent-blue);
  }

  &__link {
    padding: var(--fv-space-2) var(--fv-space-3);
    color: var(--fv-accent-blue);
    text-decoration: none;
    font-size: var(--fv-font-sm);
    border-radius: var(--fv-radius-1);
    transition: background-color var(--fv-duration-fast) var(--fv-ease-standard);

    &:hover {
      background: rgba(78, 140, 255, 0.1);
    }

    &:focus-visible {
      outline: 2px solid var(--fv-accent-blue);
      outline-offset: 2px;
    }
  }
}
```

---

### Example 2: Map Overlay Panel

**HTML Template:**

```html
<div class="map-container">
  <div id="festival-map"></div>
  <div class="liquid-glass-map-overlay map-info">
    <h4 class="map-info__title">Cullera, Valencia</h4>
    <p class="map-info__description">
      Medusa Festival & Zevra Festival take place here
    </p>
    <button class="liquid-glass-button map-info__action">
      Explore Venue
    </button>
  </div>
</div>
```

**Component Styles:**

```scss
.map-container {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: var(--fv-radius-2);
  overflow: hidden;

  #festival-map {
    width: 100%;
    height: 100%;
  }
}

.map-info {
  bottom: var(--fv-space-5);
  right: var(--fv-space-5);
  max-width: 320px;
  z-index: 10;

  &__title {
    margin: 0 0 var(--fv-space-2) 0;
    font-size: var(--fv-font-md);
    font-weight: 600;
    color: var(--fv-text-primary);
  }

  &__description {
    margin: 0 0 var(--fv-space-3) 0;
    font-size: var(--fv-font-sm);
    color: var(--fv-text-secondary);
    line-height: var(--fv-line-height-relaxed);
  }

  &__action {
    width: 100%;
    justify-content: center;
  }
}
```

---

### Example 3: Filter Panel with Glass Background

**HTML Template:**

```html
<aside class="liquid-glass-panel filter-panel">
  <h2 class="filter-panel__title">Filters</h2>
  
  <fieldset class="filter-panel__group">
    <legend class="filter-panel__legend">Province</legend>
    <label class="filter-panel__option">
      <input type="checkbox" name="province" value="valencia" />
      Valencia
    </label>
    <label class="filter-panel__option">
      <input type="checkbox" name="province" value="alicante" />
      Alicante
    </label>
  </fieldset>

  <fieldset class="filter-panel__group">
    <legend class="filter-panel__legend">Genre</legend>
    <label class="filter-panel__option">
      <input type="checkbox" name="genre" value="electronic" />
      Electronic
    </label>
    <label class="filter-panel__option">
      <input type="checkbox" name="genre" value="indie" />
      Indie
    </label>
  </fieldset>
</aside>
```

**Component Styles:**

```scss
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: var(--fv-space-4);

  &__title {
    margin: 0;
    font-size: var(--fv-font-lg);
    font-weight: 600;
    color: var(--fv-text-primary);
  }

  &__group {
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--fv-space-2);
  }

  &__legend {
    font-size: var(--fv-font-sm);
    font-weight: 600;
    color: var(--fv-text-secondary);
    margin-bottom: var(--fv-space-2);
  }

  &__option {
    display: flex;
    align-items: center;
    gap: var(--fv-space-2);
    cursor: pointer;
    color: var(--fv-text-primary);
    font-size: var(--fv-font-sm);

    input[type="checkbox"] {
      cursor: pointer;
      accent-color: var(--fv-accent-blue);

      &:focus-visible {
        outline: 2px solid var(--fv-accent-blue);
        outline-offset: 2px;
      }
    }
  }
}
```

---

### Example 4: Hero Section with Glass Overlay

**HTML Template:**

```html
<section class="hero-section">
  <div class="hero-section__background" style="background-image: url('/path/to/festival-poster.jpg')"></div>
  
  <div class="liquid-glass-panel hero-section__overlay hero-section__overlay--glow-blue">
    <h1 class="hero-section__title">Bigsound Festival 2026</h1>
    <p class="hero-section__subtitle">Europe's Most Electric Summer Festival</p>
    <button class="liquid-glass-button hero-section__cta">
      Discover Lineup
    </button>
  </div>
</section>
```

**Component Styles:**

```scss
.hero-section {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: var(--fv-radius-3);

  &__background {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;

    &--glow-blue {
      box-shadow: var(--fv-glass-glow-blue);
    }
  }

  &__title {
    margin: 0 0 var(--fv-space-2) 0;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--fv-text-primary);
    max-width: 600px;
  }

  &__subtitle {
    margin: 0 0 var(--fv-space-4) 0;
    font-size: var(--fv-font-lg);
    color: var(--fv-text-secondary);
    max-width: 500px;
  }

  &__cta {
    align-self: flex-start;
  }

  @media (max-width: 768px) {
    height: 350px;

    &__title {
      font-size: clamp(1.5rem, 4vw, 2rem);
    }

    &__subtitle {
      font-size: var(--fv-font-md);
    }
  }
}
```

---

### Example 5: Component Using Liquid Glass in Angular

**TypeScript Component:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'fv-festival-spotlight',
  standalone: true,
  template: `
    <article class="liquid-glass-card spotlight-card">
      <img
        ngSrc="festival-poster.jpg"
        alt="Festival Poster"
        width="300"
        height="300"
        class="spotlight-card__image"
      />
      <div class="spotlight-card__content">
        <h3 class="spotlight-card__title">{{ festival.nombre }}</h3>
        <p class="spotlight-card__genre">{{ festival.generos.join(', ') }}</p>
        <p class="spotlight-card__dates">
          {{ festival.fechaInicio | date: 'd MMM' }} –
          {{ festival.fechaFin | date: 'd MMM yyyy' }}
        </p>
        <a
          [routerLink]="['/festivales', festival.slug]"
          class="liquid-glass-button spotlight-card__link"
        >
          Explore Festival
        </a>
      </div>
    </article>
  `,
  styles: [`
    .spotlight-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--fv-space-4);
      max-width: 600px;

      &__image {
        border-radius: var(--fv-radius-2);
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--fv-space-2);
      }

      &__title {
        margin: 0;
        font-size: var(--fv-font-lg);
        font-weight: 600;
        color: var(--fv-text-primary);
      }

      &__genre {
        margin: 0;
        font-size: var(--fv-font-sm);
        color: var(--fv-accent-blue);
        font-weight: 500;
      }

      &__dates {
        margin: 0;
        font-size: var(--fv-font-sm);
        color: var(--fv-text-secondary);
      }

      &__link {
        margin-top: var(--fv-space-2);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FestivalSpotlightComponent {
  festival = {
    nombre: 'Medusa Festival',
    slug: 'medusa',
    generos: ['electronic', 'techno', 'house'],
    fechaInicio: '2026-07-23',
    fechaFin: '2026-07-25'
  };
}
```

---

## Do / Don't Examples

### DO

- ✓ Use layered translucent surfaces with depth
- ✓ Use subtle blue edge glow from the design system
- ✓ Use semantic design tokens (`--fv-*`)
- ✓ Use consistent spacing from `--fv-space-*`
- ✓ Use consistent radius values from `--fv-radius-*`
- ✓ Reuse utility classes from `_liquid-glass.scss`
- ✓ Follow festiVAL branding (blue, navy, Mediterranean)
- ✓ Test accessibility and performance
- ✓ Document custom modifications in component comments

### DON'T

- ✗ Use pure black cards without translucency
- ✗ Use strong white overlays (alpha > 0.1)
- ✗ Use random colors outside the design system
- ✗ Use random gradients or hand-crafted colors
- ✗ Use excessive blur (> 20px)
- ✗ Use neon palettes or bright accents
- ✗ Duplicate `.liquid-glass` styles across components
- ✗ Hardcode colors, spacing, or radius values
- ✗ Animate `backdrop-filter` blur
- ✗ Stack more than 3 glass layers in a viewport

---

## Final Review Checklist

Before completing any Liquid Glass implementation, verify:

- [ ] **Uses only festiVal colors** — all colors sourced from `_tokens.scss` or `_semantic.scss`
- [ ] **Uses shared utility classes** — no duplication of `.liquid-glass` patterns
- [ ] **Uses design tokens** — no hardcoded values for colors, spacing, or radius
- [ ] **Uses semantic variables** — all CSS variables follow the `--fv-*` namespace
- [ ] **Maintains accessibility** — WCAG 2.1 AA contrast verified
- [ ] **Maintains performance** — tested on desktop and mobile, no jank observed
- [ ] **Matches premium aesthetic** — translucent depth, soft glow, refined appearance
- [ ] **Matches existing UI** — consistent with other glass components
- [ ] **Does not introduce new visual language** — uses only existing patterns
- [ ] **Feels consistent with festiVal identity** — blue, navy, Mediterranean theme

---

## Related Skills

- [[theming-styling]] — Design tokens, primitive and semantic variables, color system
- [[ui-components]] — Reusable component catalogue
- [[design-responsive-validation]] — Responsive checks, visual consistency across breakpoints
- [[accessibility]] — WCAG compliance, contrast, keyboard navigation
- [[performance-optimization]] — Core Web Vitals, bundle size, rendering performance
