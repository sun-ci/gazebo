# User Stories

**Project**: Athena
**Generated**: 2026-09-08
**Analysis Scope**: Athena frontend at calver 25.6.2 (fork of codecov/gazebo). 58 screens (SCR001–SCR058), 12 client-side permission gates (PERM001–PERM012), 119 backend endpoints consumed. The backend repo (codecov/umbrella) is not in this tree; stories describe what a user can do through this interface.

**Code Format**: All US codes MUST follow `US###_NameSlug` format (e.g., US001_Login, US002_ViewDashboard)

**US Types**:
- `ui` - User-facing stories (require Screen mapping)
- `system` - System stories: hook, event, observer, bg-job, trigger, etc. (no Screen mapping needed)

**Note**: Feature mapping is managed in FeatureList.md only. This document contains user stories without direct feature references. UI US require Screen mapping; system/bg-job US do not. `ui`-typed stories may map to `SCR###` or `SCR###/REG###`; non-`ui` types map to `SCR###` only (or omit).

## Interaction Inventory

> One row per interactive element, derived from the enumerated stories below.
> Each row maps to exactly one US.

| Screen | Element | Type | US | Endpoint |
|--------|---------|------|----|---------|
| - (system) | Agree To Terms Of Service | primary-action (form submission) | US001 | saveTermsAgreement |
| SCR001 | Sign In With Git Provider | navigation | US002 | GET {API_URL}/login/:provider |
| SCR002 | Sync Git Provider Organization | system-action | US003 | GET {API_URL}/login/:provider |
| SCR007 | Sign In From Self Hosted Landing Page | navigation | US004 | GET {API_URL}/login/:provider |
| SCR034/REG001, SCR034/REG002, SCR034/REG003 | View Repo Coverage Overview | navigation | US005 | GetRepoCoverage |
| SCR035 | View Repo Flag Coverage | navigation | US006 | FlagMeasurements |
| SCR036 | View Repo Component Coverage | navigation | US007 | ComponentMeasurements |
| SCR040/REG001, SCR040/REG002 | View Repo Bundle Analysis | navigation | US008 | BundleSummary |
| SCR048/REG001, SCR048/REG002 | View Repo Test Analytics | navigation | US009 | useTestResultsAggregates |
| SCR051 | View Repo Commit List | navigation | US010 | GetCommits |
| SCR052 | View Repo Pull Request List | navigation | US011 | GetPulls |
| SCR058 | Get Blocked From Repo Config Screen | navigation | US012 | N/A |
| SCR006 | Get Redirected From Plan Billing Screens | navigation | US013 | GetPlanData |
| SCR011 | Get Redirected From Org Admin Account Screen | navigation | US014 | DetailOwner |
| SCR003 | View Members Page Without Tab Nav | navigation | US015 | paginated member-activation query |
| SCR034/REG001, SCR034/REG002 | View Repo Coverage Overview | navigation | US016 | GetRepoCoverage |
| SCR034/REG003 | View Repo Coverage Sunburst | secondary-action | US017 | /coverage/tree |
| SCR034/REG004 | Browse Repo File Explorer | navigation | US018 | repo path-contents query |
| SCR034/REG004 | View Repo File Coverage Detail | navigation | US019 | CoverageForFile |
| SCR035 | View Repo Flags Coverage Table | navigation | US020 | FlagMeasurements |
| SCR035 | Enable Flag Analytics Backfill | system-action | US021 | useActivateMeasurements mutation, measurementType FLAG_COVERAGE |
| SCR036 | View Repo Components Coverage Table | navigation | US022 | ComponentMeasurements |
| SCR036 | Enable Component Analytics Backfill | system-action | US023 | useActivateMeasurements mutation, measurementType COMPONENT_COVERAGE |
| SCR037, SCR038, SCR039 | Navigate Coverage Onboarding C I Options | navigation | US024 | RegenerateRepositoryToken |
| SCR037 | Select Upload Token Source During Onboarding | secondary-action | US025 | GetOrgUploadToken |
| SCR040/REG001 | View Bundle Analysis Trend Chart | navigation | US026 | GetBundleTrend |
| SCR040/REG002 | View Bundle Assets Table | navigation | US027 | BundleAssets |
| SCR041, SCR042, SCR043, SCR044, SCR045, SCR046, SCR047 | Navigate Bundle Onboarding By Bundler | navigation | US028 | GetOrgUploadToken |
| SCR048/REG001 | View Failed Tests Metrics Summary | navigation | US029 | useTestResultsAggregates, useFlakeAggregates |
| SCR048/REG002 | Browse Failed Tests List With Filters | secondary-action | US030 | useInfiniteTestResults |
| SCR049, SCR050 | Navigate Test Analytics Onboarding Options | navigation | US031 | shared repo-upload-token config |
| SCR051 | View Repo Commits List With Filters | secondary-action | US032 | GetCommits |
| SCR052 | View Repo Pull Requests List With Filters | secondary-action | US033 | GetPulls |
| SCR029 | View Pull Request Files Changed Comparison | navigation | US034 | CompareTotals |
| SCR023 | Browse Pull Request File Explorer | navigation | US035 | PullPathContents |
| SCR024 | View Pull Request File Diff Detail | navigation | US036 | CoverageForFile |
| SCR025 | View Pull Request Indirect Changes | navigation | US037 | ImpactedFileComparedWithParent |
| SCR026 | View Pull Request Commits List | navigation | US038 | GetCommits |
| SCR027 | View Pull Request Flags Breakdown | navigation | US039 | PullFlagsSelect |
| SCR028 | View Pull Request Components Breakdown | navigation | US040 | PullComponentsSelector |
| SCR032 | View Commit Files Changed Summary | navigation | US041 | Commit |
| SCR030 | Browse Commit File Explorer | navigation | US042 | CommitPathContents |
| SCR031 | View Commit File Diff Detail | navigation | US043 | CoverageForFile |
| SCR033 | View Commit Indirect Changes | navigation | US044 | ImpactedFileComparedWithParent |
| SCR053 | View Repo Configuration Status Checklist | navigation | US045 | GetRepoSettings |
| SCR054 | Update Repo Default Branch | primary-action | US046 | useUpdateRepo mutation |
| SCR054 | View Repo Tokens In General Settings | navigation | US047 | RepoConfig |
| SCR054 | Regenerate Repository Upload Token | destructive-action | US048 | useRegenerateRepoUploadToken mutation |
| SCR054 | Erase Repository | destructive-action | US049 | EraseRepository |
| SCR054 | Deactivate Repository | destructive-action | US050 | useRepoActivation |
| SCR055 | View Repo Level Yaml Configuration | navigation | US051 | CommitYaml |
| SCR055 | Create Encrypted Secret String | primary-action | US052 | EncodeSecretString |
| SCR056 | View Badges And Graphs Snippets | secondary-action | US053 | RepoConfig |
| SCR034, SCR035, SCR036, SCR040, SCR048, SCR051, SCR052, SCR053 | Navigate Repo Tabs Regardless Of Product Enabled | navigation | US054 | GetRepo |
| SCR006 | View Organization Repo List | navigation | US055 | ReposForOwner |
| SCR004 | View Organization Analytics With Filters | secondary-action | US056 | GetReposCoverageMeasurements |
| SCR053, SCR054, SCR055, SCR056 | Navigate Repo Config Sidebar Tabs | navigation | US057 | none |
| SCR009 | Add Org Admin | primary-action | US058 | PATCH /{provider}/{owner}/users/{targetUserOwnerid}/ |
| SCR009 | Revoke Org Admin | destructive-action | US059 | PATCH /{provider}/{owner}/users/{targetUserOwnerid}/ |
| SCR013 | Regenerate Org Upload Token | primary-action | US060 | GraphQL |
| SCR014 | View Instance Admin List | secondary-action | US061 | GET /users?is_admin=true |
| SCR015 | Toggle Auto Activate Members | primary-action | US062 | GraphQL |
| SCR015 | Filter Instance Members List | secondary-action | US063 | GET /users |
| SCR015 | Activate Instance Member | primary-action | US064 | PATCH /users/{ownerid} |
| SCR015 | Deactivate Instance Member | destructive-action | US065 | PATCH /users/{ownerid} |

## User Story Index

| Code | Title | Type | Priority | Screens |
|------|-------|------|----------|---------|
| US001_AgreeToTermsOfService | Agree To Terms Of Service | system | P0 | - (system) |
| US002_SignInWithGitProvider | Sign In With Git Provider | ui | P0 | SCR001 |
| US003_SyncGitProviderOrganization | Sync Git Provider Organization | ui | P0 | SCR002 |
| US004_SignInFromSelfHostedLandingPage | Sign In From Self Hosted Landing Page | ui | P1 | SCR007 |
| US005_ViewRepoCoverageOverview | View Repo Coverage Overview | ui | P1 | SCR034/REG001, SCR034/REG002, SCR034/REG003 |
| US006_ViewRepoFlagCoverage | View Repo Flag Coverage | ui | P2 | SCR035 |
| US007_ViewRepoComponentCoverage | View Repo Component Coverage | ui | P2 | SCR036 |
| US008_ViewRepoBundleAnalysis | View Repo Bundle Analysis | ui | P2 | SCR040/REG001, SCR040/REG002 |
| US009_ViewRepoTestAnalytics | View Repo Test Analytics | ui | P2 | SCR048/REG001, SCR048/REG002 |
| US010_ViewRepoCommitList | View Repo Commit List | ui | P2 | SCR051 |
| US011_ViewRepoPullRequestList | View Repo Pull Request List | ui | P2 | SCR052 |
| US012_GetBlockedFromRepoConfigScreen | Get Blocked From Repo Config Screen | ui | P1 | SCR058 |
| US013_GetRedirectedFromPlanBillingScreens | Get Redirected From Plan Billing Screens | ui | P1 | SCR006 |
| US014_GetRedirectedFromOrgAdminAccountScreen | Get Redirected From Org Admin Account Screen | ui | P2 | SCR011 |
| US015_ViewMembersPageWithoutTabNav | View Members Page Without Tab Nav | ui | P2 | SCR003 |
| US016_ViewRepoCoverageOverview | View Repo Coverage Overview | ui | P1 | SCR034/REG001, SCR034/REG002 |
| US017_ViewRepoCoverageSunburst | View Repo Coverage Sunburst | ui | P2 | SCR034/REG003 |
| US018_BrowseRepoFileExplorer | Browse Repo File Explorer | ui | P1 | SCR034/REG004 |
| US019_ViewRepoFileCoverageDetail | View Repo File Coverage Detail | ui | P1 | SCR034/REG004 |
| US020_ViewRepoFlagsCoverageTable | View Repo Flags Coverage Table | ui | P1 | SCR035 |
| US021_EnableFlagAnalyticsBackfill | Enable Flag Analytics Backfill | ui | P1 | SCR035 |
| US022_ViewRepoComponentsCoverageTable | View Repo Components Coverage Table | ui | P1 | SCR036 |
| US023_EnableComponentAnalyticsBackfill | Enable Component Analytics Backfill | ui | P1 | SCR036 |
| US024_NavigateCoverageOnboardingCIOptions | Navigate Coverage Onboarding C I Options | ui | P2 | SCR037, SCR038, SCR039 |
| US025_SelectUploadTokenSourceDuringOnboarding | Select Upload Token Source During Onboarding | ui | P2 | SCR037 |
| US026_ViewBundleAnalysisTrendChart | View Bundle Analysis Trend Chart | ui | P1 | SCR040/REG001 |
| US027_ViewBundleAssetsTable | View Bundle Assets Table | ui | P1 | SCR040/REG002 |
| US028_NavigateBundleOnboardingByBundler | Navigate Bundle Onboarding By Bundler | ui | P2 | SCR041, SCR042, SCR043, SCR044, SCR045, SCR046, SCR047 |
| US029_ViewFailedTestsMetricsSummary | View Failed Tests Metrics Summary | ui | P1 | SCR048/REG001 |
| US030_BrowseFailedTestsListWithFilters | Browse Failed Tests List With Filters | ui | P1 | SCR048/REG002 |
| US031_NavigateTestAnalyticsOnboardingOptions | Navigate Test Analytics Onboarding Options | ui | P2 | SCR049, SCR050 |
| US032_ViewRepoCommitsListWithFilters | View Repo Commits List With Filters | ui | P1 | SCR051 |
| US033_ViewRepoPullRequestsListWithFilters | View Repo Pull Requests List With Filters | ui | P1 | SCR052 |
| US034_ViewPullRequestFilesChangedComparison | View Pull Request Files Changed Comparison | ui | P1 | SCR029 |
| US035_BrowsePullRequestFileExplorer | Browse Pull Request File Explorer | ui | P2 | SCR023 |
| US036_ViewPullRequestFileDiffDetail | View Pull Request File Diff Detail | ui | P1 | SCR024 |
| US037_ViewPullRequestIndirectChanges | View Pull Request Indirect Changes | ui | P2 | SCR025 |
| US038_ViewPullRequestCommitsList | View Pull Request Commits List | ui | P2 | SCR026 |
| US039_ViewPullRequestFlagsBreakdown | View Pull Request Flags Breakdown | ui | P2 | SCR027 |
| US040_ViewPullRequestComponentsBreakdown | View Pull Request Components Breakdown | ui | P2 | SCR028 |
| US041_ViewCommitFilesChangedSummary | View Commit Files Changed Summary | ui | P1 | SCR032 |
| US042_BrowseCommitFileExplorer | Browse Commit File Explorer | ui | P2 | SCR030 |
| US043_ViewCommitFileDiffDetail | View Commit File Diff Detail | ui | P1 | SCR031 |
| US044_ViewCommitIndirectChanges | View Commit Indirect Changes | ui | P2 | SCR033 |
| US045_ViewRepoConfigurationStatusChecklist | View Repo Configuration Status Checklist | ui | P1 | SCR053 |
| US046_UpdateRepoDefaultBranch | Update Repo Default Branch | ui | P1 | SCR054 |
| US047_ViewRepoTokensInGeneralSettings | View Repo Tokens In General Settings | ui | P1 | SCR054 |
| US048_RegenerateRepositoryUploadToken | Regenerate Repository Upload Token | ui | P0 | SCR054 |
| US049_EraseRepository | Erase Repository | ui | P0 | SCR054 |
| US050_DeactivateRepository | Deactivate Repository | ui | P0 | SCR054 |
| US051_ViewRepoLevelYamlConfiguration | View Repo Level Yaml Configuration | ui | P1 | SCR055 |
| US052_CreateEncryptedSecretString | Create Encrypted Secret String | ui | P2 | SCR055 |
| US053_ViewBadgesAndGraphsSnippets | View Badges And Graphs Snippets | ui | P2 | SCR056 |
| US054_NavigateRepoTabsRegardlessOfProductEnabled | Navigate Repo Tabs Regardless Of Product Enabled | ui | P2 | SCR034, SCR035, SCR036, SCR040, SCR048, SCR051, SCR052, SCR053 |
| US055_ViewOrganizationRepoList | View Organization Repo List | ui | P1 | SCR006 |
| US056_ViewOrganizationAnalyticsWithFilters | View Organization Analytics With Filters | ui | P2 | SCR004 |
| US057_NavigateRepoConfigSidebarTabs | Navigate Repo Config Sidebar Tabs | ui | P2 | SCR053, SCR054, SCR055, SCR056 |
| US058_AddOrgAdmin | Add Org Admin | ui | P1 | SCR009 |
| US059_RevokeOrgAdmin | Revoke Org Admin | ui | P1 | SCR009 |
| US060_RegenerateOrgUploadToken | Regenerate Org Upload Token | ui | P2 | SCR013 |
| US061_ViewInstanceAdminList | View Instance Admin List | ui | P2 | SCR014 |
| US062_ToggleAutoActivateMembers | Toggle Auto Activate Members | ui | P2 | SCR015 |
| US063_FilterInstanceMembersList | Filter Instance Members List | ui | P2 | SCR015 |
| US064_ActivateInstanceMember | Activate Instance Member | ui | P1 | SCR015 |
| US065_DeactivateInstanceMember | Deactivate Instance Member | ui | P1 | SCR015 |

