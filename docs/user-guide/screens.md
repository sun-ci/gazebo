# Athena — Screen Tour

Every screen a user of Athena (https://athena.sun-asterisk.vn) can reach, organized by the 16
top-level pages under `src/pages/`. This is the map of places — for how the flows between them
work (signing in, onboarding a repo, reading coverage, reviewing a PR), see
[`usage.md`](./usage.md); this page won't repeat that.

Screen codes (`SCR###`) match `plans/260908-1626-rebuild-spec/artifacts/screen-list.md`, the
validated inventory this tour is built from. Where several `SCR###` rows are really one place a
user picks a variant of (a bundler, a CI provider), they're described once with the variant names
on one line, per the source inventory's own compaction note (`screen-list.md:9`).

This build runs self-hosted (`ENV=enterprise` → `config.IS_SELF_HOSTED`, `src/config.js:24-27`).
Every screen below states plainly whether Athena's users can reach it in this build.

## 1. LoginPage (SCR001)

**"Login to Athena"** — `/login/:provider`, `/login` (`src/App.tsx:85-94`).
**Access:** public, logged out only.
**Purpose:** pick a Git provider (GitHub, Sentry, Bitbucket, GitLab) and start OAuth.
**Actions:** click a provider button (`src/pages/LoginPage/LoginButton.jsx:26-29`).
**Not in this build** — self-hosted redirects `/login` and `/login/:provider` straight to `/`
(`src/App.tsx:87,92`); Athena's users land on EnterpriseLandingPage (below) instead.

## 2. SyncProviderPage (SCR002)

**"What repo provider would you like to sync?"** — `/sync`, exact (`src/App.tsx:100-104`).
**Access:** signed-in user with no synced provider yet.
**Purpose:** first-login interstitial to sync your VCS account before Athena can list your repos.
**Actions:** click **"Sync with `<Provider>`"** per configured provider
(`src/pages/SyncProviderPage/SyncButton.tsx:23-48`). Skipped automatically on later logins once at
least one provider is synced (`src/pages/SyncProviderPage/SyncProviderPage.tsx:57-66`).
**Sub-tabs:** none.

## 3. EnterpriseLandingPage (SCR007)

No page title, just a provider-picker banner — `/`, exact, self-hosted only (`src/App.tsx:194-198`).
**Access:** public. This is Athena's real front door — non-self-hosted's `/` goes through
`HomePageRedirect` instead, which is why this screen only exists here.
**Purpose:** entry point that lists the configured Git providers as clickable cards.
**Actions:** click a provider card to start OAuth
(`src/pages/EnterpriseLandingPage/ProviderCard/ProviderCard.tsx`); auto-redirects onward once a
provider session already exists (`useEnterpriseRedirect`, `EnterpriseLandingPage.tsx:11`).
**Sub-tabs:** none.

## 4. OwnerPage (SCR006)

**"Repos"** tab of the org landing page — `/:provider/:owner`, exact (`src/App.tsx:148-152`).
**Access:** any signed-in user who can see the org (renders NotFound internally if not,
`src/pages/OwnerPage/OwnerPage.jsx:82`).
**Purpose:** lists the organization's repositories, with onboarding banners for new orgs.
**Actions:** click a repo row to open it; the org-level tab bar sits above the list.
**Sub-tabs (`src/pages/OwnerPage/Tabs/Tabs.tsx:17-47`):** **Repos**, **Analytics**, optionally
**Codecov AI** (beta, feature-flagged), **Settings** — and, only when *not* self-hosted,
**Members** and **Plan** (`Tabs.tsx:29-31,40-42`). On Athena, the Members and Plan tabs never
render; see §7 and §8.

## 5. AnalyticsPage (SCR004)

**"Analytics"** tab — `/analytics/:provider/:owner`, exact (`src/App.tsx:133-137`).
**Access:** any signed-in org member; renders NotFound if the owner can't be loaded
(`src/pages/AnalyticsPage/AnalyticsPage.jsx:33-35`).
**Purpose:** org-wide coverage/usage chart plus the same repo list, filterable.
**Actions:** change date range and repo filters via `ChartSelectors`; sort the repo table.
**Sub-tabs:** same tab bar as OwnerPage (`src/pages/AnalyticsPage/Tabs/Tabs.tsx:12-36`).

## 6. CodecovAIPage (SCR005)

**"Codecov AI"** tab — `/codecovai/:provider/:owner`, exact (`src/App.tsx:138-142`).
**Access:** any signed-in org member, only reachable while the `codecovAiFeaturesTab` flag is on
(`src/pages/OwnerPage/Tabs/Tabs.tsx:13-15,28-38`) — otherwise the tab itself doesn't appear.
**Purpose:** install/configure the Codecov AI assistant for the org's repos.
**Actions:** install the AI app, view which repos have it configured.
**Sub-tabs:** same tab bar as OwnerPage.

## 7. MembersPage (SCR003) — not available in this build

**"Manage members"** — `/members/:provider/:owner` (`src/App.tsx:126-132`).
**Access:** would be org admins, non-self-hosted only.
**Not in this build** — `src/pages/MembersPage/MembersPage.jsx:16-18` redirects to
`/:provider/:owner` whenever `config.IS_SELF_HOSTED` is true, and the route itself is never
registered on self-hosted (`src/App.tsx:126-132`). The **Members** tab is also removed from every
org-level tab bar for the same reason (`src/pages/OwnerPage/Tabs/Tabs.tsx:40-42`).

## 8. PlanPage family (SCR016–SCR022) — not available in this build

Billing has no UI on self-hosted at all: `src/pages/PlanPage/PlanPage.tsx:60-62` redirects every
route under `/plan/:provider/:owner*` back to the org page whenever
`config.IS_SELF_HOSTED || !ownerData?.isCurrentUserPartOfOrg`, and the **Plan** tab is removed from
every org-level tab bar (`Tabs.tsx:40-42`). The pages that would exist behind that gate, for
completeness:

- **Current plan** (SCR016, `/plan/:provider/:owner`) — billing summary, invoices, payment card.
- **Upgrade plan** (SCR017, `/plan/:provider/:owner/upgrade`) — Pro/Team/Sentry checkout.
- **Invoices** (SCR018, `/plan/:provider/:owner/invoices`) + **invoice detail** (SCR019, `/invoices/:id`) — invoice history and line items.
- **Downgrade to Basic** (SCR020, `/plan/:provider/:owner/cancel/downgrade`) — cancellation confirm.
- **Cancel-plan retention offer** (SCR021 Team-plan offer / SCR022 generic discount offer,
  both `/plan/:provider/:owner/cancel`, mutually exclusive by eligibility,
  `src/pages/PlanPage/subRoutes/CancelPlanPage/CancelPlanPage.tsx:45-51,65-68`) — shown before a
  downgrade completes.

None of these render for an Athena user; there is no upgrade, invoice, or payment screen to reach.

## 9. AccountSettings (SCR008–SCR013)

Shell at `/account/:provider/:owner/*` (`src/App.tsx:95-99`), sidebar at
`src/pages/AccountSettings/AccountSettingsSideMenu.jsx`.

### Profile / Admin (account-index variant swap)
`/account/:provider/:owner/`, exact (`src/pages/AccountSettings/AccountSettings.jsx:47-55`).
**Access + variant:** on self-hosted, viewing your own settings shows **Profile** (SCR008) — name,
email, activation banner (`src/pages/AccountSettings/tabs/Profile/Profile.jsx`); the **Admin**
(SCR009) variant is a non-self-hosted-only screen and never renders here
(`AccountSettings.jsx:50-51`); viewing someone else's settings redirects to Global YAML instead
(`AccountSettings.jsx:53`).
**Actions:** update your name/email.

### Okta Access (SCR010)
`/account/:provider/:owner/okta-access/`, exact (`AccountSettings.jsx:56-60`).
**Access:** only reachable when the org's plan is flagged Enterprise
(`data.plan.isEnterprisePlan`, `AccountSettings.jsx:36,56`) — independent of self-hosted status.
**Purpose:** configure Okta SSO for the org. **Actions:** edit and save the Okta config form.

### Global YAML (SCR011)
**"Global YAML"** — `/account/:provider/:owner/yaml/`, exact (`AccountSettings.jsx:61-63`).
**Access:** any signed-in user viewing this account-settings area; it's also the fallback redirect
target when neither Profile nor Admin applies (`AccountSettings.jsx:53,76`).
**Purpose:** edit the org's default `codecov.yml` override. **Actions:** edit YAML, save (shows a
success modal).

