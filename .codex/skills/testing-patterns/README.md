# 🧪 Testing Patterns

Conventions for unit, component, and end-to-end tests in **festiVAL**, and the **pre-commit gate** that enforces them.

## Layers

| Layer        | Tooling                       | Scope                                   | Runs on commit | Runs on CI |
| ------------ | ----------------------------- | --------------------------------------- | :------------: | :--------: |
| Unit         | Vitest                        | Services, pipes, stores, pure functions |       ✅       |     ✅     |
| Component    | Angular Testing Library       | Component DOM + interaction             |       ✅       |     ✅     |
| E2E          | Playwright                    | Full user journeys                      |       ❌       |     ✅     |
| Accessibility | axe-core inside Playwright    | WCAG 2.1 AA on critical routes          |       ❌       |     ✅     |
| Visual       | Storybook + Chromatic (opt.)  | Design-system regressions               |       ❌       |     ✅     |

**Vitest** is the only unit/component runner. Jasmine is **not** used.

---

## The pre-commit gate (NON-NEGOTIABLE)

Every commit that touches code in `src/` MUST pass the following gate **before** `git commit` is invoked. This applies to humans, Claude, and CI alike.

### The gate

```bash
npm run lint && npm test -- --run
```

- `npm run lint` — must exit `0`. Warnings allowed only if listed in the ignore file; new warnings fail.
- `npm test -- --run` — Vitest single-pass (no watch). Must exit `0`.

E2E and visual tests do **not** run pre-commit (too slow). They run on CI for every PR and must be green before merge to `main`.

### What "fail" means

If either command exits non-zero:

1. **Do not commit.** Period.
2. **Fix the underlying cause.** Either:
   - The production code change broke a test → fix the production code, or fix the test if its expectation was wrong.
   - The test itself is broken → fix the test.
3. **Re-run the gate.** Only commit when it is green.

If the fix is large enough that it cannot be done in the same session:

- **Revert the offending change** (`git restore <file>` or `git stash`).
- Do not leave broken tests committed on `main`.

### What "don't commit" means specifically

- **Never commit a failing test.** A red test in the repo is a lie — it tells contributors "this used to be true." Either green or deleted.
- **Never `--no-verify`** to bypass the hook. The hook exists because rules need teeth.
- **Never disable tests to make the gate pass.** If a test must be skipped, see "Skipping" below.

### Skipping (with discipline)

You may mark a test as `.skip` **only** with:

1. A reason in the test description.
2. An expiry condition (date, PR number, or issue) in a comment.

```ts
it.skip('handles SSR hydration of map markers — expires 2026-08-01, see issue #142', () => {
  // ...
});
```

The agent **prueba** scans for `it.skip(`/`describe.skip(` and surfaces any past-expiry skips in its weekly health report. Skips without an expiry are a bug.

---

## Authoring rules

- **One spec file per source file**, co-located: `festival.service.ts` → `festival.service.spec.ts`.
- **Mock `HttpClient`** with `provideHttpClientTesting()`. **Never** hit real endpoints — not even Sanity.
- **Mock Sanity** via the same interceptor pattern; never let the test suite touch the network.
- **Assert against `data-testid`**, never against translated strings — Spanish copy will change with [[internationalization]].
- **Every component**: at least one render test and one interaction test.
- **Every service public method**: at least one test of the happy path and one of the failure path.
- **Every Zod schema** (see [[api-integration]]): a `parse` test with a valid fixture and a `safeParse` test with a malformed one.

### `data-testid` naming convention

- Kebab-case, two-segment minimum: `<component>-<role>`.
- Examples: `festival-card`, `festival-card-cta`, `search-bar-input`, `filter-chip-active`.
- For lists, append the unique identifier: `festival-card-fib-benicassim`.
- The attribute is stripped from production builds via an Angular build optimizer rule (configured later in `angular.json`).

### Deterministic tests

- No `setTimeout`, no real timers. Use `vi.useFakeTimers()`.
- No `Math.random()`. Inject a seedable RNG.
- No `new Date()` without a fixed clock. Inject `Clock` or use `vi.setSystemTime()`.
- No network. No filesystem. No `localStorage` writes that survive the test.

### Coverage targets

- Services: **≥ 90 %**
- Components: **≥ 70 %**
- Overall: **≥ 80 %**

Coverage is enforced in CI, not pre-commit (too slow). A drop below threshold fails the PR.

---

## E2E smoke suite

Runs in CI for every PR. The suite below must stay green at all times.

1. Load home → see at least one featured festival.
2. Open `/festivales` → filter by *Provincia: Castellón* → result includes FIB.
3. Open FIB detail → line-up section renders headliners.
4. Search by artist name (`"Rosalía"`) → matching festival appears within 500 ms.
5. Open festival detail on mobile viewport (375 × 667) → layout renders without horizontal scroll.
6. Tab through home → focus ring visible at every step.

Adding new critical flows means adding new entries here.

---

## Pre-commit hook setup (recipe)

When implementation begins, wire the gate with **Husky + lint-staged**. Do not commit code before this is configured.

### `package.json` additions

```jsonc
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{ts,html}": ["eslint --max-warnings=0"],
    "src/**/*.spec.ts": ["vitest related --run"]
  },
  "devDependencies": {
    "husky": "^9.1.0",
    "lint-staged": "^16.0.0"
  }
}
```