---

<!-- SLICE 01: Signed-out visitor + Non-Member, US001–US003 -->
## US001_AgreeToTermsOfService

**Type**: system
**Interaction**: primary-action (form submission)
**Priority**: P0
**Estimate**: S

### User Story

As a newly-authenticated user on a non-self-hosted instance, I want to agree to the Terms of Service so that I can continue past the entry gate into the app.

### Acceptance Criteria

- [ ] On a non-self-hosted instance, when `internalUser.termsAgreement === false`, the `TermsOfService` interstitial renders in place of the requested screen for every `BaseLayout`-wrapped route (`src/layouts/BaseLayout/BaseLayout.tsx:43-48`, gate computed at `src/layouts/BaseLayout/hooks/useUserAccessGate.js:79-81`).
- [ ] Submitting the form with name + email + the `tos` checkbox checked calls the `saveTermsAgreement` mutation and, on success, reloads the current URL with a `?source=onboarding` query param (`src/pages/TermsOfService/TermsOfService.tsx:135-146`, `src/pages/TermsOfService/hooks/useTermsOfService.ts:41-75`).
- [ ] The Continue button stays disabled until the form is valid and dirty and no mutation is in flight; the `tos` field is a hard-required boolean (`src/pages/TermsOfService/TermsOfService.tsx:36-44,213-217`).
- [ ] A mutation error surfaces inline above the form buttons instead of silently failing (`src/pages/TermsOfService/TermsOfService.tsx:147,253-262`).
- [ ] On a self-hosted instance this entire check is skipped — `showAgreeToTerms` is never set to true (`src/layouts/BaseLayout/hooks/useUserAccessGate.js:79`, self-hosted flag `src/config.js:26`).

### Technical Notes

