# ♿ Accessibility (a11y)

WCAG 2.1 AA compliance for the **festiVal** portal.

## Purpose

Ensure every user — including those using screen readers, keyboard navigation, or with visual impairments — can browse festivals, read line-ups, and use filters.

## Checklist

- **Semantic HTML**: `<nav>`, `<main>`, `<article>`, `<section>` instead of `<div>` soup.
- **Headings hierarchy**: single `<h1>` per route, no skipped levels.
- **Color contrast**: ≥ 4.5:1 for body, ≥ 3:1 for large text. Tokens defined in [[theming-styling]].
- **Focus states**: visible outlines, never `outline: none` without replacement.
- **Keyboard**: every interactive element reachable via `Tab`; modals trap focus.
- **ARIA**: only when semantic HTML is insufficient. Prefer `aria-label`, `aria-current`, `aria-expanded`.
- **Live regions**: search results count announced via `aria-live="polite"`.
- **Alt text**: festival posters get descriptive alt (`"Cartel de FIB 2026"`), decorative images get `alt=""`.
- **Forms**: every input has an associated `<label>`.

## Automated Checks

- `axe-core` integrated into Playwright suite.
- ESLint plugin `eslint-plugin-jsx-a11y` adapted for Angular templates via `@angular-eslint/template`.
