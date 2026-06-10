# Update Branches From Develop

Merge the latest `develop` into every remote feature branch while keeping
`main` completely untouched.

This command **only** manipulates git refs (fetch, checkout, merge, push). It
does not modify files under `src/` directly. Run it from the repository root
with network access.

## Goal

Keep all feature branches current with `develop` in one safe, repeatable pass.
Abort immediately on merge conflicts; never touch `main`.

## Execution

Run the helper script (canonical implementation):

```bash
bash scripts/update-branches-from-develop.sh
```

Or via npm:

```bash
npm run branches:update-from-develop
```

Requires `git_write` and `full_network` permissions when invoked by an agent.

## What the script does

### Validation (abort if dirty)

```bash
git status --porcelain
```

If non-empty, print:

```text
❌ Working tree is not clean.
Commit or stash your changes before running this command.
```

Exit code `1`. Do not continue.

### Workflow

1. Save `git branch --show-current` (restore at the end).
2. `git fetch --all --prune`
3. Verify local `develop` (`git show-ref refs/heads/develop`) and remote
   `origin/develop` (`git ls-remote --heads origin develop`). Abort if missing.
4. `git checkout develop && git pull origin develop`
5. List remote branches (`git for-each-ref refs/remotes/origin`), excluding
   `main`, `develop`, and `HEAD`.
6. For each remaining branch:
   - Create local tracking branch if missing:
     `git checkout -b <branch> origin/<branch>`
   - Otherwise: `git checkout <branch> && git pull origin <branch>`
   - `git merge develop --no-edit`
   - `git push origin <branch>`
7. On merge conflict: abort merge, restore original branch, print report, exit `1`.
   **Do not** process further branches.
8. Restore the original branch.

## Final report

The script prints:

```text
=========================================
Branch Update Report
=========================================

Updated:
- branch-a
- branch-b

Skipped:
- main
- develop

Conflicts:
- none

Original branch restored:
- feature/example

Result:
✅ Success
```

On conflict, `Result: ❌ Failed` and the conflicting branch name under
`Conflicts:`.

## Hard rules

- **Never** checkout `main` for modification.
- **Never** merge into `main` or push to `main`.
- **Never** delete branches.
- **Never** force-push, reset, or rebase.
- Safe to run multiple times (idempotent merges when already up to date).
- Do not invent branch names; process only what exists on `origin`.

## Agent instructions

1. Confirm working tree is clean before running (the script checks again).
2. Execute the script; stream its output to the user.
3. If exit code is non-zero, report the script output verbatim and stop.
4. Do not commit application code as part of this command.

## Usage example

```text
/update-branches-from-develop
```

Expected console output (illustrative):

```text
Updating all branches from develop...
✓ feature/map
✓ feature/footer
✓ feature/dark-mode

Done.
```

## Related

- [[project-structure]] — branch naming (`feature/`, `fix/`, …)
- `/new-branch` — create a new branch from `main`
- `/autocommit` — commit workflow after feature work