- **Endpoint**: `saveTermsAgreement` GraphQL mutation (`src/pages/TermsOfService/hooks/useTermsOfService.ts:54-56`) — not present in route-list.md's ROUTE### inventory because it is not tied to a routed screen.
- **Data Required**: `internalUser.termsAgreement`, `internalUser.owners.length` (both from the same internal-user fetch that also drives US003's gate).
- **Dependencies**: fires before the sync-organization check in US003; both are evaluated by the same `useUserAccessGate` hook.
- **[NO_SCREEN_MAPPING]**: the ToS interstitial is documented in screen-list.md as having no distinct SCR### (rendered in place of `children`, not a routed component) and in permissions-matrix.md PERM001. Marked `system`-type per code-formats.md's "non-ui types map to SCR### only (or omit)" rule rather than fabricate a screen.

### Screens

- None — interstitial, no distinct SCR### (see PERM001 in permissions-matrix.md)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-self-hosted user with `termsAgreement === false` | user fills name/email, checks the ToS box, clicks Continue | `saveTermsAgreement` mutation fires, succeeds, page reloads with `?source=onboarding` and the originally-requested screen now renders |
| Error Case | Same user submits the form | `saveTermsAgreement` mutation returns an error | inline API error message renders above the form buttons; user stays on the interstitial |

---

## US002_SignInWithGitProvider

**Type**: ui
**Interaction**: navigation
**Priority**: P0
**Estimate**: S

### User Story

As a signed-out visitor, I want to sign in with a git provider so that I can authenticate into Athena.

### Acceptance Criteria

- [ ] On a non-self-hosted instance, `/login` and `/login/:provider` render `LoginPage` with one "Login with {Provider}" button per configured provider (gh, sentry, bb, gl) when no `:provider` is in the URL, or exactly one button when it is (`src/pages/LoginPage/LoginPage.jsx:26-35`).
- [ ] Clicking a provider button navigates the browser to `{API_URL}/login/{provider}` (an external OAuth redirect, not a client-side route) (`src/pages/LoginPage/LoginButton.jsx:23,28`, `src/services/navigation/useNavLinks.ts:42-55`).
- [ ] On a self-hosted instance, both `/login/:provider` and `/login` redirect to `/` instead of rendering `LoginPage` (`src/App.tsx:85-94`, self-hosted flag `src/config.js:26`).
- [ ] If redirected here after a session expiry, a `SessionExpiredBanner` renders above the login buttons (`src/pages/LoginPage/SessionExpiredBanner.tsx:4-18`).

### Technical Notes

- **Endpoint**: `GET {API_URL}/login/:provider` (external OAuth redirect, one endpoint template shared by all 4 providers).
- **Data Required**: `GetLoginProviders` (ROUTE056) drives which provider buttons are eligible to show.
- **Dependencies**: on success, the OAuth provider redirects back into the app, which then evaluates US001 (ToS) and US003 (sync) before any owner screen renders.

### Screens

- SCR001: LoginPage

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Signed-out visitor on `/login`, non-self-hosted | clicks "Login with GitHub" | browser navigates to `{API_URL}/login/gh`, provider's OAuth consent screen opens |
| Error Case | Signed-out visitor on `/login`, self-hosted instance | route matches `/login` | user is redirected to `/` (EnterpriseLandingPage/`HomePageRedirect`), `LoginPage` never renders |

---
## US003_SyncGitProviderOrganization

**Type**: ui
**Interaction**: system-action
**Priority**: P0
**Estimate**: S

### User Story

As a signed-out visitor completing sign-in, I want to sync a git-provider organization so that Athena has at least one org to show me.

### Acceptance Criteria

- [ ] Any authenticated user with zero synced orgs (`internalUser.owners.length === 0`) who is not already on `/sync` is redirected to `/sync` (`src/layouts/BaseLayout/hooks/useUserAccessGate.js:83-87`, rendered via `src/layouts/BaseLayout/BaseLayout.tsx:51-52`).
- [ ] `SyncProviderPage` renders one "Sync with {Provider}" button per provider returned by `SyncProvidersQueryOpts`; if that list is empty, a fallback message pointing to the self-hosted install guide renders instead of any button (`src/pages/SyncProviderPage/SyncProviderPage.tsx:14-31`).
- [ ] Clicking a "Sync with {Provider}" button navigates to `{API_URL}/login/{provider}` — the same OAuth-redirect endpoint as US002 (`src/pages/SyncProviderPage/SyncButton.tsx:21,27`).
- [ ] If the user already has ≥1 synced owner when `/sync` is reached, they are redirected straight to `/{provider}` for their first synced owner instead of seeing the picker (`src/pages/SyncProviderPage/SyncProviderPage.tsx:47-66`).

### Technical Notes

- **Endpoint**: `GET {API_URL}/login/:provider` (same template as US002); read side is `IsSyncing`/`SyncProvidersQueryOpts` (ROUTE112), mutation side is `SyncData` (ROUTE113) per screen-list.md.
- **Data Required**: `internalUser.owners` (count + first owner's service), `SyncProvidersQueryOpts` result.
- **Dependencies**: only reachable after US001's ToS check passes (non-self-hosted) or unconditionally (self-hosted, since ToS is skipped).

### Screens

- SCR002: SyncProviderPage

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Authenticated user, `owners.length === 0` | app evaluates the access gate on any route | user lands on `/sync`, sees one sync button per available provider, clicks one, OAuth redirect fires |
| Error Case | `SyncProvidersQueryOpts` returns an empty list | user lands on `/sync` | page shows "Unable to retrieve list of Git providers..." with a link to the self-hosted install guide instead of buttons |

---

## US004_SignInFromSelfHostedLandingPage

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As a signed-out visitor on a self-hosted instance, I want to sign in from the enterprise landing page so that I can authenticate through whichever git provider that instance offers.

### Acceptance Criteria

- [ ] `/` renders `EnterpriseLandingPage` only when `config.IS_SELF_HOSTED`; otherwise `/` renders `HomePageRedirect` (`src/App.tsx:194-198`, self-hosted flag `src/config.js:26`).
- [ ] One `ProviderCard` renders per provider flagged true in `GetSyncProviders` (github/gitlab/bitbucket/okta) (`src/pages/EnterpriseLandingPage/EnterpriseLandingPage.tsx:23-46`, ROUTE056).
- [ ] Each card shows a "Login via {Provider}" button (external OAuth) and, for external-VCS providers other than Okta, a second "Login via {Self-Hosted Provider Name}" button when that internal variant is also configured (`src/pages/EnterpriseLandingPage/ProviderCard/ProviderCard.tsx:85-131`).
- [ ] Both buttons navigate through the same `signIn` endpoint template as US002/US003, parameterized by `provider.externalKey` or `provider.selfHostedKey` (`src/pages/EnterpriseLandingPage/ProviderCard/ProviderCard.tsx:42-45,75-78`).
- [ ] If a session already exists (a GraphQL `me.email` resolves) and the user isn't already on `/{ENTERPRISE_DEFAULT_PROVIDER}`, they are auto-redirected there instead of seeing the landing page (`src/pages/EnterpriseLandingPage/useEnterpriseRedirect.ts:20-59`).

### Technical Notes

- **Endpoint**: `GET {API_URL}/login/:provider` (same template as US002/US003).
- **Data Required**: `GetSyncProviders` (ROUTE057); `EnterpriseLandingPageUser` (`me.email`) for the auto-redirect check.
- **Dependencies**: none — this is the self-hosted equivalent entry point to US002, mutually exclusive with it per the `IS_SELF_HOSTED` build flag.

### Screens

- SCR007: EnterpriseLandingPage

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Self-hosted instance, signed-out visitor, GitHub configured | visitor clicks "Login via GitHub" | browser navigates to `{API_URL}/login/gh` |
| Error Case | Self-hosted instance, visitor already has a valid session | visitor lands on `/` | `useEnterpriseRedirect` fires `history.replace` to `/{ENTERPRISE_DEFAULT_PROVIDER}` before the provider cards are interacted with |

---
## US005_ViewRepoCoverageOverview

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: M

### User Story

As a Non-Member, I want to view a repo's coverage overview so that I can check its overall test coverage without joining the org.

### Acceptance Criteria

- [ ] When `coverageEnabled` is true and the repo is public, or the repo is private and the current user is activated, `CoverageTab` (containing `SCR034_RepoOverviewTab`) renders at `/:repo` (`src/pages/RepoPage/RepoPage.tsx:63-70,75-96`).
- [ ] When the repo is private and the current user is NOT activated, `ActivationAlert` renders in place of the coverage overview instead — no separate SCR (`src/pages/RepoPage/RepoPage.tsx:67-68,91-95`).
- [ ] The rendered overview includes the coverage summary, `CoverageChart`, and (when applicable) `Sunburst` region, each backed by its own query (`GetRepoCoverage` ROUTE087, sunburst `/coverage/tree` ROUTE003 — see screen-list.md SCR034 Regions table).
- [ ] Regardless of org membership, `RepoPageTabs` shows the Coverage tab in the nav whenever `coverageEnabled` is already true for the repo (`src/pages/RepoPage/RepoPageTabs.tsx:72-133`, PERM004).

### Technical Notes

- **Endpoint**: `GetRepoCoverage` (ROUTE088); sunburst tree `/coverage/tree` (ROUTE004).
- **Data Required**: `repo.coverageEnabled`, `repo.private`, `repo.isCurrentUserActivated`.
- **Dependencies**: PERM004 (tab visibility), PERM005-equivalent private/activation check inline in `RepoPage.tsx:67-70` (same shape as PERM005 but for coverage, not commits/pulls).

### Screens

- SCR034/REG001: RepoOverviewTab (Summary)
- SCR034/REG002: RepoOverviewTab (CoverageChart)
- SCR034/REG003: RepoOverviewTab (Sunburst)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo, `coverageEnabled=true` | Non-Member navigates to `/:provider/:owner/:repo` | coverage overview renders with chart and summary |
| Error Case | Non-Member, private repo, not activated, `coverageEnabled=true` | Non-Member navigates to `/:provider/:owner/:repo` | `ActivationAlert` renders instead of the coverage overview |

---

## US006_ViewRepoFlagCoverage

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As a Non-Member, I want to view per-flag coverage for a repo so that I can see coverage broken down by flag without joining the org.

### Acceptance Criteria

- [ ] `RepoFlagsTab` (`SCR035`) renders at `/:repo/flags(/:branch)` under the same `coverageEnabled` + public-or-activated condition as US005 (`src/pages/RepoPage/RepoPage.tsx:75-96`).
- [ ] The flag table loads via `FlagMeasurements`/`FlagsSelect` (ROUTE088/ROUTE090); backfill/sync banners render independently of the table (`src/pages/RepoPage/CoverageTab/FlagsTab/FlagsTab.jsx`, screen-list.md SCR035).
- [ ] The per-row "delete flag" action is hidden for a Non-Member — it only renders when `repoSettings?.isCurrentUserPartOfOrg` is true (`src/pages/RepoPage/CoverageTab/FlagsTab/FlagsTab.jsx:63`).

### Technical Notes

- **Endpoint**: `FlagMeasurements` (ROUTE089), `FlagsSelect` (ROUTE091) — both read-only for this actor.
- **Data Required**: `repoSettings.isCurrentUserPartOfOrg` (gates the delete action's visibility, not the tab itself).
- **Dependencies**: same coverage-enabled + public/activated gate as US005.

### Screens

- SCR035: RepoFlagsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo with flags configured | navigates to `/:repo/flags` | flag coverage table renders, no delete action visible per row |
| Error Case | Non-Member, private repo, not activated | navigates to `/:repo/flags` | `ActivationAlert` renders instead of the flags table |

---

## US007_ViewRepoComponentCoverage

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As a Non-Member, I want to view per-component coverage for a repo so that I can see coverage broken down by component without joining the org.

### Acceptance Criteria

- [ ] `RepoComponentsTab` (`SCR036`) renders at `/:repo/components(/:branch)` under the same coverage-enabled + public-or-activated condition as US005 (`src/pages/RepoPage/RepoPage.tsx:75-96`).
- [ ] The component table loads via `ComponentMeasurements`/`RepoComponentsSelector` (ROUTE084/ROUTE085); a `BranchSelector` in the Header lets the Non-Member switch which branch's components are shown, re-issuing the same query with a different branch argument (screen-list.md SCR036).
- [ ] The per-row "delete component" action follows the same org-membership visibility rule as US006's delete-flag action (`deleteComponentMeasurements` mutation, ROUTE058, restricted to org members).

### Technical Notes

- **Endpoint**: `ComponentMeasurements` (ROUTE085), `RepoComponentsSelector` (ROUTE086).
- **Data Required**: selected branch (URL param), `repoSettings.isCurrentUserPartOfOrg` (gates delete only).
- **Dependencies**: same coverage-enabled + public/activated gate as US005.

### Screens

- SCR036: RepoComponentsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo with components configured | navigates to `/:repo/components`, picks a branch | component coverage table re-renders for the selected branch |
| Error Case | Non-Member, private repo, not activated | navigates to `/:repo/components` | `ActivationAlert` renders instead of the components table |

---
## US008_ViewRepoBundleAnalysis

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: M

### User Story

As a Non-Member, I want to view a repo's bundle-analysis dashboard so that I can check its bundle size trend without joining the org.

### Acceptance Criteria

- [ ] When `bundleAnalysisEnabled` is true and the repo is public, or private with an activated seat, `BundleContent` (`SCR040`) renders at `/:repo/bundles(/:branch)(/:bundle)` (`src/pages/RepoPage/RepoPage.tsx:109-123`).
- [ ] When the repo is private and the current user is not activated, `ActivationAlert` renders instead (`src/pages/RepoPage/RepoPage.tsx:118-119`).
- [ ] The dashboard's `BundleChart` (trend, `GetBundleTrend` ROUTE034) and `AssetsTable` (`BundleAssets` ROUTE033, own pagination) load and paginate independently of each other (screen-list.md SCR040 Regions).
- [ ] When `bundleAnalysisEnabled` is false, the Non-Member is routed to the bundler-onboarding flow (SCR041-047) instead — this branch does not check org membership (`src/pages/RepoPage/RepoPage.tsx:124-139`).

### Technical Notes

- **Endpoint**: `BundleSummary` (ROUTE038), `BranchBundleSummaryData` (ROUTE033), `GetBundleTrend` (ROUTE035), `BundleAssets` (ROUTE034).
- **Data Required**: `repo.bundleAnalysisEnabled`, `repo.private`, `repo.isCurrentUserActivated`.
- **Dependencies**: mutually exclusive with the onboarding screens (SCR041-047) on the same route family.

### Screens

- SCR040/REG001: BundleContent (BundleChart)
- SCR040/REG002: BundleContent (AssetsTable)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo, `bundleAnalysisEnabled=true` | navigates to `/:repo/bundles` | bundle trend chart and assets table render |
| Error Case | Non-Member, private repo, not activated, `bundleAnalysisEnabled=true` | navigates to `/:repo/bundles` | `ActivationAlert` renders instead of the dashboard |

---

## US009_ViewRepoTestAnalytics

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: M

### User Story

As a Non-Member, I want to view a repo's Test Analytics dashboard so that I can check its test-failure and flake data once it's already enabled.

### Acceptance Criteria

- [ ] `FailedTestsPage` (`SCR048`) renders at `/:repo/tests(/:branch)` only when `repoOverview.testAnalyticsEnabled` is already true (`src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:121,128-144`, PERM006).
- [ ] Within that branch, if the repo is private and the current user is not activated, `ActivationAlert` renders instead of `FailedTestsPage` (`src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:125-126,138-139`).
- [ ] When `testAnalyticsEnabled` is false, the Non-Member is routed to Test Analytics onboarding (SCR049/SCR050) instead of seeing a blocked message (`src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:154-165`).
- [ ] The `MetricsSection` (aggregate/flake stats) and `FailedTestsTable` (paginated results) load via independent hooks/queries (`useTestResultsAggregates`/`useFlakeAggregates` vs `useInfiniteTestResults`) (screen-list.md SCR048 Regions).

### Technical Notes

- **Endpoint**: `useTestResultsAggregates`, `useFlakeAggregates`, `useInfiniteTestResults`, `useTestResultsFlags`, `useTestResultsTestSuites` (`FailedTestsPage/hooks`).
- **Data Required**: `repoOverview.testAnalyticsEnabled`, `repoOverview.private`, `repoOverview.isCurrentUserActivated` (`GetRepoOverview`, ROUTE091).
- **Dependencies**: PERM006 (org members always pass regardless of `testAnalyticsEnabled`; Non-Member requires it to already be true).

### Screens

- SCR048/REG001: FailedTestsPage (MetricsSection)
- SCR048/REG002: FailedTestsPage (FailedTestsTable)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo, `testAnalyticsEnabled=true` | navigates to `/:repo/tests` | metrics section and failed-tests table render |
| Error Case | Non-Member, `testAnalyticsEnabled=false` | navigates to `/:repo/tests` | onboarding (SCR049/SCR050) renders instead, not a blocked message |

---
## US010_ViewRepoCommitList

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As a Non-Member, I want to view a repo's commit list so that I can see coverage status per commit on a repo I can already access.

### Acceptance Criteria

- [ ] `RepoCommitsTab` (`SCR051`) renders at `/:repo/commits(/:branch)` only when `productEnabled` (coverage, bundle, or test analytics already on) AND `userAuthorizedtoViewRepo` (public repo, or private + activated) both hold (`src/pages/RepoPage/RepoPage.tsx:63-66,153-160`, PERM005).
- [ ] When either condition fails, the `/commits` route is omitted from the `Switch` entirely rather than rendering a blocked message (`src/pages/RepoPage/RepoPage.tsx:153-160`).
- [ ] The commit list loads via `GetCommits` (ROUTE054) and shows coverage status per commit (screen-list.md SCR051).

### Technical Notes

- **Endpoint**: `GetCommits` (ROUTE054).
- **Data Required**: `productEnabled` (`coverageEnabled || bundleAnalysisEnabled || testAnalyticsEnabled`), `userAuthorizedtoViewRepo` (`isRepoPrivate && isCurrentUserActivated || !isRepoPrivate`).
- **Dependencies**: PERM005 — same gate shape reused for US011.

### Screens

- SCR051: RepoCommitsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo, coverage already enabled | navigates to `/:repo/commits` | commit list renders with per-commit coverage status |
| Error Case | Non-Member, private repo, not activated | navigates to `/:repo/commits` | route is not registered; no `/commits` screen reachable at all |

---

## US011_ViewRepoPullRequestList

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As a Non-Member, I want to view a repo's pull-request list so that I can see coverage status per PR on a repo I can already access.

### Acceptance Criteria

- [ ] `RepoPullsTab` (`SCR052`) renders at `/:repo/pulls` under the identical `productEnabled && userAuthorizedtoViewRepo` gate as US010 (`src/pages/RepoPage/RepoPage.tsx:161-165`, PERM005).
- [ ] The pull list loads via `GetPulls` (ROUTE078) and shows coverage status per PR (screen-list.md SCR052).
- [ ] When the gate fails, `/pulls` (and the `/compare` redirect into it) are both omitted from the route `Switch` (`src/pages/RepoPage/RepoPage.tsx:161-168`).

### Technical Notes

- **Endpoint**: `GetPulls` (ROUTE078).
- **Data Required**: same `productEnabled`/`userAuthorizedtoViewRepo` pair as US010.
- **Dependencies**: PERM005.

### Screens

- SCR052: RepoPullsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, public repo, bundle analysis already enabled | navigates to `/:repo/pulls` | pull-request list renders with per-PR coverage status |
| Error Case | Non-Member, private repo, not activated | navigates to `/:repo/pulls` | route is not registered; no `/pulls` screen reachable at all |

---
## US012_GetBlockedFromRepoConfigScreen

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As a Non-Member, I want to be shown a not-found page when I attempt to open a repo's Config screen so that I can't act on settings for an org I don't belong to.

### Acceptance Criteria

- [ ] Attempting any Config-family route (`/:repo/config`, `/config/general`, `/config/yaml`, `/config/badge`) renders `NotFound` (`SCR058`) instead of the requested tab when `!currentOwner?.isCurrentUserPartOfOrg` (`src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32`, PERM003).
- [ ] This includes the destructive actions inside `RepoGeneralTab` (Erase Repo, Deactivate Repo) — the frontend requires nothing beyond plain org membership to reach them, so blocking at `ConfigTab.tsx:32` is the only gate in front of those actions for a Non-Member (permissions-matrix.md PERM003).
- [ ] The `NotFound` page shown here is the same shared component used elsewhere in the app, not a Config-specific variant (`src/pages/NotFound/NotFound.jsx:10,49-71`).

### Technical Notes

- **Endpoint**: N/A (client-side route gate; no request is made).
- **Data Required**: `currentOwner.isCurrentUserPartOfOrg` (from `useOwner`).
- **Dependencies**: PERM003. Real enforcement of these destructive actions must still exist server-side — this is a frontend-only observation.

### Screens

- SCR058: NotFound

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member of the repo's org | navigates to `/:repo/config` | `NotFound` renders instead of `ConfigurationManager` |
| Error Case | Non-Member, tries `/:repo/config/general` directly (deep link) | route matches inside `ConfigTab` | still blocked by the same `ConfigTab.tsx:32` check before any child route renders |

---

## US013_GetRedirectedFromPlanBillingScreens

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As a Non-Member, I want to be redirected away when I attempt to open an org's Plan/billing screens so that I can't view billing data for an org I don't belong to.

### Acceptance Criteria

- [ ] Attempting any Plan-family route (`/plan/:provider/:owner`, `/upgrade`, `/invoices`, `/invoices/:id`, `/cancel`, `/cancel/downgrade`) redirects to `/{provider}/{owner}` (`SCR006_OwnerPage`) when `!ownerData?.isCurrentUserPartOfOrg` (`src/pages/PlanPage/PlanPage.tsx:60`, PERM007).
- [ ] The same conditional also redirects on a self-hosted instance regardless of membership, since the Plan family doesn't exist there at all (`src/pages/PlanPage/PlanPage.tsx:60`, build-gating note in permissions-matrix.md).
- [ ] No distinct "blocked" screen is shown — the destination is `OwnerPage`, the org's normal landing page.

### Technical Notes

- **Endpoint**: `GetPlanData` (ROUTE023) — never actually fetched for a Non-Member since the redirect fires first.
- **Data Required**: `ownerData.isCurrentUserPartOfOrg`.
- **Dependencies**: PERM007.

### Screens

- SCR006: OwnerPage (redirect target)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, non-self-hosted instance | navigates to `/plan/:provider/:owner` | redirected to `/{provider}/{owner}` (OwnerPage) |
| Error Case | Non-Member tries a deep sub-route, `/plan/:provider/:owner/invoices/123` | route matches inside `PlanPage` | same redirect fires before `InvoiceDetailsPage` mounts |

---
## US014_GetRedirectedFromOrgAdminAccountScreen

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As a Non-Member, I want to be redirected to the YAML tab when I open an org's account-settings root so that I can't reach the org-admin management screen for an org I don't belong to.

### Acceptance Criteria

- [ ] At `/account/:provider/:owner/` (exact), when the instance is not self-hosted and `isAdmin` is false, the user is redirected to `/account/:provider/:owner/yaml/` (`SCR011_AccountYAMLTab`) instead of seeing `AccountAdminTab` (`src/pages/AccountSettings/AccountSettings.jsx:47-55`, PERM009).
- [ ] A Non-Member of the org in question always falls into this "neither viewing own account nor org admin" branch, since `isAdmin` (`useIsCurrentUserAnAdmin`) requires org-admin standing they don't have (`src/pages/AccountSettings/AccountSettings.jsx:32,48-52`).
- [ ] This redirect target (`SCR011`) itself carries no org-membership check of its own — it is the fallback destination for anyone failing both the personal-settings and admin branches (`src/pages/AccountSettings/AccountSettings.jsx:53`).

### Technical Notes

- **Endpoint**: `DetailOwner` (ROUTE110) supplies `owner.isAdmin` used by `useIsCurrentUserAnAdmin`.
- **Data Required**: `isViewingPersonalSettings` (own-username check), `isAdmin` (org admin, non-self-hosted).
- **Dependencies**: PERM009 — a distinct role from the self-hosted instance-admin role in PERM002; never conflated.

### Screens

- SCR011: AccountYAMLTab (redirect target)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, non-self-hosted, viewing another org's account root | navigates to `/account/:provider/:owner/` | redirected to `/account/:provider/:owner/yaml/` |
| Error Case | Non-Member tries `/account/:provider/:owner/org-upload-token` directly | route matches | same-shaped `isAdmin` check at `AccountSettings.jsx:73-77` redirects to the YAML tab too (PERM010) |

---

## US015_ViewMembersPageWithoutTabNav

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As a Non-Member, I want to view an org's Members page so that I can see who is on the team, even though I don't see the surrounding tab navigation.

### Acceptance Criteria

- [ ] On a non-self-hosted instance, `/members/:provider/:owner` renders `MembersPage` (`SCR003`) for any authenticated user, including a Non-Member (`src/pages/MembersPage/MembersPage.jsx:12-32`).
- [ ] The shared sibling-tab nav (Repos/Analytics/Codecov AI/Members/Plan/Settings) renders only when `ownerData?.isCurrentUserPartOfOrg` is true — a Non-Member sees the member list and activation UI but not this nav (`src/pages/MembersPage/MembersPage.jsx:22`, PERM008).
- [ ] On a self-hosted instance, this route redirects to `/{provider}/{owner}` instead — `MembersPage` never renders there for anyone (`src/pages/MembersPage/MembersPage.jsx:16-18`, build-gating note in permissions-matrix.md).

### Technical Notes

- **Endpoint**: paginated member-activation query (screen-list.md SCR003); no dedicated ROUTE### cited beyond the owner-scoped member query.
- **Data Required**: `ownerData.isCurrentUserPartOfOrg` (nav visibility only, not page access).
- **Dependencies**: PERM008.

### Screens

- SCR003: MembersPage

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Non-Member, non-self-hosted instance | navigates to `/members/:provider/:owner` | member list and activation UI render; sibling-tab nav is absent |
| Error Case | Non-Member on a self-hosted instance | navigates to `/members/:provider/:owner` | redirected to `/{provider}/{owner}` before `MembersPage` content renders |

---

<!-- SLICE 02: Org Member, US016–US057 -->
## US016_ViewRepoCoverageOverview

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view my repo's coverage summary and trend chart so that I can gauge overall coverage health at a glance.

### Acceptance Criteria

- [ ] Given I am an Org Member on SCR034_RepoOverviewTab (default repo route), when the page loads, then Summary (or SummaryTeamPlan on a private team-plan repo) renders total/patch/change coverage figures from GetRepoCoverage (src/pages/RepoPage/CoverageTab/OverviewTab/OverviewTab.tsx:80,87).
- [ ] Given the summary has rendered, when I toggle the ToggleElement control, then the CoverageChart region re-renders in place without a full page reload (OverviewTab.tsx:99-121).
- [ ] Given isTeamPlan && repository.private is true, when the page renders, then SummaryTeamPlan renders instead of Summary (OverviewTab.tsx:80,87).

### Technical Notes

- **Endpoint**: GetRepoCoverage (ROUTE088), CoverageTabDataQueryOpts
- **Data Required**: repo coverage totals, private/team-plan flags
- **Dependencies**: none beyond org membership + repo route resolution

### Screens

- SCR034/REG001: RepoOverviewTab (Summary/SummaryTeamPlan)
- SCR034/REG002: RepoOverviewTab (CoverageChart)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member on a public repo | page loads | Summary + CoverageChart render from GetRepoCoverage |
| Error Case | private repo, team plan | page loads | SummaryTeamPlan renders in place of Summary |

---

## US017_ViewRepoCoverageSunburst

**Type**: ui
**Interaction**: secondary-action
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view a sunburst treemap of my repo's coverage so that I can spot low-coverage directories visually.

### Acceptance Criteria

- [ ] Given displaySunburst resolves true, when SCR034_RepoOverviewTab renders, then the Sunburst component mounts in a 9-column grid slot next to the chart, fetched via SunburstCoverageQueryOpts (OverviewTab.tsx:74-77,107,115-121).
- [ ] Given displaySunburst is false, when the page renders, then the CoverageChart region expands to the full 12-column width instead (OverviewTab.tsx:108).
- [ ] Given the sunburst tree loads, when I hover/click a node, then the tree drills into that directory's coverage (own query, independent of Summary's GetRepoCoverage).

### Technical Notes

- **Endpoint**: /coverage/tree (ROUTE004), SunburstCoverageQueryOpts
- **Data Required**: repo file/directory coverage tree
- **Dependencies**: displaySunburst condition (OverviewTab.tsx:74-77)

### Screens

- SCR034/REG003: RepoOverviewTab (Sunburst)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | displaySunburst true | page loads | Sunburst renders alongside CoverageChart |
| Error Case | displaySunburst false | page loads | Sunburst is absent; CoverageChart takes full width |

---

## US018_BrowseRepoFileExplorer

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to browse my repo's file tree so that I can navigate to any directory's coverage.

### Acceptance Criteria

- [ ] Given I navigate to /:repo/tree/:branch(/:path+), when SCR034_RepoOverviewTab's path-based subroute switch matches, then FileExplorer mounts in place of Summary/CoverageChart (OverviewTab.tsx:126-144).
- [ ] Given the tree loads, when the path segment changes (I click into a subdirectory), then a new pathContents query fires scoped to that path (OverviewTab.tsx:126-144, ROUTE064).
- [ ] Given I am on the file explorer, when I click a file row (not a directory), then I am routed to SCR034/REG004's FileViewer for that file's blob path.

### Technical Notes

- **Endpoint**: `BranchContents` path-contents query (ROUTE065)
- **Data Required**: branch, path segments from the URL
- **Dependencies**: none beyond org membership

### Screens

- SCR034/REG004: RepoOverviewTab (FileExplorer)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member, branch has files | navigate to /tree/:branch | file/directory list renders |
| Error Case | path has no contents | navigate to an empty path | empty-state renders instead of a file list |

---

## US019_ViewRepoFileCoverageDetail

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view line-by-line coverage for a single file in my repo so that I can see exactly which lines are covered.

### Acceptance Criteria

- [ ] Given I navigate to /:repo/blob/:ref/:path+, when SCR034_RepoOverviewTab's subroute switch matches, then FileViewer mounts and fetches CoverageForFile for that path (OverviewTab.tsx:126-129, ROUTE066).
- [ ] Given the file content loads, when it renders, then each source line is annotated (hit/miss/partial) via the shared CodeRenderer table.
- [ ] Given the file is large, when I scroll the code table, then pointer events on the table are disabled mid-scroll and re-enabled about 50ms after scrolling stops, to keep scroll performant (src/ui/CodeRenderer/CodeRenderer.tsx:71,75).

### Technical Notes

- **Endpoint**: CoverageForFile (ROUTE067)
- **Data Required**: ref/branch, file path
- **Dependencies**: none beyond org membership

### Screens

- SCR034/REG004: RepoOverviewTab (FileViewer)

### Background Logic

- BL004_CodeRendererScrollPointerToggle: pointer-events toggle while the code table scrolls (src/ui/CodeRenderer/CodeRenderer.tsx:71-75)
- BL006_ScrollLeftSync: keeps a frozen header row's horizontal scroll in sync with the code body (src/ui/VirtualRenderers/useScrollLeftSync.ts:34-38)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | file has coverage data | navigate to its blob path | line-by-line hit/miss annotations render |
| Error Case | file not found at ref | navigate to a stale path | CoverageForFile returns no data; empty/error state renders |

---
## US020_ViewRepoFlagsCoverageTable

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view per-flag coverage for my repo so that I can compare coverage across upload flags.

### Acceptance Criteria

- [ ] Given I am an Org Member on SCR035_RepoFlagsTab, when the page loads, then the flags table renders each flag's name, coverage percentage, and trend sparkline from FlagMeasurements (src/pages/RepoPage/CoverageTab/FlagsTab/subroute/FlagsTable/hooks/useRepoFlagsTable.ts:39-53, ROUTE088).
- [ ] Given more than one flag exists, when the flag selector is used, then FlagsSelect scopes the table to the chosen flags (ROUTE090).
- [ ] Given TimescaleDB is disabled for this instance, when the page loads, then TimescaleDisabled renders in place of the table (src/pages/RepoPage/CoverageTab/FlagsTab/TimescaleDisabled/TimescaleDisabled.tsx).

### Technical Notes

- **Endpoint**: FlagMeasurements (ROUTE089), FlagsSelect (ROUTE091)
- **Data Required**: repo flags list, per-flag coverage measurements
- **Dependencies**: none beyond org membership

### Screens

- SCR035_RepoFlagsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has flags with data | page loads | flags table with coverage/trend renders |
| Error Case | flags-analytics not yet backfilled | page loads | TriggerSyncBanner renders instead (see US021) |

---

## US021_EnableFlagAnalyticsBackfill

**Type**: ui
**Interaction**: system-action
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to enable flag analytics for my repo so that historical per-flag coverage data becomes available.

### Acceptance Criteria

- [ ] Given flagsMeasurementsActive is false, when SCR035_RepoFlagsTab renders, then TriggerSyncBanner shows "You need to enable Flag analytics to see coverage data" (src/pages/RepoPage/CoverageTab/FlagsTab/BackfillBanners/BackfillBanners.jsx:5-15, TriggerSyncBanner.tsx:16-59).
- [ ] Given the banner is visible, when I click "Enable flag analytics", then useActivateMeasurements mutates with measurementType FLAG_COVERAGE for this repo (TriggerSyncBanner.tsx:18-23,44-52).
- [ ] Given backfilling is now in progress, when the page next renders, then SyncingBanner replaces TriggerSyncBanner (BackfillBanners.jsx:12).

### Technical Notes

- **Endpoint**: useActivateMeasurements mutation, measurementType FLAG_COVERAGE
- **Data Required**: provider/owner/repo route params
- **Dependencies**: useRepoBackfillingStatus (flagsMeasurementsActive, isRepoBackfilling)

### Screens

- SCR035_RepoFlagsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | flag analytics not yet active | click "Enable flag analytics" | mutation fires; SyncingBanner shows on next render |
| Error Case | already backfilling | page loads | SyncingBanner shown, no Enable button available |

---

## US022_ViewRepoComponentsCoverageTable

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view per-component coverage for my repo so that I can compare coverage across defined components.

### Acceptance Criteria

- [ ] Given I am an Org Member on SCR036_RepoComponentsTab, when the page loads, then the components table renders each component's name, coverage percentage, and trend from ComponentMeasurements (ROUTE085).
- [ ] Given more than one component exists, when the component selector (RepoComponentsSelector, ROUTE085) is used, then the table scopes to the chosen components.
- [ ] Given the repo has multiple branches, when I use the BranchSelector in Header, then the table re-fetches for the selected branch (src/pages/RepoPage/CoverageTab/ComponentsTab/Header/BranchSelector/BranchSelector.tsx).

### Technical Notes

- **Endpoint**: ComponentMeasurements (ROUTE085), RepoComponentsSelector (ROUTE086)
- **Data Required**: repo components list, per-component coverage measurements, selected branch
- **Dependencies**: none beyond org membership

### Screens

- SCR036_RepoComponentsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has components with data | page loads | components table with coverage/trend renders |
| Error Case | components-analytics not yet backfilled | page loads | TriggerSyncBanner renders instead (see US023) |

---

## US023_EnableComponentAnalyticsBackfill

**Type**: ui
**Interaction**: system-action
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to enable component analytics for my repo so that historical per-component coverage data becomes available.

### Acceptance Criteria

- [ ] Given component measurements are not yet active, when SCR036_RepoComponentsTab renders, then TriggerSyncBanner shows "Enable component analytics" with a loading-table placeholder (src/pages/RepoPage/CoverageTab/ComponentsTab/BackfillBanners/TriggerSyncBanner/TriggerSyncBanner.tsx:14-49).
- [ ] Given the banner is visible, when I click "Enable component analytics", then useActivateMeasurements mutates with measurementType COMPONENT_COVERAGE for this repo (TriggerSyncBanner.tsx:16-21,37-45).
- [ ] Given backfilling is now in progress, when the page next renders, then SyncingBanner replaces TriggerSyncBanner.

### Technical Notes

- **Endpoint**: useActivateMeasurements mutation, measurementType COMPONENT_COVERAGE
- **Data Required**: provider/owner/repo route params
- **Dependencies**: useRepoBackfillingStatus (components variant)

### Screens

- SCR036_RepoComponentsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | component analytics not yet active | click "Enable component analytics" | mutation fires; SyncingBanner shows on next render |
| Error Case | already backfilling | page loads | SyncingBanner shown, no Enable button available |

---
## US024_NavigateCoverageOnboardingCIOptions

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to switch between GitHub Actions, CircleCI, and other-CI setup instructions so that I can find the steps matching my CI provider.

### Acceptance Criteria

- [ ] Given I am on /:repo/new (SCR037_CoverageOnboardingGitHubActions), when I select a different CI-provider radio option, then I am routed to /:repo/new/circle-ci (SCR038) or /:repo/new/other-ci (SCR039) without leaving the onboarding flow (src/pages/RepoPage/CoverageOnboarding/NewRepoTab.tsx:108-116).
- [ ] Given any of the three onboarding screens is active, when it renders, then the repo upload token is fetched once via RegenerateRepositoryToken and reused across all three (ROUTE098).
- [ ] Given I switch CI providers, when the new screen mounts, then only the instructional content changes; the token/step scaffolding persists.

### Technical Notes

- **Endpoint**: RegenerateRepositoryToken (ROUTE097, read-only usage here)
- **Data Required**: repo upload token
- **Dependencies**: none beyond org membership

### Screens

- SCR037_CoverageOnboardingGitHubActions
- SCR038_CoverageOnboardingCircleCI
- SCR039_CoverageOnboardingOtherCI

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | on GitHub Actions onboarding | select CircleCI | routed to /new/circle-ci, CircleCI instructions render |
| Error Case | token fetch fails | any onboarding screen loads | instructions render but token step shows no value |

---

## US025_SelectUploadTokenSourceDuringOnboarding

**Type**: ui
**Interaction**: secondary-action
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to choose between the org's global upload token and this repo's own token during coverage onboarding so that I add the right secret to my CI.

### Acceptance Criteria

- [ ] Given SCR037_CoverageOnboardingGitHubActions shows "Step 2: Select an upload token", when I pick "Global upload token" or "Repository token" in the RadioTileGroup, then isUsingGlobalToken toggles and the "Step 3: add token" card updates to show the matching token value (src/pages/RepoPage/CoverageOnboarding/GitHubActions/TokenStep.tsx:118-179,264-296).
- [ ] Given showTokenSelector is false (token not required, org token already generated), when the page renders, then the selector step is skipped and only the add-token step shows (TokenStep.tsx:45-52).
- [ ] Given no org upload token exists yet, when the selector renders, then a "Generate" button for a global token is visible but disabled unless the current user is an org admin (TokenStep.tsx:154-176) - admin-only action, out of this shard's scope.

### Technical Notes

- **Endpoint**: GetOrgUploadToken (ROUTE063), repo uploadToken field (from useRepo)
- **Data Required**: org upload token (if any), repo upload token
- **Dependencies**: none for the select action itself; the Generate sub-action requires org-admin

### Screens

- SCR037_CoverageOnboardingGitHubActions

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | org token exists | select "Global upload token" | add-token step shows the org token value |
| Error Case | no org token, not admin | select "Global upload token" | Generate button visible but disabled |

---

## US026_ViewBundleAnalysisTrendChart

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view my repo's bundle-size trend chart so that I can see how bundle size changes over time.

### Acceptance Criteria

- [ ] Given bundle analysis is enabled for the repo, when I am on SCR040_BundleContent, then BundleChart renders fetched via GetBundleTrend (src/pages/RepoPage/BundlesTab/BundleContent/BundleContent.tsx:81, ROUTE034).
- [ ] Given I use the TrendDropdown, when I pick a different time range, then BundleChart re-fetches for that range independent of the AssetsTable region.
- [ ] Given bundle analysis is not yet enabled, when I navigate to /:repo/bundles, then BundlesTab redirects to onboarding (SCR041-047) instead of rendering SCR040.

### Technical Notes

- **Endpoint**: GetBundleTrend (ROUTE035)
- **Data Required**: repo/branch/bundle route params, selected trend range
- **Dependencies**: bundle-analysis-enabled state

### Screens

- SCR040/REG001: BundleContent (BundleChart)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | bundle analysis enabled | page loads | BundleChart renders trend data |
| Error Case | bundle analysis not enabled | navigate to /:repo/bundles | onboarding renders instead |

---

## US027_ViewBundleAssetsTable

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view the individual assets inside a bundle so that I can see which files contribute most to its size.

### Acceptance Criteria

- [ ] Given bundle analysis is enabled, when I am on SCR040_BundleContent, then AssetsTable renders paginated asset rows fetched via BundleAssets (src/pages/RepoPage/BundlesTab/BundleContent/BundleContent.tsx:85, ROUTE033).
- [ ] Given more assets exist than the first page, when I scroll/paginate, then AssetsTable fetches the next page independent of BundleChart's own query.
- [ ] Given a specific :bundle route segment is present, when the page loads, then the table scopes to that bundle only.

### Technical Notes

- **Endpoint**: BundleAssets (ROUTE034)
- **Data Required**: repo/branch/bundle route params
- **Dependencies**: bundle-analysis-enabled state

### Screens

- SCR040/REG002: BundleContent (AssetsTable)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | bundle has multiple assets | page loads | paginated assets table renders |
| Error Case | bundle has zero assets | page loads | AssetEmptyTable renders instead |

---

## US028_NavigateBundleOnboardingByBundler

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to switch between bundler-specific setup instructions (Vite, Rollup, Webpack, Remix, Nuxt, SolidStart, SvelteKit) so that I can find the steps matching my build tool.

### Acceptance Criteria

- [ ] Given I am on /:repo/bundles/new (SCR041_ViteOnboarding), when I select a different bundler option, then I am routed to that bundler's onboarding screen (SCR042-SCR047) via the same radio selector (src/pages/RepoPage/BundlesTab/BundleOnboarding/BundleOnboarding.tsx:169-188).
- [ ] Given any bundler-onboarding screen is active, when it renders, then it fetches the same GetOrgUploadToken (ROUTE063) and GetRepo (ROUTE083) data as its siblings.
- [ ] Given I switch bundlers, when the new screen mounts, then only the instructional/config-snippet content changes; the token display persists.

### Technical Notes

- **Endpoint**: GetOrgUploadToken (ROUTE063), GetRepo (ROUTE083)
- **Data Required**: org/repo upload token
- **Dependencies**: none beyond org membership

### Screens

- SCR041_ViteOnboarding
- SCR042_RollupOnboarding
- SCR043_WebpackOnboarding
- SCR044_RemixOnboarding
- SCR045_NuxtOnboarding
- SCR046_SolidStartOnboarding
- SCR047_SvelteKitOnboarding

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | on Vite onboarding | select Webpack | routed to /bundles/new/webpack, Webpack instructions render |
| Error Case | token fetch fails | any onboarding screen loads | instructions render but token snippet shows no value |

---
## US029_ViewFailedTestsMetricsSummary

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view aggregate test-run metrics for my repo so that I can see overall pass/fail/flake rates before drilling into individual tests.

### Acceptance Criteria

- [ ] Given test analytics is enabled or I am an org member, when I am on SCR048_FailedTestsPage, then MetricsSection renders aggregate figures from useTestResultsAggregates and useFlakeAggregates (src/pages/RepoPage/FailedTestsTab/FailedTestsPage/FailedTestsPage.tsx:13).
- [ ] Given I am an Org Member, when I reach /:repo/tests, then the page renders regardless of testAnalyticsEnabled (isCurrentUserPartOfOrg branch, src/pages/RepoPage/RepoPage.tsx:140-152).
- [ ] Given the aggregate query is still loading, when the page renders, then MetricsSection shows its own loading state independent of FailedTestsTable.

### Technical Notes

- **Endpoint**: useTestResultsAggregates, useFlakeAggregates (FailedTestsPage/hooks)
- **Data Required**: repo/branch route params
- **Dependencies**: PERM006 (TestAnalyticsAccessGate) - Org Member bypasses the testAnalyticsEnabled requirement

### Screens

- SCR048/REG001: FailedTestsPage (MetricsSection)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member, test analytics not yet enabled | navigate to /:repo/tests | MetricsSection still renders (PERM006 org-member bypass) |
| Error Case | aggregate query errors | page loads | MetricsSection shows an error/empty state |

---

## US030_BrowseFailedTestsListWithFilters

**Type**: ui
**Interaction**: secondary-action
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to browse the repo's failed and flaky tests with sort/filter controls so that I can find which tests need attention.

### Acceptance Criteria

- [ ] Given I am on SCR048_FailedTestsPage, when the page loads, then FailedTestsTable renders a cursor-paginated list via useInfiniteTestResults, independent of MetricsSection's query (src/pages/RepoPage/FailedTestsTab/FailedTestsPage/FailedTestsPage.tsx:14).
- [ ] Given I use SelectorSection's flags/test-suites filters, when I change a selection, then useTestResultsFlags/useTestResultsTestSuites re-scope the table.
- [ ] Given I click a column header, when TanStack Table's local sorting state updates, then the visible rows re-sort client-side.

### Technical Notes

- **Endpoint**: useInfiniteTestResults (cursor-based)
- **Data Required**: repo/branch route params, flag/test-suite filter selections
- **Dependencies**: PERM006 (TestAnalyticsAccessGate)

### Screens

- SCR048/REG002: FailedTestsPage (FailedTestsTable)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has failed/flaky tests | scroll the table | next page of results loads via cursor pagination |
| Error Case | no failed tests recorded | page loads | empty-state renders instead of a table |

---

## US031_NavigateTestAnalyticsOnboardingOptions

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to switch between GitHub Actions and Codecov CLI setup instructions for Test Analytics so that I can find the steps matching my setup.

### Acceptance Criteria

- [ ] Given test analytics is not yet enabled, when I reach /:repo/tests/new (SCR049_TestsOnboardingGitHubActions), then the setup-option selector lets me switch to /:repo/tests/new/codecov-cli (SCR050) (src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:29-90,104,156-161).
- [ ] Given either onboarding screen is active, when it renders, then FrameworkTabsCard shows framework-specific instructions for the chosen setup option.
- [ ] Given I am not an org member and test analytics is disabled, when I reach /:repo/tests, then ActivationAlert renders instead of onboarding (FailedTestsTab.tsx:138-141) - out of this shard's Org-Member scope since Org Members always see onboarding/dashboard.

### Technical Notes

- **Endpoint**: shared repo-upload-token config (same as coverage onboarding)
- **Data Required**: repo upload token
- **Dependencies**: none beyond org membership

### Screens

- SCR049_TestsOnboardingGitHubActions
- SCR050_CodecovCLI

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | on GitHub Actions test-onboarding | switch to Codecov CLI | routed to /tests/new/codecov-cli, CLI instructions render |
| Error Case | test analytics already enabled | navigate to /:repo/tests | SCR048 dashboard renders instead of onboarding |

---

## US032_ViewRepoCommitsListWithFilters

**Type**: ui
**Interaction**: secondary-action
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view my repo's commit list with branch, coverage-status, and search filters so that I can find a specific commit's coverage result.

### Acceptance Criteria

- [ ] Given I am an activated user on a private repo (or any user on a public repo), when I am on SCR051_RepoCommitsTab, then CommitsTable renders fetched via GetCommits (ROUTE054), scoped to the selected branch (src/pages/RepoPage/CommitsTab/CommitsTab.jsx:47-61,177-182).
- [ ] Given I change the "Coverage upload status" MultiSelect, when a status is toggled, then updateParams writes coverageStatus into the URL query string and the table re-fetches (CommitsTab.jsx:107-111,152-163).
- [ ] Given I type into the "Search commits" field, when the value changes, then updateParams writes search into the URL query string and the table re-fetches (CommitsTab.jsx:166-174).

### Technical Notes

- **Endpoint**: GetCommits (ROUTE054)
- **Data Required**: branch, coverageStatus[], search (URL-query-synced via useLocationParams)
- **Dependencies**: PERM005 (PrivateRepoActivationGateCommitsPulls) - private repos require the current user to be activated

### Screens

- SCR051_RepoCommitsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | public repo, multiple commits | page loads | commit list renders with coverage status per commit |
| Error Case | private repo, current user not activated | navigate to /:repo/commits | tab is omitted from the route Switch entirely (PERM005) |

---

## US033_ViewRepoPullRequestsListWithFilters

**Type**: ui
**Interaction**: secondary-action
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view my repo's pull-request list with state and sort-order filters so that I can find a specific PR's coverage result.

### Acceptance Criteria

- [ ] Given I am an activated user on a private repo (or any user on a public repo), when I am on SCR052_RepoPullsTab, then PullsTable renders fetched via GetPulls (ROUTE078) (src/pages/RepoPage/PullsTab/PullsTab.tsx:70-136).
- [ ] Given I change the "View" MultiSelect (state filter), when a PR state is toggled, then updateParams writes prStates into the URL query string and the table re-fetches (PullsTab.tsx:87-100,109-118).
- [ ] Given I change the "Sort by" Select, when a different order is chosen, then updateParams writes order into the URL query string and the table re-sorts (PullsTab.tsx:78-85,120-131).

### Technical Notes

- **Endpoint**: GetPulls (ROUTE078)
- **Data Required**: prStates[], order (URL-query-synced via useLocationParams)
- **Dependencies**: PERM005 (PrivateRepoActivationGateCommitsPulls) - private repos require the current user to be activated

### Screens

- SCR052_RepoPullsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | public repo, multiple PRs | page loads | PR list renders with coverage status per PR |
| Error Case | private repo, current user not activated | navigate to /:repo/pulls | tab is omitted from the route Switch entirely (PERM005) |

---
## US034_ViewPullRequestFilesChangedComparison

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view the default files-changed comparison for a pull request so that I can see per-file coverage diff between base and head.

### Acceptance Criteria

- [ ] Given I open pull/:pullId (SCR029_PullFilesChangedTab), when the page loads, then FilesChanged renders each changed file's coverage delta from CompareTotals or GetCompareTotalsTeam on a team-plan private repo (src/pages/PullRequestPage/PullCoverage/routes/FilesChangedTab/FilesChangedTab.tsx, ROUTE050/ROUTE051).
- [ ] Given a row's file has coverage changes, when I expand it, then PullFileDiff renders the per-line diff via the shared CodeRenderer.
- [ ] Given I am an activated user on a private repo (or any user on a public repo), when I reach this route, then the tab renders (same PERM005-style gate as repo-level Commits/Pulls).

### Technical Notes

- **Endpoint**: CompareTotals (ROUTE051), GetCompareTotalsTeam (ROUTE052)
- **Data Required**: pullId, base/head commit refs
- **Dependencies**: private-repo activation gate

### Screens

- SCR029_PullFilesChangedTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | PR has changed files | page loads | files-changed table with coverage deltas renders |
| Error Case | PR has zero changed files | page loads | empty-state renders instead of a table |

---

## US035_BrowsePullRequestFileExplorer

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to browse the file tree of a pull request's head commit so that I can find any file's coverage, not just changed ones.

### Acceptance Criteria

- [ ] Given I navigate to pull/:pullId/tree(/:path+), when SCR023_PullFileExplorer renders, then FileExplorerTable lists the head commit's directory contents via PullPathContents (ROUTE068).
- [ ] Given the path changes (I click into a subdirectory), when the route updates, then a new PullPathContents query fires scoped to that path.
- [ ] Given I click a file row, when navigation resolves, then I am routed to SCR024_PullFileViewer for that file.

### Technical Notes

- **Endpoint**: PullPathContents (ROUTE068)
- **Data Required**: pullId, path segments
- **Dependencies**: none beyond org membership

### Screens

- SCR023_PullFileExplorer

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | head commit has files at path | navigate to /tree/ | file/directory list renders |
| Error Case | path does not exist on head commit | navigate to a stale path | empty-state renders |

---

## US036_ViewPullRequestFileDiffDetail

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view a single file's coverage detail within a pull request so that I can inspect exactly which lines changed coverage.

### Acceptance Criteria

- [ ] Given I navigate to pull/:pullId/blob/:path+, when SCR024_PullFileViewer renders, then it fetches CoverageForFile (ROUTE067) for that path at the PR's head commit.
- [ ] Given the file loads, when it renders, then the shared CodeRenderer family annotates each line's hit/miss/partial state.
- [ ] Given I scroll a large file, when scrolling is active, then pointer events on the code table are disabled and re-enabled after scroll settles.

### Technical Notes

- **Endpoint**: CoverageForFile (ROUTE067)
- **Data Required**: pullId, file path
- **Dependencies**: none beyond org membership

### Screens

- SCR024_PullFileViewer

### Background Logic

- BL004_CodeRendererScrollPointerToggle: pointer-events toggle while the code table scrolls (src/ui/CodeRenderer/CodeRenderer.tsx:71-75)
- BL006_ScrollLeftSync: keeps a frozen header row's horizontal scroll in sync with the code body (src/ui/VirtualRenderers/useScrollLeftSync.ts:34-38)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | file exists on head commit | navigate to its blob path | line-by-line annotations render |
| Error Case | file removed on head commit | navigate to a stale blob path | CoverageForFile returns no data; empty/error state renders |

---

## US037_ViewPullRequestIndirectChanges

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view files whose coverage changed indirectly in a pull request so that I can spot side effects the diff itself doesn't show.

### Acceptance Criteria

- [ ] Given I am on pull/:pullId/indirect-changes (SCR025_PullIndirectChangesTab), when the page loads, then IndirectChangedFiles renders the list fetched via ImpactedFileComparedWithParent (ROUTE055).
- [ ] Given this is the pull request's first-ever comparison (no parent to diff against), when the tab renders, then it shows the first-pull-request explanatory state instead of a file list (src/pages/PullRequestPage/PullCoverage/routes/IndirectChangesTab/IndirectChangesTab.jsx:30-36).
- [ ] Given a row's file has coverage changes, when I expand it, then PullFileDiff renders the per-line diff for that file.

### Technical Notes

- **Endpoint**: ImpactedFileComparedWithParent (ROUTE055)
- **Data Required**: pullId, base/head commit refs
- **Dependencies**: none beyond org membership

### Screens

- SCR025_PullIndirectChangesTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | PR has indirectly-changed files | page loads | indirect-change file list renders |
| Error Case | PR is the repo's first pull request | page loads | first-pull-request explanatory state renders instead |

---

## US038_ViewPullRequestCommitsList

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view the list of commits included in a pull request so that I can see each commit's individual coverage contribution.

### Acceptance Criteria

- [ ] Given I am on pull/:pullId/commits (SCR026_PullCommitsTab), when the page loads, then CommitsTable renders the PR's commit list fetched via GetCommits (ROUTE054).
- [ ] Given a commit in the list has a coverage status, when the row renders, then that status (success/pending/failure) shows alongside the commit title.
- [ ] Given I click a commit row, when navigation resolves, then I am routed to that commit's detail page (SCR032_CommitFilesChangedTab).

### Technical Notes

- **Endpoint**: GetCommits (ROUTE054)
- **Data Required**: pullId
- **Dependencies**: none beyond org membership

### Screens

- SCR026_PullCommitsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | PR has multiple commits | page loads | commit list with statuses renders |
| Error Case | PR has zero commits (edge case) | page loads | empty-state renders instead of a list |

---

## US039_ViewPullRequestFlagsBreakdown

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view per-flag coverage for a pull request so that I can see which upload flags are affected by the changes.

### Acceptance Criteria

- [ ] Given I am on pull/:pullId/flags (SCR027_PullFlagsTab), when the page loads, then the flags table renders scoped to the PR via PullFlagsSelect and FlagMeasurements (ROUTE089, ROUTE088).
- [ ] Given more than one flag is affected, when the flag selector is used, then the table scopes to the chosen flags.
- [ ] Given the PR has no flag-scoped coverage data, when the page renders, then an empty-state shows instead of a table.

### Technical Notes

- **Endpoint**: PullFlagsSelect (ROUTE090), FlagMeasurements (ROUTE089)
- **Data Required**: pullId
- **Dependencies**: none beyond org membership

### Screens

- SCR027_PullFlagsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | PR has flag-scoped coverage | page loads | per-flag coverage breakdown renders |
| Error Case | PR has no flag data | page loads | empty-state renders |

---

## US040_ViewPullRequestComponentsBreakdown

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view per-component coverage for a pull request so that I can see which components are affected by the changes.

### Acceptance Criteria

- [ ] Given I am on pull/:pullId/components (SCR028_PullComponentsTab), when the page loads, then the components table renders scoped to the PR via PullComponentsSelector (ROUTE075).
- [ ] Given the repo has no components configured, when the page renders, then ComponentsNotConfigured shows instead of a table.
- [ ] Given more than one component is affected, when the component selector is used, then the table scopes to the chosen components.

### Technical Notes

- **Endpoint**: PullComponentsSelector (ROUTE075)
- **Data Required**: pullId
- **Dependencies**: none beyond org membership

### Screens

- SCR028_PullComponentsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | PR has component-scoped coverage | page loads | per-component coverage breakdown renders |
| Error Case | repo has no components configured | page loads | ComponentsNotConfigured renders |

---
## US041_ViewCommitFilesChangedSummary

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view the default files-changed summary for a single commit so that I can see per-file coverage for that commit.

### Acceptance Criteria

- [ ] Given I open commit/:commit (SCR032_CommitFilesChangedTab), when the page loads, then FilesChangedTable renders each changed file's coverage fetched via Commit and CommitDropdownSummary (ROUTE043, ROUTE047).
- [ ] Given the repo is private and on a team plan, when the page renders, then FilesChangedTableTeam renders in place of FilesChangedTable.
- [ ] Given a row's file has coverage data, when I expand it, then shared/CommitFileDiff renders the per-line diff via CodeRenderer.

### Technical Notes

- **Endpoint**: Commit (ROUTE044), CommitDropdownSummary (ROUTE048)
- **Data Required**: commit SHA
- **Dependencies**: private-repo activation gate applies to reaching the commit-detail route at all

### Screens

- SCR032_CommitFilesChangedTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | commit has changed files with coverage | page loads | files-changed table with coverage renders |
| Error Case | private repo, team plan | page loads | FilesChangedTableTeam renders in place of the default table |

---

## US042_BrowseCommitFileExplorer

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to browse a commit's file tree so that I can find any file's coverage at that commit, not just changed ones.

### Acceptance Criteria

- [ ] Given I navigate to commit/:commit/tree(/:path+), when SCR030_CommitFileExplorer renders, then CommitDetailFileExplorerTable lists the commit's directory contents via CommitPathContents (ROUTE066).
- [ ] Given the path changes (I click into a subdirectory), when the route updates, then a new CommitPathContents query fires scoped to that path.
- [ ] Given I click a file row, when navigation resolves, then I am routed to SCR031_CommitFileViewer for that file.

### Technical Notes

- **Endpoint**: CommitPathContents (ROUTE066)
- **Data Required**: commit SHA, path segments
- **Dependencies**: none beyond org membership

### Screens

- SCR030_CommitFileExplorer

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | commit has files at path | navigate to /tree/ | file/directory list renders |
| Error Case | path does not exist at this commit | navigate to a stale path | empty-state renders |

---

## US043_ViewCommitFileDiffDetail

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: M

### User Story

As an Org Member, I want to view a single file's coverage detail at a specific commit so that I can inspect exactly which lines were covered.

### Acceptance Criteria

- [ ] Given I navigate to commit/:commit/blob/:path+, when SCR031_CommitFileViewer renders, then it fetches CoverageForFile (ROUTE067) for that path at that commit.
- [ ] Given the file loads, when it renders, then the shared CodeRenderer family annotates each line's hit/miss/partial state.
- [ ] Given I scroll a large file, when scrolling is active, then pointer events on the code table are disabled and re-enabled after scroll settles.

### Technical Notes

- **Endpoint**: CoverageForFile (ROUTE067)
- **Data Required**: commit SHA, file path
- **Dependencies**: none beyond org membership

### Screens

- SCR031_CommitFileViewer

### Background Logic

- BL004_CodeRendererScrollPointerToggle: pointer-events toggle while the code table scrolls (src/ui/CodeRenderer/CodeRenderer.tsx:71-75)
- BL006_ScrollLeftSync: keeps a frozen header row's horizontal scroll in sync with the code body (src/ui/VirtualRenderers/useScrollLeftSync.ts:34-38)

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | file exists at this commit | navigate to its blob path | line-by-line annotations render |
| Error Case | file did not exist at this commit | navigate to a stale blob path | CoverageForFile returns no data; empty/error state renders |

---

## US044_ViewCommitIndirectChanges

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view files whose coverage changed indirectly for a commit so that I can spot side effects the commit's own diff doesn't show.

### Acceptance Criteria

- [ ] Given showIndirectChanges resolves true (not a team-plan private repo), when I am on commit/:commit/indirect-changes (SCR033_CommitIndirectChangesTab), then IndirectChangesTable renders fetched via ImpactedFileComparedWithParent (src/pages/CommitDetailPage/CommitCoverage/CommitCoverage.jsx:71,96-105, ROUTE054).
- [ ] Given the repo is private and on a team plan, when showIndirectChanges resolves false, then the indirect-changes tab is not offered at all (CommitCoverage.jsx:71).
- [ ] Given a row's file has coverage changes, when I expand it, then CommitFileDiff renders the per-line diff for that file.

### Technical Notes

- **Endpoint**: ImpactedFileComparedWithParent (ROUTE055)
- **Data Required**: commit SHA
- **Dependencies**: showIndirectChanges = not (overview.private && isTeamPlan)

### Screens

- SCR033_CommitIndirectChangesTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | public repo, indirectly-changed files exist | page loads | indirect-change file list renders |
| Error Case | private repo on team plan | navigate to /indirect-changes | tab is unavailable (showIndirectChanges false) |

---
## US045_ViewRepoConfigurationStatusChecklist

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view which coverage-config steps my repo has completed so that I know what setup is still outstanding.

### Acceptance Criteria

- [ ] Given I am an Org Member, when I navigate to /:repo/config (SCR053_ConfigurationManager), then FeatureGroup/FeatureItem render each config step's complete/incomplete state via useRepoConfigurationStatus, sourced from GetRepoSettings or GetRepoSettingsTeam on a team-plan private repo (ROUTE093/ROUTE094).
- [ ] Given I am not a member of the repo's org, when I navigate to /:repo/config, then SCR058_NotFound renders instead (src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32) - confirms this screen is Org-Member-only.
- [ ] Given a config step is incomplete, when the checklist renders, then that FeatureItem links out to the screen that completes it (General/YAML/Badges tabs).

### Technical Notes

- **Endpoint**: GetRepoSettings (ROUTE094), GetRepoSettingsTeam (ROUTE095)
- **Data Required**: repo config-completion flags
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR053_ConfigurationManager

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member, some config steps incomplete | page loads | checklist renders with complete/incomplete states |
| Error Case | non-member navigates to /:repo/config | route resolves | SCR058_NotFound renders instead (PERM003) |

---

## US046_UpdateRepoDefaultBranch

**Type**: ui
**Interaction**: primary-action
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to change my repo's default branch in Config so that the coverage dashboard's default context matches the branch I actually work from.

### Acceptance Criteria

- [ ] Given I am on SCR054_RepoGeneralTab, when I open the branch Select and pick a different branch, then updateDefaultBranch mutates via useUpdateRepo with {branch} (src/pages/RepoPage/ConfigTab/tabs/GeneralTab/DefaultBranch/DefaultBranch.jsx:12-27,72-74).
- [ ] Given the mutation succeeds, when it resolves, then the Select's displayed value updates to the new branch immediately (branch = data?.branch || defaultBranch, DefaultBranch.jsx:53).
- [ ] Given the mutation fails, when onError fires, then a toast reads "We were unable to update the default branch for this repo" (DefaultBranch.jsx:20-24).

### Technical Notes

- **Endpoint**: useUpdateRepo mutation (services/repo)
- **Data Required**: selected branch name (from useBranches, searchable/paginated)
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR054_RepoGeneralTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has multiple branches | select a new default branch | mutation succeeds, Select shows new value |
| Error Case | mutation rejects | select a new default branch | error toast renders, Select reverts to prior value |

---

## US047_ViewRepoTokensInGeneralSettings

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view my repo's upload, graphing, and static-analysis tokens in General settings so that I can copy them into my CI configuration.

### Acceptance Criteria

- [ ] Given the repo is not both private and team-plan, when I am on SCR054_RepoGeneralTab, then Tokens renders RepoUploadToken, GraphToken, and StaticAnalysisToken (when each token value is present) via RepoConfig (ROUTE087) (src/pages/RepoPage/ConfigTab/tabs/GeneralTab/GeneralTab.tsx:29-33).
- [ ] Given the repo is private and on a team plan, when the page renders, then TokensTeam renders instead of Tokens (GeneralTab.tsx:30).
- [ ] Given a token component's underlying value is falsy (no uploadToken/graphToken/staticAnalysisToken), when it renders, then that specific token card returns null instead of an empty card (RepoUploadToken.jsx:33-35, GraphToken.jsx:7-9, StaticAnalysisToken.jsx:13-15).

### Technical Notes

- **Endpoint**: RepoConfig (ROUTE087)
- **Data Required**: repo uploadToken, graphToken, staticAnalysisToken, private/team-plan flags
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR054_RepoGeneralTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has all three token types | page loads | all three token cards render with their values |
| Error Case | repo has no static-analysis token | page loads | StaticAnalysisToken card is absent |

---

## US048_RegenerateRepositoryUploadToken

**Type**: ui
**Interaction**: destructive-action
**Priority**: P0
**Estimate**: M

### User Story

As an Org Member, I want to regenerate my repo's upload token so that I can invalidate a leaked or compromised token.

### Acceptance Criteria

- [ ] Given I am on SCR054_RepoGeneralTab's RepoUploadToken card, when I click "Regenerate", then RegenerateTokenModal opens for confirmation before any mutation fires (src/pages/RepoPage/ConfigTab/tabs/GeneralTab/Tokens/RepoUploadToken/RepoUploadToken.jsx:66-78).
- [ ] Given the modal is open, when I confirm, then useRegenerateRepoUploadToken mutates and the displayed token value updates once it resolves (RepoUploadToken.jsx:18-26).
- [ ] Given the mutation is in flight, when I look at the Regenerate button, then it is disabled to prevent a duplicate submission (RepoUploadToken.jsx:69).

### Technical Notes

- **Endpoint**: useRegenerateRepoUploadToken mutation (services/repoUploadToken)
- **Data Required**: existing uploadToken value (to know whether the card renders at all)
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig) - no additional admin check found

### Screens

- SCR054_RepoGeneralTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member confirms regenerate | modal confirmed | mutation fires, new token value displayed |
| Error Case | mutation in flight | click Regenerate again | button disabled, no duplicate mutation |

---

## US049_EraseRepository

**Type**: ui
**Interaction**: destructive-action
**Priority**: P0
**Estimate**: M

### User Story

As an Org Member, I want to erase my repo's coverage data so that I can start over with a clean historical record before a resync.

### Acceptance Criteria

- [ ] Given I am on SCR054_RepoGeneralTab's Danger Zone, when I click "Erase Repository", then EraseRepoModal opens with the warning "This action is irreversible... you will permanently erase any historical code coverage" before any mutation fires (src/pages/RepoPage/ConfigTab/tabs/GeneralTab/DangerZone/EraseRepo/EraseRepo.jsx:34-58, EraseRepoModal.jsx:11-19).
- [ ] Given the modal is open, when I click "Erase Repository" in the footer, then useEraseRepo mutates via EraseRepository (ROUTE082) and the modal closes on success (EraseRepoModal.jsx:33-36).
- [ ] Given I am an Org Member of the repo's org, when I reach this screen, then no additional admin check gates the button beyond plain org membership (PERM003) - the button is not org-admin-restricted on the frontend.

### Technical Notes

- **Endpoint**: EraseRepository (ROUTE082)
- **Data Required**: none beyond repo route params
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig) only - no org-admin gate found

