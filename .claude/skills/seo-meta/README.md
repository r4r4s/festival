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
