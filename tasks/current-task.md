# Task: Prueba — validate the task workflow

<!--
  Active task. Sourced from GitHub Issue #1.
  Workflow validation only — no functional/development work (per the issue).
-->

| Field        | Value                          |
| ------------ | ------------------------------ |
| Task ID      | 20260610-prueba-workflow       |
| Owner        | sistemas                       |
| Branch       | develop                        |
| Created      | 2026-06-10                     |
| Last updated | 2026-06-10                     |

## Related GitHub Issue

- Issue: #1 — Prueba
- Project: festiVAL · workflow validation

## Description

Validate the complete task workflow end to end: read the GitHub Issue, set up
`tasks/current-task.md` from it, add a small non-functional test marker file,
keep the task progress updated, and commit through the autocommit workflow with a
commit that references the issue. No functional/development work is performed.

## Requirements

- [x] No functional or development changes — documentation/markdown only.
- [x] Use the existing task system (`tasks/`) and the autocommit workflow.
- [x] The commit references issue `#1`.

## Acceptance Criteria

- [x] `tasks/current-task.md` updated from Issue #1.
- [x] `tasks/test-workflow.md` created.
- [ ] Commit created (referencing `#1`).
- [ ] Branch pushed to origin.
- [x] Issue reference included in the commit message.

## Files Expected To Change

- `tasks/current-task.md`
- `tasks/test-workflow.md`
- `docs/documentacion.md` — new file added under `tasks/` (mandatory doc rule)

## Progress Checklist

- [x] Scope confirmed against the issue
- [x] `tasks/current-task.md` set from Issue #1
- [x] `tasks/test-workflow.md` created
- [x] `docs/documentacion.md` updated
- [ ] Gates checked (docs-only: pre-commit lint/test exempt; audit Method B)
- [ ] Committed via the autocommit workflow
- [ ] Branch pushed

## Status

`Backlog` → `In Progress` → `In Review` → `Done`  (or `Blocked`)

**Current:** In Progress

## Notes

- Issue #1 could not be fetched live (`gh` not installed; the repo's REST endpoint
  returned 404 for unauthenticated access). Used the issue details provided in the
  task brief: title "Prueba", objective "validate the complete task workflow".
- Pure documentation change: per `commands/autocommit.md`, the lint/test pre-commit
  gate is skipped for non-`src/` changes; the architecture audit (Method B) still
  applies.

## Completion Summary

<!-- Filled in when Status = Done, before moving to tasks/completed/. -->

_Pending commit + push._