### Access — tokens & sessions (SCR012)
**"Access"** — `/account/:provider/:owner/access/`, exact (`AccountSettings.jsx:64-68`).
**Access:** present only when `!config.IS_SELF_HOSTED || !config.HIDE_ACCESS_TAB`
(`AccountSettings.jsx:64`, `src/pages/AccountSettings/AccountSettingsSideMenu.jsx:19`,
`src/config.js:34-35`). `HIDE_ACCESS_TAB` has no hard-coded default — it's an instance-level env
setting; **if the Athena admin sets `HIDE_ACCESS_TAB=true`, this screen and its sidebar link
disappear entirely for every user.**
**Purpose:** manage your personal-access tokens and active login sessions.
**Actions:** create/revoke a token, end a session.
**Not found under this shell** falls through to NotFound (SCR058, `AccountSettings.jsx:79-81`).

### Org Upload Token (SCR013)
**"Global upload token"** — `/account/:provider/:owner/org-upload-token`, exact, admin-only
(`AccountSettings.jsx:69-78`).
**Purpose:** generate/regenerate the org-wide upload token.
**Actions:** **Generate**/**Regenerate** (behind a confirm modal); non-admins hitting this URL
redirect to Global YAML (`AccountSettings.jsx:75-76`).

## 10. AdminSettings (SCR014–SCR015) — self-hosted only

Shell at `/admin/:provider`, registered only when `config.IS_SELF_HOSTED`
(`src/App.tsx:105-111`); non-admins are redirected to `/:provider`
(`src/pages/AdminSettings/AdminSettings.jsx:38,57`). This is where Athena's own member/admin
management lives, since the org-level Members tab (§7) doesn't exist here.

### Administrator Access (SCR014)
`/admin/:provider/access`, exact (`AdminSettings.jsx:43-45`).
**Access:** instance admins only.
**Purpose:** view the install-wide admin list.
**Actions:** none in the UI — the page says admins are edited by hand in `install.yml`
(`src/pages/AdminSettings/AdminAccess/AdminAccess.tsx:17-42`).
**Sub-tabs:** sidebar links to **Access** / **Users**
(`src/pages/AdminSettings/AdminSettingsSidebar/AdminSettingsSidebar.jsx:6-9`).

### Account Members (SCR015)
`/admin/:provider/users`, exact (`AdminSettings.jsx:46-48`).
**Access:** instance admins only.
**Purpose:** instance-wide seat/license usage and the full member list.
**Actions:** activate/deactivate a member's seat.

## 11. RepoPage (SCR034–SCR057) — the biggest page

Shell at `/:provider/:owner/:repo/*`; the repo tab bar itself is built from repo state
(`src/pages/RepoPage/RepoPageTabs.tsx:70-137`) — **Coverage** shows once coverage is enabled or
you're in the org, **Bundles** shows once JS/TS is detected or bundle analysis is on, **Tests**
shows once test analytics is on or you're in the org, **Commits**/**Pulls** need a product enabled
plus repo-view authorization, **Configuration** needs org membership. A repo that's active but not
yet **activated** shows DeactivatedRepo (SCR057, below) on `/:repo` and `/:repo/bundles` instead of
any tab content (`src/pages/RepoPage/RepoPage.tsx:72,192-204`); a repo not yet active at all only
exposes onboarding + Config (`RepoPage.tsx:206-252`).