### `.husky/pre-commit`

```bash
#!/usr/bin/env sh
npx lint-staged
npm test -- --run --changed
```

- `lint-staged` lints only staged files (fast).
- `vitest --changed` re-runs only specs affected by staged files (fast).
- The final `npm test -- --run` ensures the whole project still compiles cleanly.

### Why this exact setup

- **Husky** is the standard pre-commit hook manager for npm projects.
- **lint-staged** prevents the gate from scanning the whole repo on every commit — only what changed.
- **Vitest's `--changed`** flag uses Git to find affected specs; fast for incremental work.
- The full `npm test -- --run` at the end catches cross-file regressions that `--changed` would miss.

---

## When CI must run the full suite

- On every PR opened against `main`.
- On every push to `main` after merge.
- Nightly on `main` for flaky detection.

A green CI run is the merge gate; the pre-commit hook is the commit gate. Both must be green for code to land.

---

## Anti-patterns

- ❌ Committing with `--no-verify`.
- ❌ `it.only` or `describe.only` left in the suite.
- ❌ Commented-out tests. Either delete or skip with expiry.
- ❌ Snapshot tests of full DOM trees. Snapshot small, intentional outputs only.
- ❌ Tests that assert against rendered Spanish copy.
- ❌ Tests that depend on test execution order.
- ❌ Sleeping in tests (`await new Promise(r => setTimeout(r, 100))`).

---

## Examples

### Vitest — service unit test

```ts
// src/app/shared/data-access/festival.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FestivalService } from './festival.service';
import { FestivalSchema } from '@shared/domain/festival.model';

const FESTIVAL_FIXTURE = {
  slug: 'fib-benicassim', nombre: 'FIB', provincia: 'Castellón',
  ciudad: 'Benicàssim', fechaInicio: '2026-07-15T00:00:00.000Z',
  fechaFin: '2026-07-18T00:00:00.000Z', generos: ['indie', 'rock'],
  cartel: [], precioDesde: 89, urlOficial: 'https://fiberfib.com',
  poster: { src: '/assets/images/festivals/fib-2026.webp', alt: 'Cartel FIB 2026' },
  ubicacion: { lat: 39.999, lng: -0.075 }, estado: 'entradas-abiertas',
  cabezasDeCartel: ['Foo Fighters'],
};

describe('FestivalService', () => {
  let service: FestivalService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FestivalService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('returns parsed Festival[] on success', () => {
    let result: unknown;
    service.list().subscribe(v => (result = v));

    http.expectOne('/api/festivals').flush([FESTIVAL_FIXTURE]);

    expect(result).toHaveLength(1);
    expect((result as { slug: string }[])[0].slug).toBe('fib-benicassim');
  });

  it('throws FestivalError on 404', () => {
    let error: unknown;
    service.list().subscribe({ error: e => (error = e) });

    http.expectOne('/api/festivals').flush(null, { status: 404, statusText: 'Not Found' });

    expect((error as { code: string }).code).toBe('NOT_FOUND');
  });
});
```

### Angular Testing Library — component test

```ts
// src/app/shared/ui/festival-card/festival-card.spec.ts
import { render, screen } from '@testing-library/angular';
import { FestivalCardComponent } from './festival-card';
import { provideRouter } from '@angular/router';

const FESTIVAL = {
  slug: 'medusa-festival', nombre: 'Medusa Festival',
  ciudad: 'Cullera', provincia: 'Valencia', precioDesde: 120,
  poster: { src: '/assets/images/festivals/medusa-2026.webp', alt: 'Medusa 2026' },
  // ... other required fields
} as Festival;

describe('FestivalCardComponent', () => {
  it('renders festival name and city', async () => {
    await render(FestivalCardComponent, {
      inputs: { festival: FESTIVAL },
      providers: [provideRouter([])],
    });

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Medusa Festival');
    expect(screen.getByText('Cullera')).toBeInTheDocument();
  });

  it('links to the festival detail route', async () => {
    await render(FestivalCardComponent, {
      inputs: { festival: FESTIVAL },
      providers: [provideRouter([])],
    });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/festivales/medusa-festival');
  });

  it('uses data-testid for stable selection', async () => {
    const { container } = await render(FestivalCardComponent, {
      inputs: { festival: FESTIVAL },
      providers: [provideRouter([])],
    });

    expect(container.querySelector('[data-testid="festival-card-medusa-festival"]')).toBeTruthy();
  });
});
```

### Zod schema test

```ts
// src/app/shared/domain/festival.model.spec.ts
import { FestivalSchema } from './festival.model';

const VALID = { /* same as FESTIVAL_FIXTURE above */ };

describe('FestivalSchema', () => {
  it('parses a valid festival', () => {
    expect(() => FestivalSchema.parse(VALID)).not.toThrow();
  });

  it('rejects an invalid provincia', () => {
    const result = FestivalSchema.safeParse({ ...VALID, provincia: 'Madrid' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toContain('provincia');
  });

  it('rejects a negative price', () => {
    const result = FestivalSchema.safeParse({ ...VALID, precioDesde: -10 });
    expect(result.success).toBe(false);
  });
});
```
