<!--
Wave 5 also emits plans/<active-plan>/artifacts/_canonical-fcodes.json
(canonical fcode + slug + related-code source for validators and FS.1 fan-out)
AND pre-creates plans/<active-plan>/artifacts/features/{slug}/ folders with
.pending markers. See references/canonical-fcode-schema.md.
-->

# Feature List

**Project**: Athena (Sun* self-hosted Codecov, frontend fork of codecov/gazebo)
**Generated**: 2026-09-08
**Analysis Scope**: FRONTEND-only SPA at calver 25.6.2. Grouped from 65 user stories
(US001-US065), 58 screens (SCR001-SCR058), 122 backend routes (ROUTE001-ROUTE122),
9 data-model entities (MODEL001-MODEL009), and 6 background-logic items (BL001-BL006)
into 41 features (F001-F041) by primary business intent, per
code-formats.md § Feature Clustering Rule.

**Code Format**: All codes MUST follow `F###_NameSlug` format (e.g., F001_Auth, F003_UserProfile)
**Screen Code Format**: All screen codes MUST follow `SCR###_NameSlug` format (e.g., SCR001_LoginForm)
**User Story Code Format**: All US codes MUST follow `US###_NameSlug` format (e.g., US001_Login)
**Background Logic Code Format**: All BL codes MUST follow `BL###_NameSlug` format (e.g., BL001_ScheduledReport)
**Permission Code Format**: All PERM codes MUST follow `PERM###_NameSlug` format (e.g., PERM001_ViewReports)

