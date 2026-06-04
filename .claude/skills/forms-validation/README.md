# 📝 Forms & Validation

Patterns for reactive forms used in search, filtering, and (future) authentication flows.

## Purpose

Centralize form construction, validation, and error messaging for **festiVal**.

## Use Cases

- Festival search bar (text, debounce 300 ms).
- Multi-criteria filter form (provincia, mes, género, rango de precio).
- Future: registration, login, profile, newsletter subscription, festival reviews.

## Conventions

- **Reactive Forms** only — no template-driven forms.
- Form groups typed with `FormGroup<...>` and explicit `FormControl<T>` generics.
- Validators composed from a shared `validators/` library.
- Async validators return `Observable<ValidationErrors | null>` and use `debounceTime`.

## Custom Validators (planned)

- `dniValidator` — Spanish DNI/NIE format.
- `dateRangeValidator` — `desde <= hasta`.
- `priceRangeValidator` — non-negative, `min <= max`.

## Error Display

- Single `<festival-form-error>` component reads control state and outputs i18n messages.
- Errors shown only after `touched || dirty`.
