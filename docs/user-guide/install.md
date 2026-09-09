# Installing the Codecov CLI for Athena

Athena (`https://athena.sun-asterisk.vn`) is a self-hosted Codecov instance that Sun* R&D
already runs. You don't install or operate Athena — you install a small client,
`codecov-cli`, on your machine or in CI, point it at Athena, and upload your coverage
(and optionally test-result) reports so they show up on the Athena web UI.

Everything below was verified against **codecov-cli 11.3.1** (`pip install codecov-cli`,
Python 3.9), by running the tool and reading its installed source, not from memory.

## Prerequisites

- Python 3.8+ with `pip` (the tool ships as a Python package).
- A repository already visible to Athena (ask your team/org admin if unsure).
- A GitHub/GitLab account tied to your Athena org.

## Install the CLI

```bash
pip install codecov-cli
```

Verify it installed:

```bash
codecovcli --version
# codecovcli, version 11.3.1
```

The upstream project also ships a standalone compiled binary (`curl -Os
https://cli.codecov.io/latest/<linux|macos>/codecov`) for machines without Python. This repo's
own CI does not use that path, and this guide did not execute it — use `pip install` unless you
have a specific reason to avoid Python.

## Point the CLI at Athena — the one step to get right

Athena is **not** the public codecov.io SaaS. Every command must carry the `-u` /
`--enterprise-url` / `--url` flag (all three are the same option), set to Athena's base URL,
**before** the subcommand name:

```bash
codecovcli --url https://athena.sun-asterisk.vn do-upload ...
```

This is a global option on the `codecovcli` group, not on `do-upload` itself — putting it
after the subcommand fails:

```
$ codecovcli do-upload --url https://athena.sun-asterisk.vn ...
Error: No such option: --url
```

Confirmed by reading `codecov_cli/main.py`: `--enterprise-url`/`--url`/`-u` is declared on the
top-level `cli` group and threaded through `ctx.obj["enterprise_url"]` into every subcommand.

This is also what the Athena web UI itself already tells self-hosted users to do — see
`src/pages/RepoPage/CoverageOnboarding/OtherCI/OtherCI.tsx:39` (`config.IS_SELF_HOSTED ? \`
-u ${config.API_URL}\` : ''`), and it's exactly what this repo's own CI does:
`.github/workflows/ci.yml:245` — `codecovcli -u ${{ secrets.CODECOV_URL }} do-upload -t ${{
secrets.CODECOV_ORG_TOKEN }} --fail-on-error ...`.

There is no environment variable for the URL — `-u`/`--url`/`--enterprise-url` must be passed
explicitly every time (confirmed: it has no `envvar=` binding in the installed source).

## Get your upload token

Athena needs a token to accept an upload for a private (non-public) repo. There are two kinds;
both surface in the Athena web UI:

### Repository upload token (per-repo)

Go to **your repo → Settings → General** (route `/:provider/:owner/:repo/config/general`). The
"Tokens" section shows a card titled **"Repository upload token"** with a copy-ready
`CODECOV_TOKEN=<token>` snippet and a **Regenerate** button.
Source: `src/pages/RepoPage/ConfigTab/tabs/GeneralTab/Tokens/RepoUploadToken/RepoUploadToken.jsx:48-63`.

The same token is what the onboarding wizard shows on a brand-new repo, under **Step 2/3: add
token** — `src/pages/RepoPage/CoverageOnboarding/GitHubActions/TokenStep.tsx:196` (reads
`data.repository.uploadToken`) and `src/pages/RepoPage/CoverageOnboarding/OtherCI/OtherCI.tsx:36`.

### Organization (global) upload token

Go to **Account Settings → your org → Global Upload Token** (route
`/account/:provider/:owner/org-upload-token`, nav label defined at
`src/services/navigation/useNavLinks.ts:582-587`). This single token authorizes uploads for
*every* repo in the org — treat it as more sensitive than a repo token.
Source: `src/pages/AccountSettings/tabs/OrgUploadToken/OrgUploadToken.tsx:27-49` (heading
"Global upload token", generate/regenerate flow).

Either token is passed the same way to the CLI: as `-t <token>` on the command, or via the
`CODECOV_TOKEN` environment variable (verified: the `-t`/`--token` option is declared with
`envvar="TOKEN"` and gets the `CODECOV_` brand prefix added at runtime in
`codecov_cli/fallbacks.py`, so the real variable name is `CODECOV_TOKEN`).

If your org has disabled "upload token required," a token isn't strictly needed, but using one
is still the default expectation — this guide assumes tokens are required.

## Upload coverage from your local machine

