# Athena — End-User Usage Guide

Athena is the web app at https://athena.sun-asterisk.vn where a developer signs in with their
Git provider, connects a repository, and reads what their tests actually cover — down to the
line. This guide walks through every screen a day-to-day user touches: sign-in, onboarding a
repo, reading coverage, reviewing a pull request, reading a commit, flags/components, bundle
analysis, test analytics, and repository configuration.

## Signing in

Athena's login screen ("Login to Athena") offers four Git providers, shown as buttons —
**GitHub**, **Sentry**, **Bitbucket**, **GitLab** (`src/pages/LoginPage/LoginPage.jsx:26-34`).
Clicking one sends you to that provider to authenticate
(`src/pages/LoginPage/LoginButton.jsx:26-29`). If you came in from a specific provider link
(e.g. `/gh`), only that provider's button shows (`src/pages/LoginPage/LoginPage.jsx:26-35`).

Below the buttons, a note points GitHub Enterprise Server, GitLab EE/CE, and Bitbucket Server
users to the "Dedicated Enterprise Cloud" option (`src/pages/LoginPage/LoginPage.jsx:39-46`).

After authenticating for the first time, Athena shows **"What repo provider would you like to
sync?"** with a **"Sync with <Provider>"** button per provider it found configured
(`src/pages/SyncProviderPage/SyncProviderPage.tsx:69-83`, `src/pages/SyncProviderPage/SyncButton.tsx:23-48`).
If no provider is configured, the page shows: *"Unable to retrieve list of Git providers,
please configure one in your Codecov config YAML"* with a link to the Self-Hosted install
guide (`src/pages/SyncProviderPage/SyncProviderPage.tsx:16-30`). Once you've synced at least one
provider, this page is skipped on future logins — you're redirected straight to your provider's
namespace (`src/pages/SyncProviderPage/SyncProviderPage.tsx:57-66`).

Because this build runs self-hosted (`ENV=enterprise` sets `IS_SELF_HOSTED`,
`src/config.js:24-27`), the GitHub OAuth app used is `sun-codecov-self-hosted`, not the public
Codecov app (`src/config.js:15`) — this only matters if an admin is wiring up the GitHub App;
end users see no difference in the sign-in flow itself.

## Getting a repository into Athena

Once synced, your org's repo list appears on the owner page (`src/pages/OwnerPage/OwnerPage.jsx:98-102`,
via the shared `ListRepo` list). Selecting a repository that has never received a coverage
upload lands you on the **Coverage Analytics** onboarding screen
(`src/pages/RepoPage/CoverageOnboarding/NewRepoTab.tsx:145-167`), which explains: *"Codecov
analyzes your coverage reports to help you identify untested code... ensure your project
generates coverage reports, as Codecov relies on these reports."*

You pick a CI setup path from **"Select a setup option"**
(`src/pages/RepoPage/CoverageOnboarding/NewRepoTab.tsx:67-102`):
- **Using Codecov's CLI (Recommended)**
- **Using GitHub Actions**
- **Using Circle CI**

Each path walks you through: outputting a coverage report in your test framework (Jest, Vitest,
Pytest, or Go — `src/pages/RepoPage/CoverageOnboarding/UseFrameworkInstructions.tsx:5`), adding
your repo's upload token to CI, adding the upload step to your CI config, and merging the change
(`src/pages/RepoPage/CoverageOnboarding/GitHubActions/GitHubActions.tsx:68-92`). If your
repository is private and you aren't yet activated on it, an activation banner appears above the
setup steps (`src/pages/RepoPage/CoverageOnboarding/NewRepoTab.tsx:141-163`).

Once the first report is uploaded, Athena's coverage/build tabs unlock automatically — there is
no separate "activate" click for coverage itself, beyond having your first upload land.

## Reading coverage

### Repository level — Overview / Flags / Components

