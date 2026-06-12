# Create a Git Branch

Create a new git branch from a clean base, asking the user for the branch name.

This command only touches git refs: it creates and checks out a branch. It does
not stage, commit, push, or modify any file under `src/`. Committing is done later
with `/autocommit`.

## Goal

Take a branch name from the user, normalize it to the project convention, and
create + check it out from an up-to-date base branch — without losing any
uncommitted work.

## Steps

### 1. Ask for the branch name

Ask, then wait for the answer:

```
What is the branch name? (e.g. feature/search-minisearch or fix/expired-token)
```

- Accept either a bare slug (`search-minisearch`) or a `type/slug` form
  (`feature/search-minisearch`).
- If the user gives no `type/` prefix, ask which type fits (or default to
  `feature/`). Allowed branch prefixes:
  `feature`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
  `chore`, `revert`.
  (`feature/` is the branch convention; commits on that branch still use the
  `feat` type in `/autocommit` when the work is a new feature.)

### 2. Normalize the name

Produce a safe, conventional ref name:

- Lowercase everything.
- Replace spaces and underscores with `-`; strip accents/diacritics.
- Collapse repeated `-` and trim leading/trailing `-`.
- Keep at most one `type/slug` segment (one `/`).
- Reject characters git forbids in refs (`~ ^ : ? * [ \ ..` , spaces, trailing
  `.lock`). If the result is empty after cleaning, ask again.

Show the normalized name and the base it will branch from before creating it.

### 3. Inspect repository state

```bash
git rev-parse --abbrev-ref HEAD
git status --short
```

- If there are uncommitted changes, warn that they will travel to the new branch
  (git keeps the working tree on checkout). Confirm before continuing, or let the
  user stash first.
- Determine the base branch: default to `develop`. Confirm if the user wants the
  current branch as base instead.

### 4. Refuse on conflicts

```bash
git show-ref --verify --quiet "refs/heads/<name>"
```

- If the branch already exists, do **not** overwrite it. Offer to check it out
  instead, or ask for a different name. Stop.

### 5. Update the base and create the branch

```bash
git switch develop
git pull --ff-only origin develop
git switch -c <name>
```

- Use `git fetch` + `--ff-only` so the base is current without merge noise.
- If the network/pull fails, report it and ask whether to branch from the local
  base anyway. Do not force or rebase without consent.
- If the user chose the current branch as base, skip the `switch develop` / `pull`
  and just run `git switch -c <name>`.

### 6. Confirm

```bash
git rev-parse --abbrev-ref HEAD
```

Report: the new branch name, the base it was created from, and whether
uncommitted changes came along. Remind the user that commits go through
`/autocommit`.

## Rules

- **Ask for the name first** and wait. Never invent a branch name.
- **Never overwrite** an existing branch (step 4).
- **Never force-push, reset, or rebase** as part of this command.
- **Do not commit** and do not modify any file. This command only manages refs.
- **No `--no-verify`, no destructive git.** Respect `CLAUDE.md`.

## Style

Concise and factual. Ask exactly one thing (the branch name; plus the type only if
missing) and wait. No emojis. Report the result in plain Markdown.
