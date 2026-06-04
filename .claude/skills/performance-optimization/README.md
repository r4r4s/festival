# ⚡ Performance Optimization

Guidelines to keep **festiVal** fast on mobile devices during festival season traffic spikes.

## Targets

- **LCP** < 2.5 s on 4G.
- **CLS** < 0.1.
- **TTI** < 3.5 s.
- Initial bundle < 250 KB gzipped.

## Techniques

- **OnPush** change detection everywhere.
- **Standalone components** + lazy `loadComponent` per route.
- **Image optimization** via `NgOptimizedImage` for festival posters/heroes.
- **Deferrable views** (`@defer`) for below-the-fold sections like the full line-up grid.
- **Signals** instead of `async` pipe where reactivity is local.
- **Pre-rendering / SSR** with Angular Universal for festival detail pages (SEO win too).
- HTTP caching at the service layer with stale-while-revalidate semantics.

## Auditing

- Run `npm run build -- --stats-json` and inspect with `webpack-bundle-analyzer`.
- Lighthouse CI in the deploy pipeline.
- Track Core Web Vitals via `web-vitals` library posting to the analytics endpoint.
