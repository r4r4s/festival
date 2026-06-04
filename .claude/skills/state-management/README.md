# 🧠 State Management

Reusable patterns for managing application state across the **festiVal** Angular app.

## Purpose

Centralize how festival data, user preferences (favourites, filters), and UI state (loading, errors, modal visibility) are stored, mutated, and consumed.

## Where stores live

State follows the feature-sliced structure (see [[project-structure]]):

- **Feature-local state** → `features/<feature>/data-access/<name>.store.ts`. Example: `filters.store.ts` inside `festival-list/`.
- **Cross-feature state** → `@shared/data-access/<name>.store.ts`. Example: the festival catalogue, consumed by `home`, `festival-list`, and `festival-detail`.

A store starts feature-local and is promoted to `@shared/data-access/` the moment a **second** feature needs it — never earlier.

## Scope

- The festival catalogue store (FIB, Arenal Sound, Medusa, Low Festival, SanSan, etc.).
- Local component state via Angular **Signals**.
- Persistence of user filters and favourites across sessions.

## Recommended approach

- **Signals first** for new code. `signal()`, `computed()`, `effect()`.
- **NgRx SignalStore** when state crosses **3 or more features** or needs structured methods + computed selectors at scale.
- **RxJS `BehaviorSubject`** only for streams that interop with external observables (HTTP, router events) — never as the primary cross-component channel.

## Catalogue hydration

The catalogue comes from **Sanity** (see [[api-integration]]). The store is hydrated once, early, and cached for the session:

1. `APP_INITIALIZER` (in `core/initializers/`) triggers `CatalogueStore.load()` before the first route renders.
2. The store holds the parsed `Festival[]` (already Zod-validated at the HTTP boundary).
3. Reads are synchronous Signals; no component re-fetches.
4. Invalidation: the catalogue is treated as immutable per session. A content update in Sanity is picked up on the next full load — there is no live websocket sync in the MVP.
5. On SSR, the store is populated server-side and **transferred to the client** via Angular's hydration state, so the client does not re-fetch.

## Persistence

User preferences survive reloads. Choose the mechanism by data shape (aligned with the roadmap's Personalization phase):

- **`localStorage`** — trivial scalar preferences: active theme, last selected province. Synchronous, tiny.
- **`idb-keyval` (IndexedDB)** — structured or larger data: the favourites set, cached filter combinations. Asynchronous, no 5 MB string limit.

Persistence is wired through the store, never read directly by components. Hydrate persisted state on `APP_INITIALIZER`; write through an `effect()` that mirrors the relevant signal.

## Usage guidelines

1. One store per bounded context (`CatalogueStore`, `FiltersStore`, `FavouritesStore`).
2. Never mutate state outside store methods.
3. Selectors (`computed`) must be pure.
4. Components read Signals and call store methods; they never hold a copy of store state.

## Anti-patterns

- Storing derived values that a `computed()` could produce from existing state.
- Sharing `Subject`s between unrelated components.
- Reading `localStorage` / IndexedDB directly from a component instead of through a store.
- A feature reaching into another feature's store (forbidden by the boundary rules — promote to `@shared/data-access/` instead).
