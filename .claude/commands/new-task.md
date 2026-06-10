# Start a New Task

Bootstrap the active task file (`tasks/current-task.md`) from a GitHub Issue, so
the repository has exactly one well-defined task in progress.

This command **writes** one file only: `tasks/current-task.md`. It does not commit,
does not touch `src/`, and does not run the build. Committing is done later with
`/commit-task` (or `/autocommit`).

## Goal

Turn a GitHub Issue into the project's active task, populated from the canonical
template at `tasks/templates/task-template.md`, with `Status: In Progress`.

## Steps

### 1. Ask for the issue number

Prompt the user, then wait for the answer:

```
What is the GitHub Issue number?
```

Accept `23`, `#23`, or a full issue URL — normalize to the bare number.

### 2. Read the GitHub Issue

Fetch the issue from the project's repository. Use whichever is available, in order:

1. `gh issue view <n> --json number,title,body,state,labels,url`
2. GitHub REST API: `GET /repos/<owner>/<repo>/issues/<n>` (derive `<owner>/<repo>`
   from `git remote get-url origin`).

### 3. Refuse if the issue does not exist

If the issue cannot be found (404), is unavailable, or the number is invalid:

- **Do not** create or overwrite `tasks/current-task.md`.
- Report clearly that the issue does not exist / could not be read, and stop.

If the issue exists but cannot be fetched live (e.g. no `gh`, private repo,
network blocked), do **not** invent its contents. Tell the user it could not be
fetched and ask them to paste the title/body, or abort.

### 4. Read the template and current state

- Read `tasks/templates/task-template.md` (the canonical shape — do not redefine it here).
- Read `tasks/current-task.md`. If it holds a real task (Status not `No active task`
  / `Example` / `Done`), warn that it will be overwritten and confirm before continuing.
- Read `CLAUDE.md` and `tasks/README.md` for the active-task rules.

### 5. Create or overwrite `tasks/current-task.md`

Populate the template from the issue. **Required fields** (map issue → task):

- **Issue Number** — `#<n>` in _Related GitHub Issue_.
- **Issue Title** — task title (`# Task: <issue title>`).
- **Description** — from the issue body (summary of what & why).
- **Requirements** — hard constraints derived from the issue (checkbox list).
- **Acceptance Criteria** — testable outcomes from the issue; keep the standard
  gate items (lint+test, i18n parity when copy changes, audit 100/100).
- **Status** — set to `In Progress` (see step 6).
- **Progress Checklist** — the execution steps, all unchecked at start.
- **Notes** — issue URL, labels, and any open questions.

Also fill the header table (Task ID `YYYYMMDD-<slug>`, Owner, Branch, Created,
Last updated) and the _Files Expected To Change_ section as far as the issue allows.
Leave _Completion Summary_ empty.

### 6. Set the status

```
Status: In Progress
```

### 7. Show a task summary

Print a short summary: Task ID, issue `#<n>` + title, status, the acceptance
criteria count, and the path written (`tasks/current-task.md`). Remind the user
that work must stay within the task scope and that commits go through
`/commit-task` or `/autocommit`.

## Rules

- **Single active task.** This command targets `tasks/current-task.md` only.
- **Never fabricate issue data.** No issue, or unreadable issue → refuse (step 3).
- **Do not commit** and do not modify any other file. The documentation rule for
  structural changes is handled at commit time by the autocommit workflow.
- **Follow the contract.** Respect `CLAUDE.md`, the active-task workflow, and
  `tasks/README.md`. Do not weaken or duplicate `commands/autocommit.md` rules.
- English only for the generated task file.

## Style

Concise and factual. Ask exactly one question (the issue number) and wait. No
emojis. Report the summary in plain Markdown.
