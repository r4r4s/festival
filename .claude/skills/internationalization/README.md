# 🌍 Internationalization (i18n)

Multi-language support for **festiVal**.

## Purpose

Although the primary language is **Spanish (es-ES)**, the architecture must accommodate **Valencian (ca-ES-valencia)** and **English (en-GB)** as roadmap items.

## Strategy

- Use **`@angular/localize`** for compile-time i18n OR **Transloco** for runtime switching — choose Transloco to enable user-selectable language without rebuilds.
- Translation files live in `src/assets/i18n/{es,ca,en}.json`.
- Keys follow dotted paths: `festival.detail.lineup.title`.

## Rules

- No hardcoded strings in templates or TS files.
- Dates formatted via Angular's `DatePipe` with the active `LOCALE_ID`.
- Currency in **EUR** via `CurrencyPipe`.
- Pluralization via ICU MessageFormat.

## Default Locale

`es-ES` is registered in `app.config.ts`:

```ts
registerLocaleData(localeEs);
```
