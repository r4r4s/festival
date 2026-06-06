# 📋 Backlog

Prioritized list of non-critical improvements, refactorings, and quality-of-life enhancements for future sprints.

---

## High Priority

### Performance
- [ ] Image optimization audit — Profile bundle, measure LCP per route, identify lazy-loading opportunities.
- [ ] CSS-in-JS review — Ensure no runtime style injection; all styles should be static SCSS.
- [ ] Service worker caching strategy — Define stale-while-revalidate vs. network-first policies per route.

### Testing
- [ ] E2E test suite (Playwright) — Core user flows: search, filter, navigate to detail, open map.
- [ ] A11y audit with `axe-core` — Verify WCAG 2.1 AA compliance across all pages.
- [ ] Component snapshot tests — Ensure visual regressions are caught.

### Developer Experience
- [ ] Storybook setup (optional) — Document component variants and interactions.
- [ ] Husky + lint-staged — Enforce linting on pre-commit without blocking full lint run.
- [ ] CI/CD pipeline (GitHub Actions) — Run lint + test on PR, deploy to staging on merge to develop.

---

## Medium Priority

### Features
- [ ] Festival comparison tool — Side-by-side comparison of 2–3 festivals.
- [ ] Sharing features — "Share festival" via social media, generate festival digest link.
- [ ] User ratings display — Show aggregate ratings for festivals (gating on Phase 3).
- [ ] Artist profiles — Dedicated artist pages with discography, upcoming festivals, links.

### UI/UX
- [ ] Loading states — Skeleton loaders, placeholders, Suspense-driven streaming.
- [ ] Empty states — Tailored messaging for no search results, no favorites, etc.
- [ ] Error boundaries — Graceful error recovery on HTTP failures, timeouts.
- [ ] Animations — Entrance animations (fade-up, slide-in), micro-interactions (ripples, focus rings).

### Infrastructure
- [ ] Sentry integration — Production error monitoring and alerting.
- [ ] Analytics dashboard — Track user journeys, search patterns, geographic distribution.
- [ ] Cloudflare Workers — Implement caching headers, security headers, rate limiting.

---

## Low Priority

### Nice-to-have
- [ ] Dark mode CSS variables audit — Ensure all colors use tokens, no hardcoded values.
- [ ] Font subsetting — Reduce Inter, Sora, JetBrains Mono to used character ranges.
- [ ] Manifest & install prompt — Customize PWA install dialog, app name, icon.
- [ ] Open Graph images — Auto-generate OG images per festival (dynamic via Canvas or Cloudinary).

### Documentation
- [ ] API reference — Sanity CMS schema documentation.
- [ ] Component library guide — Living style guide with variants and state examples.
- [ ] Migration guides — Document breaking changes and upgrade paths.

---

## Technical Debt

### Refactoring
- [ ] Review feature-sliced boundaries — Ensure no cross-feature imports are creeping in.
- [ ] Consolidate token naming — Audit for orphaned or renamed custom properties.
- [ ] Service simplification — Break down large services into single-responsibility units.

### Dependencies
- [ ] Audit transitive dependencies — Check for security vulnerabilities, unused packages.
- [ ] Update Angular ESLint rules — Stay current with v21+ recommendations.
- [ ] Review Zod schemas — Ensure runtime validation matches TS inference.

---

## Blocked / Waiting

(Items awaiting decisions, external blockers, or phase dependencies)

- [ ] Sanity CMS schema — Blocked on content model finalization.
- [ ] Authentication UX — Blocked on Phase 3 start (auth backend decision).
- [ ] Ticketing API integration — Blocked on Dice/Ticketmaster partnership agreement.

---

## Notes

- **Estimated effort**: High-priority items are 1–3 sprint cycles each. Medium-priority items are 3–8 cycles. Low-priority is nice-to-have, not blocking a release.
- **Ownership**: Backlog is maintained by the team and reviewed at sprint planning. Individual items are claimed by **prueba** (testing), **vistas** (UI), **sistemas** (architecture), **rendimiento** (performance), or **contenido** (editorial).
- **Last updated**: 2026-06-06
