# Update Branches From Develop

Merge the latest `develop` into every remote feature branch while keeping
`main` completely untouched.

Run from the repository root with `git_write` and `full_network` permissions.

## Goal

Keep all feature branches current with `develop` in one safe, repeatable pass.
When merge conflicts occur, **the agent resolves them** and continues until every
branch is updated. Never touch `main`.

## Execution loop

Repeat until the script exits `0`:

```bash
bash scripts/update-branches-from-develop.sh
```

Or: `npm run branches:update-from-develop`

| Exit code | Meaning | Agent action |
| --------- | ------- | ------------ |
| `0` | All branches updated (or none to process) | Done — print final report |
| `1` | Validation failed (dirty tree, missing develop, …) | Fix precondition, do not merge |
| `2` | Merge conflict on a branch | **Resolve conflicts** (see below), then re-run script |

The script **leaves the conflicted branch checked out** with the merge in progress
(exit `2`). Do not run `git merge --abort` unless resolution is impossible.

---

## Conflict resolution (mandatory agent work)

When the script prints `❌ Conflict detected in branch: <branch>`:

### 1. Inspect

```bash
git branch --show-current          # must be the conflicted branch
git diff --name-only --diff-filter=U
git status --short
```

Read every conflicted file in full before editing.

### 2. Resolve using these rules

Apply in order when unsure:

| Area | Rule |
| ---- | ---- |
| **Feature code** (`src/app/features/<feature>/`, feature-local `ui/`) | Keep the **branch's feature work**. Bring in `develop` only for shared fixes the feature needs (imports, tokens, services). |
| **Shared / shell** (`layout/`, `@shared/`, `core/`, `src/styles/`) | Prefer **`develop`** (newer contracts: theme, tokens, error handling). Re-wire the feature to match. |
| **`app.ts` / `app.html`** | **Combine both**: keep feature components from the branch + infrastructure from `develop` (e.g. `ThemeService`, `<fv-footer />`). |
| **i18n** (`src/assets/i18n/*.json`) | **Union of keys** from both sides. Preserve branch-specific keys (e.g. `footer.*`) and all keys added in `develop`. Run `npm run i18n:check` after resolving. |
| **Docs / commands** (`docs/`, `.claude/`, `.codex/`, `README.md`) | Prefer **`develop`**, then re-add any doc lines that describe the branch-only feature if removed. |
| **Conflict markers** | Remove all `<<<<<<<`, `=======`, `>>>>>>>` — never leave markers in committed files. |

Consult [[project-structure]], [[theming-styling]], [[internationalization]] and
[[light-dark-mode]] when resolving UI, token or copy conflicts.

### 3. Validate (if `src/` or i18n touched)

```bash
npm run lint && npm test -- --run
npm run i18n:check
```

Fix failures before committing the merge.

### 4. Complete the merge and push

```bash
git add <resolved-files>
git commit --no-edit          # completes the merge commit
git push origin <branch>
```

Use a merge commit message only — **do not** rewrite history, rebase or force-push.

### 5. Continue

Re-run the script from a **clean** working tree:

```bash
bash scripts/update-branches-from-develop.sh
```

The script skips branches already merged and processes the rest. Repeat steps 1–5
for each new conflict until exit `0`.

---

## What the script automates

### Validation (exit `1` if dirty)

```bash
git status --porcelain
```

```text
❌ Working tree is not clean.
Commit or stash your changes before running this command.
```

### Automated steps (no conflict)

1. Save `git branch --show-current` (restore at the end).
2. `git fetch --all --prune`
3. Verify local and remote `develop`.
4. `git checkout develop && git pull origin develop`
5. List remote branches, excluding `main`, `develop`, `HEAD`.
6. For each branch: checkout/create → pull → `git merge develop --no-edit` → push.
7. Restore original branch.

---

## Final report

On full success the script prints:

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
- develop

Result:
✅ Success
```

If conflicts were resolved by the agent across multiple runs, summarize in your
reply: branches updated, conflicts resolved (with file list), and final result.

---

## Hard rules

- **Never** checkout `main` for modification.
- **Never** merge into `main` or push to `main`.
- **Never** delete branches or force-push.
- **Never** leave conflict markers in files.
- Safe to run multiple times.
- Process only branches that exist on `origin`.

## Agent checklist

```
Conflict Resolution Progress:
- [ ] Script run; exit code noted
- [ ] Conflicted files listed and read
- [ ] Conflicts resolved per rules above
- [ ] lint + test + i18n:check green (if src/ or i18n changed)
- [ ] Merge committed and pushed
- [ ] Script re-run until exit 0
- [ ] Final report shown to user
```

## Usage example

```text
/update-branches-from-develop
```

Illustrative successful end state:

```text
Updating all branches from develop...
✓ feat/footer
✓ feature/mapa-inicio

Done.
Result: ✅ Success
```

## Related

- [[project-structure]] — branch naming (`feature/`, `fix/`, …)
- [[internationalization]] — i18n key parity after conflict resolution
- `/new-branch` — create a new branch from `main`
- `/autocommit` — semantic commits for feature work (not for merge commits here)
