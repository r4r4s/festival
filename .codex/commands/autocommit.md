# Git Create Semantic Commits

Create semantic commits from all available changes.

Do not make one big commit by default.
Group files by purpose.
Commit each group separately.

## Goal

Turn the current working tree into clean, meaningful commits.
No guessing. No mega commits. No vague messages. No mixing unrelated changes.

## Steps

### 1. Inspect repository state

Check what changed:
bash
git status --short

Check staged changes:
bash
git diff --cached

Check unstaged changes:
bash
git diff

Check untracked files:
bash
git ls-files --others --exclude-standard

Understand every available change before committing.

### 2. Detect issue key

Check branch name and context for an issue key.
bash
git branch --show-current

Examples:

- PROJ-123
- POW-456
- #123

If there is a clear issue key, use it in every related commit.

If there is no issue key, commit without it.

Do not invent one.

### 3. Group changes semantically

Group files and hunks by intent.

Examples of valid groups:

- one bug fix
- one feature
- one refactor
- one test update
- one documentation change
- one dependency update
- one config or CI change

One commit = one purpose.

If two files changed for the same reason, commit them together.

If one file contains unrelated changes, split hunks.

Use:
bash
git add -p

or stage files explicitly:
bash
git add <file>

Do not use git add -A blindly when changes are unrelated.

### 4. Create commits one by one

For each semantic group:

1. Stage only the files or hunks for that group.
2. Verify the staged diff.
3. **Run the pre-commit gate** (if the group touches anything under `src/`):
   ```bash
   npm run lint && npm test -- --run
   ```
   Both must exit `0`. If either fails: **stop**, fix the cause (or revert the change), re-run the gate. Never bypass with `--no-verify`. Never commit a failing test.
   Pure doc / `.codex/` changes skip the gate.
4. **Run the architecture audit gate (MANDATORY, no exceptions):**

   The Health Score MUST be `100/100` before any commit. This applies to **every** IA / agent / human, including ones that cannot invoke the `/audit-structure` slash command (which is a Claude Code prompt, not a shell script). "El script no está disponible" / "the command is not available" is **never** a valid reason to skip this step — the gate is then run with the bash fallback below.

   **Method A — preferred (Claude Code with slash commands):**
   Invoke `/audit-structure`. Read **Health Score** in section A. If `100/100` and Status `OK` → continue. Otherwise → STOP, report sections B and C verbatim, fix, re-run.

   **Method B — universal fallback (Codex, any IA, shell environment):**
   Run **every** check below. Any non-empty output, non-zero exit, or failed assertion = `< 100/100` = **DO NOT COMMIT**.

   ```bash
   # B.1 — lint + tests (pre-commit gate, must already be green)
   npm run lint && npm test -- --run

   # B.2 — i18n parity (es/ca/en keys aligned)
   npm run i18n:check

   # B.3 — no hardcoded colors in component SCSS (only var(--fv-*) or color-mix allowed)
   ! grep -rn -E "rgb\(|rgba\(|hsl\(|#[0-9a-fA-F]{3,6}" src/app --include="*.scss" \
     | grep -v "var(--\|color-mix\|^\s*//"

   # B.4 — no hardcoded font-family in component SCSS
   ! grep -rn "font-family\s*:" src/app --include="*.scss" | grep -v "var(--fv-font"

   # B.5 — HttpClient only in core/ or data-access/
   ! grep -rln "from '@angular/common/http'" src/app --include="*.ts" \
     | grep -v "\.spec\.ts" \
     | grep -vE "(src/app/core/|src/app/.*/data-access/|src/app/app\.config\.ts)"

   # B.6 — no feature-to-feature imports
   ! grep -rn "from '@features/" src/app/features --include="*.ts" \
     | grep -v "\.spec\.ts" \
     | awk -F: '{ split($1, p, "/"); for (i in p) if (p[i]=="features") { src=p[i+1]; break }
                  match($0, /@features\/([^/'"'"']+)/, m); tgt=m[1];
                  if (src && tgt && src != tgt) print }' \
     | grep .

   # B.7 — no empty feature scaffolds (folders with only .gitkeep / no real code)
   for f in src/app/features/*/; do
     real=$(find "$f" -type f ! -name ".gitkeep" 2>/dev/null | wc -l)
     [ "$real" -eq 0 ] && echo "EMPTY FEATURE: $f"
   done | grep . && exit 1 || true

   # B.8 — no stale .gitkeep in folders that already have real files
   for d in $(find src/app -name ".gitkeep" -exec dirname {} \;); do
     others=$(ls -A "$d" | grep -v "^.gitkeep$" | wc -l)
     [ "$others" -gt 0 ] && echo "STALE .gitkeep: $d"
   done | grep . && exit 1 || true

   # B.9 — docs/documentacion.md exists and was updated in this batch if structure changed
   git diff --cached --name-only | grep -qE "^src/.*\.(ts|html|scss)$" \
     && ! git diff --cached --name-only | grep -q "^docs/documentacion.md$" \
     && echo "STRUCTURAL CHANGE WITHOUT DOC UPDATE" && exit 1 || true
   ```

   Treat any failing check as the Score being `< 100/100`. When the gate fails:
   - Report every failing check verbatim to the user (which command, which output).
   - Apply the fixes (or ask the user on ambiguous ones).
   - Re-run **Method B in full** after each fix until every check passes.
   - Only then resume the commit flow.

   This rule applies to **every** semantic group, including pure documentation or `.codex/` changes. The audit gate is never skipped, never bypassed with `--no-verify`, and never overridden by user pressure to "just commit it" or by the IA reporting "el comando no existe / no está disponible". Use Method B in that case. A failing audit is a blocking error.
