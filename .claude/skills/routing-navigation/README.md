# 🧭 Routing & Navigation

Conventions for Angular Router usage across **festiVAL**.

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

Routing is **two-level**, matching the feature-sliced structure (see [[project-structure]]):

- **App level** (`app.routes.ts`): each feature is lazy-loaded with `loadChildren` pointing at its `<feature>.routes.ts`. This is the chunk boundary.
  ```ts
  { path: 'festivales/:slug',
    loadChildren: () => import('@features/festival-detail/festival-detail.routes')
      .then(m => m.FESTIVAL_DETAIL_ROUTES) }
  ```
- **Feature level** (`<feature>.routes.ts`): the page component is lazy-loaded with `loadComponent`, and resolvers/guards are attached here.
  ```ts
  export const FESTIVAL_DETAIL_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./feature/festival-detail.page')
        .then(m => m.FestivalDetailPageComponent),
      resolve: { festival: festivalResolver } },
  ];
  ```
- **Route-level data resolvers** (`ResolveFn`) for festival detail pages to avoid template flicker and to feed SSR.
- **Functional guards** (`CanMatchFn`) instead of class-based.
- Slugs are kebab-case and stable: `fib-benicassim`, `arenal-sound`, `medusa-festival`.

## Scroll & History

- `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`.
- Preserve filter state in query params so URLs are shareable.
