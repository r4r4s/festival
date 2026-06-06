# 🌍 Internationalization (i18n)

Multi-language support for **festiVAL**.

## Purpose

Although the primary language is **Spanish (es-ES)**, the architecture must accommodate additional locale files for every supported market without drifting in key structure.

## Strategy

- **Transloco** for runtime language switching — `@angular/localize` is rejected because it requires one build per locale, which clashes with our Cloudflare Pages deploy model.
- Translation files live in `src/assets/i18n/*.json`.
- Keys follow dotted paths: `festival.detail.lineup.title`.

## Date and number formatting

- **Dates** use **date-fns** with the active locale (`date-fns/locale/es`, `date-fns/locale/ca`, `date-fns/locale/en-GB`). A small `LocaleDatePipe` wraps `format()` so templates stay clean.
  - Festival date ranges follow the canonical pattern: `"12 – 16 jul 2026"` (en-dash, lowercase month, no leading zero).
  - Same-month ranges collapse the first month (`"12 – 16 jul"`); cross-month ranges spell both (`"30 jun – 4 jul"`).
- **Currency** in **EUR** via Angular's `CurrencyPipe` bound to `LOCALE_ID`.
- **Pluralization** via ICU MessageFormat through Transloco.

## Rules

- No hardcoded strings in templates or TS files.
- Date formatting **never** uses `Intl.DateTimeFormat` directly or `new Date().toLocaleString()` — always go through `date-fns` so output is identical across SSR and CSR.
- Currency through `CurrencyPipe`, never string interpolation with `€`.
- Locale files must stay in sync (every key present in `es.json`, even if non-Spanish locales hold placeholders). Owned by the **contenido** agent.

## Default Locale

`es-ES` is registered in `app.config.ts`:

```ts
registerLocaleData(localeEs);
```