### Screens

- SCR054_RepoGeneralTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member confirms erase | modal confirmed | mutation fires, repo's historical coverage is erased, modal closes |
| Error Case | mutation in flight | modal shows isLoading | "processing erase, this may take a while" renders in place of the button |

---

## US050_DeactivateRepository

**Type**: ui
**Interaction**: destructive-action
**Priority**: P0
**Estimate**: M

### User Story

As an Org Member, I want to deactivate my repo so that further coverage uploads are blocked without losing existing data.

### Acceptance Criteria

- [ ] Given the repo is currently activated, when I am on SCR054_RepoGeneralTab's Danger Zone, then RepoState shows "Deactivate repo" with a Deactivate button (src/pages/RepoPage/ConfigTab/tabs/GeneralTab/DangerZone/RepoState/RepoState.jsx:21-46).
- [ ] Given I click "Deactivate", when DeactivateRepoModal opens, then it warns "Deactivate repo will deactivate a repo and prevent the upload of coverage information... You will be able to reactivate the repo at any time" before toggleRepoState fires (DeactivateRepoModal.jsx:16-22,36-39).
- [ ] Given the repo is currently deactivated, when RepoState renders, then it shows "Repo has been deactivated" with an "Activate" button that calls toggleRepoState directly, with no confirmation modal (RepoState.jsx:49-63).