### Coverage — Overview (SCR034)
**"Coverage" → "Overview"** — `/:repo`, plus `/tree/:branch`, `/blob/:ref/:path`
(`RepoPage.tsx:76-96`). **Purpose:** repo coverage summary, trend chart, optional sunburst, and a
file browser underneath — detailed in `usage.md` §"Reading coverage"; not repeated here.
**Sub-nav:** **Overview** / **Flags** / **Components** radio tiles
(`src/pages/RepoPage/CoverageTab/CoverageTabNavigator.tsx:7-63`).

### Coverage — Flags (SCR035)
`/:repo/flags`, `/:repo/flags/:branch`. **Purpose:** per-flag coverage table, with backfill/sync
banners. **Actions:** an admin can delete a flag's stored data (does not stop future uploads —
see `usage.md` §"Flags and components").

### Coverage — Components (SCR036)
`/:repo/components`, `/:repo/components/:branch`. **Purpose:** per-component coverage table,
same shape as Flags. **Actions:** delete a component's measurements; "Enable component analytics"
backfill button on first turn-on.

### Coverage setup ("Coverage Analytics" onboarding, SCR037–SCR039)
`/:repo/new` (default), shown instead of Overview when coverage isn't enabled yet
(`RepoPage.tsx:97-108,180-183`). **"Select a setup option"** picks the variant: **Using Codecov's
CLI (Recommended)** (routes to `/new/other-ci`), **Using GitHub Actions** (`/new`), **Using Circle
CI** (`/new/circle-ci`) (`src/pages/RepoPage/CoverageOnboarding/NewRepoTab.tsx:79-98`). Each walks
through outputting a coverage report, adding the repo's upload token to CI, and merging — see
`usage.md` §"Getting a repository into Athena".

