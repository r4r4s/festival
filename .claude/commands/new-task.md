# Start a New Task

Bootstrap the active task file (`tasks/current-task.md`) from a GitHub Issue, so
the repository has a well-defined task in progress.

This command **writes** one file only: `tasks/current-task.md`. It does not commit,
does not touch `src/`, and does not run the build. Committing is done later with
`/autocommit`.

## Goal

Turn a GitHub Issue into the project's active task, populated from the canonical
template at `tasks/templates/task-template.md`, with `Status: In Progress` and a
**task name** that `/autocommit` uses to separate work.

## Steps

### 1. Ask for the issue number and the task name

Ask both, then wait for the answers:

```
What is the GitHub Issue number?
What is the task name? (short slug, e.g. search-minisearch)
```

- Normalize the issue (`23`, `#23`, or a full URL → `#23`).
- The **task name** is a short kebab-case slug. It identifies the task and is the
  key `/autocommit` uses to separate changes, so several tasks can be committed
  independently in the same run. It is also the default commit scope for the task.

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

- **Task name** — the slug from step 1; stored in the header, used as the `Task ID`
  (`YYYYMMDD-<name>`) and as the default commit scope for `/autocommit`.
- **Issue Number** — `#<n>` in _Related GitHub Issue_.
- **Issue Title** — task title (`# Task: <issue title>`).
- **Description** — from the issue body (summary of what & why).
- **Requirements** — hard constraints derived from the issue (checkbox list).
- **Acceptance Criteria** — testable outcomes from the issue; keep the standard
  gate items (lint+test, i18n parity when copy changes, audit 100/100).
- **Status** — set to `In Progress` (see step 6).
- **Progress Checklist** — the execution steps, all unchecked at start.
- **Notes** — issue URL, labels, and any open questions.

Also fill the header table (Task name, Task ID `YYYYMMDD-<name>`, Owner, Branch,
Created, Last updated) and the _Files Expected To Change_ section as far as the
issue allows — that list is what `/autocommit` uses to attribute files to this
task. Leave _Completion Summary_ empty.

### 6. Set the status

```
Status: In Progress
```

### 7. Show a task summary

Print a short summary: task name, Task ID, issue `#<n>` + title, status, the
acceptance criteria count, and the path written (`tasks/current-task.md`). Remind
the user that work must stay within the task scope and that commits go through
`/autocommit` (which asks for the task name + issue to separate commits).

## Rules

- **One task per file.** This command targets `tasks/current-task.md`. To run
  several tasks in parallel, queue the others in `tasks/backlog/<name>.md` (each
  with its own name + issue); `/autocommit` separates them by name at commit time.
- **The task name is the separation key.** Always capture it and keep
  _Files Expected To Change_ accurate so `/autocommit` can attribute changes.
- **Never fabricate issue data.** No issue, or unreadable issue → refuse (step 3).
- **Do not commit** and do not modify any other file. The documentation rule for
  structural changes is handled at commit time by the autocommit workflow.
- **Follow the contract.** Respect `CLAUDE.md`, the active-task workflow, and
  `tasks/README.md`. Do not weaken or duplicate `commands/autocommit.md` rules.
- English only for the generated task file.

## Style

Concise and factual. Ask exactly two things (issue number and task name) and wait.
No emojis. Report the summary in plain Markdown.