The **Coverage** tab (repo-level) has a sub-navigation with three views — **Overview**,
**Flags**, **Components** — shown as radio tiles
(`src/pages/RepoPage/CoverageTab/CoverageTabNavigator.tsx:7-63`). The default is **Overview**,
which shows: a coverage summary, a coverage trend chart with a **"Show charts / Hide charts"**
toggle, an optional sunburst chart (file-size-weighted coverage map, shown only when the repo
has at most 200,000 files and the `SUNBURST_ENABLED` flag is on), and — below that — either the
file tree or a single file's contents depending on the URL
(`src/pages/RepoPage/CoverageTab/OverviewTab/OverviewTab.tsx:82-148`).

### By branch

A branch selector lets you switch which branch's coverage you're viewing; the URL pattern is
`/tree/:branch` (`src/pages/RepoPage/CoverageTab/OverviewTab/OverviewTab.tsx:91-96`, header
branch selector in `CoverageTab/ComponentsTab/Header/BranchSelector`). Selecting "All branches"
elsewhere in the app (commits/tests tabs) is represented by a special `ALL_BRANCHES` value used
by the same branch pickers.

### Down the file tree

Navigating into a folder shows files and folders with coverage percentages
(`src/pages/RepoPage/CoverageTab/OverviewTab/subroute/FileExplorer/CodeTreeTable/CodeTreeTable.tsx`,
`FileListTable/FileListTable.tsx`).
Clicking a file opens the file viewer at
`/blob/:ref/:path` (`src/pages/RepoPage/CoverageTab/OverviewTab/OverviewTab.tsx:126-132`).

### Line by line in a file

The file viewer highlights every source line with one of three states, defined in
`src/shared/utils/fileviewer.tsx:5-100`:

| State | Meaning | Color cue |
|---|---|---|
| **Covered** | at least one test executed this line | green background (`bg-ds-coverage-covered`) |
| **Uncovered (Miss)** | no test executed this line | red background + red right border (`bg-ds-coverage-uncovered`) |
| **Partial** | line executed but not every branch/path inside it was (e.g. only one side of an `if`) | yellow/orange background + dotted right border (`bg-ds-coverage-partial`) |

The same three labels ("covered", "uncovered", "partial") appear again as a legend/selector in
the file viewer's toolbar (`src/ui/FileViewer/ToggleHeader/Title/CoverageSelect.tsx:32-38`).
Diff views (used on PR and commit file viewers) add a second gutter column for old/new line
numbers (`src/ui/CodeRenderer/CodeRenderer.tsx:84-88`).

## Reviewing a pull request

Opening a PR in Athena shows a summary bar with three coverage numbers — **HEAD**, **Patch**,
and **Change** — plus a comparison line describing which head/base commits and how many report
uploads back that comparison, and warnings if head and base have a mismatched number of uploads
or if the most recent commit's report processing errored
(`src/pages/PullRequestPage/PullCoverage/Summary/CompareSummary/CompareSummary.jsx:15-54,88-156,288-319`).
A dropdown line reads e.g. *"Coverage report: 3 lines in your changes are missing coverage"*
or *"all modified lines are covered by tests"*
(`src/pages/PullRequestPage/Dropdowns/PullCoverageDropdown.tsx:21-63`).

Below the summary, tabs let you drill in
(`src/pages/PullRequestPage/PullCoverage/PullCoverageTabs/PullCoverageTabs.jsx:90-153`):

- **Files changed** — the diff view of every file your PR touched, with per-line coverage
  coloring, and a count badge.
- **Indirect changes** — files you didn't edit but whose coverage numbers moved anyway. A banner
  explains: *"These are files that didn't have author revisions, but contain unexpected
  coverage changes"* (`src/pages/PullRequestPage/PullCoverage/routes/IndirectChangesTab/IndirectChangesInfo/IndirectChangesInfo.jsx:8-13`).
- **Commits** — every commit in the PR and its individual coverage status.
- **Flags** — coverage broken down by flag, filterable via the URL's `flags` query param.
- **Components** — coverage broken down by component (see below); if none are configured, a
  placeholder screen invites you to learn how components help
  (`src/pages/PullRequestPage/PullCoverage/routes/ComponentsTab/ComponentsNotConfigured/ComponentsNotConfigured.jsx:12-22`).