### Bundles (SCR040)
`/:repo/bundles`, `/:repo/bundles/:branch`, `/:repo/bundles/:branch/:bundle` — only rendered once
`bundleAnalysisEnabled` (`src/pages/RepoPage/BundlesTab/BundlesTab.tsx:27-33`; otherwise redirects
to onboarding below). **Purpose:** bundle size trend chart plus a per-asset breakdown table.
**Actions:** pick a point on the trend chart to drill into that bundle's assets.

### Bundle setup onboarding (SCR041–SCR047)
`/:repo/bundles/new` (default) and its bundler variants, shown when JS/TS is present but bundle
analysis isn't enabled yet (`RepoPage.tsx:124-138`). **"Select your bundler"** picks: **Using
Vite** (default), **Rollup**, **Webpack**, **Remix (Vite)**, **Nuxt**, **SvelteKit**,
**SolidStart** (`src/pages/RepoPage/BundlesTab/BundleOnboarding/BundleOnboarding.tsx:100-157`). A
repo with no upload token yet is redirected away from this screen entirely
(`BundleOnboarding.tsx:200-204`).

### Tests (SCR048)
**"Tests"** (badged **New**) — `/:repo/tests`, `/:repo/tests/:branch`; shown once test analytics
is enabled, else the onboarding below (`src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:121,142`).
**Purpose:** test-run metrics (slowest tests, flake rate, failures) plus a sortable failed-tests
table — detailed in `usage.md` §"Test analytics / failed tests". Private repos you aren't
activated on see an activation prompt instead (`FailedTestsTab.tsx:138-141`).

### Tests setup onboarding (SCR049–SCR050)
`/:repo/tests/new` (default) and `/:repo/tests/new/codecov-cli`. **"Select a setup option"**
picks: **Using GitHub Actions** or **Using Codecov's CLI**
(`FailedTestsTab.tsx:64-89`); both start with "Output a JUnit XML file in your CI".

### Commits (SCR051)
`/:repo/commits`, `/:repo/commits/:branch` — needs a product enabled and repo-view authorization
(`RepoPage.tsx:153-160`). **Purpose:** commit list with per-commit coverage status.
**Actions:** click a commit row to open its detail page (§13).

### Pulls (SCR052)
`/:repo/pulls` — same gate as Commits (`RepoPage.tsx:161-165`). **Purpose:** pull-request list
with per-PR coverage status. **Actions:** click a row to open the PR page (§12).

