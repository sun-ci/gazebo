---
kind: feature-doc
source: codecov/umbrella @ self-hosted-25.6.2
audience: user
---

# Backend Capabilities

Athena does most of its work with no screen attached to it: it receives what your CI uploads,
talks to your git provider, and decides what shows up as a status check, a PR comment, or a badge.
This document covers that side — what happens for you outside the web UI, and what in `codecov.yml`
controls it. Every claim below is cited to a file and line in the `codecov/umbrella` source at tag
`self-hosted-25.6.2`.

## Sending Reports From CI

All upload endpoints are mounted under `/upload/` (`apps/codecov-api/codecov/urls.py:19`).

| What you're uploading | Path | Notes |
|---|---|---|
| Coverage report, legacy protocol v2 (raw body) | `POST /upload/v2` | Stores the request body directly in archive storage (`apps/codecov-api/upload/views/legacy.py:216-234`). |
| Coverage report, legacy protocol v4 (presigned PUT) | `POST /upload/v4` | Returns a presigned PUT URL; the client uploads the report there directly (`apps/codecov-api/upload/views/legacy.py:259-307`). |
| Coverage report, current multi-step protocol | `POST /upload/<service>/<repo>/commits` → `.../commits/<sha>/reports` → `.../reports/<code>/uploads` | Three-call flow: register the commit, register a report, then register an upload and get a presigned upload URL (`apps/codecov-api/upload/urls.py:32-61`, `apps/codecov-api/upload/views/commits.py:35-104`, `apps/codecov-api/upload/views/reports.py:36-48`, `apps/codecov-api/upload/views/uploads.py:48-111`). |
| Coverage report, one-shot convenience endpoint | `POST /upload/<service>/<repo>/upload-coverage` | Does commit + report + upload creation in one call (`apps/codecov-api/upload/views/upload_coverage.py:67-158`). |
| Test results (JUnit XML) | `POST /upload/test_results/v1` | Marks the repo `test_analytics_enabled`; accepts `flags` (`apps/codecov-api/upload/views/test_results.py:58-207`). |
| Bundle analysis (JS bundle stats) | `POST /upload/bundle_analysis/v1` | Marks the repo `bundle_analysis_enabled`; supports a custom `compareSha` (`apps/codecov-api/upload/views/bundle_analysis.py:77-217`). |
| Download a stored report | `GET /upload/<service>/<owner>/<repo>/download?path=...` | Redirects (302) to a 30-second presigned GET URL; only paths under `v4/raw/...` or `shelter/...` for that exact repo are served (`apps/codecov-api/upload/views/legacy.py:395-447`). |
| Mark a commit's upload window as done | `POST /upload/<service>/<repo>/commits/<sha>/upload-complete` | Reports back `uploads_total/success/processing/error` and manually triggers the "all uploads in" flow (`apps/codecov-api/upload/views/upload_completion.py:42-110`). |
| Force notifications on a commit with no code changes | `POST /upload/<service>/<repo>/commits/<sha>/empty-upload` | Compares the PR's changed files against `codecov.yml`'s `ignore` list (plus a built-in list of non-testable extensions); if every changed file is ignorable it fires a passing notification, otherwise a failing one (`apps/codecov-api/upload/views/empty_upload.py:74-191`). |
| Copy a report from one commit onto another | `POST /upload/<service>/<repo>/commits/transplant` | Takes `from_sha`/`to_sha` (`apps/codecov-api/upload/views/transplant_report.py:28-70`). |

## How You Authenticate an Upload

Coverage, test-results and bundle-analysis uploads accept several credentials
(`apps/codecov-api/upload/views/uploads.py:207-219`,
`apps/codecov-api/upload/views/test_results.py:58-69`,
`apps/codecov-api/upload/views/bundle_analysis.py:77-85`):

- **Repository upload token** — the classic per-repo token.
- **Organization-level token** — one token valid across every repo in your org.
- **Global upload token** — an instance-wide token (coverage endpoints only).
- **GitHub Actions OIDC token** — no stored secret at all; Athena verifies the OIDC JWT against
  `token.actions.githubusercontent.com` (or your GitHub Enterprise issuer) and matches the
  `repository`/`repository_owner` claims to a known repo (`apps/codecov-api/upload/helpers.py:237-266`).
- **Tokenless, for public repos only** — Athena calls back into your CI provider's own API to
  confirm the build is real. Supported: AppVeyor, Azure Pipelines, CircleCI, Cirrus CI,
  GitHub Actions, Travis (`apps/codecov-api/upload/tokenless/tokenless.py:16-23`). For GitHub
  Actions it checks the workflow run is public, its repo slug and commit SHA match your upload,
  and the run finished (or is still running) within the last ~10 minutes
  (`apps/codecov-api/upload/tokenless/github_actions.py:77-137`).

You can also point the uploader at a non-default `codecov.yml` location with the `yaml` upload
parameter (`apps/codecov-api/upload/helpers.py:213-215`).

## What Happens After an Upload Lands

