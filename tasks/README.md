# Task management

This folder is the single source of truth for **what is being worked on and why**.
Work is driven one task at a time: the active task lives in `current-task.md`,
upcoming tasks are queued in `backlog/`, and finished tasks are archived in
`completed/`. Every task is shaped from `templates/task-template.md`.

## Folder layout

```
tasks/
├── current-task.md          # The one active task (source of truth for current scope)
├── backlog/                 # Queued tasks, one file per task (from the template)
├── completed/               # Finished tasks, archived with their Completion Summary
├── templates/
│   └── task-template.md     # Canonical task shape — copy this to start a task
└── README.md                # This file
```

## Workflow

```
GitHub Project → GitHub Issue → tasks/current-task.md → Development
      → Auto Commit → Pull Request → Review → Done
```

```mermaid
flowchart LR
    A[GitHub Project] --> B[GitHub Issue]
    B --> C[tasks/current-task.md]
    C --> D[Development]
    D --> E[Auto Commit]
    E --> F[Pull Request]
    F --> G[Review]
    G --> H[Done]
    H -. archive .-> I[(tasks/completed/)]
    H -. reset .-> C
```

### 1. GitHub Project

Work is prioritised on the GitHub Project board. A card moves into the active
column when it is ready to be picked up.

### 2. GitHub Issue

Every task is anchored to a GitHub Issue (the canonical description, discussion
and acceptance criteria). The issue number is recorded in the task file under
**Related GitHub Issue**.

### 3. tasks/current-task.md

Run **`/new-task`**: it asks for the **issue number** and a **task name** (a short
slug), reads the issue, and populates `current-task.md` from the template with
`Status: In Progress`. (You can also copy [`templates/task-template.md`](templates/task-template.md)
manually, or promote a file from [`backlog/`](backlog/).) Fill in the title, issue
link, requirements, acceptance criteria and the **Files Expected To Change** — that
list is the **scope** (work stays inside it) and is what `/autocommit` uses to
attribute files to this task.

### 4. Development

Implement the task. Before touching an area, review the matching skill/agent (see
`CLAUDE.md` / `AGENTS.md`). Keep the **Progress Checklist** and **Status** current
as you go. Do not edit files outside **Files Expected To Change** without first
updating the task (or opening a new one).

### 5. Auto Commit

Commit through the autocommit workflow — `commands/autocommit.md` (run with
`/autocommit`; Claude uses `.claude/commands/`, Codex uses `.codex/commands/`).
On start it asks for **task name + issue number** pairs, repeated until you enter
`0`, then **separates the working-tree changes per task and creates one commit per
task** (appending `(#n)`). See [Using the commands](#using-the-commands-issues--commits)
below. That workflow already owns and enforces, per semantic group:

- the **pre-commit gate** — `npm run lint && npm test -- --run` (for `src/` changes);
- the **architecture audit gate** — must be `100/100` (Method A or the Method B fallback);
- the **i18n commit policy** — propagate `es.json` keys to `ca`/`en`, `npm run i18n:check`;
- the **documentation rule** — update `docs/documentacion.md` in the same commit when
  files/folders are added, removed, renamed or moved;
- **Conventional Commits**, one purpose per commit.

These rules are defined once in `autocommit.md` and the contracts — this folder does
not redefine them.

### 6. Pull Request

Open a PR for the task branch. Reference the issue (e.g. `Closes #123`). The PR
description summarises the outcome and links the commits.

### 7. Review

Code review, QA and (for UI) the Design & Responsive Validation. Address feedback
with new commits via the same autocommit workflow.

### 8. Done

When every **Acceptance Criteria** box is checked:

1. Write the **Completion Summary** in the task file.
2. Set **Status** to `Done`.
3. Move the file to [`completed/`](completed/) (e.g. `completed/<task-id>.md`).
4. Reset `current-task.md` from the template so the repo is ready for the next task.

## Using the commands (issues → commits)

The day-to-day loop uses two commands: **`/new-task`** to turn an issue into the
active task, and **`/autocommit`** to commit by task. The **task name** links the
two: you set it when creating the task, and you reuse it when committing so commits
are separated per task.

### A. Start a task from an issue

Run `/new-task` and answer the two prompts:

```
What is the GitHub Issue number?      → 23
What is the task name? (short slug)    → search-minisearch
```

It reads issue #23 (refusing if it does not exist), writes `tasks/current-task.md`
from the template with `Status: In Progress`, and records the task name. Implement
the work, keeping the **Progress Checklist**, **Status** and **Files Expected To
Change** up to date.

### B. Commit one task

Run `/autocommit`. At the first prompt, enter the task name and its issue, then `0`:

```
Task name and GitHub Issue number? (enter 0 to finish)   → search-minisearch 23
Task name and GitHub Issue number? (enter 0 to finish)   → 0
```

It runs the gates and commits the changes for that task, e.g.:

```
feat(search-minisearch): Add fuzzy search (#23)
```

### C. Commit several tasks at once

If your working tree mixes changes from more than one task, list each one before
`0`. `/autocommit` attributes files to each task (via their **Files Expected To
Change**) and produces **one commit per task** — never mixing two:

```
Task name and GitHub Issue number? (enter 0 to finish)   → search-minisearch 23
Task name and GitHub Issue number? (enter 0 to finish)   → calendar-fix 31
Task name and GitHub Issue number? (enter 0 to finish)   → 0
```

Result:

```
feat(search-minisearch): Add fuzzy search (#23)
fix(calendar-fix): Resolve date filtering bug (#31)
```

### D. No issue

Enter `0` immediately. `/autocommit` groups changes by purpose and commits without
an issue reference (it never invents one).

> The gates (lint+test, audit `100/100`, i18n parity, doc-sync) and all commit
> message rules live in `commands/autocommit.md` and run on every commit — they are
> not bypassed by this flow.

## Task lifecycle & status

A task file moves `backlog/` → `current-task.md` → `completed/`. Its **Status**
field tracks execution:

| Status        | Meaning                                               |
| ------------- | ----------------------------------------------------- |
| `Backlog`     | Defined and queued, not started                       |
| `In Progress` | Actively being implemented                            |
| `In Review`   | PR open, awaiting review / QA                          |
| `Blocked`     | Cannot proceed — reason noted in **Notes**            |
| `Done`        | All acceptance criteria met; archived in `completed/` |
| `Example`     | Seed/sample content only — not an active task          |

## Conventions

- **One active task.** `current-task.md` holds exactly one task at a time.
- **One file per backlog task**, named by its Task ID (e.g. `20260610-minisearch-search.md`).
- **Task ID:** `YYYYMMDD-short-slug`.
- **Branch:** Conventional, scoped to the task (e.g. `feat/search-minisearch`).
- **English** for task files.

## Quick start

```text
/new-task                 # asks: issue number + task name → writes current-task.md
# ...implement, keeping Progress Checklist / Status / Files Expected To Change current
/autocommit               # asks: "task-name #issue" pairs until 0 → one commit per task

# When Status = Done, archive it and reset for the next task:
#   mv tasks/current-task.md tasks/completed/<task-id>.md
#   cp tasks/templates/task-template.md tasks/current-task.md
```

Manual fallback (no commands): `cp tasks/templates/task-template.md tasks/current-task.md`,
edit it, then run `/autocommit`.
