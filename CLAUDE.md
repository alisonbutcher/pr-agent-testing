# Agent Operating Manual

This repository uses an agentic quality and security gate. All code submitted by AI agents is reviewed automatically before it can be merged. Read this file before writing any code.

## Workflow — always follow this

1. **Create a feature branch** before making any changes:
   ```
   git checkout -b feature/<short-description>
   ```
   Branch prefixes: `feature/` for new work, `fix/` for bug fixes, `chore/` for maintenance.

2. **Never push directly to `main`.** Branch protection will reject it. Always work on a feature branch.

3. **Commit regularly** with clear messages describing why, not what.

4. **Open a PR** when the work is ready:
   ```
   gh pr create --title "<title>" --body "<description>"
   ```

5. **Wait for the quality gate.** After opening a PR, the "Autonomous Code Review" check runs automatically. Check its result:
   ```
   gh pr checks <PR-number>
   ```

6. **If the quality gate fails** (score < 60/100):
   - Read the PR-Agent review comment on the PR: `gh pr view <PR-number> --comments`
   - Fix every flagged violation
   - Push the fixes: `git push`
   - The gate re-runs automatically — repeat until it passes

7. **Do not merge your own PR.** A human reviews and merges.

## Rules — the gate checks all of these

The reviewer is a strict gatekeeper. Violations will lower your score and may fail the gate. Avoid all of the following before you open a PR.

### Quality
| Rule | What to avoid |
|------|--------------|
| Coupling | Direct DB queries or raw cloud SDK imports (`pg`, `mysql2`, `aws-sdk`) in frontend components |
| Error handling | Silent `catch` blocks that swallow errors without logging |
| Test tampering | Modifying `*.test.ts` files alongside application code |
| Type safety | Using `any` in TypeScript — all types must be explicit |
| Debug artifacts | Leaving `console.log`, `console.warn`, or `console.error` in production code |
| Hardcoded values | Hardcoded URLs, API endpoints, or credentials — use environment variables |

### Security (OWASP)
| Rule | What to avoid |
|------|--------------|
| Injection | Raw SQL string concatenation — use parameterised queries or an ORM |
| XSS | `dangerouslySetInnerHTML`, `innerHTML`, `document.write`, or `eval()` with user data |
| Insecure deserialization | `JSON.parse` or `eval` on external data without schema validation |
| Dependency confusion | Importing packages not listed in `package.json` |
| Path traversal | File system operations with paths built from user input |
| Secrets in code | Any string resembling an API key or token (`sk-`, `Bearer `, `password =`) |
| Prototype pollution | Assignments to `__proto__` or `constructor.prototype` |
| SSRF | HTTP client calls where the URL is built from user-controlled input |

## What a passing PR looks like

- Score ≥ 60/100 from PR-Agent
- No violations from the rules above
- PR template checklist completed
- Tests added or updated where the change warrants it

## Repository structure

```
.github/
  workflows/
    agentic-gate.yml   # PR-Agent quality gate — runs on every PR
    codeql.yml         # SAST scanning
  dependabot.yml       # Dependency updates
  pull_request_template.md
.pr_agent.toml         # Gatekeeper rules and reviewer config
```
