# 🛑 Error Handling

Unified error capture, presentation, and reporting for **festiVAL**.

## Purpose

Make failures (network, validation, runtime) predictable for the user and observable for the developer.

## Layers

1. **HTTP errors** — normalized by an `HttpErrorInterceptor` into a `FestivalError` shape:
   ```ts
   interface FestivalError {
     code: 'NETWORK' | 'NOT_FOUND' | 'SERVER' | 'VALIDATION';
     message: string;        // i18n key
     correlationId?: string;
     issues?: { path: string; message: string }[];  // populated for Zod failures
   }
   ```
   `ZodError` instances thrown by [[api-integration]] are caught here and mapped to `code: 'VALIDATION'`. Issue paths go into Sentry, never to the user.
2. **Global runtime errors** — handled by a custom `ErrorHandler` that logs to console in dev and forwards to **Sentry** in production.
3. **Form errors** — surfaced inline via the [[forms-validation]] skill.
4. **Route errors** — `/404` and `/error` routes with friendly Spanish messaging.

## User-Facing Messages

- Never expose stack traces.
- Always provide a recovery action ("Reintentar", "Volver al inicio").
- Use the `<festival-toast>` component for transient errors.

## Observability

- **Sentry** is the canonical frontend error monitor. Initialized in `app.config.ts`, gated by `environment.production`.
- Tag every event with `route`, `locale`, and (when available) `festivalSlug` for triage.
- Use Sentry's `beforeSend` to drop noisy errors (extension-injected scripts, cancelled navigations) so the event budget is spent on real bugs.
- Source maps uploaded at build time via the Sentry CLI in the Cloudflare Pages deploy step.
