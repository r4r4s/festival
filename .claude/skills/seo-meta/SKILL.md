---
name: seo-meta
description: >-
  Discoverability for festiVAL: per-route title and description, JSON-LD Event schema, canonicals,
  sitemap, Open Graph and hreflang. Use when adding a route, changing page metadata or structured
  data, or working on organic search.
---

# 🔎 SEO & Meta

Search engine optimization for **festiVAL**.

## Purpose

Make every festival page discoverable through organic search for queries like "festivales Valencia 2026", "cartel FIB", or "Arenal Sound entradas".

## Tactics

- **Angular SSR / prerender** for `/festivales` and `/festivales/:slug`.
- **`Title` + `Meta` services** updated per route via a route data resolver.
- **Open Graph + Twitter Cards** for social sharing of festival cards.
- **JSON-LD structured data**: `Event` schema with `location`, `startDate`, `endDate`, `performer`, `offers`.
- **Canonical URLs** to avoid duplicate content with filter query params.
- **`sitemap.xml`** generated at build time from the festival catalogue.
- **`robots.txt`** allowing all crawlers; disallow `/admin` (future).

## Per-Festival Meta Template

- **Title**: `{nombreFestival} {año} — Cartel, fechas y entradas | festiVAL`
- **Description**: `Descubre toda la información del {nombre}: fechas, ubicación en {ciudad}, cartel completo y precios.`
- **OG image**: `1200×630` WebP, served from `src/assets/images/og-*.webp` (built by the [[performance-optimization]] converter pipeline) or from the Sanity CDN with `?fm=webp&w=1200&q=80`. Never PNG / JPEG.

## Hreflang (future)

When Valencian and English are introduced, emit `hreflang` alternates for each locale.

---

## Examples

### Title + Meta — ResolveFn for festival detail

```ts
// src/app/features/festival-detail/data-access/festival-meta.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { FestivalService } from '@shared/data-access/festival.service';
import { firstValueFrom } from 'rxjs';

export const festivalMetaResolver: ResolveFn<void> = async (route) => {
  const title   = inject(Title);
  const meta    = inject(Meta);
  const service = inject(FestivalService);

  const f = await firstValueFrom(service.getBySlug(route.params['slug']));
  const year = new Date(f.fechaInicio).getFullYear();

  title.setTitle(
    `${f.nombre} ${year} — Cartel, fechas y entradas | festiVAL`,
  );
  meta.updateTag({
    name: 'description',
    content: `Descubre toda la información del ${f.nombre}: fechas, ubicación en ${f.ciudad}, cartel completo y precios desde ${f.precioDesde} €.`,
  });
  meta.updateTag({ property: 'og:title',       content: `${f.nombre} ${year} | festiVAL` });
  meta.updateTag({ property: 'og:description', content: `${f.ciudad} · desde ${f.precioDesde} €` });
  meta.updateTag({ property: 'og:image',       content: f.poster.src });
  meta.updateTag({ property: 'og:type',        content: 'event' });
};
```

```ts
// Wired in festival-detail.routes.ts
export const FESTIVAL_DETAIL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/festival-detail.page').then(m => m.FestivalDetailPageComponent),
    resolve: { meta: festivalMetaResolver },
  },
];
```

### JSON-LD — Event schema injected from the page component

```ts
// src/app/features/festival-detail/feature/festival-detail.page.ts
import { DOCUMENT } from '@angular/common';

@Component({ /* ... */ })
export class FestivalDetailPageComponent implements OnInit {
  private readonly doc     = inject(DOCUMENT);
  private readonly festival = input.required<Festival>();

  ngOnInit(): void {
    this.injectJsonLd(this.festival());
  }

  private injectJsonLd(f: Festival): void {
    const script = this.doc.createElement('script');
    script.type  = 'application/ld+json';
    script.text  = JSON.stringify({
      '@context':  'https://schema.org',
      '@type':     'MusicEvent',
      name:        f.nombre,
      startDate:   f.fechaInicio,
      endDate:     f.fechaFin,
      location: {
        '@type':  'Place',
        name:     f.ciudad,
        geo: { '@type': 'GeoCoordinates', latitude: f.ubicacion.lat, longitude: f.ubicacion.lng },
      },
      performer: f.cartel.map(a => ({ '@type': 'MusicGroup', name: a.nombre })),
      offers: {
        '@type':         'Offer',
        price:           f.precioDesde,
        priceCurrency:   'EUR',
        url:             f.urlOficial,
        availability:    'https://schema.org/InStock',
      },
      image:     f.poster.src,
      url:       f.urlOficial,
      eventStatus: 'https://schema.org/EventScheduled',
    });
    this.doc.head.appendChild(script);
  }
}
```

### Canonical URL — set in app shell or resolver

```ts
// Avoid duplicate-content penalties from filter query params
meta.updateTag({
  rel: 'canonical',
  href: `https://festivalapp.com/festivales/${f.slug}`,
});
```

## Related skills

- [[performance-optimization]]
- [[internationalization]]
- [[routing-navigation]]
