# 🧠 State Management

Reusable patterns for managing application state across the **festiVal** Angular app.

## Purpose

Centralize how festival data, user preferences (favourites, filters), and UI state (loading, errors, modal visibility) are stored, mutated, and consumed across components.

## Scope

- Global stores for the festival catalogue (FIB, Arenal Sound, Medusa, Low Festival, SanSan, etc.).
- Local component state via Angular **Signals**.
- Cross-component communication via services with `BehaviorSubject` or `signal()`.
- Persistence of user filters (province, month, genre, price range) in `localStorage`.

## Recommended Approach

- **Signals first** for new code (Angular 17+).
- **NgRx SignalStore** when state crosses 3+ feature modules.
- **RxJS `BehaviorSubject`** only for streams that interop with external observables (HTTP, router events).

## Usage Guidelines

1. One store per bounded context (`festivalsStore`, `filtersStore`, `favouritesStore`).
2. Never mutate state outside store methods.
3. Selectors must be pure and memoized.
4. Hydrate persisted state on `APP_INITIALIZER`.

## Anti-patterns

- Storing derived values that can be computed from existing state.
- Sharing `Subject`s between unrelated components.
- Mixing template-driven local state with global stores.
