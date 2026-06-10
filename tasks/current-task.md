# Task: Estructura — Modificación de la estructura del proyecto

| Field        | Value                                  |
| ------------ | -------------------------------------- |
| Task name    | estructura                             |
| Task ID      | 20260610-estructura                    |
| Owner        | R4r4s                                  |
| Branch       | feat/estructura                        |
| Created      | 2026-06-10                             |
| Last updated | 2026-06-10                             |

## Related GitHub Issue

- Issue: [#6 — https://github.com/festiVAL-gva/festiVAL/issues/6](https://github.com/festiVAL-gva/festiVAL/issues/6)
- Project: festiVAL-gva/festiVAL

## Description

Modify the project folder and file structure to align with the canonical layout defined in the `project-structure` skill. The goal is to ensure the directory tree, naming conventions, and module boundaries match the architecture contract in `CLAUDE.md` and `docs/documentacion.md`, so that future feature work lands in the right place without friction.

## Requirements

- [ ] Review the current directory tree against the canonical layout in `.claude/skills/project-structure/SKILL.md`
- [ ] Identify any folders or files that are misplaced, misnamed, or missing
- [ ] Move, rename, or create files/folders to bring the structure into conformance
- [ ] Update all affected import paths (path aliases `@core`, `@layout`, `@features`, `@shared/*`)
- [ ] Update `docs/documentacion.md` to reflect every structural change in the same commit

## Acceptance Criteria

- [ ] Directory tree matches the canonical feature-sliced layout (`core/`, `layout/`, `features/`, `shared/`) exactly
- [ ] All path aliases resolve correctly after restructuring
- [ ] No cross-feature imports remain (lint-enforced via `eslint-plugin-boundaries`)
- [ ] Pre-commit gate green: `npm run lint && npm test -- --run`
- [ ] Architecture audit 100/100 (see `commands/autocommit.md`, Method A/B)
- [ ] `docs/documentacion.md` updated to reflect all added, removed, renamed, or moved files/folders

## Files Expected To Change

- `src/app/` — restructured folders and/or moved files
- `tsconfig.json` / `tsconfig.app.json` — path alias updates if needed
- `angular.json` — `assets` / `styles` paths if folder names change
- `eslint.config.js` or `eslint.config.mjs` — boundary rule updates if needed
- `docs/documentacion.md` — mandatory structural update

## Progress Checklist

- [ ] Scope confirmed against the issue
- [ ] `project-structure` skill reviewed
- [ ] Current directory tree audited against the canonical layout
- [ ] Structural changes implemented (moves, renames, creates)
- [ ] Import paths and path aliases updated
- [ ] Tests written/updated
- [ ] Gates green (lint, test, i18n:check, audit)
- [ ] `docs/documentacion.md` updated
- [ ] Committed via the autocommit workflow

## Status

`Backlog` → `In Progress` → `In Review` → `Done`  (or `Blocked`)

**Current:** In Progress

## Notes

- Issue URL: https://github.com/festiVAL-gva/festiVAL/issues/6
- Issue body is brief ("Modificacíon estructura del poryecto"); requirements above are derived from the project-structure skill and CLAUDE.md architecture contract.
- Consult `.claude/skills/project-structure/SKILL.md` before touching any file path.
- The `docs/documentacion.md` update is mandatory per the documentation rule in `CLAUDE.md`.
- Open question: are there specific misalignments already identified, or is this a full audit pass?

## Completion Summary

<!-- Fill in only when Status = Done, immediately before moving this file to tasks/completed/. -->

- **Outcome:** <what shipped>
- **Commits / PR:** <commit hashes / PR link>
- **Acceptance criteria:** all checked above
- **Follow-ups:** <new backlog items, if any>