- **File explorer** — the same tree/file browser as the repo Coverage tab, scoped to this PR's
  head commit.

(On repos under the Team plan, private-repo PRs show a reduced tab set — just **Files changed**,
**Commits**, **File explorer** — `PullCoverageTabs.jsx:54-88`.)

## Looking at a single commit

The commit detail page mirrors the PR page's shape: a coverage summary, then tabs for **Files
changed**, **Indirect changes** (hidden for private Team-plan repos), and **File explorer**
(`src/pages/CommitDetailPage/CommitCoverage/CommitCoverageTabs/CommitCoverageTabs.jsx:24,51-88`).

A **"Coverage reports history"** card lists every report upload that fed this commit, grouped by
CI provider, with checkboxes to select/deselect uploads (for recalculating coverage with a subset)
and filters for **flag errors** / **upload errors** plus a search box
(`src/pages/CommitDetailPage/CommitCoverage/UploadsCard/UploadsCard.tsx:155-352`).
A **"view YAML
file"** link opens a modal showing the exact YAML that applied to this commit — *"Includes
default YAML, global YAML, and repo"* config, merged together
(`src/pages/CommitDetailPage/CommitCoverage/YamlModal/YamlModal.jsx:19-51`); if that YAML was
invalid, a red warning icon appears next to the link.

## Flags and components

**Flags** and **components** are two ways to slice a repo's coverage numbers without splitting
the repo itself.

- A **flag** tags an individual coverage upload (e.g. `unittests`, `integration`) — you assign it
  in your CI/CLI upload command and in `codecov.yml`, not in the Athena UI. Athena only *displays*
  flags (a **Flags** table with name, coverage %, and a trend sparkline,
  `src/pages/RepoPage/CoverageTab/FlagsTab/subroute/FlagsTable/FlagsTable.tsx:35-55`) and lets an
  admin delete a stale flag's *data* from the UI — deleting from the UI does not stop future
  uploads from recreating it; the modal explicitly says: *"You will also need to remove this flag
  in your CI and codecov.yaml to stop uploads"*
  (`src/pages/RepoPage/CoverageTab/FlagsTab/subroute/FlagsTable/DeleteFlagModal/DeleteFlagModal.tsx:22-27`).
- A **component** groups coverage by file path (or by flag) — defined entirely in `codecov.yml`
  under `component_management`, never created from the UI. Athena shows a **Components** table
  the same shape as Flags. If a repo has just turned on components, a **"Enable component
  analytics"** button backfills historical data before the table populates
  (`src/pages/RepoPage/CoverageTab/ComponentsTab/BackfillBanners/TriggerSyncBanner/TriggerSyncBanner.tsx:37-45`).

This repository's own `codecov.yml` is a working example (see below) — it defines six components
(Assets, Layouts, Pages, Services, Shared, UI), each mapped to a `src/**` subfolder
(`codecov.yml:39-58`).

## Bundle analysis

The **Bundles** tab reports JavaScript/TypeScript bundle size: total size, per-asset and
per-module breakdown, and size trend across commits
(`src/pages/RepoPage/BundlesTab/BundleContent/AssetsTable`, `BundleChart`). It only appears in
the repo's tab bar once the repo has JS/TS files and you're in the org, or once bundle analysis
is actually enabled (`src/pages/RepoPage/RepoPageTabs.tsx:90-99`).

Getting bundle data requires backend/CI work first: the onboarding screen asks you to pick your
bundler — **Vite, Rollup, Webpack, Remix (Vite), Nuxt, SvelteKit, or SolidStart**
(`src/pages/RepoPage/BundlesTab/BundleOnboarding/BundleOnboarding.tsx:35-43,110-159`) — then walks
through installing that bundler's Codecov plugin and wiring your upload token; a repo with no
upload token yet is redirected away from this screen entirely
(`src/pages/RepoPage/BundlesTab/BundleOnboarding/BundleOnboarding.tsx:200-204`). There's no
codecov.yml-only path here — a bundler plugin must run in your build.

## Test analytics / failed tests