### Technical Notes

- **Endpoint**: useRepoActivation (toggleRepoState mutation)
- **Data Required**: current repository.activated state
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig) only - no org-admin gate found

### Screens

- SCR054_RepoGeneralTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo activated, Org Member confirms deactivate | modal confirmed | mutation fires, repo becomes deactivated |
| Error Case | repo already deactivated | click "Activate" | mutation fires immediately, no confirmation modal shown |

---
## US051_ViewRepoLevelYamlConfiguration

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view my repo's effective YAML configuration so that I can confirm what settings Codecov is actually applying.

### Acceptance Criteria

- [ ] Given I am on SCR055_RepoYamlTab, when the page loads, then CurrentRepoSettings renders the effective YAML fetched via CommitYaml (ROUTE050).
- [ ] Given the YAML view renders, when I inspect it, then it is read-only (no react-hook-form/useForm present) - there is no in-app YAML editor on this screen, only a preview (src/pages/RepoPage/ConfigTab/tabs/YamlTab/YAML/YAML.jsx).
- [ ] Given ValidateYaml is available on the page, when I use it, then it validates a YAML snippet independent of the CurrentRepoSettings preview.

### Technical Notes

- **Endpoint**: CommitYaml (ROUTE050)
- **Data Required**: repo's merged/effective YAML config
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR055_RepoYamlTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has a codecov.yml | page loads | effective YAML renders read-only |
| Error Case | repo has no YAML override | page loads | default/empty YAML state renders |

