# Design & Responsive Validation

**MANDATORY** skill for any UI, layout, styling, component, page, or design-related change in **festiVAL**.

## Purpose

Guarantee two things on every UI task:

1. **Visual identity** — the result does not look like a generic AI-generated website; it feels handcrafted and aligned with the Mediterranean / festival identity of the Valencian Community.
2. **Responsive integrity** — the result works correctly across desktop, laptop, tablet, and mobile breakpoints, with mobile-first as the floor.

This skill is the contract behind both the design originality check and the final validation report attached to every UI-task completion.

## When to apply

Apply this skill **before, during, and after** any change that affects what the user sees:

- Templates (`.html`) of any component or page
- Component or global SCSS
- Layout decisions (grid, flex, spacing, breakpoints)
- New presentational components (in a feature's `ui/` or in `shared/ui/`)
- Theming or token changes that have visible effect
- Image, icon, motion, or accessibility-visible work

If the change is purely backend / data-access / config / docs, the skill does not apply.

Collaborates with: **vistas** (owner), **rendimiento** (CLS / responsive perf), **contenido** (microcopy fitting the design), and the [[theming-styling]], [[ui-components]], [[accessibility]] skills.

---

## Part 1 — Design originality

festiVAL must not look like a generic AI-generated website. Every new page, section, or component must carry a distinctive visual identity aligned with the festiVAL brand.

### Requirements

1. **Avoid generic SaaS layouts**, stock AI-looking interfaces, and predictable component arrangements (centered hero + 3-column features + testimonial slider + CTA strip).
2. **Prioritize custom composition** — visual hierarchy, spacing, alignment, and layout decisions should be deliberate, not template defaults.
3. **Strong sense of place** — designs must feel inspired by festivals, music, culture, energy, and the Mediterranean identity of the Valencian Community (sun, sand, coast, crowds, nightlife).
4. **No default ornaments** — never ship default linear gradients, vanilla hero sections, or untouched card grids. Customize composition, ratios, and treatments.
5. **Intentional sections** — each major section must have a clear visual purpose and feel deliberately designed, not space-filling.
6. **Creative tools** — use asymmetry, layered imagery, off-grid spacing, rotated/clipped frames, blended typography, and custom interactions where they earn their place.
7. **Handcrafted feel** — the UI must read as the work of a designer, not a template.
8. **Pre-implementation check** — before coding, ask yourself: "would a reasonable observer call this an AI-generated website?" If yes, redesign it.

### Anti-patterns to avoid

- Centered hero with bullet list + two pill buttons (the default LLM layout).
- 3-card row with identical icon + title + 2 lines of body.
- "Trusted by" logo strip without an editorial reason.
- Gradient buttons with default Bootstrap-like rounded corners and no context.
- Full-bleed `<section>` blocks stacked without rhythm changes.
- Generic FAQ accordions, generic pricing tables, generic testimonial cards.

### Design grounding for festiVAL

Anchor every decision in at least one of these:

- **Place**: Valencia / Alicante / Castellón coastline, summer light, festival venues.
- **Music**: line-ups, headliner hierarchy, scene energy.
- **Calendar**: temporality (days, months, "this summer"), countdowns, seasonality.
- **Catalogue**: the festival list as the spine of the product — never bury it.

When a screen does not anchor in any of these, it probably is too generic.

---

## Part 2 — Responsive validation

After completing any UI-related task, perform a responsive review **before** considering the task finished.

### Required breakpoints

| Tier    | Width        | What to check                                                |
| ------- | ------------ | ------------------------------------------------------------ |
| Desktop | ≥ 1440 px    | Editorial layout breathes; no orphaned whitespace.           |
| Laptop  | 1024–1439 px | Grid still works at the project's `lg` breakpoint.           |
| Tablet  | 768–1023 px  | Layout transition is intentional, not a squashed desktop.    |
| Mobile  | 320–480 px   | Mobile-first floor — 320 px must work without horizontal scroll. |

### Validation checklist

All items must pass at every breakpoint above:

- **No horizontal scrolling** at any breakpoint (`overflow-x` clean).
- **No overlapping elements** (z-index, positioning, sticky headers).
- **Images scale correctly** (`object-fit`, `aspect-ratio`, `NgOptimizedImage` `sizes` matches reality).
- **Typography readable** — minimum 14 px body on mobile; line-length ≤ 70ch on prose.
- **Navigation usable** — primary nav reachable; hamburger has visible affordance.
- **Touch targets ≥ 44 × 44 px** on mobile per WCAG.
- **Layout maintains visual quality** — no broken grid, no clipped content, no decorative element fighting copy.
- **Spacing and alignment consistent** — same `--fv-space-*` rhythm across breakpoints.
- **All content accessible and visible** — no copy hidden behind `display: none` that is required for understanding.

### Mobile-first principle

When in doubt, prioritize the mobile experience. Every new UI must work correctly on screens as small as **320 px wide**. Breakpoints up are progressive enhancements, never the default.

### How to validate

- **Cheap**: resize the browser through the four tiers, scrolling end-to-end at each.
- **Better**: use Chrome DevTools device toolbar at 320 / 480 / 768 / 1024 / 1440 px.
- **Best**: drive the running app with the `/verify` skill or Playwright at each viewport, and visually inspect.

The validation must be performed against the **running app**, not against the source code alone.

---

## Part 3 — Completion requirement

Every UI-related task must end with a **Design & Responsive Validation Report** in this exact format:

```
Design Originality: ✅ / ❌
Desktop (1440px+):  ✅ / ❌
Laptop (1024px+):   ✅ / ❌
Tablet (768px+):    ✅ / ❌
Mobile (320–480px): ✅ / ❌
Issues Found:
Fixes Applied:
```

Rules for the report:

- A task is **not considered complete** until both design originality **and all four breakpoints** are marked ✅.
- If any row is ❌, the task is unfinished — fix it, then re-run validation and re-emit the report.
- `Issues Found:` and `Fixes Applied:` must be filled in with concrete bullets, or written as `None.` when truly empty. Never omit them.
- The report appears in the final message of the task, after the summary of changes.

---

## Quick reference

| Step | Action |
| --- | --- |
| 1 | Before designing, ground the screen in place / music / calendar / catalogue. |
| 2 | Sketch composition (asymmetry, hierarchy, intentional sections). Reject generic templates. |
| 3 | Implement using `--fv-*` tokens and the `from()` breakpoint mixin. |
| 4 | Run the app and walk the four breakpoints. |
| 5 | Fix anything that fails the checklist. |
| 6 | Emit the Design & Responsive Validation Report. |