The **Tests** tab (badged **"New"**,
`src/pages/RepoPage/RepoPageTabs.tsx:101-119`) reports, once enabled: total test run time,
slowest tests (95th-percentile+ runtime, capped at 100 tests shown), flaky test count and average
flake rate, cumulative failures, and skipped tests — each as a metric card with a tooltip
explaining exactly what it counts
(`src/pages/RepoPage/FailedTestsTab/FailedTestsPage/MetricsSection/MetricsSection.tsx:65-332`).
Below that, a sortable **failed tests table** lists test name, avg. duration, failure rate, flake
rate (with a tooltip breakdown of pass/fail/flaky/skip counts), commits failed, and last run time
(`src/pages/RepoPage/FailedTestsTab/FailedTestsPage/FailedTestsTable/FailedTestsTable.tsx:120-166,241-260`).
Flake detection itself is a repo config switch, not a UI toggle — this repo's `codecov.yml` turns
it on with `test_analytics.flake_detection: true` (`codecov.yml:65-66`); the flake-rate column
and cards only render when that's active.

Before any of this appears, the tab shows a **Test Analytics** onboarding screen: *"offers data
on test run times, failure rates, and identifies flaky tests..."*, then **"Select a setup
option"** — **Using GitHub Actions** or **Using Codecov's CLI**
(`src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:96-104,64-89`). Step 1 in either path is:
*"Output a JUnit XML file in your CI"*, with a framework picker to generate that XML
(`src/pages/RepoPage/FailedTestsTab/FrameworkTabsCard/FrameworkTabsCard.tsx:9-18`). Test analytics
cannot show anything until your CI actually produces and uploads that JUnit XML.

## Configuring a repository in the UI

The **Configuration** tab (visible only if you're a member of the owning org,
`src/pages/RepoPage/RepoPageTabs.tsx:133-135`) has four sections in a sidebar
(`src/pages/RepoPage/ConfigTab/ConfigTab.tsx:34-45`):

- **Configuration Manager** — a checklist-style landing page: Coverage (reports, YAML, project
  status, flags, components), Test analytics, Bundle analysis (JS/TS repos only, plus a "Configure
  data caching" button), and a fixed list of Codecov integrations (VS Code extension, browser
  extension, Slack app) — each row shows configured/not-configured plus a "get started" link
  (`src/pages/RepoPage/ConfigTab/tabs/ConfigurationManager/ConfigurationManager.tsx:47-223`).
- **General** — shows/change the default branch, your repository upload token (with a
  **Regenerate** button) and, behind a feature flag, a static-analysis token; and a **Danger
  Zone** with **Deactivate** (stops accepting uploads) and **Erase repository**
  (`src/pages/RepoPage/ConfigTab/tabs/GeneralTab/GeneralTab.tsx:32-38`,
  `DangerZone/DangerZone.jsx:6-19`, `DangerZone/RepoState/RepoState.jsx:14-64`).
- **YAML** — shows the repo's current effective YAML, repo settings (bot username, default
  branch), a **"Validate the YAML"** shell one-liner that POSTs your `codecov.yml` to
  `https://codecov.io/validate`, and a **Secret string** generator for encrypting sensitive values
  you want to paste into `codecov.yml` in the clear
  (`src/pages/RepoPage/ConfigTab/tabs/YamlTab/YamlTab.jsx:12-26`,
  `ValidateYaml/ValidateYaml.jsx:7-13`, `SecretString/SecretString.jsx:26-37`).
- **Badges & Graphs** — copy-paste snippets (Markdown / HTML / RST) for a live coverage badge you
  can drop in a README, optionally scoped to one branch
  (`src/pages/RepoPage/ConfigTab/tabs/BadgesAndGraphsTab/Badges/Badges.tsx:91-143`).

## The `codecov.yml` file

`codecov.yml` lives at your repository root (this worktree's own copy is at the repo root —
`codecov.yml:1`) and is what actually turns on/tunes most of what's described above. From this
repo's own file:

- **`coverage.range` / `coverage.precision` / `coverage.round`** — the green/yellow/red
  thresholds and how percentages are displayed (`codecov.yml:6-9`).