### Configuration Manager (SCR053)
`/:repo/config`, exact (`RepoPage.tsx:169-171`). **Access:** org members only — non-members hit
NotFound (SCR058) instead (`src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32`).
**Purpose:** checklist landing page of what's configured — coverage, tests, bundles, integrations.
**Sub-tabs (sidebar):** **Configuration Manager**, **General**, **YAML**, **Badges & Graphs**
(`ConfigTab.tsx:34-45`) — see `usage.md` §"Configuring a repository in the UI" for what each does.

### General (SCR054)
`/:repo/config/general`. Default branch, upload token (**Regenerate**), and a **Danger Zone**
with **Deactivate** and **Erase repository**.

### YAML (SCR055)
`/:repo/config/yaml`. The repo's effective YAML, a **"Validate the YAML"** shell one-liner, and a
**Secret string** generator.

### Badges & Graphs (SCR056)
`/:repo/config/badge`. Copy-paste Markdown/HTML/RST snippets for a README coverage badge.

### DeactivatedRepo state (SCR057)
Same routes as Overview/Bundles (`/:repo`, `/:repo/bundles`), swapped in when
`isRepoActive && !isRepoActivated` (`RepoPage.tsx:72,192-201`). **"This repository has been
deactivated"** — org members get a link to Configuration → General to reactivate it; everyone
else is told to ask their git-org admin for write access (`src/pages/RepoPage/DeactivatedRepo/DeactivatedRepo.tsx:27-45`).

## 12. PullRequestPage (SCR023–SCR029)

Shell at `/:provider/:owner/:repo/pull/:pullId*` (`src/App.tsx:157-166`). The coverage summary
bar (HEAD/Patch/Change numbers) is shared across every tab below and is covered in `usage.md`
§"Reviewing a pull request" — not repeated here.

### Files changed (SCR029, default tab)
`pull/:pullId`, exact (`PullCoverage.tsx:116-120`). **Purpose:** diff view of every changed file
with per-line coverage coloring and a change count badge.

### Indirect changes (SCR025)
`pull/:pullId/indirect-changes`, exact. **Purpose:** files that moved coverage without being
edited by this PR.

### Commits (SCR026)
`pull/:pullId/commits`, exact. **Purpose:** every commit included in the PR, each with its own
coverage status.

### Flags (SCR027)
`pull/:pullId/flags`, exact. **Purpose:** per-flag coverage breakdown for the PR, filterable by
the URL's `flags` query param.

### Components (SCR028)
`pull/:pullId/components`, exact. **Purpose:** per-component coverage breakdown; shows a
placeholder inviting you to configure components if none exist
(`src/pages/PullRequestPage/PullCoverage/routes/ComponentsTab/ComponentsNotConfigured/ComponentsNotConfigured.jsx:12-22`).

### File explorer (SCR023 tree + SCR024 blob)
`pull/:pullId/tree/:path+` and `pull/:pullId/blob/:path+`. **Purpose:** browse the PR's head-commit
file tree, then open a single file's diff/coverage. Same three-state line coloring as the repo
file viewer (`usage.md` §"Line by line in a file").

**Note:** on Team-plan private repos, only **Files changed**, **Commits**, and **File explorer**
show (`src/pages/PullRequestPage/PullCoverage/PullCoverageTabs/PullCoverageTabs.jsx:54-88`).

## 13. CommitDetailPage (SCR030–SCR033)

Shell at `/:provider/:owner/:repo/commit/:commit*` (`src/App.tsx:167-176`). The uploads-history
card and YAML-preview modal on this page are covered in `usage.md` §"Looking at a single commit".

### Files changed (SCR032, default tab)
`commit/:commit`, exact (`CommitCoverage.jsx:92-94`). **Purpose:** files changed in this commit
with coverage.

### Indirect changes (SCR033)
`commit/:commit/indirect-changes`, exact. **Access:** hidden when
`repoData.repository.private && isTeamPlan` (`CommitCoverageTabs.jsx:24,65-78`) — same Team-plan
restriction as the PR page.