5. Create a Conventional Commit message.
6. Commit.
7. Repeat until no meaningful changes remain.

Verify staged diff:
bash
git diff --cached

Commit format:
bash
git commit -m "<type>(<scope>): <summary>"

With issue key:
bash
git commit -m "<issue-key>: <type>(<scope>): <summary>"

Examples:
bash
git commit -m "fix(auth): Handle expired token refresh"
git commit -m "feat(api): Add user activity endpoint"
git commit -m "refactor(ui): Simplify modal state handling"
git commit -m "test(auth): Cover expired token flow"
git commit -m "PROJ-123: fix(auth): Handle token refresh"

### 5. Keep committing until done

After each commit, check remaining changes:
bash
git status --short

If changes remain, inspect them again and create the next semantic commit.

Stop only when:

- all intentional changes are committed
- unrelated or unsafe changes are left unstaged on purpose
- the user must decide what to do with ambiguous changes

## Commit types

Use the most accurate type:

- feat: new feature
- fix: bug fix
- docs: documentation only
- style: formatting only, no logic change
- refactor: code change without behavior change
- perf: performance improvement
- test: tests added or updated
- build: build system or dependencies
- ci: CI/CD changes
- chore: maintenance
- revert: revert previous commit

## Scope

Use a short scope when useful:
bash
fix(auth): Handle expired session
feat(payments): Add retry flow
docs(readme): Update setup instructions
test(cart): Cover discount calculation

Skip scope only if it adds no value:
bash
chore: Update dependencies

Good scopes are usually:

- feature area
- package name
- route name
- module name
- service name
- config name

Examples:
bash
fix(login): Show invalid credentials error
feat(dashboard): Add revenue chart
test(api): Cover pagination params
ci(github): Cache pnpm dependencies
build(vite): Update bundle config

## Message rules

- Max 72 characters.
- Use imperative mood: Add, Fix, Update, Remove.
- Capitalize the summary.
- No period at the end.
- Be specific.
- Describe the purpose, not just the file changed.
- Do not mention implementation details unless they are the point.
- Do not say changes, stuff, misc, or wip.

Good:
bash
git commit -m "fix(auth): Refresh token before request retry"
git commit -m "feat(profile): Add avatar upload"
git commit -m "test(cart): Cover discount calculation"
git commit -m "docs(api): Document pagination params"

Bad:
bash
git commit -m "fixed auth"
git commit -m "updates"
git commit -m "stuff"
git commit -m "WIP"
git commit -m "changed files"

## Splitting rules

Split commits when changes are unrelated.

Examples:

- UI change + dependency update = two commits
- bug fix + test for that bug = usually one commit
- refactor + behavior change = two commits
- docs for a feature + feature code = usually one commit
- formatting many files + logic change = two commits
- generated lockfile from dependency update = same commit as dependency update

If a change cannot be explained by the same sentence, split it.

## Documentation rule

If any commit adds, removes, renames, or moves folders or files, `docs/documentacion.md` **must** be updated in the same commit:

- Add the new entry to the corresponding tree diagram.
- Describe its purpose in Spanish.
- Add a row to the "Historial de cambios estructurales" table at the bottom.

Include `docs/documentacion.md` in the same semantic group as the structural change — do not create a separate commit for the documentation update.

## Safety rules

Never commit:

- secrets
- .env files with real values
- API keys
- tokens
- credentials
- debug logs
- local editor files
- temporary files
- build artifacts unless intentionally tracked
- unrelated experiments

Before each commit, check:
bash
git diff --cached

If the staged diff contains unrelated changes, unstage and split:
bash
git restore --staged <file>

## Final check

When finished, run:
bash
git status --short

Then report as less words as possible:

- commits created
- files intentionally left uncommitted
- anything skipped for safety

Done means clean semantic history, not just zero pending files.