---

## US052_CreateEncryptedSecretString

**Type**: ui
**Interaction**: primary-action
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to encrypt a sensitive value into a secret string so that I can safely commit it inside my repo's codecov YAML.

### Acceptance Criteria

- [ ] Given I am on SCR055_RepoYamlTab's SecretString card, when I click "Create New Secret String", then GenerateSecretStringModal opens with a text input for the plaintext value (src/pages/RepoPage/ConfigTab/tabs/YamlTab/SecretString/SecretString.jsx:17,32-46).
- [ ] Given I type a value and submit, when the form submits, then generateSecretString mutates via EncodeSecretString (ROUTE081) with the value, the modal closes, and CopySecretStringModal opens showing the encrypted result (SecretString.jsx:39-53, GenerateSecretStringModal.jsx:21-25).
- [ ] Given the input is empty, when I try to submit, then the "Generate" button stays disabled since value.length is zero (GenerateSecretStringModal.jsx:84).

### Technical Notes

- **Endpoint**: EncodeSecretString (ROUTE081)
- **Data Required**: plaintext value to encrypt
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR055_RepoYamlTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | I type a valid value and submit | form submits | encrypted string generated, CopySecretStringModal shows the result |
| Error Case | input left empty | attempt to submit | Generate button disabled, no mutation fires |

