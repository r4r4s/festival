# i18n Commit Translation Policy

**MANDATORY** when finalizing a commit that touches user-facing copy in **festiVAL**.

## Purpose

festiVAL's UI source language is **Spanish (`es-ES`)**. Any other locale file is a translation derived from it. This skill defines two strict modes:

- **Development mode** (the default): only `es.json` is touched.
- **Commit mode** (`/autocommit` or any final-step task that prepares a commit): every supported locale file is brought back into key parity with `es.json` **before** the commit is recorded.

The goal is to avoid two failure modes:
1. Translators silently editing target locales during ordinary feature work and breaking key parity.
2. Commits shipping with Spanish-only keys that leave other locales with stale UIs.

Collaborates with: **contenido** (owner of editorial voice and locale parity), and the [[internationalization]] skill (Transloco / ICU patterns).

---

## Part 1 — Default behavior (normal development)

While developing a feature, a fix, or a refactor:

- **Edit only `src/assets/i18n/es.json`** when adding, renaming, or removing a key.
- **Do not create, edit, or delete** any other locale file.
- **Do not "pre-translate"** new strings into other locales during the development flow.
- **Spanish is the canonical version** — any divergence between `es.json` and another locale is a bug in the other locale, never in Spanish.

If a task asks you to "add a button", "rename a label", or "write the empty state copy", that is development mode. Touching `de.json`, `fr.json`, etc. in that turn is a violation.

---

## Part 2 — Commit behavior (commit / finalization tasks)

A task is in **commit mode** when any of the following is true:

- The user runs `/autocommit`.
- The user explicitly asks to "commit", "prepare the commit", "finalize", "ship", or equivalent.
- The skill is invoked as the closing step of a feature branch before opening a PR.

Before the commit is created, perform the following 8 required checks in order:

1. **Detect every Spanish key changed in `i18n/`** — added, modified, renamed, or removed in `es.json` since the last commit on the branch (`git diff origin/main -- src/assets/i18n/es.json` is the source of truth).
2. **Update the equivalent key in every supported locale file** (see matrix below). Missing locale files must be created from the Spanish skeleton.
3. **Preserve the same translation key structure** — same nesting, same key names, same ICU placeholders (`{count, plural, …}`), same HTML entities. The shape of `de.json` must be identical to `es.json`.
4. **Do not remove existing translations** for keys that still exist in `es.json`. Removal is only allowed when the Spanish key itself is removed.
5. **Do not rename keys** unless the rename also happened in `es.json` in this commit. Locale files follow Spanish, never lead.
6. **If a translation is uncertain**, keep the Spanish value as a placeholder and add a sibling key with a `// TODO(i18n): translate to <locale>` comment in a co-located `.todo.json` (JSON does not support inline comments — use the sidecar). Never ship a guess as if it were verified.
7. **Verify all i18n files are valid and consistent** — `JSON.parse` succeeds, key sets are identical to `es.json`, no orphan keys, no duplicate keys.
8. **Do not mark the commit task as complete** until checks 1–7 are green and the multilingual files are staged alongside the source change.

If `es.json` was not modified in this commit, checks 1–7 are no-ops and the commit may proceed without locale updates.

---

## Part 3 — Supported locale matrix

Locale files live under `src/assets/i18n/` and use BCP-47 codes. Spanish is `es.json` (no region — it is the source of truth). For every country below, a target locale file must exist when commit mode runs.

