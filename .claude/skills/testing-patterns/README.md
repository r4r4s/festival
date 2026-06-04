# 🧪 Testing Patterns

Conventions for unit, component, and end-to-end tests in **festiVal**.

## Layers

| Layer        | Tooling                         | Scope                                  |
| ------------ | ------------------------------- | -------------------------------------- |
| Unit         | Vitest / Jasmine                | Services, pipes, pure functions        |
| Component    | Angular Testing Library         | Component DOM + interaction            |
| E2E          | Playwright                      | Full user journeys                     |
| Visual       | Storybook + Chromatic (opt.)    | Design-system regressions              |

## Rules

- One spec file per source file, co-located.
- Mock `HttpClient` with `provideHttpClientTesting()`.
- Never assert against translation strings directly — assert against i18n keys or `data-testid`.
- Each component must have at least one rendering test and one interaction test.

## E2E Smoke Suite

1. Load home → see at least one featured festival.
2. Open `/festivales` → filter by *Provincia: Castellón* → result includes FIB.
3. Open FIB detail → line-up section renders headliners.
4. Search by artist name → matching festival appears.

## Coverage Targets

- Services: 90%+
- Components: 70%+
- Overall: 80%+