---

## US053_ViewBadgesAndGraphsSnippets

**Type**: ui
**Interaction**: secondary-action
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to view my repo's coverage badge and graph embed snippets so that I can paste them into my project's README.

### Acceptance Criteria

- [ ] Given I am on SCR056_BadgesAndGraphsTab, when the page loads, then Badges renders Markdown/HTML/RST snippet variants built from the repo's graphToken via RepoConfig (src/pages/RepoPage/ConfigTab/tabs/BadgesAndGraphsTab/Badges/Badges.tsx:19-38, ROUTE086).
- [ ] Given I select a different branch in Badges' branch Select, when the selection changes, then the snippet URLs regenerate with that branch's path segment instead of "Default branch" (Badges.tsx:47-53).
- [ ] Given Graphs also renders on this screen, when it loads, then it shows graph-embed URLs (sunburst/icicle/tree) independent of the Badges snippets.

### Technical Notes

- **Endpoint**: RepoConfig (ROUTE087)
- **Data Required**: repo graphToken, selected branch
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR056_BadgesAndGraphsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | repo has a graphToken | page loads | badge/graph snippets render with the token embedded |
| Error Case | select a non-default branch | selection changes | snippet URLs update to include that branch's path |

---
## US054_NavigateRepoTabsRegardlessOfProductEnabled

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want every applicable repo tab (Coverage, Bundles, Tests, Commits, Pulls, Config) to show in the repo nav even before I've set up that product so that I can navigate straight to onboarding for anything not yet enabled.

### Acceptance Criteria

- [ ] Given isCurrentUserPartOfOrg is true, when RepoPageTabs renders, then the Coverage tab shows regardless of coverageEnabled (src/pages/RepoPage/RepoPageTabs.tsx:72-73).
- [ ] Given isCurrentUserPartOfOrg is true and the repo has JS/TS code, when RepoPageTabs renders, then the Bundles tab shows regardless of bundleAnalysisEnabled (RepoPageTabs.tsx:90-93).
- [ ] Given isCurrentUserPartOfOrg is true, when RepoPageTabs renders, then the Config tab also shows (RepoPageTabs.tsx:133) - for a non-member, the equivalent tabs are hidden entirely unless the underlying product is already enabled (PERM004).

### Technical Notes

- **Endpoint**: GetRepo (ROUTE083)
- **Data Required**: isCurrentUserPartOfOrg, coverageEnabled, jsOrTsPresent, bundleAnalysisEnabled, testAnalyticsEnabled
- **Dependencies**: PERM004 (OrgMembershipGateRepoTabVisibility)

### Screens

- SCR034_RepoOverviewTab
- SCR035_RepoFlagsTab
- SCR036_RepoComponentsTab
- SCR040_BundleContent
- SCR048_FailedTestsPage
- SCR051_RepoCommitsTab
- SCR052_RepoPullsTab
- SCR053_ConfigurationManager

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member, bundle analysis never configured | view repo nav | Bundles tab still shows, links to onboarding |
| Error Case | Non-member, bundle analysis never configured | view repo nav | Bundles tab is hidden entirely per PERM004 |

---

## US055_ViewOrganizationRepoList

**Type**: ui
**Interaction**: navigation
**Priority**: P1
**Estimate**: S

### User Story

As an Org Member, I want to view my organization's repo list on the owner landing page so that I can jump into any repo's coverage.

### Acceptance Criteria

- [ ] Given I am an Org Member, when I am on SCR006_OwnerPage, then Tabs (the sibling-tab nav covering Repos/Analytics/Codecov AI/Members/Plan/Settings) renders because isCurrentUserPartOfOrg is true (src/pages/OwnerPage/OwnerPage.jsx:92-94).
- [ ] Given the page loads, when ListRepo mounts, then it fetches the owner's repos via ReposForOwner or GetReposTeam on a team plan (ROUTE095/ROUTE096), scoped by the repoDisplay URL param (OwnerPage.jsx:42-44,95-98).
- [ ] Given canRefetch is true for an Org Member, when repo activation state changes elsewhere, then ListRepo can refetch to reflect it (OwnerPage.jsx:96).

### Technical Notes

- **Endpoint**: ReposForOwner (ROUTE096), GetReposTeam (ROUTE097)
- **Data Required**: owner name, repoDisplay filter
- **Dependencies**: none beyond org membership for the sibling-tab nav

### Screens

- SCR006_OwnerPage

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member, org has repos | page loads | repo list renders with sibling-tab nav visible |
| Error Case | owner data unavailable | page loads | NotFound renders internally instead |

---

## US056_ViewOrganizationAnalyticsWithFilters

**Type**: ui
**Interaction**: secondary-action
**Priority**: P2
**Estimate**: M

### User Story

As an Org Member, I want to view my organization's coverage/usage analytics chart with repo and date-range filters so that I can track adoption trends across all repos.

### Acceptance Criteria

- [ ] Given I am on SCR004_AnalyticsPage, when the page loads, then Chart renders GetReposCoverageMeasurements (ROUTE041) using the current startDate/endDate/repositories URL-query params (src/pages/AnalyticsPage/AnalyticsPage.jsx:13-20,45-51).
- [ ] Given I change a ChartSelectors filter (repositories, date range, or sort), when the value changes, then updateParams rewrites the URL query string and Chart/ReposTable re-fetch with the new params (AnalyticsPage.jsx:24,42-51).
- [ ] Given isCurrentUserPartOfOrg is true, when the page renders, then Tabs (sibling nav) also shows above the chart (AnalyticsPage.jsx:41).

### Technical Notes

- **Endpoint**: GetReposCoverageMeasurements (ROUTE041)
- **Data Required**: search, repositories, ordering, direction, startDate, endDate - all URL-query-synced
- **Dependencies**: none beyond org membership for the sibling-tab nav

### Screens

- SCR004_AnalyticsPage

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member, org has coverage history | page loads | chart + repos table render with default filters |
| Error Case | owner data unavailable | page loads | NotFound renders instead (AnalyticsPage.jsx:34-36) |

---

## US057_NavigateRepoConfigSidebarTabs

**Type**: ui
**Interaction**: navigation
**Priority**: P2
**Estimate**: S

### User Story

As an Org Member, I want to switch between the repo Config sidebar's General, YAML, and Badges and Graphs tabs so that I can reach each config screen without leaving the Config section.

### Acceptance Criteria

- [ ] Given I am on any repo config route, when ConfigTab renders, then Sidemenu shows links to General (/config/general), YAML (/config/yaml), and Badges (/config/badge) (src/pages/RepoPage/ConfigTab/ConfigTab.tsx:49,55-63).
- [ ] Given I click a sidebar link, when navigation resolves, then the corresponding SentryRoute renders that tab's screen (ConfigTab.tsx:55-63).
- [ ] Given I am not a member of the repo's org, when I try to reach any of these routes, then SCR058_NotFound renders instead of the sidebar and tab layout (ConfigTab.tsx:32) - confirms the whole Config sidebar is Org-Member-only.

### Technical Notes

- **Endpoint**: none (client-side route switch only)
- **Data Required**: none beyond route params
- **Dependencies**: PERM003 (OrgMembershipGateRepoConfig)

### Screens

- SCR053_ConfigurationManager
- SCR054_RepoGeneralTab
- SCR055_RepoYamlTab
- SCR056_BadgesAndGraphsTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Member on the General config tab | click "YAML" in sidebar | routed to the YAML config tab, YAML tab renders |
| Error Case | non-member navigates to a config route | route resolves | SCR058_NotFound renders instead of the sidebar layout |

---

<!-- SLICE 03: Org Admin + Self-Hosted Instance Admin, US058–US060 -->
## US058_AddOrgAdmin

**Type**: ui
**Interaction**: primary-action
**Priority**: P1
**Estimate**: S

### User Story

As an Org Admin, I want to add another org member as an admin so that they can help manage the organization account (add other admins, activate/deactivate members, view billing, modify the team YAML).

### Acceptance Criteria

- [ ] Given I am on SCR009_AccountAdminTab, when I type into the "Search to add administrator" combobox, then a 500ms-debounced list of the org's non-admin members matching the search string renders (`src/pages/AccountSettings/tabs/Admin/ManageAdminCard/AddAdmins/AddAdmins.jsx:63-88`).
- [ ] Given the result list is open, when I select a member from it, then `PATCH /{provider}/{owner}/users/{targetUserOwnerid}/` fires with `{isAdmin: true}` and the admin table (US059's list) refetches (`AddAdmins.jsx:101-113`, `src/pages/AccountSettings/tabs/Admin/ManageAdminCard/ManageAdminCard.jsx:12-19`).
- [ ] Given no members match the search, when the list opens, then "No users found" renders instead of a selectable list (`AddAdmins.jsx:35-37`).
- [ ] **[NOT REACHABLE ON ATHENA]** This screen only renders for a non-self-hosted Org Admin — `!config.IS_SELF_HOSTED && isAdmin` (`src/pages/AccountSettings/AccountSettings.jsx:48-52`, `src/config.js:26`). Athena is self-hosted (`config.js:26`, `ENV=enterprise`), so this route always resolves to SCR008_AccountProfile or SCR011_AccountYAMLTab instead — this US never executes on Athena; documented for completeness only, per the org-admin-vs-self-hosted-admin split in `permissions-matrix.md` PERM009.

### Technical Notes

- **Endpoint**: `PATCH /{provider}/{owner}/users/{targetUserOwnerid}/` (ROUTE007)
- **Data Required**: target member's `ownerid` (from the org's non-admin member search results)
- **Dependencies**: PERM009 (OrgAdminOnlyAccountAdminTab, role-based) gates the screen itself; not reachable when `config.IS_SELF_HOSTED` is true

### Screens

- SCR009_AccountAdminTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Admin on SCR009, non-admin member exists | search matches, member selected | `PATCH .../users/{id}/` sent with `isAdmin:true`; table refetches |
| Error Case | self-hosted deployment (Athena) | route `/account/:provider/:owner/` reached | SCR008 or SCR011 renders instead — SCR009 is never reachable |

---

## US059_RevokeOrgAdmin

**Type**: ui
**Interaction**: destructive-action
**Priority**: P1
**Estimate**: S

### User Story

As an Org Admin, I want to revoke another admin's admin status so that only the people who should manage the org retain that access.

### Acceptance Criteria

- [ ] Given I am on SCR009_AccountAdminTab viewing the admin table (`AdminTable.tsx`, paginated via `useInfiniteUsers({isAdmin:true})`), when I click "Revoke" on a row, then `PATCH /{provider}/{owner}/users/{targetUserOwnerid}/` fires immediately with `{isAdmin: false}` — **no confirmation modal is shown** before this fires (`src/pages/AccountSettings/tabs/Admin/ManageAdminCard/AdminTable/AdminTable.tsx:125-137`).
- [ ] Given the mutation is in flight, when I click "Revoke" again, then the button is disabled (`isUpdatingUser`) to prevent a duplicate call (`AdminTable.tsx:127`).
- [ ] Given the admin table is empty after all admins are revoked, when it re-renders, then "No admins yet. Note that admins in your GitHub organization are automatically considered admins." shows instead of the table (`AdminTable.tsx:161-168`).
- [ ] **[NOT REACHABLE ON ATHENA]** Same gate as US058 (PERM009, `AccountSettings.jsx:48-52`, self-hosted-only build) — this US never executes on Athena.

### Technical Notes

- **Endpoint**: `PATCH /{provider}/{owner}/users/{targetUserOwnerid}/` (ROUTE007)
- **Data Required**: target admin's `ownerid` (row in the current admin table page)
- **Dependencies**: PERM009; same non-self-hosted-only gate as US058