| Country                  | Locale code | Filename          |
| ------------------------ | ----------- | ----------------- |
| España (source)          | `es`        | `es.json`         |
| Alemania                 | `de`        | `de.json`         |
| Armenia                  | `hy`        | `hy.json`         |
| Austria                  | `de-AT`     | `de-AT.json`      |
| Azerbaiyán               | `az`        | `az.json`         |
| Bélgica                  | `fr-BE`     | `fr-BE.json`      |
| Bielorrusia              | `be`        | `be.json`         |
| Bosnia y Herzegovina     | `bs`        | `bs.json`         |
| Bulgaria                 | `bg`        | `bg.json`         |
| Chipre                   | `el-CY`     | `el-CY.json`      |
| Croacia                  | `hr`        | `hr.json`         |
| Dinamarca                | `da`        | `da.json`         |
| Eslovaquia               | `sk`        | `sk.json`         |
| Eslovenia                | `sl`        | `sl.json`         |
| Estonia                  | `et`        | `et.json`         |
| Finlandia                | `fi`        | `fi.json`         |
| Francia                  | `fr`        | `fr.json`         |
| Georgia                  | `ka`        | `ka.json`         |
| Grecia                   | `el`        | `el.json`         |
| Hungría                  | `hu`        | `hu.json`         |
| Irlanda                  | `en-IE`     | `en-IE.json`      |
| Islandia                 | `is`        | `is.json`         |
| Italia                   | `it`        | `it.json`         |
| Kazajistán               | `kk`        | `kk.json`         |
| Kosovo                   | `sq-XK`     | `sq-XK.json`      |
| Letonia                  | `lv`        | `lv.json`         |
| Liechtenstein            | `de-LI`     | `de-LI.json`      |
| Lituania                 | `lt`        | `lt.json`         |
| Luxemburgo               | `lb`        | `lb.json`         |
| Malta                    | `mt`        | `mt.json`         |
| Montenegro               | `cnr`       | `cnr.json`        |
| Noruega                  | `nb`        | `nb.json`         |
| Países Bajos             | `nl`        | `nl.json`         |
| Polonia                  | `pl`        | `pl.json`         |
| Portugal                 | `pt-PT`     | `pt-PT.json`      |
| Reino Unido              | `en-GB`     | `en-GB.json`      |
| República Checa          | `cs`        | `cs.json`         |
| Rumanía                  | `ro`        | `ro.json`         |
| Rusia                    | `ru`        | `ru.json`         |
| San Marino               | `it-SM`     | `it-SM.json`      |
| Serbia                   | `sr`        | `sr.json`         |
| Suecia                   | `sv`        | `sv.json`         |
| Suiza                    | `de-CH`     | `de-CH.json`      |
| Turquía                  | `tr`        | `tr.json`         |
| Ucrania                  | `uk`        | `uk.json`         |

The project's roadmap also tracks **`ca-ES-valencia`** (Valencian) as a first-party locale per `CLAUDE.md`. It is treated identically to the countries above when present.

Multi-language countries (Belgium, Switzerland, Cyprus, Luxembourg, Ireland) resolve to one canonical UI locale in the matrix to keep parity finite. Additional regional variants can be added later by extending this table — never silently.

---

## Part 4 — Mode discrimination quick rule

When unsure which mode you are in, ask: **"is this turn going to end with a `git commit`?"**

- **No** → development mode. Touch only `es.json`. Everything else stays as-is.
- **Yes** → commit mode. Run the 8 checks before the commit and emit the report below.

`/autocommit` always implies commit mode.

---

## Part 5 — Completion report (commit mode only)

Every commit / finalization task must end with an **i18n Commit Translation Report** in this exact format:

```
i18n Spanish Source:                ✅ / ❌
All Supported Translations Updated: ✅ / ❌
Missing Translation Keys:
Files Modified:
Notes:
```

Rules for the report:

- Both rows must be ✅ before the commit is allowed to proceed.
- `Missing Translation Keys:` lists every `<locale>:<key>` pair that fell back to Spanish + TODO. If none, write `None.`.
- `Files Modified:` lists every `src/assets/i18n/*.json` file changed in this commit. If none (because `es.json` was not touched), write `None — no source-language change in this commit.`.
- `Notes:` flags anything a reviewer should know (e.g., locale file created from scratch, key rename propagated, ICU placeholder structure change).
- Never omit the report on a commit task. Development-mode tasks do not emit it.

---

## Quick reference

| Step | Action |
| --- | --- |
| 1 | Identify the mode: development or commit. |
| 2 | Development → only edit `es.json`. Stop. |
| 3 | Commit → diff `es.json` against `origin/main` for changed keys. |
| 4 | For every supported locale, sync structure and translate (or TODO-stub) the changed keys. |
| 5 | Validate all JSON files parse and share the same key set as `es.json`. |
| 6 | Stage all `i18n/*.json` files together with the source change. |
| 7 | Emit the i18n Commit Translation Report. |
| 8 | Only then proceed with `git commit`. |
