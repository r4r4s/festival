# 🌐 API Integration

Patterns for communicating with backend services that supply festival data.

## Purpose

Standardize HTTP communication for the **festiVal** portal — fetching festival listings, artist line-ups, venue information, and (in the future) ticketing partners like Dice or Ticketmaster.

## Scope

- Typed services built on `HttpClient`.
- Strongly-typed DTOs in `src/app/models/`.
- HTTP interceptors for auth tokens, error normalization, and request logging.
- Caching of read-only endpoints (festival catalogue rarely changes mid-session).

## Recommended Approach

- One service per resource: `FestivalService`, `ArtistService`, `VenueService`.
- Return `Observable<T>` or `Signal<T>` via `toSignal()`.
- Centralize the base URL in `environment.ts`.
- Use `HttpResourceRef` (Angular 19+) for declarative resources where possible.

## Conventions

- `GET /festivals` → list with pagination & filter query params.
- `GET /festivals/:slug` → detail page hydration.
- `GET /festivals/:slug/artists` → line-up.
- All endpoints return ISO-8601 dates; convert at the boundary.

## Error Handling

Delegated to the [[error-handling]] skill via an `HttpInterceptor`.