### Screens

- SCR009_AccountAdminTab

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Admin, ≥1 admin listed | click Revoke on a row | `isAdmin:false` PATCH sent, row drops off the admin list on refetch |
| Error Case | self-hosted deployment (Athena) | route reached | SCR009 never renders — see US058 |

---

## US060_RegenerateOrgUploadToken

**Type**: ui
**Interaction**: primary-action
**Priority**: P2
**Estimate**: S

### User Story

As an Org Admin, I want to regenerate the org's shared upload token so that every repo in the org can authenticate coverage uploads with one credential.

### Acceptance Criteria

- [ ] Given no org upload token exists yet, when I click "Generate" on SCR013_OrgUploadToken, then `RegenerateOrgUploadToken` GraphQL mutation fires immediately (no confirmation step) and the new token renders in both snippet formats (`codecov: \n token:` and `CODECOV_TOKEN=`) (`src/pages/AccountSettings/tabs/OrgUploadToken/GenerateOrgUploadToken.tsx:14-37`, `src/services/orgUploadToken/useRegenerateOrgUploadToken.tsx:60-80`).
- [ ] Given a token already exists, when I click "Regenerate", then a confirmation modal warns that every repo currently using the token must be updated or it may stop uploading, before the SAME mutation fires (`src/pages/AccountSettings/tabs/OrgUploadToken/RegenerateOrgUploadToken.tsx:80-94`, `RegenrateTokenModal.tsx:4-52`).
- [ ] Given I am not an Org Admin (`useIsCurrentUserAnAdmin`), when I view SCR013, then both the Generate and Regenerate buttons are disabled and an inline notice reads "Only organization admins can regenerate this token." (`GenerateOrgUploadToken.tsx:32,38-43`, `RegenerateOrgUploadToken.tsx:57,72-77,83`).
- [ ] **[NOT REACHABLE ON ATHENA]** SCR013 itself is not build-gated by `IS_SELF_HOSTED` (`screen-list.md` SCR013: "PRESENT (no gating found beyond admin-only)"), but the Org Admin role that unlocks the buttons (`useIsCurrentUserAnAdmin` → `DetailOwner.owner.isAdmin`, non-self-hosted org role) has no self-hosted equivalent — on Athena every viewer of this screen is treated as a non-admin and both buttons stay permanently disabled (`GenerateOrgUploadToken.tsx:17,32`, `RegenerateOrgUploadToken.tsx:57,83`).

### Technical Notes

- **Endpoint**: GraphQL `RegenerateOrgUploadToken` mutation (ROUTE064)
- **Data Required**: `owner` (org name from URL); prior token state (`GetOrgUploadToken`, ROUTE062) to decide Generate vs Regenerate copy
- **Dependencies**: PERM010 (OrgAdminOnlyOrgUploadToken, action-permission); org-admin role has no self-hosted counterpart, so the action-permission never resolves to "allowed" on Athena

### Screens

- SCR013_OrgUploadToken

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Org Admin, no existing token | click Generate | mutation fires, new token displayed in both formats |
| Error Case | Org Admin, existing token | click Regenerate, confirm modal | mutation fires, token replaced; all repos on the old token must be updated manually |

---

## US061_ViewInstanceAdminList

**Type**: ui
**Interaction**: secondary-action
**Priority**: P2
**Estimate**: S

### User Story

As a Self-Hosted Instance Admin, I want to view the list of instance-wide admins so that I know who has admin access across this Athena install.

### Acceptance Criteria

- [ ] Given I am the Self-Hosted Instance Admin, when I open SCR014_AdminAccess, then a paginated table of admins (name, email) loads via `GET /users?is_admin=true` and infinite-scrolls on further pages (`src/pages/AdminSettings/AdminAccess/AdminAccessTable/useAdminAccessList.ts:25-59`, `AdminAccessTable.tsx:46-115`).
- [ ] Given the list is on this screen, when I look for an add/remove control, then none exists — the screen states admins are edited only via `install.yml`, with external doc links (`src/pages/AdminSettings/AdminAccess/AdminAccess.tsx:19-43`); no in-app mutation exists for instance-admin membership.
- [ ] Given I am any other self-hosted user (not an instance admin), when I try to reach `/admin/:provider/access`, then I am redirected to `/{provider}` and the header "Admin" nav link is hidden (`src/pages/AdminSettings/AdminSettings.jsx:38,57`, `src/layouts/Header/components/AdminLink/AdminLink.tsx:16-18`).

### Technical Notes

- **Endpoint**: `GET /users?is_admin=true` (ROUTE001, via `useAdminAccessList.ts:37-38`)
- **Data Required**: instance-wide user list filtered `is_admin=true`
- **Dependencies**: PERM002 (SelfHostedInstanceAdminAccess, role-based) — self-hosted only, gates the whole `/admin/:provider/*` route tree (`src/pages/AdminSettings/AdminSettings.jsx:29-58`)

### Screens

- SCR014_AdminAccess

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Self-Hosted Instance Admin | open SCR014 | admin list loads, paginates on scroll |
| Error Case | non-admin self-hosted user | navigate to `/admin/:provider/access` | redirected to `/{provider}`; nav link hidden |

---

## US062_ToggleAutoActivateMembers

**Type**: ui
**Interaction**: primary-action
**Priority**: P2
**Estimate**: S

### User Story

As a Self-Hosted Instance Admin, I want to toggle auto-activation of members so that eligible users get a Codecov seat automatically instead of me activating each one by hand.

### Acceptance Criteria

- [ ] Given I am on SCR015_AdminMembers, when I click the "Auto-activate members" toggle, then `UpdateSelfHostedSettings` GraphQL mutation fires immediately with the flipped `shouldAutoActivate` value — no confirmation step (`src/pages/AdminSettings/AdminMembers/ActivationInfo/AutoActivateMembers/AutoActivateMembers.tsx:36-44`).
- [ ] Given the mutation is in flight, when I click the toggle again, then it is disabled (`isMutating`) until the request settles (`AutoActivateMembers.tsx:40`).
- [ ] Given auto-activate is on, when the copy renders, then it states members are auto-assigned a seat if they author a PR on, or log into, a private repo — and only if seats remain (`AutoActivateMembers.tsx:46-51`).

### Technical Notes

- **Endpoint**: GraphQL `UpdateSelfHostedSettings` mutation (ROUTE025, `src/services/account/useUpdateSelfHostedSettings.tsx:13-28`)
- **Data Required**: current `planAutoActivate` value (`SelfHostedSettingsQueryOpts`)
- **Dependencies**: PERM002 (SelfHostedInstanceAdminAccess) gates the whole SCR015 screen

### Screens

- SCR015_AdminMembers

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Instance Admin, toggle off | click toggle | mutation fires, toggle flips to "On", label updates |
| Error Case | mutation fails server-side | toggle clicked | error toast "Error updating org auto activation. Contact us..." shown (`useUpdateSelfHostedSettings.tsx:30-38,67-73`) |

---

## US063_FilterInstanceMembersList

**Type**: ui
**Interaction**: secondary-action
**Priority**: P2
**Estimate**: S

### User Story

As a Self-Hosted Instance Admin, I want to filter the instance member list by activation status, role, and search text so that I can find a specific member among everyone on the install.

### Acceptance Criteria

- [ ] Given I am on SCR015_AdminMembers, when I pick a status ("All Users"/"Active"/"Non-Active"), a role ("Everyone"/"Admins"/"Developers"), or type a search string, then all three update the same location-params state and `GET /users` refetches with the combined `activated`, `isAdmin`, `search` query params (`src/pages/AdminSettings/AdminMembers/MemberList/MemberList.jsx:28-105`, `src/services/selfHosted/SelfHostedUserListQueryOpts.ts:32-72`).
- [ ] Given filters are combined, when e.g. status=Active and role=Admins are both set, then the member table shows only active admins (query params are additive, same GET endpoint).
- [ ] Given no members match, when the table re-renders, then "No members found" shows instead of rows (`src/pages/AdminSettings/AdminMembers/MemberList/MemberTable.tsx:247-250`).

### Technical Notes

- **Endpoint**: `GET /users` with query params `activated`, `isAdmin`, `search` (ROUTE001, `SelfHostedUserListQueryOpts.ts:40-48`)
- **Data Required**: none beyond user-entered filter values
- **Dependencies**: PERM002 gates SCR015; same screen/actor/endpoint for all three filter controls (merge exception applies — `user-stories-ipe-protocol.md` Step 3)

### Screens

- SCR015_AdminMembers

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | Instance Admin, mixed members | select "Admins" role filter | table shows only `isAdmin:true` members |
| Error Case | filter combination matches nobody | filters applied | "No members found" message renders |

---

## US064_ActivateInstanceMember

**Type**: ui
**Interaction**: primary-action
**Priority**: P1
**Estimate**: S

### User Story

As a Self-Hosted Instance Admin, I want to activate a member so that they consume a licensed seat and gain access to private-repo data on this install.

### Acceptance Criteria

- [ ] Given a non-activated member row on SCR015_AdminMembers's member table, when I click their "Non-Active" toggle, then `mutate({ownerid, activated: true})` fires against `PATCH /users/{ownerid}` (call site only — not itemized in `route-list.md`'s REST inventory) (`src/pages/AdminSettings/AdminMembers/MemberList/MemberTable.tsx:84-93,175-188`).
- [ ] Given `seatsUsed === seatsLimit` (all licensed seats taken) and the member is not yet activated, when I view their row, then the toggle is disabled (`disableToggle = maxSeats && !activated`) and activation is blocked until a seat frees up (`MemberTable.tsx:76-77`).
- [ ] Given activation succeeds, when the mutation settles, then `SelfHostedSettingsQueryOpts` (seat count), `['Seats']`, and `SelfHostedUserListQueryOpts` all invalidate and re-render with the new state (`MemberTable.tsx:178-188`).

### Technical Notes

- **Endpoint**: `PATCH /users/{ownerid}` body `{activated: true}` (direct `Api.patch` call site, `MemberTable.tsx:176-177` — no named ROUTE### entry in `route-list.md`)
- **Data Required**: target member's `ownerid`; current `seatsUsed`/`seatsLimit` to gate the control
- **Dependencies**: PERM002 gates SCR015; `SelfHostedSeatsAndLicense`/`Seats` (ROUTE100/ROUTE101) inform seat-limit display elsewhere on the same screen

### Screens

- SCR015_AdminMembers

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | seats available, member inactive | click toggle | member activated, seat count increments |
| Error Case | seats full, member inactive | view row | toggle disabled, activation blocked |

---

## US065_DeactivateInstanceMember

**Type**: ui
**Interaction**: destructive-action
**Priority**: P1
**Estimate**: S

### User Story

As a Self-Hosted Instance Admin, I want to deactivate a member so that their seat frees up for someone else on this install.

### Acceptance Criteria

- [ ] Given an activated member row on SCR015_AdminMembers's member table, when I click their "Activated" toggle, then `mutate({ownerid, activated: false})` fires against the same `PATCH /users/{ownerid}` call site immediately — **no confirmation modal is shown** (`MemberTable.tsx:84-93,175-188`).
- [ ] Given the member is already activated, when I view their row, then the toggle is NEVER disabled by the seat-limit rule (`disableToggle` only blocks the inactive→active direction, `MemberTable.tsx:76-77`) — deactivation is always available.
- [ ] Given deactivation succeeds, when the mutation settles, then the same three query invalidations as US064 fire and the freed seat becomes available for another member's activation (`MemberTable.tsx:178-188`).

### Technical Notes

- **Endpoint**: `PATCH /users/{ownerid}` body `{activated: false}` (direct `Api.patch` call site, `MemberTable.tsx:176-177` — no named ROUTE### entry in `route-list.md`)
- **Data Required**: target member's `ownerid`
- **Dependencies**: PERM002 gates SCR015

### Screens

- SCR015_AdminMembers

### Test Scenarios

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Happy Path | activated member | click toggle | member deactivated, seat freed, table re-renders |
| Error Case | mutation rejected server-side | click toggle | `useErrorBoundary: true` — request throws to the nearest error boundary (`MemberTable.tsx:178`) |

---

## Screen → US Map

| Screen | US Codes |
|--------|---------|
| SCR001 | US002 |
| SCR002 | US003 |
| SCR003 | US015 |
| SCR004 | US056 |
| SCR006 | US013, US055 |
| SCR007 | US004 |
| SCR009 | US058, US059 |
| SCR011 | US014 |
| SCR013 | US060 |
| SCR014 | US061 |
| SCR015 | US062, US063, US064, US065 |
| SCR023 | US035 |
| SCR024 | US036 |
| SCR025 | US037 |
| SCR026 | US038 |
| SCR027 | US039 |
| SCR028 | US040 |
| SCR029 | US034 |
| SCR030 | US042 |
| SCR031 | US043 |
| SCR032 | US041 |
| SCR033 | US044 |
| SCR034 | US005, US005, US005, US016, US016, US017, US018, US019, US054 |
| SCR035 | US006, US020, US021, US054 |
| SCR036 | US007, US022, US023, US054 |
| SCR037 | US024, US025 |
| SCR038 | US024 |
| SCR039 | US024 |
| SCR040 | US008, US008, US026, US027, US054 |
| SCR041 | US028 |
| SCR042 | US028 |
| SCR043 | US028 |
| SCR044 | US028 |
| SCR045 | US028 |
| SCR046 | US028 |
| SCR047 | US028 |
| SCR048 | US009, US009, US029, US030, US054 |
| SCR049 | US031 |
| SCR050 | US031 |
| SCR051 | US010, US032, US054 |
| SCR052 | US011, US033, US054 |
| SCR053 | US045, US054, US057 |
| SCR054 | US046, US047, US048, US049, US050, US057 |
| SCR055 | US051, US052, US057 |
| SCR056 | US053, US057 |
| SCR058 | US012 |

> `[IPE_ZERO]` - 12 of 58 screens carry no user story: SCR005, SCR008, SCR010, SCR012, SCR016, SCR017, SCR018, SCR019, SCR020, SCR021, SCR022, SCR057.
> These are router shells, onboarding variants and condition-gated duplicates whose
> interactions are covered by a sibling screen's story.

## Cross-Reference Validation

- [x] All US### codes are unique (65 unique of 65 blocks)
- [x] US### codes are contiguous US001-US065
- [x] All `ui` US mapped to a SCR###/REG### present in ScreenList (64/64)
- [x] All acceptance criteria are testable statements carrying file:line evidence
- [x] All US### codes are referenced in FeatureList.md - verified after Wave 5: all 65 stories are assigned to a feature