**Feature Types**:
- `ui` - Feature has UI screens (SCR###)
- `background` - Feature only has background logic (BL###, no SCR###)
- `mixed` - Feature has both UI screens and background logic

**Related Screens column format**: Accepts `SCR###`, `SCR###/REG###`, or mixed comma-separated (e.g., `SCR001, SCR002/REG003`). Tokenizer splits on `,` then on `/`. No intra-screen shorthand (`SCR###/REG001+REG002` invalid) - enumerate each ref explicitly.

**Partial-screen ownership note**: A feature with only a `SCR###/REG###` ref owns the region, NOT the parent SCR. The screen shell (`SCR###`) must be owned by a separate F### with a bare `SCR###` ref (typically a layout/dashboard feature). Applied here: F003_RepoTabNavigation owns the bare shells SCR034, SCR040, SCR048; F004/F005/F006 own only those screens' `/REG###` children.

**Cross-reference**: See ScreenList Regions subsection for region definitions and the `REG###_NameSlug` registry.

## Feature Hierarchy

**Note**: Features are sorted by priority from highest to lowest (P0 -> P1 -> P2 -> P3). Priority levels:
- **P0**: Core functionality, blocking issues, or essential features
- **P1**: High priority, significant features
- **P2**: Medium priority, standard features
- **P3**: Low priority, nice-to-have features

| Code | Name | Type | Language | Workspace | Priority |
|------|------|------|----------|-----------|----------|
| F001_AuthenticationAndOnboarding | AuthenticationAndOnboarding | ui | JS/TS | frontend | P0 |
| F007_RepoGeneralSettingsAndDangerZone | RepoGeneralSettingsAndDangerZone | ui | JS/TS | frontend | P0 |
| F004_RepoCoverageOverview | RepoCoverageOverview | mixed | JS/TS | frontend | P1 |
| F008_RepoFlagCoverage | RepoFlagCoverage | ui | JS/TS | frontend | P1 |
| F009_RepoComponentCoverage | RepoComponentCoverage | ui | JS/TS | frontend | P1 |
| F005_BundleAnalysisDashboard | BundleAnalysisDashboard | mixed | JS/TS | frontend | P1 |
| F006_TestAnalyticsDashboard | TestAnalyticsDashboard | ui | JS/TS | frontend | P1 |
| F010_RepoCommitsList | RepoCommitsList | ui | JS/TS | frontend | P1 |
| F011_RepoPullsList | RepoPullsList | ui | JS/TS | frontend | P1 |
| F012_PullFilesChangedComparison | PullFilesChangedComparison | ui | JS/TS | frontend | P1 |
| F013_PullFileDiffDetail | PullFileDiffDetail | mixed | JS/TS | frontend | P1 |
| F014_CommitFilesChangedSummary | CommitFilesChangedSummary | ui | JS/TS | frontend | P1 |
| F015_CommitFileDiffDetail | CommitFileDiffDetail | mixed | JS/TS | frontend | P1 |
| F016_RepoConfigOverviewAndNavigation | RepoConfigOverviewAndNavigation | ui | JS/TS | frontend | P1 |
| F017_RepoYamlConfiguration | RepoYamlConfiguration | ui | JS/TS | frontend | P1 |
| F018_OrganizationRepoList | OrganizationRepoList | ui | JS/TS | frontend | P1 |
| F019_BillingAndPlanManagement | BillingAndPlanManagement | mixed | JS/TS | frontend | P1 |
| F020_OrgAdminManagement | OrgAdminManagement | ui | JS/TS | frontend | P1 |
| F021_InstanceMemberManagement | InstanceMemberManagement | ui | JS/TS | frontend | P1 |
| F003_RepoTabNavigation | RepoTabNavigation | ui | JS/TS | frontend | P2 |
| F022_CoverageOnboarding | CoverageOnboarding | ui | JS/TS | frontend | P2 |
| F023_BundleOnboarding | BundleOnboarding | ui | JS/TS | frontend | P2 |
| F024_TestAnalyticsOnboarding | TestAnalyticsOnboarding | ui | JS/TS | frontend | P2 |
| F025_PullFileExplorer | PullFileExplorer | ui | JS/TS | frontend | P2 |
| F026_PullIndirectChanges | PullIndirectChanges | ui | JS/TS | frontend | P2 |
| F027_PullCommitsList | PullCommitsList | ui | JS/TS | frontend | P2 |
| F028_PullFlagsBreakdown | PullFlagsBreakdown | ui | JS/TS | frontend | P2 |
| F029_PullComponentsBreakdown | PullComponentsBreakdown | ui | JS/TS | frontend | P2 |
| F030_CommitFileExplorer | CommitFileExplorer | ui | JS/TS | frontend | P2 |
| F031_CommitIndirectChanges | CommitIndirectChanges | ui | JS/TS | frontend | P2 |
| F032_BadgesAndGraphs | BadgesAndGraphs | ui | JS/TS | frontend | P2 |
| F033_OrganizationAnalytics | OrganizationAnalytics | ui | JS/TS | frontend | P2 |
| F034_OrgMembersActivation | OrgMembersActivation | ui | JS/TS | frontend | P2 |
| F035_CodecovAIIntegration | CodecovAIIntegration | ui | JS/TS | frontend | P2 |
| F036_AccountProfileSettings | AccountProfileSettings | ui | JS/TS | frontend | P2 |
| F037_OktaSSOConfiguration | OktaSSOConfiguration | ui | JS/TS | frontend | P2 |
| F038_AccountDefaultYamlConfig | AccountDefaultYamlConfig | ui | JS/TS | frontend | P2 |
| F039_PersonalAccessTokensAndSessions | PersonalAccessTokensAndSessions | ui | JS/TS | frontend | P2 |
| F040_OrgUploadTokenManagement | OrgUploadTokenManagement | ui | JS/TS | frontend | P2 |
| F041_InstanceAdminAccessList | InstanceAdminAccessList | ui | JS/TS | frontend | P2 |
| F002_DevMockServiceWorkerInfra | DevMockServiceWorkerInfra | background | - | frontend | P3 |

## Feature Details

<!-- Batch 01 (01-auth-and-repo-coverage): F001-F010, 11 features -->
### F001_AuthenticationAndOnboarding: AuthenticationAndOnboarding

**Type**: ui
**Description**: Lets a signed-out visitor authenticate into Athena. In this self-hosted build (`IS_SELF_HOSTED` gate, `src/config.js:26`), sign-in enters through the enterprise landing page rather than the generic login screen: `/login` and `/login/:provider` redirect to `/` instead of rendering `LoginPage` (`src/App.tsx:85-94`), so `SCR001_LoginPage` is not a reachable entry point on this build -- it stays documented here because both screens share one OAuth-redirect mechanism. From the landing page the user picks a configured git provider (or its self-hosted variant, or Okta) and is redirected to `{API_URL}/login/:provider`. After OAuth returns, the user must sync at least one git-provider organization (auto-redirected to `/sync` if they have zero) and, on a non-self-hosted evaluation of the same code path, agree to the Terms of Service before any owner screen renders.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 4 (LoginButton, SessionExpiredBanner, SyncButton, ProviderCard)

**Related Screens**:
- SCR001: LoginPage (inactive on this self-hosted build -- `src/App.tsx:85-94`, `src/config.js:26`)
- SCR002: SyncProviderPage
- SCR007: EnterpriseLandingPage

**Related User Stories**:
- US001: AgreeToTermsOfService
- US002: SignInWithGitProvider
- US003: SyncGitProviderOrganization
- US004: SignInFromSelfHostedLandingPage

**Related APIs/Routes**:
- (POST) GetLoginProviders (ROUTE056)
- (POST) GetSyncProviders (ROUTE057)
- (POST) IsSyncing (ROUTE112)
- (POST) SyncData (ROUTE113)
- `saveTermsAgreement` mutation -- not in route-list.md's ROUTE### inventory (not tied to a routed screen); cited at `src/pages/TermsOfService/hooks/useTermsOfService.ts:54-56`

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- PERM001: GlobalOrgSyncAndToSGate

---

### F003_RepoTabNavigation: RepoTabNavigation

**Type**: ui
**Description**: Lets an org member see every applicable repo tab (Coverage, Bundles, Tests, Commits, Pulls, Config) in the repo navigation even before that product has been set up, so they can jump straight into onboarding for anything not yet enabled. A Non-Member instead sees only the tabs for products already enabled on that repo -- this feature owns the bare tab-shell screens; the region content each tab renders belongs to separate features (F004/F005/F006).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (RepoPageTabs)

**Related Screens**:
- SCR034: RepoOverviewTab (shell only -- regions owned by F004)
- SCR040: BundleContent (shell only -- regions owned by F005)
- SCR048: FailedTestsPage (shell only -- regions owned by F006)

**Related User Stories**:
- US054: NavigateRepoTabsRegardlessOfProductEnabled

**Related APIs/Routes**:
- (POST) GetRepo (ROUTE083)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- PERM004: OrgMembershipGateRepoTabVisibility

---

### F004_RepoCoverageOverview: RepoCoverageOverview

**Type**: mixed
**Description**: Lets a user with view access to a repo (public repo, or private repo where the user is activated) see its coverage overview: total/patch/change coverage figures, a coverage trend chart, an optional sunburst treemap for spotting low-coverage directories, and a file explorer that drills down to any file's line-by-line hit/miss/partial coverage annotation. If the repo is private and the user is not activated, `SCR057_DeactivatedRepo` (`ActivationAlert`) renders instead of the overview (`src/pages/RepoPage/RepoPage.tsx:67-68,91-95`).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 7 (FirstPullRequestBanner, Summary/SummaryTeamPlan, CoverageChart, Sunburst, FileExplorer, FileViewer, DeactivatedRepo)

**Related Screens**:
- SCR034/REG001: RepoOverviewTab (Summary/SummaryTeamPlan)
- SCR034/REG002: RepoOverviewTab (CoverageChart)
- SCR034/REG003: RepoOverviewTab (Sunburst)
- SCR034/REG004: RepoOverviewTab (FileExplorer/FileViewer)
- SCR057: DeactivatedRepo

**Related User Stories**:
- US005: ViewRepoCoverageOverview
- US016: ViewRepoCoverageOverview
- US017: ViewRepoCoverageSunburst
- US018: BrowseRepoFileExplorer
- US019: ViewRepoFileCoverageDetail

**Related APIs/Routes**:
- (POST) GetRepoCoverage (ROUTE088)
- (GET) /{provider}/{owner}/{repo}/coverage/tree (ROUTE004)
- (POST) BranchContents (ROUTE065)
- (POST) CoverageForFile (ROUTE067)

**Related Data Models**:
- MODEL008_RepoNotFoundError
- MODEL009_RepoOwnerNotActivatedError

**Related Background Logic**:
- BL003: DisablePointerEventsOnScroll (`src/shared/useDisablePointerEvents/useDisablePointerEvents.ts`)
- BL004: CodeRendererScrollPointerToggle (`src/ui/CodeRenderer/CodeRenderer.tsx:71-75`)
- BL006: ScrollLeftSync (`src/ui/VirtualRenderers/useScrollLeftSync.ts:34-38`)

**Related Permissions**:
- None (the private/activation gate here is an inline check in `RepoPage.tsx:67-70` shaped like PERM005 but not itself a numbered PERM per permissions-matrix.md)

---

### F008_RepoFlagCoverage: RepoFlagCoverage

**Type**: ui
**Description**: Lets a user view a repo's coverage broken down by upload flag, with per-flag coverage percentage and a trend sparkline. Org members can additionally trigger flag-analytics backfill (`useActivateMeasurements`, `measurementType FLAG_COVERAGE`) when it isn't active yet, and delete a flag's stored measurements -- the delete action is hidden entirely for a Non-Member (`src/pages/RepoPage/CoverageTab/FlagsTab/FlagsTab.jsx:63`).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 7 (SyncingBanner, TriggerSyncBanner, Header, TimescaleDisabled, FlagsTable, DeleteFlagModal, TableEntries)

**Related Screens**:
- SCR035: RepoFlagsTab

**Related User Stories**:
- US006: ViewRepoFlagCoverage
- US020: ViewRepoFlagsCoverageTable
- US021: EnableFlagAnalyticsBackfill

**Related APIs/Routes**:
- (POST) FlagMeasurements (ROUTE089)
- (POST) FlagsSelect (ROUTE091)
- (POST) ActivateMeasurements (ROUTE079)
- (POST) deleteFlag (ROUTE060)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None (delete-action visibility is an inline `isCurrentUserPartOfOrg` check, not a numbered PERM per permissions-matrix.md)

---

### F009_RepoComponentCoverage: RepoComponentCoverage

**Type**: ui
**Description**: Lets a user view a repo's coverage broken down by defined component, with a branch selector to re-scope the table to a different branch. Org members can additionally trigger component-analytics backfill (`useActivateMeasurements`, `measurementType COMPONENT_COVERAGE`) and delete a component's stored measurements, following the same org-membership visibility rule as the flag delete action in F008.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 8 (SyncingBanner, TriggerSyncBanner, Header, BranchSelector, TimescaleDisabled, ComponentsTable, DeleteComponentModal, TableEntries)

**Related Screens**:
- SCR036: RepoComponentsTab

**Related User Stories**:
- US007: ViewRepoComponentCoverage
- US022: ViewRepoComponentsCoverageTable
- US023: EnableComponentAnalyticsBackfill

**Related APIs/Routes**:
- (POST) ComponentMeasurements (ROUTE085)
- (POST) RepoComponentsSelector (ROUTE086)
- (POST) ActivateMeasurements (ROUTE079)
- (POST) deleteComponentMeasurements (ROUTE059)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None (delete-action visibility is an inline `isCurrentUserPartOfOrg` check, not a numbered PERM per permissions-matrix.md)

---

### F022_CoverageOnboarding: CoverageOnboarding

**Type**: ui
**Description**: Lets an org member walk through repo coverage-setup instructions matching their CI provider -- GitHub Actions (default), CircleCI, or any other CI via terminal-based upload -- and, on the GitHub Actions variant, choose between the org's global upload token and the repo's own token before wiring up their CI. Switching CI provider only swaps the instructional content; the fetched upload token persists across all three screens.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 5 (ActivationBanner, ExampleBlurb, LearnMoreBlurb, OutputCoverageStep, TerminalInstructions)

**Related Screens**:
- SCR037: CoverageOnboardingGitHubActions
- SCR038: CoverageOnboardingCircleCI
- SCR039: CoverageOnboardingOtherCI

**Related User Stories**:
- US024: NavigateCoverageOnboardingCIOptions
- US025: SelectUploadTokenSourceDuringOnboarding

**Related APIs/Routes**:
- (POST) RegenerateRepositoryToken (ROUTE098)
- (POST) GetOrgUploadToken (ROUTE063)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None (org-admin gate on the token-generate sub-action is out of this feature's shard per user-stories.md US025 -- no numbered PERM cited there)

---

### F005_BundleAnalysisDashboard: BundleAnalysisDashboard

**Type**: mixed
**Description**: Lets a user (public repo, or private repo where the user is activated) view a repo's JS/TS bundle-analysis dashboard once bundle analysis is enabled: a bundle-size trend chart with a selectable time range, and a paginated table of individual assets driving that size. The chart and the assets table load and paginate independently of each other. When bundle analysis is not yet enabled, the repo is routed to bundler onboarding (F023) instead of this dashboard.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 7 (AssetsTable, BundleChart, BundleDetails, BundleSelection, ErrorBanner, InfoBanner, TrendDropdown)

**Related Screens**:
- SCR040/REG001: BundleContent (BundleChart)
- SCR040/REG002: BundleContent (AssetsTable)

**Related User Stories**:
- US008: ViewRepoBundleAnalysis
- US026: ViewBundleAnalysisTrendChart
- US027: ViewBundleAssetsTable

**Related APIs/Routes**:
- (POST) BundleSummary (ROUTE038)
- (POST) BranchBundleSummaryData (ROUTE033)
- (POST) GetBundleTrend (ROUTE035)
- (POST) BundleAssets (ROUTE034)

**Related Data Models**:
- None

**Related Background Logic**:
- BL005: DropdownAutoCloseOnBlur (`src/ui/Dropdown/Dropdown.tsx` -- used by the dashboard's `TrendDropdown`, `src/pages/RepoPage/CoverageTab/OverviewTab/Summary/TrendDropdown/TrendDropdown.jsx`)

**Related Permissions**:
- None (private/activation check is the same inline `RepoPage.tsx:67-70`-shaped gate noted under F004, not a numbered PERM)

---

### F023_BundleOnboarding: BundleOnboarding

**Type**: ui
**Description**: Lets an org member walk through bundle-analysis setup instructions matching their build tool -- Vite (default), Rollup, Webpack, Remix, Nuxt, SolidStart, or SvelteKit -- with the org/repo upload-token display shared identically across every bundler variant; switching bundler only swaps the instructional/config-snippet content.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (LearnMoreBlurb)

**Related Screens**:
- SCR041: ViteOnboarding
- SCR042: RollupOnboarding
- SCR043: WebpackOnboarding
- SCR044: RemixOnboarding
- SCR045: NuxtOnboarding
- SCR046: SolidStartOnboarding
- SCR047: SvelteKitOnboarding

**Related User Stories**:
- US028: NavigateBundleOnboardingByBundler

**Related APIs/Routes**:
- (POST) GetOrgUploadToken (ROUTE063)
- (POST) GetRepo (ROUTE083)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F006_TestAnalyticsDashboard: TestAnalyticsDashboard

**Type**: ui
**Description**: Lets an org member view a repo's Test Analytics dashboard unconditionally, and lets any other viewer see it once test analytics is already enabled for that repo (otherwise they are routed to onboarding, F024, rather than seeing a blocked message). The dashboard shows aggregate pass/fail/flake metrics and a separately-loading, cursor-paginated, sort/filterable list of failed and flaky tests.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 5 (FailedTestsErrorBanner, FailedTestsTable, MetricsSection, SelectorSection, TableHeader)

**Related Screens**:
- SCR048/REG001: FailedTestsPage (MetricsSection)
- SCR048/REG002: FailedTestsPage (FailedTestsTable)

**Related User Stories**:
- US009: ViewRepoTestAnalytics
- US029: ViewFailedTestsMetricsSummary
- US030: BrowseFailedTestsListWithFilters

**Related APIs/Routes**:
- (POST) GetRepoOverview (ROUTE092)
- (POST) GetTestResultsAggregates (ROUTE119)
- (POST) GetFlakeAggregates (ROUTE120)
- (POST) GetTestResults (ROUTE118)
- (POST) GetTestResultsFlags (ROUTE121)
- (POST) GetTestResultsTestSuites (ROUTE122)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- PERM006: TestAnalyticsAccessGate

---

### F024_TestAnalyticsOnboarding: TestAnalyticsOnboarding

**Type**: ui
**Description**: Lets an org member walk through Test Analytics setup instructions for either GitHub Actions (default) or the Codecov CLI, sharing the same repo-upload-token configuration as coverage onboarding (F022). If test analytics is already enabled, the repo shows the dashboard (F006) instead of this onboarding.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 2 (FrameworkTabsCard, FrameworkTabs)

**Related Screens**:
- SCR049: TestsOnboardingGitHubActions
- SCR050: CodecovCLI

**Related User Stories**:
- US031: NavigateTestAnalyticsOnboardingOptions

**Related APIs/Routes**:
- (POST) RegenerateRepositoryToken (ROUTE098)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F010_RepoCommitsList: RepoCommitsList

**Type**: ui
**Description**: Lets a user (public repo, or private repo where the user is activated) view a repo's commit list with coverage status per commit, and filter it by branch, coverage-upload status, and a free-text search term written to the URL query string.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (CommitsTable)

**Related Screens**:
- SCR051: RepoCommitsTab

**Related User Stories**:
- US010: ViewRepoCommitList
- US032: ViewRepoCommitsListWithFilters

**Related APIs/Routes**:
- (POST) GetCommits (ROUTE054)

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- PERM005: PrivateRepoActivationGateCommitsPulls

---

<!-- Batch 02 (02-pull-and-commit-detail): F011-F031, 12 features -->
### F011_RepoPullsList: RepoPullsList

**Type**: ui
**Description**: Lets a user viewing a repo see the pull requests opened against it, each row showing per-PR coverage status, at `/:repo/pulls` (SCR052, `RepoPage.tsx:161-165`). On a private repo the list is reachable only if the current user is activated on that repo; on a public repo any user reaching the route sees it (PERM005). US033 additionally lets the user filter the list by PR state and change its sort order, both synced to the URL query string (`src/pages/RepoPage/PullsTab/PullsTab.tsx:70-136`).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 2 (PullsTable, Title — screen-list.md SCR052)

**Related Screens**:
- SCR052_RepoPullsTab: repo-level pull-request list with coverage status per PR

**Related User Stories**:
- US011_ViewRepoPullRequestList
- US033_ViewRepoPullRequestsListWithFilters

**Related APIs/Routes**:
- (POST) /graphql/:provider#GetPulls — ROUTE078

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- PERM005_PrivateRepoActivationGateCommitsPulls: on a private repo, this tab requires the current user to be activated; on a public repo, anyone reaching the route can view it (`src/pages/RepoPage/RepoPage.tsx:63-70,153-165`)

---

### F012_PullFilesChangedComparison: PullFilesChangedComparison

**Type**: ui
**Description**: Default tab of a pull request's detail page (`pull/:pullId`, SCR029, `PullCoverage.tsx:116-120`). Lists every file changed between base and head with its coverage delta, fetched via CompareTotals or — on a team-plan private repo — GetCompareTotalsTeam (`FilesChangedTab.tsx`). Expanding a row's file renders the per-line diff via PullFileDiff/CodeRenderer. When the comparison itself cannot be produced (first PR in the repo, a missing base/head commit or report, or a generic missing-comparison case), the API returns one of six typed error variants instead of data, and the tab is expected to render the matching explanatory state rather than a files table (US034).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 5 (FilesChanged, FilesChangedTable, NameColumn, PullFileDiff, TableTeam — screen-list.md SCR029)

**Related Screens**:
- SCR029_PullFilesChangedTab: default pull-request tab; lists changed files with per-file coverage diff

**Related User Stories**:
- US034_ViewPullRequestFilesChangedComparison

**Related APIs/Routes**:
- (POST) /graphql/:provider#CompareTotals — ROUTE051
- (POST) /graphql/:provider#GetCompareTotalsTeam — ROUTE052

**Related Data Models**:
- MODEL001_FirstPullRequest: returned when the PR is the repo's first-ever comparison (no parent commit to diff against)
- MODEL002_MissingBaseCommit: returned when the comparison's base commit cannot be found
- MODEL003_MissingBaseReport: returned when the base commit exists but has no uploaded coverage report
- MODEL004_MissingComparison: generic fallback when no comparison object could be produced at all
- MODEL005_MissingHeadCommit: returned when the head commit cannot be found
- MODEL006_MissingHeadReport: returned when the head commit exists but has no uploaded coverage report

**Related Background Logic**:
- None

**Related Permissions**:
- None — screen-list.md marks SCR029 `Self-Hosted: PRESENT (no gating found)`; US034 notes the tab renders under the same PERM005-style gate applied at the parent PullRequestPage, not a gate this feature independently owns

---

### F025_PullFileExplorer: PullFileExplorer

**Type**: ui
**Description**: Lets a user browse the full file tree of a pull request's head commit, so they can check coverage on files the changed-files diff didn't surface (`pull/:pullId/tree(/:path+)`, SCR023, `PullCoverage.tsx:69-77`). Listing comes from PullPathContents scoped to the current path; clicking into a subdirectory re-queries at the new path, and clicking a file routes to SCR024 (US035).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (FileExplorerTable — screen-list.md SCR023)

**Related Screens**:
- SCR023_PullFileExplorer: file-tree browser for a pull request's head commit

**Related User Stories**:
- US035_BrowsePullRequestFileExplorer

**Related APIs/Routes**:
- (POST) /graphql/:provider#PullPathContents — ROUTE068

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F013_PullFileDiffDetail: PullFileDiffDetail

**Type**: mixed
**Description**: Single-file coverage viewer for a pull request's head commit (`pull/:pullId/blob/:path+`, SCR024, `PullCoverage.tsx:79-84`). Fetches CoverageForFile for the given path and renders line-by-line hit/miss/partial annotations through the shared CodeRenderer family (US036). While the user scrolls a large file, pointer events on the code table are disabled and re-enabled roughly 50ms after scrolling settles (BL004, `src/ui/CodeRenderer/CodeRenderer.tsx:71-75`), and a frozen header row keeps its horizontal scroll position synced to the body (BL006, `src/ui/VirtualRenderers/useScrollLeftSync.ts:34-38`); the same virtualized-renderer family also depends on the shared scroll-performance hook (BL003, `src/shared/useDisablePointerEvents/useDisablePointerEvents.ts`).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (CodeRenderer family — screen-list.md SCR024)

**Related Screens**:
- SCR024_PullFileViewer: single-file diff/coverage viewer for a pull request

**Related User Stories**:
- US036_ViewPullRequestFileDiffDetail

**Related APIs/Routes**:
- (POST) /graphql/:provider#CoverageForFile — ROUTE067

**Related Data Models**:
- None

**Related Background Logic**:
- BL003_DisablePointerEventsOnScroll: shared scroll-performance hook backing the virtualized renderer family this screen uses
- BL004_CodeRendererScrollPointerToggle: pointer-events toggle while the code table scrolls
- BL006_ScrollLeftSync: keeps a frozen header row's horizontal scroll in sync with the code body

**Related Permissions**:
- None

---

### F026_PullIndirectChanges: PullIndirectChanges

**Type**: ui
**Description**: Lets a user see files whose coverage changed indirectly in a pull request — side effects the changed-files diff doesn't show (`pull/:pullId/indirect-changes`, SCR025, `PullCoverage.tsx:86-93`). List comes from ImpactedFileComparedWithParent; expanding a row renders PullFileDiff for that file. If the PR is the repo's first-ever comparison (no parent to diff against), the tab shows an explanatory first-pull-request state instead of a file list (`src/pages/PullRequestPage/PullCoverage/routes/IndirectChangesTab/IndirectChangesTab.jsx:30-36`, US037). A flag filter with no matching flag on the repo surfaces as a typed UnknownFlags result rather than a silently empty table (MODEL007).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 4 (IndirectChangedFiles, NameColumn, IndirectChangesInfo, PullFileDiff — screen-list.md SCR025)

**Related Screens**:
- SCR025_PullIndirectChangesTab: lists files whose coverage changed indirectly (not touched by the diff)

**Related User Stories**:
- US037_ViewPullRequestIndirectChanges

**Related APIs/Routes**:
- (POST) /graphql/:provider#ImpactedFileComparedWithParent — ROUTE055

**Related Data Models**:
- MODEL007_UnknownFlags: returned when a requested flag filter matches no known flag on the repo

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F027_PullCommitsList: PullCommitsList

**Type**: ui
**Description**: Lists the commits included in a pull request, each with its individual coverage-status contribution (`pull/:pullId/commits`, SCR026, `PullCoverage.tsx:94-98`). Data comes from GetCommits; clicking a commit routes to that commit's own detail page (SCR032) (US038).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 2 (CommitsTable, Title — screen-list.md SCR026)

**Related Screens**:
- SCR026_PullCommitsTab: lists commits included in the pull request

**Related User Stories**:
- US038_ViewPullRequestCommitsList

**Related APIs/Routes**:
- (POST) /graphql/:provider#GetCommits — ROUTE054

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F028_PullFlagsBreakdown: PullFlagsBreakdown

**Type**: ui
**Description**: Shows per-upload-flag coverage for a pull request so a user can see which flags the change affects (`pull/:pullId/flags`, SCR027, `PullCoverage.tsx:99-105`). The flag selector (PullFlagsSelect) scopes the FlagMeasurements table to the chosen flag(s); with no flag-scoped data for the PR, an empty state renders instead of a table (US039).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (flags-table list, no dedicated subfolder observed — screen-list.md SCR027)

**Related Screens**:
- SCR027_PullFlagsTab: per-flag coverage breakdown for the pull request

**Related User Stories**:
- US039_ViewPullRequestFlagsBreakdown

**Related APIs/Routes**:
- (POST) /graphql/:provider#FlagMeasurements — ROUTE089
- (POST) /graphql/:provider#PullFlagsSelect — ROUTE090

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F029_PullComponentsBreakdown: PullComponentsBreakdown

**Type**: ui
**Description**: Shows per-component coverage for a pull request so a user can see which components the change affects (`pull/:pullId/components`, SCR028, `PullCoverage.tsx:106-115`). PullComponentsSelector scopes the table to the chosen component(s); if the repo has no components configured, ComponentsNotConfigured renders instead of a table (US040).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (ComponentsNotConfigured — screen-list.md SCR028)

**Related Screens**:
- SCR028_PullComponentsTab: per-component coverage breakdown for the pull request

**Related User Stories**:
- US040_ViewPullRequestComponentsBreakdown

**Related APIs/Routes**:
- (POST) /graphql/:provider#PullComponentsSelector — ROUTE075

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F014_CommitFilesChangedSummary: CommitFilesChangedSummary

**Type**: ui
**Description**: Default tab of a commit's detail page (`commit/:commit`, SCR032, `CommitCoverage.jsx:92-94`). Lists each file changed in that commit with its coverage, fetched via Commit and CommitDropdownSummary; on a private repo on a team plan, FilesChangedTableTeam renders in place of the default table. Expanding a row renders the per-line diff through shared/CommitFileDiff + CodeRenderer (US041).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 3 (FilesChangedTable, FilesChangedTableTeam, shared/CommitFileDiff — screen-list.md SCR032)

**Related Screens**:
- SCR032_CommitFilesChangedTab: default commit-detail tab; lists files changed in the commit with coverage

**Related User Stories**:
- US041_ViewCommitFilesChangedSummary

**Related APIs/Routes**:
- (POST) /graphql/:provider#Commit — ROUTE044
- (POST) /graphql/:provider#CommitDropdownSummary — ROUTE048

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None — screen-list.md marks SCR032 `Self-Hosted: PRESENT (no gating found)`; the private-repo activation gate US041 references applies to reaching the commit-detail route at all, not a gate owned by this feature

---

### F030_CommitFileExplorer: CommitFileExplorer

**Type**: ui
**Description**: Lets a user browse a commit's full file tree so they can check coverage on any file at that commit, not only the ones the commit changed (`commit/:commit/tree(/:path+)`, SCR030, `CommitCoverage.jsx:77-84`). Listing comes from CommitPathContents scoped to the current path; clicking a file routes to SCR031 (US042).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (CommitDetailFileExplorerTable — screen-list.md SCR030)

**Related Screens**:
- SCR030_CommitFileExplorer: file-tree browser for a single commit

**Related User Stories**:
- US042_BrowseCommitFileExplorer

**Related APIs/Routes**:
- (POST) /graphql/:provider#CommitPathContents — ROUTE066

**Related Data Models**:
- None

**Related Background Logic**:
- None

**Related Permissions**:
- None

---

### F015_CommitFileDiffDetail: CommitFileDiffDetail

**Type**: mixed
**Description**: Single-file coverage viewer for a specific commit (`commit/:commit/blob/:path+`, SCR031, `CommitCoverage.jsx:85-91`). Fetches CoverageForFile for the given path at that commit and renders line-by-line hit/miss/partial annotations via the shared CodeRenderer family (US043). Scroll behavior matches F013: pointer events on the code table toggle off/on around scroll (BL004, `src/ui/CodeRenderer/CodeRenderer.tsx:71-75`) and the frozen header stays horizontally synced to the body (BL006, `src/ui/VirtualRenderers/useScrollLeftSync.ts:34-38`).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (CodeRenderer family — screen-list.md SCR031)

**Related Screens**:
- SCR031_CommitFileViewer: single-file coverage viewer for a commit

**Related User Stories**:
- US043_ViewCommitFileDiffDetail

**Related APIs/Routes**:
- (POST) /graphql/:provider#CoverageForFile — ROUTE067

**Related Data Models**:
- None

**Related Background Logic**:
- BL004_CodeRendererScrollPointerToggle: pointer-events toggle while the code table scrolls
- BL006_ScrollLeftSync: keeps a frozen header row's horizontal scroll in sync with the code body

**Related Permissions**:
- None

---

### F031_CommitIndirectChanges: CommitIndirectChanges

**Type**: ui
**Description**: Lets a user see files whose coverage changed indirectly for a specific commit (`commit/:commit/indirect-changes`, SCR033, `CommitCoverage.jsx:96-105`). List comes from ImpactedFileComparedWithParent; expanding a row renders CommitFileDiff for that file. On a private repo on a team plan this tab is withheld entirely — `showIndirectChanges` resolves false and the route option is not offered (`src/pages/CommitDetailPage/CommitCoverage/CommitCoverage.jsx:71`); Athena is self-hosted, and this client-side gate applies the same on-prem (US044). A flag filter with no match on the repo surfaces as UnknownFlags, same as F026 (MODEL007).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 2 (IndirectChangesTable, CommitFileDiff — screen-list.md SCR033)

**Related Screens**:
- SCR033_CommitIndirectChangesTab: lists files whose coverage changed indirectly for this commit

**Related User Stories**:
- US044_ViewCommitIndirectChanges

**Related APIs/Routes**:
- (POST) /graphql/:provider#ImpactedFileComparedWithParent — ROUTE055

**Related Data Models**:
- MODEL007_UnknownFlags: returned when a requested flag filter matches no known flag on the repo

**Related Background Logic**:
- None

**Related Permissions**:
- None — gated by the `showIndirectChanges` client-side computed flag (private repo + team plan), not a PERM### entry in permissions-matrix.md

---

<!-- Batch 03 (03-repo-config-and-org): F016-F019, 9 features -->
### F016_RepoConfigOverviewAndNavigation: RepoConfigOverviewAndNavigation

**Type**: ui
**Description**: Entry point for a repo's Config section - the completion checklist that shows which coverage-config steps (default branch/tokens, YAML, badges) are done or outstanding, plus the sidebar tab switcher between General/YAML/Badges. Org-membership gated: any Config-family route falls back to the shared NotFound screen for a non-member instead of rendering the sidebar or checklist (src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: FeatureGroup, FeatureItem, useRepoConfigurationStatus hook (SCR053); ConfigTab Sidemenu + nested Switch (ConfigTab.tsx:49-66)

**Related Screens**:
- SCR053: ConfigurationManager
- SCR058: NotFound (fallback target for non-members)

**Related User Stories**:
- US012: GetBlockedFromRepoConfigScreen
- US045: ViewRepoConfigurationStatusChecklist
- US057: NavigateRepoConfigSidebarTabs

**Related APIs/Routes**:
- (POST) /graphql/:provider#GetRepoSettings - ROUTE094
- (POST) /graphql/:provider#GetRepoSettingsTeam - ROUTE095 (team-plan private-repo variant)

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**:
- PERM003: OrgMembershipGateRepoConfig

---

### F007_RepoGeneralSettingsAndDangerZone: RepoGeneralSettingsAndDangerZone

**Type**: ui
**Description**: General repo-settings tab - change the default branch, view/copy upload, graph and static-analysis tokens, and the Danger Zone destructive actions (regenerate upload token, erase the repo's historical coverage, deactivate/reactivate the repo). Same org-membership gate as F016; no additional admin check was found in front-end code guarding the destructive actions beyond plain org membership (US049/US050 Technical Notes).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: DefaultBranch; Tokens (RepoUploadToken, GraphToken, StaticAnalysisToken, TokensTeam); DangerZone (EraseRepo/EraseRepoModal, RepoState/DeactivateRepoModal)

**Related Screens**:
- SCR054: RepoGeneralTab

**Related User Stories**:
- US046: UpdateRepoDefaultBranch
- US047: ViewRepoTokensInGeneralSettings
- US048: RegenerateRepositoryUploadToken
- US049: EraseRepository
- US050: DeactivateRepository

**Related APIs/Routes**:
- (PATCH) /{provider}/{owner}/repos/{repo}/ - ROUTE014 (useUpdateRepo; both default-branch change and activate/deactivate go through this same endpoint - DefaultBranch.jsx:12-27 and RepoState/hooks/useRepoActivation.js:1,6 both call it, confirmed by reading useRepoActivation.js)
- (POST) /graphql/:provider#RepoConfig - ROUTE087 (token values)
- (POST) /graphql/:provider#RegenerateRepositoryUploadToken - ROUTE099
- (POST) /graphql/:provider#EraseRepository - ROUTE082

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**:
- PERM003: OrgMembershipGateRepoConfig

---

### F017_RepoYamlConfiguration: RepoYamlConfiguration

**Type**: ui
**Description**: Repo-level YAML tab - a read-only preview of the effective/merged codecov.yml Codecov is actually applying (no in-app editor: no react-hook-form/useForm present on this screen, per US051 Technical Notes), plus a tool to encrypt a plaintext value into a secret string for safe use inside that YAML.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: CurrentRepoSettings, SecretString (GenerateSecretStringModal, CopySecretStringModal), ValidateYaml, YAML

**Related Screens**:
- SCR055: RepoYamlTab

**Related User Stories**:
- US051: ViewRepoLevelYamlConfiguration
- US052: CreateEncryptedSecretString

**Related APIs/Routes**:
- (POST) /graphql/:provider#CommitYaml - ROUTE050
- (POST) /graphql/:provider#EncodeSecretString - ROUTE081

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**:
- PERM003: OrgMembershipGateRepoConfig

---

### F032_BadgesAndGraphs: BadgesAndGraphs

**Type**: ui
**Description**: Coverage badge and graph embed-snippet generator for a repo's README - Markdown/HTML/RST badge variants and sunburst/icicle/tree graph-embed URLs, built from the repo's graph token and a selectable branch.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: Badges, Graphs

**Related Screens**:
- SCR056: BadgesAndGraphsTab

**Related User Stories**:
- US053: ViewBadgesAndGraphsSnippets

**Related APIs/Routes**:
- (POST) /graphql/:provider#RepoConfig - ROUTE087

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**:
- PERM003: OrgMembershipGateRepoConfig

---
### F018_OrganizationRepoList: OrganizationRepoList

**Type**: ui
**Description**: Org landing page's repo list - lets an org member browse and jump into any of the organization's repos from the owner page, scoped by a repoDisplay filter param.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: ListRepo (OwnerPage.jsx:42-44,95-98)

**Related Screens**:
- SCR006: OwnerPage

**Related User Stories**:
- US055: ViewOrganizationRepoList

**Related APIs/Routes**:
- (POST) /graphql/:provider#ReposForOwner - ROUTE096
- (POST) /graphql/:provider#GetReposTeam - ROUTE097 (team-plan variant)

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**: None (page itself has no membership gate; the sibling-tab nav's own visibility rule is PERM004, owned by F003 in a different batch)

---

### F033_OrganizationAnalytics: OrganizationAnalytics

**Type**: ui
**Description**: Org-level coverage/usage analytics chart with repo and date-range filters, letting a member track adoption trends across every repo in the org. Renders NotFound internally when owner data is unavailable (AnalyticsPage.jsx:34-36) rather than at the route level.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: Chart, ChartSelectors

**Related Screens**:
- SCR004: AnalyticsPage

**Related User Stories**:
- US056: ViewOrganizationAnalyticsWithFilters

**Related APIs/Routes**:
- (POST) /graphql/:provider#GetReposCoverageMeasurements - ROUTE041

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**: None (screen has no self-hosted or membership route gate; sibling-tab nav visibility is a separate concern outside this feature)

---

### F034_OrgMembersActivation: OrgMembersActivation

**Type**: ui
**Description**: Present in the upstream codebase but unreachable on this self-hosted (Athena) deployment. The member list / seat-activation screen is build-gated off twice over: the /members/:provider/:owner route itself is only mounted when NOT config.IS_SELF_HOSTED (src/App.tsx:126-132), and MembersPage additionally redirects to /{provider}/{owner} if it were ever reached with config.IS_SELF_HOSTED true (src/pages/MembersPage/MembersPage.jsx:14-18). On a hosted (non-self-hosted) deployment it would let a Non-Member view the member list and activation UI (without the shared sibling-tab nav, which requires org membership per PERM008); on Athena, no route or component path reaches this screen for anyone.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: MembersActivation (Activation, ChangePlanLink, AutoActivate), MembersList (MembersTable), MissingMemberBanner - none of these mount on this deployment

**Related Screens**:
- SCR003: MembersPage (build-gated absent - see Description)

**Related User Stories**:
- US015: ViewMembersPageWithoutTabNav

**Related APIs/Routes**: None assigned - screen-list.md/US015 Technical Notes cite only a paginated member-activation query with no dedicated ROUTE###; evidence: src/pages/MembersPage/MembersList/MembersTable/MembersTable.tsx:211 (useInfiniteUsers)

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**:
- PERM008: OrgMembershipGateMembersPageTabNav (governs sibling-tab-nav visibility on hosted deployments only - moot on Athena since the screen itself is unreachable there)

---
### F035_CodecovAIIntegration: CodecovAIIntegration

**Type**: ui
**Description**: Codecov AI app install/configuration screen for an org - shows install status and lets a user install the Codecov AI GitHub app and view which repos have it configured. No positive user story documents this flow (US list for this feature is empty); the route itself mounts unconditionally for any deployment (src/App.tsx:138-142, no IS_SELF_HOSTED guard), so it is directly reachable by URL. The only discovered entry point - the "Codecov AI" tab in the shared owner-level nav - is behind the codecovAiFeaturesTab feature flag, which defaults to false (src/pages/OwnerPage/Tabs/Tabs.tsx:13-14,28-38; same pattern duplicated in MembersPage/Tabs, AnalyticsPage/Tabs, PlanPage/Tabs). Treat this feature as present-but-not-discoverable by default, distinct in kind from F034/F019's build-time self-hosted exclusion - a flag flip, not a redeploy, would surface the nav link.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: CodecovAICommands, ConfiguredRepositories, InstallCodecovAI, LearnMoreBlurb

**Related Screens**:
- SCR005: CodecovAIPage

**Related User Stories**: None (no US### maps to this feature per feature-list assignment)

**Related APIs/Routes**:
- (POST) /graphql/:provider#GetCodecovAIAppInstallInfo - ROUTE042
- (POST) /graphql/:provider#GetCodecovAIInstalledRepos - ROUTE043

**Related Data Models**: None

**Related Background Logic**: None

**Related Permissions**:
- PERM012: CodecovAITabFeatureFlag

---

### F019_BillingAndPlanManagement: BillingAndPlanManagement

**Type**: mixed
**Description**: Present in the upstream codebase but unreachable on this self-hosted (Athena) deployment - billing and plan management do not exist here. Upstream (hosted Codecov) this feature covers viewing/changing the org's billing plan, upgrading to Pro/Team/Sentry tiers via Stripe checkout, browsing and printing invoices, and the cancel/downgrade/retention-offer flow. On Athena every screen in this family is gated off by the same conditional: PlanPage returns a redirect to the owner page when config.IS_SELF_HOSTED is true OR the user is not part of the org (src/pages/PlanPage/PlanPage.tsx:60, verified by direct read - "if (config.IS_SELF_HOSTED || !ownerData?.isCurrentUserPartOfOrg) return Redirect"), which fires unconditionally on a self-hosted build regardless of membership. The nav tab that would link here is also removed outright: the Members and Plan tab entries are omitted from the tabs array entirely when config.IS_SELF_HOSTED is true (src/pages/OwnerPage/Tabs/Tabs.tsx:40-42, verified by direct read). The only story that actually exercises this feature on Athena is US013, which documents the redirect-away behavior itself - no positive story for any Plan/billing screen exists in user-stories.md, consistent with the feature being unavailable here.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: (all upstream-only, none reachable on Athena) AccountOrgs, BillingDetails (Address, EmailAddress, PaymentCard), CurrentPlanCard (EnterprisePlanCard, FreePlanCard, PaidPlanCard), UpgradeForm (per-plan Controllers, PlanTypeOptions), InvoiceCard, CancelButton, TeamPlanCard; plus BL002 (print-and-auto-close on the invoice-detail screen)

**Related Screens** (all build-gated absent on Athena per PlanPage.tsx:60 - see Description):
- SCR006: OwnerPage (redirect destination only - not owned content; OwnerPage itself belongs to F018)
- SCR016: CurrentOrgPlan
- SCR017: UpgradePlanPage
- SCR018: InvoicesPage
- SCR019: InvoiceDetailsPage
- SCR020: DowngradePlan
- SCR021: TeamPlanSpecialOffer
- SCR022: SpecialOffer

**Related User Stories**:
- US013: GetRedirectedFromPlanBillingScreens (the only story that exists for this feature - a redirect-away story, not a positive-usage story; see Description)

**Related APIs/Routes** (all upstream-only; never fetched on Athena since the redirect fires first):
- (POST) /graphql/:provider#GetPlanData - ROUTE023
- (POST) /graphql/:provider#GetAvailablePlans - ROUTE019
- (POST) /graphql/:provider#CreateStripeSetupIntent - ROUTE020
- (POST) /graphql/:provider#Invoice - ROUTE021
- (POST) /graphql/:provider#Invoices - ROUTE022

**Related Data Models**: None

**Related Background Logic**:
- BL002: InvoicePrintAutoClose (registers a window afterprint listener that auto-closes the tab when the invoice-detail screen is opened with ?print in the URL; also unreachable on Athena since its parent screen is gated off)

**Related Permissions**:
- PERM007: OrgMembershipGatePlanPages (the membership half of the same conditional; the self-hosted half is build gating, not a runtime permission - see Description)

---

<!-- Batch 04 (04-account-admin-and-infra): F036-F002, 9 features -->
### F036_AccountProfileSettings: AccountProfileSettings

**Type**: ui
**Description**: Lets a self-hosted user view and edit their own name/email and see their activation status on their personal account-settings page (`src/pages/AccountSettings/AccountSettings.jsx:47-49`). No US### is mapped to SCR008 in user-stories.md - it is tagged `[IPE_ZERO]` (12 of 58 screens carry no story); this description is derived directly from screen-list.md, not from an invented story.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 3 (ActivationBanner, AdminBanner, NameEmailCard)

**Related Screens**:
- SCR008: AccountProfile

**Related User Stories**:
- none mapped (`[IPE_ZERO]`, user-stories.md line 2592)

**Related APIs/Routes**:
- (POST) /graphql/:provider#CurrentUser (ROUTE115)
- (POST) /graphql/:provider#UpdateProfile (ROUTE114)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**: none (route reached only via the `IS_SELF_HOSTED && isViewingPersonalSettings` branch of PERM009's redirect logic, but PERM009 itself gates the *other* branch - SCR009; SCR008 carries no dedicated PERM entry of its own)

---

### F020_OrgAdminManagement: OrgAdminManagement

**Type**: ui
**Description**: Lets an org admin promote another org member to admin or revoke an existing admin's admin status, from the org account-settings admin tab (`src/pages/AccountSettings/tabs/Admin/ManageAdminCard/`). **This entire feature is unreachable on Athena.** SCR009_AccountAdminTab only renders when `!config.IS_SELF_HOSTED && isAdmin` (`src/pages/AccountSettings/AccountSettings.jsx:50-52`); Athena is a self-hosted build (`src/config.js:26`), so the branch never resolves true and SCR008 or SCR011 renders in its place instead. The gating role (`Owner.isAdmin` via the `DetailOwner` GraphQL query, `src/services/user/useOwner.ts:36,42`) is the org-level admin role - a different role from the self-hosted instance admin in F041/F021 (PERM002), even though both are named `isAdmin` in code (permissions-matrix.md PERM009 description). The same org-admin role also gates F040 (org upload token) and, outside this batch, the repo-level flag/component delete action documented as PERM013.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 6 (DetailsSection, GithubIntegrationSection, ManageAdminCard, AddAdmins, AdminTable, StudentSection)

**Related Screens**:
- SCR009: AccountAdminTab

**Related User Stories**:
- US058: AddOrgAdmin - **[NOT REACHABLE ON ATHENA]**
- US059: RevokeOrgAdmin - **[NOT REACHABLE ON ATHENA]**

**Related APIs/Routes**:
- (PATCH) /{provider}/{owner}/users/{targetUserOwnerid}/ (ROUTE007)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**:
- PERM009: OrgAdminOnlyAccountAdminTab - org-level admin role, `src/pages/AccountSettings/AccountSettings.jsx:48-52`; not the self-hosted instance-admin role in PERM002

---

### F037_OktaSSOConfiguration: OktaSSOConfiguration

**Type**: ui
**Description**: Lets an org admin on an Enterprise-plan org configure Okta SSO for the organization (`src/pages/AccountSettings/AccountSettings.jsx:56-60`). Gated purely on plan tier (`data.plan.isEnterprisePlan`), not on self-hosted status - unlike F020, this is not documented as unreachable on Athena, since the gate is plan-tier, not build-mode. No US### is mapped to SCR010 in user-stories.md (`[IPE_ZERO]`); this description is derived directly from screen-list.md/permissions-matrix.md, not from an invented story.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 2 (AdminAuthorizationBanner, OktaConfigForm)

**Related Screens**:
- SCR010: OktaAccess

**Related User Stories**:
- none mapped (`[IPE_ZERO]`, user-stories.md line 2592)

**Related APIs/Routes**:
- none verifiable - screen-list.md cites only "plan-scoped GraphQL queries under `services/account`" with no named operation; no ROUTE### assigned in the slice plan

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**:
- PERM011: EnterprisePlanGateOktaAccess - screen-permission, `data.plan.isEnterprisePlan === true` (`src/pages/AccountSettings/AccountSettings.jsx:36,56-60`)

---

### F038_AccountDefaultYamlConfig: AccountDefaultYamlConfig

**Type**: ui
**Description**: Lets any org member view and edit the org's default `codecov.yml` configuration that new repos inherit (`src/pages/AccountSettings/AccountSettings.jsx:61-63`). This screen is also the fallback redirect target for both US014 (non-admin viewing another org's account root) and the org-upload-token screen's non-admin redirect (US060's technical notes), which is why it carries no admin gate of its own.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 2 (YamlEditor, SuccessModal)

**Related Screens**:
- SCR011: AccountYAMLTab

**Related User Stories**:
- US014: GetRedirectedFromOrgAdminAccountScreen

**Related APIs/Routes**:
- (POST) /graphql/:provider#YamlConfig (ROUTE117)
- (POST) /graphql/:provider#UpdateYamlConfig (ROUTE116)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**: none (SCR011 is PRESENT with no gating found, per screen-list.md; it is the fallback target of PERM009's redirect, not itself gated)

---

### F039_PersonalAccessTokensAndSessions: PersonalAccessTokensAndSessions

**Type**: ui
**Description**: Lets any user create and revoke their own personal access tokens and view/terminate their own active login sessions (`src/pages/AccountSettings/AccountSettings.jsx:64-68`). Visible only when `!config.IS_SELF_HOSTED || !config.HIDE_ACCESS_TAB` (`src/config.js:34-35`) - on a self-hosted build this screen depends on the `HIDE_ACCESS_TAB` config flag rather than being flatly absent like F020. No US### is mapped to SCR012 in user-stories.md (`[IPE_ZERO]`); this description is derived directly from screen-list.md, not from an invented story.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 3 (CreateTokenModal, TokensTable, SessionsTable)

**Related Screens**:
- SCR012: AccountAccessTab

**Related User Stories**:
- none mapped (`[IPE_ZERO]`, user-stories.md line 2592)

**Related APIs/Routes**:
- (POST) /graphql/:provider#MySessions (ROUTE015)
- (POST) /graphql/:provider#DeleteSession (ROUTE016)
- (POST) /graphql/:provider#CreateUserToken (ROUTE017)
- (POST) /graphql/:provider#RevokeUserToken (ROUTE018)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**: none documented (visibility is a config-flag check, `HIDE_ACCESS_TAB`, not a role/PERM### entry in permissions-matrix.md)

---

### F040_OrgUploadTokenManagement: OrgUploadTokenManagement

**Type**: ui
**Description**: Lets an org admin generate or regenerate the org-wide upload token that every repo in the org uses to authenticate coverage uploads (`src/pages/AccountSettings/tabs/OrgUploadToken/`). The screen itself is reachable on Athena (SCR013 carries "no gating found beyond admin-only" per screen-list.md), but the org-admin role that unlocks the Generate/Regenerate buttons has no self-hosted counterpart - on Athena every viewer is treated as non-admin, so both buttons stay permanently disabled (US060 acceptance criteria, `GenerateOrgUploadToken.tsx:17,32`, `RegenerateOrgUploadToken.tsx:57,83`). This is a narrower unreachability than F020: the screen renders, only the mutating action is dead on Athena.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 4 (TokenlessSection, RegenerateOrgUploadToken, RegenrateTokenModal, GenerateOrgUploadToken)

**Related Screens**:
- SCR013: OrgUploadToken

**Related User Stories**:
- US060: RegenerateOrgUploadToken - buttons permanently disabled on Athena (org-admin role has no self-hosted equivalent)

**Related APIs/Routes**:
- (POST) /graphql/:provider#GetOrgUploadToken (ROUTE063)
- (POST) /graphql/:provider#RegenerateOrgUploadToken (ROUTE064)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**:
- PERM010: OrgAdminOnlyOrgUploadToken - action-permission, same org-admin role as PERM009 (never resolves to "allowed" on Athena)

---

### F041_InstanceAdminAccessList: InstanceAdminAccessList

**Type**: ui
**Description**: Lets the self-hosted instance admin view the read-only, paginated list of every user on this Athena install who holds instance-admin status (`src/pages/AdminSettings/AdminAccess/`). This IS reachable on Athena - it is gated by PERM002, the self-hosted instance-admin role (`GET /users/current` -> `SelfHostedCurrentUserQueryOpts.isAdmin`), which is the role that exists on a self-hosted build, as distinct from the org-admin role in F020/F040 which does not. No in-app control exists to add or remove instance admins; the screen states that is done only via `install.yml` (US061 acceptance criteria).

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 1 (AdminAccessTable)

**Related Screens**:
- SCR014: AdminAccess

**Related User Stories**:
- US061: ViewInstanceAdminList

**Related APIs/Routes**:
- (GET) /users?is_admin=true (ROUTE001)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**:
- PERM002: SelfHostedInstanceAdminAccess - role-based, `GET /users/current` (ROUTE002); self-hosted only, gates the whole `/admin/:provider/*` route tree (`src/pages/AdminSettings/AdminSettings.jsx:29-58`); a distinct role from the org-admin role in PERM009/PERM010 despite both being called `isAdmin`

---

### F021_InstanceMemberManagement: InstanceMemberManagement

**Type**: ui
**Description**: Lets the self-hosted instance admin manage licensed-seat activation across the whole Athena install - toggle auto-activation, filter the member list by status/role/search, and activate or deactivate individual members (`src/pages/AdminSettings/AdminMembers/`). Reachable on Athena under the same PERM002 self-hosted instance-admin gate as F041 - this is the role that exists on Athena, unlike the org-admin role in F020.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 4 (ActivationInfo, ActivationCount, AutoActivateMembers, MemberList)

**Related Screens**:
- SCR015: AdminMembers

**Related User Stories**:
- US062: ToggleAutoActivateMembers
- US063: FilterInstanceMembersList
- US064: ActivateInstanceMember
- US065: DeactivateInstanceMember

**Related APIs/Routes**:
- (POST) /graphql/:provider#UpdateSelfHostedSettings (ROUTE026) - route-list.md assigns ROUTE026 to this operation; US062's own Technical Notes cite ROUTE025, but route-list.md is the re-synced authority and is followed here
- (GET) /users (ROUTE001)
- (PATCH) /users/{ownerid} (ROUTE003)

**Related Data Models**: none

**Related Background Logic**: none

**Related Permissions**:
- PERM002: SelfHostedInstanceAdminAccess - same self-hosted instance-admin gate as F041, covers the whole SCR015 screen

---

### F002_DevMockServiceWorkerInfra: DevMockServiceWorkerInfra

**Type**: background
**Description**: This is development-time build infrastructure, not a user-facing feature. It is the auto-generated Mock Service Worker (MSW v2.4.11) runtime script (`public/mockServiceWorker.js`), registered by `src/mocks/browser.js` via `setupWorker(...handlers)` for dev-mode API mocking. Its four `self.addEventListener` handlers (`install`, `activate`, `message`, `fetch`) exist so a developer's local build can intercept and mock network calls instead of hitting a real backend - no end user of the shipped application ever interacts with this code path, and the file header states it must not be hand-modified (it is regenerated by the `msw init` CLI). This F### exists in the feature list only because BL001 has no other business outcome to attach to; it delivers no capability a user can invoke.

**Workspace**: frontend
**Languages**: JS/TS
**Components**: 0 (no UI screens)

**Related Screens**: none

**Related User Stories**: none

**Related APIs/Routes**: none - dev-mocking infrastructure, not an application route (behavior-logic.md BL001 "Related Routes" is explicitly N/A)

**Related Data Models**: none

**Related Background Logic**:
- BL001: ServiceWorkerLifecycle - event-listener, `public/mockServiceWorker.js`, registered by `src/mocks/browser.js`

**Related Permissions**: none

---

---

## Summary

- **Total Features**: 41
- **Total Screens**: 58 (all referenced by a feature)
- **Total User Stories**: 65
- **Total Routes**: 122 backend routes in RouteList
- **Total Data Models**: 9
- **Total Background Logic**: 6
- **Total Permissions**: 13
- **Languages Detected**: TypeScript / JavaScript (React SPA, Vite + craco)

## Cross-Reference Validation

- [x] All F### codes are unique
- [x] All screen references are valid (SCR### in ScreenList)
- [x] All user story references are valid (US### in UserStories)
- [x] All route references are valid (ROUTE### in RouteList)
- [x] All data model references are valid (MODEL### in DataModel)
- [x] All behavior logic references are valid (BL### in BehaviorLogic)
- [x] All permission references are valid (PERM### in Permissions)
- [x] Every US has a parent feature
- [x] Every screen has a parent feature
- [x] Every background logic entry maps to a feature

> Route and data-model coverage is deliberately partial: a route or model is cited by the
> feature that surfaces it, and infrastructure-only endpoints belong to no user-facing
> feature. Those two are reported as counts above rather than as coverage checkboxes.