Minimal working sequence (adjust the coverage file glob to your test runner's output):

```bash
export CODECOV_TOKEN=<your-repo-or-org-token>

# run your tests so a coverage.xml / lcov.info / etc. exists, then:
codecovcli --url https://athena.sun-asterisk.vn do-upload \
  --git-service github \
  --slug <owner>/<repo>
```

`do-upload` auto-discovers coverage files in the current directory (Cobertura XML, LCOV, and
others); pass `-f <path>` to add an explicit file, or `--disable-search -f <path>` to upload
only that file. Both were confirmed against `codecovcli do-upload --help` and a live dry run
(`-d`) against `https://athena.sun-asterisk.vn`, which returned a real API error
(`{"detail":"Not valid tokenless upload"}`) — proving the URL, not a placeholder, is reachable.

`--slug owner/repo` (or `CODECOV_SLUG` env var) is only needed when the CLI can't detect it from
git remotes/CI env — verified via `codecovcli create-commit --help` (`-r, --slug`).

## Upload coverage from CI

### GitHub Actions

This is what this repo's own pipeline does (`.github/workflows/ci.yml:236-245`), trimmed to the
generic case:

```yaml
      - name: Install codecov-cli
        run: pip install codecov-cli

      - name: Upload coverage to Athena
        run: |
          codecovcli --url ${{ secrets.CODECOV_URL }} do-upload \
            -t ${{ secrets.CODECOV_TOKEN }} \
            --fail-on-error \
            --name "ci-${{ github.run_id }}"
```

Store the base URL (`https://athena.sun-asterisk.vn`) and the token as repo/org **secrets**
(`CODECOV_URL`, `CODECOV_TOKEN`) — never commit them. On a GitHub Actions runner the CLI
auto-detects commit SHA, branch, and PR number from `GITHUB_SHA`/`GITHUB_REF` (confirmed in
`codecov_cli/helpers/ci_adapters/github_actions.py`), so you don't need `-C`/`-B`/`-P` there.

### GitLab CI

Same flags, GitLab auto-detection works the same way (`CI_COMMIT_SHA`, `CI_JOB_ID`, etc., per
`codecov_cli/helpers/ci_adapters/gitlab_ci.py`):

```yaml
upload-coverage:
  stage: test
  script:
    - pip install codecov-cli
    - codecovcli --url $CODECOV_URL do-upload -t $CODECOV_TOKEN --fail-on-error
  variables:
    CODECOV_URL: "https://athena.sun-asterisk.vn"
  # CODECOV_TOKEN set as a masked/protected CI/CD variable in GitLab settings
```

This repo has no GitLab pipeline to cite (it's a GitHub-only project); the flags above are the
same ones verified in the local-machine and GitHub Actions sections.

## Upload test results

`do-upload` also accepts JUnit-style XML test-result files, verified with a live dry run:

```bash
codecovcli --url https://athena.sun-asterisk.vn do-upload \
  -t $CODECOV_TOKEN \
  --report-type test_results \
  --disable-search -f junit.xml
```

`--report-type [coverage|test_results]` was confirmed in `do-upload --help` (default:
`coverage`). A separate command, `process-test-results`, only reads test-result files locally to
post a PR comment (`--github-token`) — it does not itself upload to Athena, and is not required
for the upload above.

This repo's own CI instead uses the official `codecov/test-results-action@v1` GitHub Action for
this (`.github/workflows/ci.yml:208-213`), which wraps the same upload call and needs the same
two inputs — `token` and `url`:

```yaml
      - uses: codecov/test-results-action@v1
        with:
          token: <CODECOV_TOKEN repository secret>
          url: <CODECOV_URL repository secret>
```

Both placeholders above stand for GitHub Actions secret references. In a real workflow you write
them in the usual secrets form — `${{ secrets.NAME }}` — with the secret names you configured for
the repository.

## Confirming the upload landed

- The CLI itself prints `Upload queued for processing complete` (or an `error -` line with the
  reason if it failed). Add `--fail-on-error` in CI so a bad upload fails the job instead of
  passing silently — confirmed as a real flag on every subcommand.
- On Athena, open your repo's page at `https://athena.sun-asterisk.vn/<provider>/<owner>/<repo>`
  — a new commit/PR should appear with a coverage percentage within a minute or two of upload.
- On a pull request, Athena posts a coverage comment once both the base and head commits have
  reports (this is standard Codecov behavior — not independently re-verified in this session).

## What this guide didn't verify

- The standalone binary install path (`cli.codecov.io`) — documented upstream, not executed here
  (no outbound network access to test it in this sandbox).
- Behavior of `--auto-load-params-from` and provider auto-detection on runners other than local/
  GitHub Actions/GitLab CI (Bitbucket, CircleCI, etc.) — the option exists (seen in
  `codecovcli --help`), but only GitHub Actions and GitLab CI detection code was read.
- Whether Athena enforces "upload token required" org-wide by default — that's a per-org toggle
  in the product, not something the CLI or this codebase fixes.
