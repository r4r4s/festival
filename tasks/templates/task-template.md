# Task: <Short, action-oriented title>

<!--
  HOW TO USE
  - Copy this file to tasks/current-task.md to start a task, or store it in
    tasks/backlog/<task-id>.md to queue it.
  - One task = one purpose = one branch = one PR. See tasks/README.md.
  - Keep every section. Replace the <angle-bracket> placeholders.
  - The gates and commit rules are NOT redefined here: follow commands/autocommit.md.
-->

| Field        | Value                          |
| ------------ | ------------------------------ |
| Task ID      | <YYYYMMDD-short-slug>          |
| Owner        | <agent or person>              |
| Branch       | <feat/...>                     |
| Created      | <YYYY-MM-DD>                   |
| Last updated | <YYYY-MM-DD>                   |

## Related GitHub Issue

- Issue: <#123 — https://github.com/R4r4s/festiVAL/issues/123>
- Project: <GitHub Project board / column>

## Description

<What and why, in 2–4 sentences. State the user value, not the implementation.>

## Requirements

<!-- Hard constraints. Anything not listed here is out of scope for this task. -->

- [ ] <Requirement 1>
- [ ] <Requirement 2>

## Acceptance Criteria

<!-- Observable, testable outcomes. "Done" = every box below is checked. -->

- [ ] <Given / When / Then, or a measurable outcome>
- [ ] Responsive across desktop / laptop / tablet / mobile (320px floor) — for UI tasks
- [ ] i18n key parity (es/ca/en) via `npm run i18n:check` — when copy changes
- [ ] Pre-commit gate green: `npm run lint && npm test -- --run`
- [ ] Architecture audit 100/100 (see commands/autocommit.md, Method A/B)

## Files Expected To Change

<!-- Declare the blast radius up front. Edits outside this list need a scope review. -->

- `src/app/...`
- `docs/documentacion.md` — mandatory when files/folders are added, removed, renamed or moved

## Progress Checklist

<!-- The live execution status. Tick items as you go. -->

- [ ] Scope confirmed against the issue
- [ ] Relevant skills/agents reviewed for the touched area
- [ ] Implementation
- [ ] Tests written/updated
- [ ] Gates green (lint, test, i18n:check, audit)
- [ ] `docs/documentacion.md` updated
- [ ] Committed via the autocommit workflow

## Status

`Backlog` → `In Progress` → `In Review` → `Done`  (or `Blocked`)

**Current:** <Backlog | In Progress | In Review | Blocked | Done>

## Notes

<Decisions, trade-offs, blockers, references. Keep it factual.>

## Completion Summary

<!-- Fill in only when Status = Done, immediately before moving this file to tasks/completed/. -->

- **Outcome:** <what shipped>
- **Commits / PR:** <commit hashes / PR link>
- **Acceptance criteria:** all checked above
- **Follow-ups:** <new backlog items, if any>