- **`coverage.status`** — turns project- and patch-level status checks on/off (`codecov.yml:11-14`).
- **`comment.layout`** — controls what the PR comment includes: `diff, flags, files, components,
  footer` (`codecov.yml:19`).
- **`ignore`** — file globs excluded entirely (Storybook files, mocks, generated files) from
  analysis (`codecov.yml:23-40`).
- **`component_management.individual_components`** — the components you'll see in the
  Components tab; this repo defines `dir_assets`, `dir_layouts`, `dir_pages`, `dir_services`,
  `dir_shared`, `dir_ui`, each mapped to one `src/**` folder (`codecov.yml:39-58`).
- **`test_analytics.flake_detection`** — set to `true` here, which is what turns on flake rate in
  the Tests tab (`codecov.yml:65-66`).

Athena's YAML tab (above) is where you view the effective merged config and validate a new draft
before committing it — you still edit and commit the file yourself in your repo.

## Organization-level views and member administration

At the org level (`/:provider/:owner`), the tab bar is **Repos**, **Analytics**, optionally
**Codecov AI** (beta, behind a flag), and **Settings** — plus, only when *not* self-hosted,
**Members** and **Plan** (`src/pages/OwnerPage/Tabs/Tabs.tsx:17-47`, same pattern in
`AnalyticsPage/Tabs/Tabs.tsx:12-36` and `MembersPage/Tabs/Tabs.tsx:12-36`).

- **Repos** — your organization's repository list (`src/pages/OwnerPage/OwnerPage.jsx:98-102`).
- **Analytics** — an org-wide coverage chart plus the same repo table, filterable by repo and
  date range (`src/pages/AnalyticsPage/AnalyticsPage.jsx:41-62`).
- **Settings** (`AccountSettings`) — on self-hosted this is: **Profile** (your own account, only
  when viewing your own settings), a personal-access-token tab (hidden if the instance sets
  `HIDE_ACCESS_TAB`), a **Global YAML** tab, and, if you're an org admin, an **Org upload token**
  tab (`src/pages/AccountSettings/AccountSettingsSideMenu.jsx:17-29`,
  `AccountSettings.jsx:48-53,64-68`).

## Not available in this self-hosted build

Two full pages redirect you away immediately when `config.IS_SELF_HOSTED` is true (set from
`ENV=enterprise`, `src/config.js:24-27`):

- **Plan / billing** — `PlanPage` redirects straight back to your org page:
  `if (config.IS_SELF_HOSTED || !ownerData?.isCurrentUserPartOfOrg) return <Redirect to={...}/>`
  (`src/pages/PlanPage/PlanPage.tsx:60-62`). There is no upgrade/invoices/payment UI in this build.
- **Members (self-service)** — `MembersPage` does the same:
  `if (config.IS_SELF_HOSTED) return <Redirect to={...}/>` (`src/pages/MembersPage/MembersPage.jsx:16-18`).

Both tabs are also removed from every org-level tab bar for the same reason
(`src/pages/OwnerPage/Tabs/Tabs.tsx:40-42`, and identically in `AnalyticsPage/Tabs/Tabs.tsx:29-31`
and `MembersPage/Tabs/Tabs.tsx:29-31`).

Member and admin management instead happens through a separate **Admin** area at
`/admin/:provider`, visible only to instance admins (`src/pages/AdminSettings/AdminSettings.jsx:38-59`):

- **Administrator Access** — lists install-wide admins; changing them is done by editing
  `install.yml`, not from this screen — *"Admins can be edited in the install.yml"*
  (`src/pages/AdminSettings/AdminAccess/AdminAccess.tsx:17-42`).
  On self-hosted, `AccountSettingsSideMenu` also hides the personal-access-token tab whenever the
  instance sets `HIDE_ACCESS_TAB=true` (`src/pages/AccountSettings/AccountSettingsSideMenu.jsx:19`).
- **Account Members** — activation info plus the full member list for the instance, with
  activate/deactivate controls (`src/pages/AdminSettings/AdminMembers/AdminMembers.jsx:14-29`).