- Each upload becomes an intermediate report; a separate finisher step merges every upload for
  a commit into that commit's single combined report and applies the CI diff to it
  (`apps/worker/tasks/upload_finisher.py:382-412`).
- **Flags**: any `flags` you send on an upload become repository flag records tied to that upload,
  created on first use (`apps/worker/tasks/upload.py:600-628`). Flags are how per-flag coverage
  and the flag badge get computed later.
- **Components**: a component is a named group defined by a set of flags and/or file paths;
  Athena computes each component's coverage by filtering the merged report down to its matching
  flags and paths (`apps/worker/tasks/upsert_component.py:19-48`).
- **Carryforward for bundle analysis**: if a commit gets a coverage or test-results upload but no
  bundle-analysis upload, Athena still creates a bundle-analysis report for it by copying the
  parent commit's bundle report forward, so bundle comparisons never break on a commit that just
  didn't ship a JS build (`apps/worker/tasks/upload.py:781-799`).
- Once merging is decided, Athena schedules the notify task, and if the commit is a PR's current
  head it also re-syncs the pull and schedules a base/head comparison
  (`apps/worker/tasks/upload_finisher.py:203-260`).

## Limits You'll Hit on Upload

- **Per-commit upload cap**: by default at most 150 uploads (successful, non-carryforward) are
  accepted for a single commit; your instance can raise this per-owner via `max_upload_limit`
  (`apps/codecov-api/upload/throttles.py:23-45`, enforced again server-side at
  `apps/codecov-api/upload/helpers.py:590-616` via `setup.max_sessions`, default 150).
- **Monthly upload cap**: gated behind `UPLOAD_THROTTLING_ENABLED` and your plan's
  `monthly_uploads_limit`, checked only on a commit's first upload
  (`apps/codecov-api/upload/throttles.py:48-79`).
- **Private-repo credits**: on hosted Codecov a private repo must be activated with repo credits
  before it can accept uploads. On an install with `setup.enterprise_license` configured — the
  self-hosted licensing path Athena runs under — that credit check is skipped entirely
  (`apps/codecov-api/upload/helpers.py:637-652`).

## Talking to Your Git Provider

Webhooks are mounted under `/webhooks/` for GitHub, GitHub Enterprise, GitLab, GitLab Enterprise,
Bitbucket, and Bitbucket Server (`apps/codecov-api/webhook_handlers/urls.py:11-30`, prefix at
`apps/codecov-api/codecov/urls.py:20`). Signatures are HMAC-verified per provider before any event
is processed (`apps/codecov-api/webhook_handlers/views/github.py:73-104`).

What an event does:

- **Push to your default branch** → schedules a pending status on the head commit, if your
  instance has that repo enabled for pending statuses
  (`apps/codecov-api/webhook_handlers/views/github.py:237-324`).
- **CI status update on GitHub, job event on GitLab, commit-status event on Bitbucket** →
  triggers the notify task for that commit, which is what actually posts checks and comments
  (`apps/codecov-api/webhook_handlers/views/github.py:326-377`,
  `apps/codecov-api/webhook_handlers/views/gitlab.py:130-154`,
  `apps/codecov-api/webhook_handlers/views/bitbucket.py:119-138`).
- **Pull or merge request opened, reopened, synchronized, labeled, merged, closed** → re-syncs the
  PR's metadata and re-runs the comparison against its base
  (`apps/codecov-api/webhook_handlers/views/github.py:396-435`,
  `apps/codecov-api/webhook_handlers/views/gitlab.py:156-192`,
  `apps/codecov-api/webhook_handlers/views/bitbucket.py:87-104`).
- **GitHub App installed, uninstalled, suspended, or its repo list changed** → re-syncs which repos
  and teams you have access to (`apps/codecov-api/webhook_handlers/views/github.py:508-657`).
- **GitLab system hooks** (project rename/transfer/destroy, org membership changes) are processed
  only if your instance has an enterprise license configured; otherwise they are rejected outright
  (`apps/codecov-api/webhook_handlers/views/gitlab.py:73,110-114`).

### Status Checks and PR Comments

- The commit-status names Athena posts follow the pattern `codecov/<context>[/<key>]` where
  `<context>` is `project`, `patch`, or `changes` — each driven by the matching key under
  `codecov.yml`'s `coverage.status` section (`apps/worker/tasks/status_set_pending.py:56-91`,
  `apps/worker/tasks/status_set_error.py:39-73`).
- Per status you can set (under `coverage.status.<context>.<key>`, or `.default`): `branches`
  (only run on matching branches), `only_pulls` (pending status only on PRs), `set_pending`
  (turn the pending status off), `informational` (report success even on CI failure), and
  `if_ci_failed` (state to use — default `error` — when CI failed)
  (`apps/worker/tasks/status_set_pending.py:60-91`, `apps/worker/tasks/status_set_error.py:46-64`).
- Setting the initial pending status while CI runs is gated per repo on the server side; it is not
  a `codecov.yml` switch (`apps/worker/tasks/status_set_pending.py:41,45`).
