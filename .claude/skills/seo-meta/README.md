# 🔎 SEO & Meta

Search engine optimization for **festiVal**.

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

- **Title**: `{nombreFestival} {año} — Cartel, fechas y entradas | festiVal`
- **Description**: `Descubre toda la información del {nombre}: fechas, ubicación en {ciudad}, cartel completo y precios.`

## Hreflang (future)

When Valencian and English are introduced, emit `hreflang` alternates for each locale.