### File explorer (SCR030 tree + SCR031 blob)
`commit/:commit/tree/:path+` and `commit/:commit/blob/:path+`. **Purpose:** browse this commit's
file tree, then open a single file's coverage.

## 14. NotFound (SCR058)

**"Not found"** — not a routed screen of its own; it's the fallback rendered inside two independent
switches: unmatched `/account/:provider/:owner/*` paths (`AccountSettings.jsx:79-81`) and unmatched
`/:repo/config/*` paths, including the org-membership guard on Configuration
(`src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32,64-66`). Also what AnalyticsPage and OwnerPage
render internally when their owner query comes back empty.
**Purpose:** static "page not found" message with an illustration
(`src/pages/NotFound/NotFound.jsx:49-71`). **Actions:** none — no navigation links out.

## 15. TermsOfService — not available in this build

Not a URL of its own; it's a full-page content swap that `BaseLayout` renders in place of whatever
screen you requested (`src/layouts/BaseLayout/BaseLayout.tsx:41-47`), triggered when
`internalUser.termsAgreement === false` — but that check only runs `&& !config.IS_SELF_HOSTED`
(`src/layouts/BaseLayout/hooks/useUserAccessGate.js:77-79`). **On Athena this screen can never
appear** — there is no terms-of-service gate for self-hosted users.
For completeness, were it reachable: it asks for your name, email, and marketing-consent
checkbox alongside the ToS agreement checkbox (`src/pages/TermsOfService/TermsOfService.tsx:20-26,51-71`).

## 16. DefaultOrgSelector — unreachable, no implementation in this version

`src/pages/DefaultOrgSelector/` contains only a test file
(`src/pages/DefaultOrgSelector/DefaultOrgSelector.test.jsx`); no `DefaultOrgSelector.jsx`/`.tsx`
component exists anywhere in the tree, and nothing outside that test file imports the name
`DefaultOrgSelector` (confirmed by grepping every `.ts`/`.tsx`/`.js`/`.jsx` source file in `src/`).
It is not registered in `src/App.tsx`'s route table. **This screen has no implementation in this
version of Athena and is not reachable by any user.** It is flagged here plainly rather than
described, since inventing behavior for it would misrepresent the product; `screen-list.md`'s
validated inventory of 58 screens does not carry it either.

## Screens gated off in this self-hosted build — summary

| Screen(s) | Why it's absent | Citation |
|---|---|---|
| MembersPage (SCR003) | `IS_SELF_HOSTED` redirect + route not registered | `src/pages/MembersPage/MembersPage.jsx:16-18`, `src/App.tsx:126-132` |
| PlanPage family (SCR016–SCR022) | `IS_SELF_HOSTED` redirect + route not registered | `src/pages/PlanPage/PlanPage.tsx:60-62`, `src/App.tsx:112-124` |
| Members / Plan tabs everywhere | removed from every org-level tab bar | `src/pages/OwnerPage/Tabs/Tabs.tsx:40-42` (same in AnalyticsPage/MembersPage Tabs) |
| Account Admin tab (SCR009) | only renders `!IS_SELF_HOSTED && isAdmin` | `src/pages/AccountSettings/AccountSettings.jsx:50-51` |
| Access tab (SCR012), conditionally | disappears if the instance admin sets `HIDE_ACCESS_TAB=true` | `AccountSettings.jsx:64`, `AccountSettingsSideMenu.jsx:19`, `src/config.js:34-35` |
| TermsOfService | gate only fires `!IS_SELF_HOSTED` | `src/layouts/BaseLayout/hooks/useUserAccessGate.js:77-79` |
| LoginPage (SCR001) | self-hosted redirects `/login*` to `/` | `src/App.tsx:87,92` |
| DefaultOrgSelector | no component implementation exists in this codebase | `src/pages/DefaultOrgSelector/` (test file only) |

Everything else in this tour — Login's self-hosted replacement (EnterpriseLandingPage), Owner,
Analytics, Codecov AI, Account Settings' Profile/YAML/Access/Org-token tabs, Admin Settings, and
the full RepoPage/PullRequestPage/CommitDetailPage family — is present and reachable in Athena.
