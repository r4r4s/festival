# 🧭 Routing & Navigation

Conventions for Angular Router usage across **festiVal**.

## Purpose

Define a predictable, SEO-friendly URL structure and lazy-loading strategy for the festival portal.

## URL Schema

| Ruta                            | Vista                                  |
| ------------------------------- | -------------------------------------- |
| `/`                             | Home con festivales destacados         |
| `/festivales`                   | Listado completo + filtros             |
| `/festivales/:slug`             | Detalle de festival                    |
| `/festivales/:slug/cartel`      | Line-up completo                       |
| `/artistas/:slug`               | Ficha de artista                       |
| `/provincia/:provincia`         | Filtrado por Valencia/Alicante/Castellón |
| `/sobre-nosotros`               | Página estática                        |

## Patterns

- **Standalone components** + `loadComponent` for every route.
- **Route-level data resolvers** for festival detail pages to avoid template flicker.
- **Functional guards** (`CanMatchFn`) instead of class-based.
- Slugs are kebab-case and stable: `fib-benicassim`, `arenal-sound`, `medusa-festival`.

## Scroll & History

- `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`.
- Preserve filter state in query params so URLs are shareable.