- Whether and when the real notification (statuses plus PR comment) fires is controlled by
  `codecov.yml`'s `codecov.notify` and `codecov.require_ci_to_pass` keys: `require_ci_to_pass`
  (skip notifying if CI failed, default true), `notify.wait_for_ci` (wait for CI results before
  notifying, default true), `notify.after_n_builds` (wait for at least N uploads),
  `notify.manual_trigger` (never auto-notify), and `notify.notify_error` (post an error
  notification instead of silently skipping when some uploads failed to process)
  (`apps/worker/tasks/notify.py:668-736`, `apps/worker/tasks/upload_finisher.py:293-350`).
- Test-result failures short-circuit notification: if a commit's uploaded JUnit results contain any
  failed tests, Athena skips the usual notify flow for that commit
  (`apps/worker/tasks/notify.py:200-211`).

## Reading Your Data Programmatically

Beyond the web UI, your coverage data is available over a documented REST API at
`/api/v2/<service>/<owner>/repos/<repo>/...` (`apps/codecov-api/codecov/urls.py:10-12`). It covers
pulls, commits, branches, flags, components, test results, comparisons, totals, full and per-file
reports, coverage timeseries, and a repo's uploads
(`apps/codecov-api/api/public/v2/urls.py:33-111`). A self-serve OpenAPI schema and a rendered docs
page ship at `/api/v2/schema/` and `/api/v2/docs/` (`apps/codecov-api/api/public/v2/urls.py:81-86`).
A read-only endpoint at `.../repos/<repo>/config/` returns the effective configuration for that
repo (`apps/codecov-api/api/public/v2/repo/views.py:94-111`).

## Badges and Graphs You Can Embed

- **Coverage badge**: `GET /<service>/<owner>/<repo>/branch/<branch>/graph/badge.svg` (or `.txt`,
  or the default-branch form without `/branch/<branch>`) — supports `?precision=0|1|2`,
  `?flag=<name>` for a flag's coverage, `?component=<id>` for a component's coverage, and
  `?token=<image_token>` for private repos (`apps/codecov-api/graphs/urls.py:6-15`,
  `apps/codecov-api/graphs/views.py:67-199`). A private repo with no or mismatched token gets a
  gray "unknown" badge rather than a 404 (`apps/codecov-api/graphs/views.py:92-112`).
- **Bundle-size badge**: `GET .../graph/bundle/<bundle-name>/badge.svg`, same branch and token
  rules (`apps/codecov-api/graphs/urls.py:16-25`, `apps/codecov-api/graphs/views.py:202-276`).
- **Sunburst, icicle, tree and commits graphs**: `GET .../graph/{sunburst|icicle|tree|commits}.svg`,
  scoped to a branch, a commit, or a pull request, with `?width=` and `?height=`
  (`apps/codecov-api/graphs/urls.py:26-45`, `apps/codecov-api/graphs/views.py:279-454`).

## Test Analytics and Flaky-Test Tracking

After a test-results (JUnit) upload finishes processing, Athena runs a background pass over the new
test instances to update flaky-test bookkeeping — it tracks each flake's pass/fail streak and
recency (`apps/worker/tasks/process_flakes.py:33-60`). Whether all tests passed, and any
test-processing error message, feed directly into the same notify flow that posts statuses and
comments (`apps/worker/tasks/notify.py:903-949`).

## Bundle Analysis Notifications

Bundle-analysis uploads get their own notify step, separate from coverage notify, run once all
bundle processors for a commit have finished (`apps/worker/tasks/bundle_analysis_notify.py:21-127`).

## AI PR Review

`codecov.yml`'s `ai_pr_review` section can turn on an AI-generated pull request review:
`ai_pr_review.enabled` (default off) and `ai_pr_review.method` (`auto`, or `label` to only run when
a PR carries `ai_pr_review.label_name`) (`apps/worker/tasks/sync_pull.py:551-578`). It runs for
GitHub repos only (`apps/worker/tasks/ai_pr_review.py:33-35`).

On a self-hosted install the review is brokered through a second, separate GitHub App identified by
a `github.ai_features_app_id` configuration value that the instance operator has to set up. Without
it, auto-review requests are answered as not enabled
(`apps/codecov-api/webhook_handlers/views/github.py:379-394,437-448`,
`apps/codecov-api/graphql_api/types/owner/owner.py:55`, `apps/codecov-api/api/gen_ai/views.py:18-61`).
Ask your Athena operator whether that app is configured before relying on this feature.

## Not Documented Here

These exist in the product but are not described above, because they could not be verified in the
source that was read:

- Static analysis upload. A dedicated upload token type exists
  (`apps/codecov-api/graphql_api/types/repository/repository.py:188-192`), but its endpoint was not
  read, so no behavior is claimed for it.
- Label analysis.
- The `codecov.yml` keys that control PR comment layout. Comment posting is confirmed
  (`apps/worker/tasks/notify.py:651-659`); its layout configuration surface was not read.
- Notification channels outside your git provider (Slack, generic webhooks, and similar).
