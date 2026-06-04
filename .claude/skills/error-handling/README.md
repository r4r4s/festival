# 🛑 Error Handling

Unified error capture, presentation, and reporting for **festiVal**.

## Purpose

Make failures (network, validation, runtime) predictable for the user and observable for the developer.

## Layers

1. **HTTP errors** — normalized by an `HttpErrorInterceptor` into a `FestivalError` shape:
   ```ts
   interface FestivalError {
     code: 'NETWORK' | 'NOT_FOUND' | 'SERVER' | 'VALIDATION';
     message: string;        // i18n key
     correlationId?: string;
   }
   ```
2. **Global runtime errors** — handled by a custom `ErrorHandler` that logs to console in dev and to the monitoring endpoint in production.
3. **Form errors** — surfaced inline via the [[forms-validation]] skill.
4. **Route errors** — `/404` and `/error` routes with friendly Spanish messaging.

## User-Facing Messages

- Never expose stack traces.
- Always provide a recovery action ("Reintentar", "Volver al inicio").
- Use the `<festival-toast>` component for transient errors.

## Observability (future)

- Integrate Sentry or a self-hosted alternative.
- Tag events with route, user locale, and festival slug for triage.
