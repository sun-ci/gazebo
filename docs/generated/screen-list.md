# Screen List

**Project**: Athena (Sun* self-hosted Codecov, frontend fork of codecov/gazebo)
**Generated**: 2026-09-08
**Analysis Scope**: FRONTEND-only SPA, screen_source route-view. Enumerated from route-list.md Frontend Routes/Pages (72 leaf routes) per H1-H6 composite-screen detection, execution order H6 to H4 to H5 to H2 to H3 to H1 to 2-of-3 gate.

**Code Format**: SCR###_NameSlug | SCR###/REG### for region-scoped refs.

**Compaction note**: condensed per-screen block (Type/Route/File/Description/Components/Data/Self-Hosted/Related) instead of the full template's multi-table layout, to honor the 800-line cap over 58 real screens (not the 723 estimated by file-count). All required fields present; only table formatting is compacted.

**Shell exclusion rule applied**: PullRequestPage, CommitDetailPage, RepoPage, ConfigTab, AccountSettings, AdminSettings, PlanPage, BundlesTab, BundleOnboarding, NewRepoTab, FailedTestsTab are router-outlet shells (H6) with navigation-only or redirect-only persistent UI - they do not get their own SCR; only their leaf children do, consistent with route-list.md's own treatment of these as mount gates. HomePageRedirect (src/App.tsx:40-81, inline, no visible UI) is a pure client-side redirector, not a screen.

**BARREL_IMPORT general advisory**: most services/domain imports resolve through a barrel index.ts (export star from ./useX, e.g. src/services/repo/index.ts). This artifact cites the barrel import path as seen at the screen file; Wave 2b (BehaviorLogic) must resolve the barrel to the concrete hook file for each named import.

**Region Guidance**: declared only when at least one independence signal holds (distinct API endpoint, independent loading state, independent scroll container, distinct mutation surface, distinct validation/workflow). See composite-screen-detection.md Composite Hard Guard for the file-cardinality rule this list follows (2+ view files under one route prefix -> one SCR per file, not one composite).

## Screen Index

| Code | Name | Type | Route(s) | File |
|------|------|------|----------|------|
| SCR001 | LoginPage | atomic | /login/:provider, /login | src/pages/LoginPage/LoginPage.jsx |
| SCR002 | SyncProviderPage | atomic | /sync | src/pages/SyncProviderPage/SyncProviderPage.tsx |
| SCR003 | MembersPage | atomic | /members/:provider/:owner | src/pages/MembersPage/MembersPage.jsx |
| SCR004 | AnalyticsPage | atomic | /analytics/:provider/:owner | src/pages/AnalyticsPage/AnalyticsPage.jsx |
| SCR005 | CodecovAIPage | atomic | /codecovai/:provider/:owner | src/pages/CodecovAIPage/CodecovAIPage.tsx |
| SCR006 | OwnerPage | atomic | /:provider/:owner | src/pages/OwnerPage/OwnerPage.jsx |
| SCR007 | EnterpriseLandingPage | atomic | / (self-hosted) | src/pages/EnterpriseLandingPage/EnterpriseLandingPage.tsx |
| SCR008 | AccountProfile | atomic | /account/:provider/:owner/ | src/pages/AccountSettings/tabs/Profile/Profile.jsx |
| SCR009 | AccountAdminTab | atomic | /account/:provider/:owner/ | src/pages/AccountSettings/tabs/Admin/Admin.jsx |
| SCR010 | OktaAccess | atomic | /account/:provider/:owner/okta-access/ | src/pages/AccountSettings/tabs/OktaAccess/OktaAccess.tsx |
| SCR011 | AccountYAMLTab | atomic | /account/:provider/:owner/yaml/ | src/pages/AccountSettings/tabs/YAML/YAML.jsx |
| SCR012 | AccountAccessTab | atomic | /account/:provider/:owner/access/ | src/pages/AccountSettings/tabs/Access/Access.tsx |
| SCR013 | OrgUploadToken | atomic | /account/:provider/:owner/org-upload-token | src/pages/AccountSettings/tabs/OrgUploadToken/OrgUploadToken.tsx |
| SCR014 | AdminAccess | atomic | /admin/:provider/access | src/pages/AdminSettings/AdminAccess/AdminAccess.tsx |
| SCR015 | AdminMembers | atomic | /admin/:provider/users | src/pages/AdminSettings/AdminMembers/AdminMembers.jsx |
| SCR016 | CurrentOrgPlan | atomic | /plan/:provider/:owner | src/pages/PlanPage/subRoutes/CurrentOrgPlan/CurrentOrgPlan.tsx |
| SCR017 | UpgradePlanPage | atomic | /plan/:provider/:owner/upgrade | src/pages/PlanPage/subRoutes/UpgradePlanPage/UpgradePlanPage.jsx |
| SCR018 | InvoicesPage | atomic | /plan/:provider/:owner/invoices | src/pages/PlanPage/subRoutes/InvoicesPage/InvoicesPage.jsx |
| SCR019 | InvoiceDetailsPage | atomic | /plan/:provider/:owner/invoices/:id | src/pages/PlanPage/subRoutes/InvoiceDetailsPage/InvoiceDetail.jsx |
| SCR020 | DowngradePlan | atomic | /plan/:provider/:owner/cancel/downgrade | src/pages/PlanPage/subRoutes/CancelPlanPage/subRoutes/DowngradePlan/DowngradePlan.jsx |
| SCR021 | TeamPlanSpecialOffer | atomic | /plan/:provider/:owner/cancel | src/pages/PlanPage/subRoutes/CancelPlanPage/subRoutes/TeamPlanSpecialOffer/TeamPlanSpecialOffer.tsx |
| SCR022 | SpecialOffer | atomic | /plan/:provider/:owner/cancel | src/pages/PlanPage/subRoutes/CancelPlanPage/subRoutes/SpecialOffer/SpecialOffer.jsx |
| SCR023 | PullFileExplorer | atomic | pull/:pullId/tree/:path+, /tree/ | src/pages/PullRequestPage/PullCoverage/routes/FileExplorer/FileExplorer.tsx |
| SCR024 | PullFileViewer | atomic | pull/:pullId/blob/:path+ | src/pages/PullRequestPage/PullCoverage/routes/FileViewer/FileViewer.jsx |
| SCR025 | PullIndirectChangesTab | atomic | pull/:pullId/indirect-changes | src/pages/PullRequestPage/PullCoverage/routes/IndirectChangesTab/IndirectChangesTab.jsx |
| SCR026 | PullCommitsTab | atomic | pull/:pullId/commits | src/pages/PullRequestPage/PullCoverage/routes/CommitsTab/CommitsTab.tsx |
| SCR027 | PullFlagsTab | atomic | pull/:pullId/flags | src/pages/PullRequestPage/PullCoverage/routes/FlagsTab/FlagsTab.tsx |
| SCR028 | PullComponentsTab | atomic | pull/:pullId/components | src/pages/PullRequestPage/PullCoverage/routes/ComponentsTab/ComponentsTable.tsx |
| SCR029 | PullFilesChangedTab | atomic | pull/:pullId | src/pages/PullRequestPage/PullCoverage/routes/FilesChangedTab/FilesChangedTab.tsx |
| SCR030 | CommitFileExplorer | atomic | commit/:commit/tree/:path+, /tree/ | src/pages/CommitDetailPage/CommitCoverage/routes/CommitDetailFileExplorer/CommitDetailFileExplorer.tsx |
| SCR031 | CommitFileViewer | atomic | commit/:commit/blob/:path+ | src/pages/CommitDetailPage/CommitCoverage/routes/CommitDetailFileViewer/CommitDetailFileViewer.jsx |
| SCR032 | CommitFilesChangedTab | atomic | commit/:commit | src/pages/CommitDetailPage/CommitCoverage/routes/FilesChangedTab/FilesChangedTab.tsx |
| SCR033 | CommitIndirectChangesTab | atomic | commit/:commit/indirect-changes | src/pages/CommitDetailPage/CommitCoverage/routes/IndirectChangesTab/IndirectChangesTab.jsx |
| SCR034 | RepoOverviewTab | composite | /:repo, /tree/:branch(+path), /blob/:ref/:path+ | src/pages/RepoPage/CoverageTab/OverviewTab/OverviewTab.tsx |
| SCR035 | RepoFlagsTab | atomic | /:repo/flags(/:branch) | src/pages/RepoPage/CoverageTab/FlagsTab/FlagsTab.jsx |
| SCR036 | RepoComponentsTab | atomic | /:repo/components(/:branch) | src/pages/RepoPage/CoverageTab/ComponentsTab/ComponentsTab.tsx |
| SCR037 | CoverageOnboardingGitHubActions | atomic | /:repo/new | src/pages/RepoPage/CoverageOnboarding/GitHubActions/GitHubActions.tsx |
| SCR038 | CoverageOnboardingCircleCI | atomic | /:repo/new/circle-ci | src/pages/RepoPage/CoverageOnboarding/CircleCI/CircleCI.tsx |
| SCR039 | CoverageOnboardingOtherCI | atomic | /:repo/new/other-ci | src/pages/RepoPage/CoverageOnboarding/OtherCI/OtherCI.tsx |
| SCR040 | BundleContent | composite | /:repo/bundles(/:branch)(/:bundle) | src/pages/RepoPage/BundlesTab/BundleContent/BundleContent.tsx |
| SCR041 | ViteOnboarding | atomic | /:repo/bundles/new | src/pages/RepoPage/BundlesTab/BundleOnboarding/ViteOnboarding/ViteOnboarding.tsx |
| SCR042 | RollupOnboarding | atomic | /:repo/bundles/new/rollup | src/pages/RepoPage/BundlesTab/BundleOnboarding/RollupOnboarding/RollupOnboarding.tsx |
| SCR043 | WebpackOnboarding | atomic | /:repo/bundles/new/webpack | src/pages/RepoPage/BundlesTab/BundleOnboarding/WebpackOnboarding/WebpackOnboarding.tsx |
| SCR044 | RemixOnboarding | atomic | /:repo/bundles/new/remix-vite | src/pages/RepoPage/BundlesTab/BundleOnboarding/RemixOnboarding/RemixOnboarding.tsx |
| SCR045 | NuxtOnboarding | atomic | /:repo/bundles/new/nuxt | src/pages/RepoPage/BundlesTab/BundleOnboarding/NuxtOnboarding/NuxtOnboarding.tsx |
| SCR046 | SolidStartOnboarding | atomic | /:repo/bundles/new/solidstart | src/pages/RepoPage/BundlesTab/BundleOnboarding/SolidStartOnboarding/SolidStartOnboarding.tsx |
| SCR047 | SvelteKitOnboarding | atomic | /:repo/bundles/new/sveltekit | src/pages/RepoPage/BundlesTab/BundleOnboarding/SvelteKitOnboarding/SvelteKitOnboarding.tsx |
| SCR048 | FailedTestsPage | composite | /:repo/tests(/:branch) | src/pages/RepoPage/FailedTestsTab/FailedTestsPage/FailedTestsPage.tsx |
| SCR049 | TestsOnboardingGitHubActions | atomic | /:repo/tests/new | src/pages/RepoPage/FailedTestsTab/GitHubActions/GitHubActions.tsx |
| SCR050 | CodecovCLI | atomic | /:repo/tests/new/codecov-cli | src/pages/RepoPage/FailedTestsTab/CodecovCLI/CodecovCLI.tsx |
| SCR051 | RepoCommitsTab | atomic | /:repo/commits(/:branch) | src/pages/RepoPage/CommitsTab/CommitsTab.jsx |
| SCR052 | RepoPullsTab | atomic | /:repo/pulls | src/pages/RepoPage/PullsTab/PullsTab.tsx |
| SCR053 | ConfigurationManager | atomic | /:repo/config | src/pages/RepoPage/ConfigTab/tabs/ConfigurationManager/ConfigurationManager.tsx |
| SCR054 | RepoGeneralTab | atomic | /:repo/config/general | src/pages/RepoPage/ConfigTab/tabs/GeneralTab/GeneralTab.tsx |
| SCR055 | RepoYamlTab | atomic | /:repo/config/yaml | src/pages/RepoPage/ConfigTab/tabs/YamlTab/YamlTab.jsx |
| SCR056 | BadgesAndGraphsTab | atomic | /:repo/config/badge | src/pages/RepoPage/ConfigTab/tabs/BadgesAndGraphsTab/BadgesAndGraphsTab.tsx |
| SCR057 | DeactivatedRepo | atomic | /:repo, /:repo/bundles (deactivated state) | src/pages/RepoPage/DeactivatedRepo/DeactivatedRepo.tsx |
| SCR058 | NotFound | atomic | unmatched-path fallback inside the account-settings and repo-config route switches (`src/pages/AccountSettings/AccountSettings.jsx:80`, `src/pages/RepoPage/ConfigTab/ConfigTab.tsx:65`); also rendered by the org-membership guard at `src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32` | src/pages/NotFound/NotFound.jsx |

---
## SCR001_LoginPage
**Type**: atomic | **Route**: `/login/:provider`, `/login` (self-hosted redirects to `/`) - `src/App.tsx:85-94`
**Description**: OAuth-provider login screen; picks up `:provider` from the URL and renders the provider's login button.
**Components**: LoginButton (per-provider OAuth trigger), SessionExpiredBanner (shown when redirected after session expiry)
**Data Displayed**: available login/sync providers - GetLoginProviders (ROUTE056)
**Self-Hosted**: ABSENT - `src/App.tsx:87,92` redirects to `/` when `config.IS_SELF_HOSTED` (`src/config.js:26`)
**Related Screens**: SCR007_EnterpriseLandingPage (self-hosted equivalent entry point)

---

## SCR002_SyncProviderPage
**Type**: atomic | **Route**: `/sync` (exact) - `src/App.tsx:100-104`
**Description**: prompts the user to sync their VCS provider account before continuing.
**Components**: SyncButton (`src/pages/SyncProviderPage/SyncButton.tsx`)
**Data Displayed**: sync status - IsSyncing (ROUTE112), triggers SyncData mutation (ROUTE113)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR006_OwnerPage (post-sync redirect target)

---

## SCR003_MembersPage
**Type**: atomic | **Route**: `/members/:provider/:owner` - `src/App.tsx:126-132`
**Description**: org-admin screen to manage/activate members; non-self-hosted only.
**Components**: MembersActivation (Activation, ChangePlanLink, AutoActivate), MembersList (MembersTable), MissingMemberBanner, Tabs (top nav shared with Analytics/CodecovAI/Owner)
**Data Displayed**: member list/activation state - FlagsSelect-style paginated member query; owner plan/seat data
**Self-Hosted**: ABSENT - `src/pages/MembersPage/MembersPage.jsx:14-15` redirects to `/:provider/:owner` when `config.IS_SELF_HOSTED`
**Related Screens**: SCR006_OwnerPage, SCR004_AnalyticsPage, SCR005_CodecovAIPage (sibling tabs)

---

## SCR004_AnalyticsPage
**Type**: atomic | **Route**: `/analytics/:provider/:owner` (exact) - `src/App.tsx:133-137`
**Description**: org-level analytics/usage charts; renders NotFound internally when data is unavailable (`src/pages/AnalyticsPage/AnalyticsPage.jsx:3`).
**Components**: Chart, ChartSelectors, Tabs (shared sibling nav)
**Data Displayed**: coverage/usage measurements - GetReposCoverageMeasurements (ROUTE041)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR003_MembersPage, SCR005_CodecovAIPage, SCR006_OwnerPage

---

## SCR005_CodecovAIPage
**Type**: atomic | **Route**: `/codecovai/:provider/:owner` (exact) - `src/App.tsx:138-142`
**Description**: Codecov AI app install/configuration screen for the org.
**Components**: CodecovAICommands, ConfiguredRepositories, InstallCodecovAI, LearnMoreBlurb, Tabs (shared sibling nav)
**Data Displayed**: AI app install state - GetCodecovAIAppInstallInfo (ROUTE042), GetCodecovAIInstalledRepos (ROUTE043)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR003_MembersPage, SCR004_AnalyticsPage, SCR006_OwnerPage

---
## SCR006_OwnerPage
**Type**: atomic | **Route**: `/:provider/:owner` (exact) - `src/App.tsx:148-152`
**Description**: org landing page; lists the owner's repos and onboarding banners; renders NotFound internally (`src/pages/OwnerPage/OwnerPage.jsx:5`).
**Components**: HeaderBanners (ExceededUploadsAlert, GithubConfigBanner, ReachingUploadLimitAlert), OnboardingContainerContext, OnboardingOrg, Tabs (TrialReminder)
**Data Displayed**: repo list for owner - ReposForOwner (ROUTE096) / GetReposTeam (ROUTE097)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR034_RepoOverviewTab (drill-down into a repo), SCR003/SCR004/SCR005 (sibling tabs)

---

## SCR007_EnterpriseLandingPage
**Type**: atomic | **Route**: `/` (exact, self-hosted only) - `src/App.tsx:194-198`
**Description**: self-hosted marketing/entry landing page rendered inside `EnterpriseLoginLayout`.
**Components**: ProviderCard, useEnterpriseRedirect hook (auto-redirect once a provider session exists)
**Data Displayed**: configured VCS providers - GetSyncProviders (ROUTE057)
**Self-Hosted**: PRESENT ONLY - `src/App.tsx:194-198`, gated by `config.IS_SELF_HOSTED` (`src/config.js:26`); non-self-hosted renders `HomePageRedirect` instead (not a screen)
**Related Screens**: SCR001_LoginPage (non-self-hosted equivalent)

---

## SCR008_AccountProfile
**Type**: atomic | **Route**: `/account/:provider/:owner/` (exact) - `src/pages/AccountSettings/AccountSettings.jsx:47-49`
**Description**: self-hosted personal profile settings screen (name/email, activation status).
**Components**: ActivationBanner, AdminBanner, NameEmailCard
**Data Displayed**: current user profile - CurrentUser (ROUTE115); UpdateProfile mutation (ROUTE114)
**Self-Hosted**: PRESENT ONLY - reached when `config.IS_SELF_HOSTED && isViewingPersonalSettings` (`AccountSettings.jsx:48-49`, `src/config.js:26`)
**Related Screens**: SCR009_AccountAdminTab (mutually exclusive on same route), SCR011_AccountYAMLTab

---

## SCR009_AccountAdminTab
**Type**: atomic | **Route**: `/account/:provider/:owner/` (exact) - `src/pages/AccountSettings/AccountSettings.jsx:50-51`
**Description**: org-admin account management screen (non-self-hosted admins only).
**Components**: DetailsSection, GithubIntegrationSection, ManageAdminCard (AddAdmins, AdminTable), StudentSection
**Data Displayed**: org admin/member list - `/users` (ROUTE001), `/{provider}/{owner}/users/` (ROUTE006)
**Self-Hosted**: ABSENT - reached only when `!config.IS_SELF_HOSTED && isAdmin` (`AccountSettings.jsx:50-51`)
**Related Screens**: SCR008_AccountProfile (mutually exclusive on same route)

---

## SCR010_OktaAccess
**Type**: atomic | **Route**: `/account/:provider/:owner/okta-access/` (exact) - `AccountSettings.jsx:56-60`
**Description**: Okta SSO configuration screen for enterprise-plan orgs.
**Components**: AdminAuthorizationBanner, OktaConfigForm, hooks, queries
**Data Displayed**: Okta config state (plan-scoped GraphQL queries under `services/account`)
**Self-Hosted**: gated on `data.plan.isEnterprisePlan`, not self-hosted-specific (`AccountSettings.jsx:36,56`)
**Related Screens**: SCR011_AccountYAMLTab, SCR012_AccountAccessTab

---
## SCR011_AccountYAMLTab
**Type**: atomic | **Route**: `/account/:provider/:owner/yaml/` (exact) - `AccountSettings.jsx:61-63`
**Description**: org-level default YAML configuration editor.
**Components**: YamlEditor, SuccessModal
**Data Displayed**: YAML config - YamlConfig (ROUTE117); UpdateYamlConfig mutation (ROUTE116)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR008/SCR009 (default redirect target when neither condition matches, `AccountSettings.jsx:53,76`)

---

## SCR012_AccountAccessTab
**Type**: atomic | **Route**: `/account/:provider/:owner/access/` (exact) - `AccountSettings.jsx:64-68`
**Description**: personal access tokens and active session management.
**Components**: CreateTokenModal, TokensTable, SessionsTable
**Data Displayed**: user tokens/sessions - MySessions (ROUTE015); CreateUserToken (ROUTE017), RevokeUserToken (ROUTE018), DeleteSession (ROUTE016)
**Self-Hosted**: PRESENT only if `HIDE_ACCESS_TAB=false` - gated `!config.IS_SELF_HOSTED || !config.HIDE_ACCESS_TAB` (`AccountSettings.jsx:64`, `src/config.js:34-35`)
**Related Screens**: SCR010_OktaAccess

---

## SCR013_OrgUploadToken
**Type**: atomic | **Route**: `/account/:provider/:owner/org-upload-token` (exact) - `AccountSettings.jsx:69-78`, admin only
**Description**: org-wide upload token generation/regeneration screen.
**Components**: TokenlessSection, RegenerateOrgUploadToken, RegenrateTokenModal, GenerateOrgUploadToken
**Data Displayed**: org upload token - GetOrgUploadToken (ROUTE063); RegenerateOrgUploadToken mutation (ROUTE064)
**Self-Hosted**: PRESENT (no gating found beyond admin-only)
**Related Screens**: SCR011_AccountYAMLTab (redirect target for non-admins, `AccountSettings.jsx:75-76`)

---

## SCR014_AdminAccess
**Type**: atomic | **Route**: `/admin/:provider/access` (exact) - `src/pages/AdminSettings/AdminSettings.jsx:43-45`
**Description**: self-hosted instance-wide access control screen.
**Components**: AdminAccessTable
**Data Displayed**: instance-wide user access list - `/users` (ROUTE001)
**Self-Hosted**: PRESENT ONLY - `src/App.tsx:105-111` gated by `config.IS_SELF_HOSTED`; non-admin redirects to `/{provider}` (`AdminSettings.jsx:57`)
**Related Screens**: SCR015_AdminMembers

---

## SCR015_AdminMembers
**Type**: atomic | **Route**: `/admin/:provider/users` (exact) - `AdminSettings.jsx:46-48`
**Description**: self-hosted instance-wide member/seat activation screen.
**Components**: ActivationInfo (ActivationCount, AutoActivateMembers), MemberList
**Data Displayed**: seat/license usage - SelfHostedSeatsAndLicense (ROUTE101), Seats (ROUTE102)
**Self-Hosted**: PRESENT ONLY - same gate as SCR014
**Related Screens**: SCR014_AdminAccess

---
## SCR016_CurrentOrgPlan
**Type**: atomic | **Route**: `/plan/:provider/:owner` (exact) - `src/pages/PlanPage/PlanPage.tsx:85-87`
**Description**: current billing plan summary for the org (non-self-hosted only).
**Components**: AccountOrgs, BillingDetails (Address, EmailAddress, PaymentCard), CurrentPlanCard (EnterprisePlanCard, FreePlanCard, PaidPlanCard, shared ActionsBilling/PlanPricing), InfoAlertCancellation, InfoMessageStripeCallback, LatestInvoiceCard
**Data Displayed**: plan/billing data - GetPlanData (ROUTE023), Invoice (ROUTE021)
**Self-Hosted**: ABSENT - `PlanPage.tsx:57` redirects to `/{provider}/{owner}` when `config.IS_SELF_HOSTED`
**Related Screens**: SCR017_UpgradePlanPage, SCR018_InvoicesPage, SCR021/SCR022 (cancel flow)

---

## SCR017_UpgradePlanPage
**Type**: atomic | **Route**: `/plan/:provider/:owner/upgrade` (exact) - `PlanPage.tsx:88-90`
**Description**: plan upgrade/checkout screen (Pro/Team/Sentry tiers).
**Components**: PlanDetailsControls, UpgradeDetails (ProPlanDetails, SentryPlanDetails, TeamPlanDetails), UpgradeForm (Controllers per plan type, PlanTypeOptions, UpdateBlurb, UpdateButton, hooks)
**Data Displayed**: available plans - GetAvailablePlans (ROUTE019); Stripe setup intent - CreateStripeSetupIntent (ROUTE020)
**Self-Hosted**: ABSENT (same PlanPage family gate)
**Related Screens**: SCR016_CurrentOrgPlan

---

## SCR018_InvoicesPage
**Type**: atomic | **Route**: `/plan/:provider/:owner/invoices` (exact) - `PlanPage.tsx:91-93`
**Description**: invoice history list for the org.
**Components**: InvoiceCard
**Data Displayed**: invoice list - Invoices (ROUTE022)
**Self-Hosted**: ABSENT (same PlanPage family gate)
**Related Screens**: SCR019_InvoiceDetailsPage

---

## SCR019_InvoiceDetailsPage
**Type**: atomic | **Route**: `/plan/:provider/:owner/invoices/:id` (exact) - `PlanPage.tsx:94-96`
**Description**: single invoice detail/line-items screen.
**Components**: sections (line-item breakdown)
**Data Displayed**: single invoice - Invoice (ROUTE021)
**Self-Hosted**: ABSENT (same PlanPage family gate)
**Related Screens**: SCR018_InvoicesPage

---

## SCR020_DowngradePlan
**Type**: atomic | **Route**: `/plan/:provider/:owner/cancel/downgrade` (exact) - `subRoutes/CancelPlanPage/CancelPlanPage.tsx:60-64`
**Description**: plan-cancellation confirmation/downgrade-to-free screen.
**Components**: CancelButton
**Data Displayed**: current plan/discount state - GetPlanData (ROUTE023), GetAvailablePlans (ROUTE019)
**Self-Hosted**: ABSENT (same PlanPage family gate); on-trial/enterprise plans redirect away before reaching here (`CancelPlanPage.tsx:37-39`)
**Related Screens**: SCR021_TeamPlanSpecialOffer, SCR022_SpecialOffer (alternate entry before downgrade)

---
## SCR021_TeamPlanSpecialOffer
**Type**: atomic | **Route**: `/plan/:provider/:owner/cancel` (exact) - `CancelPlanPage.tsx:65-68`, condition `showTeamSpecialOffer`
**Description**: retention offer screen shown to Pro-plan orgs eligible for the Team plan before they cancel.
**Components**: TeamPlanCard
**Data Displayed**: eligibility - `shouldDisplayTeamCard(plans)` (`CancelPlanPage.tsx:49-50`) against GetAvailablePlans (ROUTE019)
**Self-Hosted**: ABSENT (same PlanPage family gate)
**Related Screens**: SCR022_SpecialOffer (mutually exclusive on same route), SCR020_DowngradePlan

---

## SCR022_SpecialOffer
**Type**: atomic | **Route**: `/plan/:provider/:owner/cancel` (exact) - `CancelPlanPage.tsx:65-68`, condition `!showTeamSpecialOffer`
**Description**: generic discount retention offer screen shown before cancellation.
**Components**: (self-contained offer card, no sub-components observed)
**Data Displayed**: discount eligibility - `discountNotApplied && isMonthlyPlan` (`CancelPlanPage.tsx:45-46`) against GetPlanData (ROUTE023)
**Self-Hosted**: ABSENT (same PlanPage family gate)
**Related Screens**: SCR021_TeamPlanSpecialOffer (mutually exclusive on same route), SCR020_DowngradePlan

---

## SCR023_PullFileExplorer
**Type**: atomic | **Route**: `pull/:pullId/tree/:path+`, `pull/:pullId/tree/` - `PullCoverage.tsx:69-77`
**Description**: file-tree browser for a pull request's head commit.
**Components**: FileExplorerTable
**Data Displayed**: path contents - PullPathContents (ROUTE068)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR024_PullFileViewer (drill-down into a file)

---

## SCR024_PullFileViewer
**Type**: atomic | **Route**: `pull/:pullId/blob/:path+` - `PullCoverage.tsx:79-84`
**Description**: single-file diff/coverage viewer for a pull request.
**Components**: (CodeRenderer family, shared `src/ui/CodeRenderer`)
**Data Displayed**: per-file coverage - CoverageForFile (ROUTE067)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR023_PullFileExplorer

---

## SCR025_PullIndirectChangesTab
**Type**: atomic | **Route**: `pull/:pullId/indirect-changes` (exact) - `PullCoverage.tsx:86-93`
**Description**: lists files whose coverage changed indirectly (not touched by the diff).
**Components**: IndirectChangedFiles (NameColumn, hooks), IndirectChangesInfo, PullFileDiff
**Data Displayed**: indirect-change file list - ImpactedFileComparedWithParent (ROUTE055)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR029_PullFilesChangedTab

---
## SCR026_PullCommitsTab
**Type**: atomic | **Route**: `pull/:pullId/commits` (exact) - `PullCoverage.tsx:94-98`
**Description**: lists commits included in the pull request.
**Components**: CommitsTable (Title)
**Data Displayed**: commit list - GetCommits (ROUTE054)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR029_PullFilesChangedTab

---

## SCR027_PullFlagsTab
**Type**: atomic | **Route**: `pull/:pullId/flags` (exact) - `PullCoverage.tsx:99-105`
**Description**: per-flag coverage breakdown for the pull request.
**Components**: (FlagsTable-style list, no dedicated subfolder observed)
**Data Displayed**: flag coverage - PullFlagsSelect (ROUTE090), FlagMeasurements (ROUTE089)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR028_PullComponentsTab

---

## SCR028_PullComponentsTab
**Type**: atomic | **Route**: `pull/:pullId/components` (exact) - `PullCoverage.tsx:106-115`
**Description**: per-component coverage breakdown for the pull request.
**Components**: ComponentsNotConfigured, queries
**Data Displayed**: component coverage - PullComponentsSelector (ROUTE075)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR027_PullFlagsTab

---

## SCR029_PullFilesChangedTab
**Type**: atomic | **Route**: `pull/:pullId` (exact) - `PullCoverage.tsx:116-120`
**Description**: default pull-request tab; lists changed files with per-file coverage diff.
**Components**: FilesChanged (FilesChangedTable, NameColumn, PullFileDiff, TableTeam, hooks)
**Data Displayed**: changed-files diff - CompareTotals (ROUTE051) / GetCompareTotalsTeam (ROUTE052)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR023_PullFileExplorer, SCR025_PullIndirectChangesTab

---

## SCR030_CommitFileExplorer
**Type**: atomic | **Route**: `commit/:commit/tree/:path+`, `commit/:commit/tree/` - `CommitCoverage.jsx:77-84`
**Description**: file-tree browser for a single commit.
**Components**: CommitDetailFileExplorerTable
**Data Displayed**: path contents - CommitPathContents (ROUTE066)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR031_CommitFileViewer

---
## SCR031_CommitFileViewer
**Type**: atomic | **Route**: `commit/:commit/blob/:path+` (exact) - `CommitCoverage.jsx:85-91`
**Description**: single-file coverage viewer for a commit.
**Components**: (CodeRenderer family, shared)
**Data Displayed**: per-file coverage - CoverageForFile (ROUTE067)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR030_CommitFileExplorer

---

## SCR032_CommitFilesChangedTab
**Type**: atomic | **Route**: `commit/:commit` (exact) - `CommitCoverage.jsx:92-94`
**Description**: default commit-detail tab; lists files changed in the commit with coverage.
**Components**: FilesChangedTable, FilesChangedTableTeam, shared/CommitFileDiff
**Data Displayed**: commit coverage summary - Commit (ROUTE044), CommitDropdownSummary (ROUTE048)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR030_CommitFileExplorer, SCR033_CommitIndirectChangesTab

---

## SCR033_CommitIndirectChangesTab
**Type**: atomic | **Route**: `commit/:commit/indirect-changes` (exact) - `CommitCoverage.jsx:96-105`
**Description**: lists files whose coverage changed indirectly for this commit.
**Components**: IndirectChangesTable (CommitFileDiff)
**Data Displayed**: indirect changes - ImpactedFileComparedWithParent (ROUTE055)
**Self-Hosted**: PRESENT - gated `showIndirectChanges = !(overview.private && isTeamPlan)` (`CommitCoverage.jsx:71`)
**Related Screens**: SCR032_CommitFilesChangedTab

---

## SCR034_RepoOverviewTab
**Type**: composite | **Route**: `/:repo`, `/tree/:branch`, `/tree/:branch/:path+`, `/blob/:ref/:path+` - `RepoPage.tsx:76-96`, `CoverageTab.tsx:61-71`
**Description**: default repo tab; shows coverage summary plus a chart/sunburst/file-tree region that switches by path.
**Components**: FirstPullRequestBanner, Summary/SummaryTeamPlan, CoverageChart, Sunburst, FileExplorer/FileViewer (subroute)
**Data Displayed**: repo coverage totals - GetRepoCoverage (ROUTE088), CoverageTabDataQueryOpts; sunburst tree - `/coverage/tree` (ROUTE004)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR035_RepoFlagsTab, SCR036_RepoComponentsTab, SCR057_DeactivatedRepo (state variant on same route)

**Regions**:
| Code | Label | Independence Signal |
|------|-------|---------------------|
| REG001 | Summary / SummaryTeamPlan | `OverviewTab.tsx:87` - own query `CoverageTabDataQueryOpts`, plan-gated variant |
| REG002 | CoverageChart | `OverviewTab.tsx:112` - own chart component, independent render toggle (`ToggleElement`) |
| REG003 | Sunburst | `OverviewTab.tsx:117` - conditional (`displaySunburst`), own query SunburstCoverageQueryOpts (ROUTE004) |
| REG004 | FileExplorer / FileViewer | `OverviewTab.tsx:126-144` - path-based switch, own pathContents queries (ROUTE064/ROUTE066), independent scroll |

---
## SCR035_RepoFlagsTab
**Type**: atomic | **Route**: `/:repo/flags`, `/:repo/flags/:branch` - `RepoPage.tsx:79-83`, `CoverageTab.tsx:43-51`
**Description**: per-flag coverage table for the repo, with backfill/sync banners.
**Components**: BackfillBanners (SyncingBanner, TriggerSyncBanner), Header, TimescaleDisabled, subroute/FlagsTable (DeleteFlagModal, TableEntries, hooks)
**Data Displayed**: flag coverage - FlagMeasurements (ROUTE089), FlagsSelect (ROUTE091); deleteFlag mutation (ROUTE060)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR034_RepoOverviewTab, SCR036_RepoComponentsTab

---

## SCR036_RepoComponentsTab
**Type**: atomic | **Route**: `/:repo/components`, `/:repo/components/:branch` - `RepoPage.tsx:83-84`, `CoverageTab.tsx:52-60`
**Description**: per-component coverage table for the repo, with backfill/sync banners.
**Components**: BackfillBanners (SyncingBanner, TriggerSyncBanner), Header (BranchSelector), TimescaleDisabled, subroute/ComponentsTable (DeleteComponentModal, TableEntries, hooks)
**Data Displayed**: component coverage - ComponentMeasurements (ROUTE085), RepoComponentsSelector (ROUTE086); deleteComponentMeasurements mutation (ROUTE059)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR034_RepoOverviewTab, SCR035_RepoFlagsTab

---

## SCR037_CoverageOnboardingGitHubActions
**Type**: atomic | **Route**: `/:repo/new` (exact) - `NewRepoTab.tsx:108-109`
**Description**: default coverage-setup onboarding instructions using GitHub Actions.
**Components**: ActivationBanner (shared), ExampleBlurb, LearnMoreBlurb, OutputCoverageStep
**Data Displayed**: repo upload token - RegenerateRepositoryToken (ROUTE098)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR038_CoverageOnboardingCircleCI, SCR039_CoverageOnboardingOtherCI (mutually exclusive siblings via CI-provider selector, `NewRepoTab.tsx` radio nav)

---

## SCR038_CoverageOnboardingCircleCI
**Type**: atomic | **Route**: `/:repo/new/circle-ci` (exact) - `NewRepoTab.tsx:111-112`
**Description**: coverage-setup onboarding instructions for CircleCI.
**Components**: (CircleCI-specific instructions card)
**Data Displayed**: repo upload token - RegenerateRepositoryToken (ROUTE098)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR037_CoverageOnboardingGitHubActions, SCR039_CoverageOnboardingOtherCI

---

## SCR039_CoverageOnboardingOtherCI
**Type**: atomic | **Route**: `/:repo/new/other-ci` (exact) - `NewRepoTab.tsx:114-116`
**Description**: coverage-setup onboarding instructions for any other CI provider (terminal-based upload).
**Components**: TerminalInstructions
**Data Displayed**: repo upload token - RegenerateRepositoryToken (ROUTE098)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR037_CoverageOnboardingGitHubActions, SCR038_CoverageOnboardingCircleCI

---
## SCR040_BundleContent
**Type**: composite | **Route**: `/:repo/bundles`, `/:repo/bundles/:branch`, `/:repo/bundles/:branch/:bundle` - `RepoPage.tsx:109-123`, `BundlesTab.tsx:26-29`
**Description**: bundle-analysis dashboard for the repo; a bundle chart plus an assets table, shown only when bundle analysis is enabled (else `BundlesTab` redirects to onboarding, `BundlesTab.tsx:31-36`).
**Components**: AssetsTable, BundleChart, BundleDetails, BundleSelection, ErrorBanner, InfoBanner, TrendDropdown
**Data Displayed**: bundle trend/summary - BundleSummary (ROUTE038), BranchBundleSummaryData (ROUTE033)
**Self-Hosted**: PRESENT (no gating found beyond bundle-analysis-enabled)
**Related Screens**: SCR041-SCR047 (onboarding siblings when bundle analysis is not yet enabled)

**Regions**:
| Code | Label | Independence Signal |
|------|-------|---------------------|
| REG001 | BundleChart | `BundleContent.tsx:81` - own query GetBundleTrend (ROUTE035) |
| REG002 | AssetsTable | `BundleContent.tsx:85` - own query BundleAssets (ROUTE034), own pagination |

---

## SCR041_ViteOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new` (exact) - `BundleOnboarding.tsx:169-170`
**Description**: bundle-analysis setup instructions for Vite (default bundler option).
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: repo/org upload token - GetOrgUploadToken (ROUTE063); GetRepo (ROUTE083)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR042-SCR047 (mutually exclusive siblings via bundler-type radio selector, `BundleOnboarding.tsx`)

---

## SCR042_RollupOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new/rollup` - `BundleOnboarding.tsx:172-173`
**Description**: bundle-analysis setup instructions for Rollup.
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: same as SCR041
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR041_ViteOnboarding and siblings

---

## SCR043_WebpackOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new/webpack` - `BundleOnboarding.tsx:175-176`
**Description**: bundle-analysis setup instructions for Webpack.
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: same as SCR041
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR041_ViteOnboarding and siblings

---
## SCR044_RemixOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new/remix-vite` - `BundleOnboarding.tsx:178-179`
**Description**: bundle-analysis setup instructions for Remix (Vite-based).
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: same as SCR041
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR041_ViteOnboarding and siblings

---

## SCR045_NuxtOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new/nuxt` - `BundleOnboarding.tsx:181-182`
**Description**: bundle-analysis setup instructions for Nuxt.
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: same as SCR041
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR041_ViteOnboarding and siblings

---

## SCR046_SolidStartOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new/solidstart` - `BundleOnboarding.tsx:184-185`
**Description**: bundle-analysis setup instructions for SolidStart.
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: same as SCR041
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR041_ViteOnboarding and siblings

---

## SCR047_SvelteKitOnboarding
**Type**: atomic | **Route**: `/:repo/bundles/new/sveltekit` - `BundleOnboarding.tsx:187-188`
**Description**: bundle-analysis setup instructions for SvelteKit.
**Components**: LearnMoreBlurb (shared)
**Data Displayed**: same as SCR041
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR041_ViteOnboarding and siblings

---

## SCR048_FailedTestsPage
**Type**: composite | **Route**: `/:repo/tests`, `/:repo/tests/:branch` - `RepoPage.tsx:140-152`, `FailedTestsTab.tsx:121,142`
**Description**: Test Analytics results dashboard, shown once test analytics is enabled for the repo (else `FailedTestsTab` shows onboarding, SCR049/SCR050).
**Components**: FailedTestsErrorBanner, FailedTestsTable, MetricsSection, SelectorSection, TableHeader
**Data Displayed**: test results/flake aggregates - `useTestResultsAggregates`, `useFlakeAggregates`, `useInfiniteTestResults`, `useTestResultsFlags`, `useTestResultsTestSuites` (all under `FailedTestsPage/hooks`)
**Self-Hosted**: PRESENT - gated `isCurrentUserPartOfOrg || testAnalyticsEnabled` (`RepoPage.tsx:140-152`); unauthorized users see `ActivationAlert` instead (`FailedTestsTab.tsx:138-141`, not a separate SCR)
**Related Screens**: SCR049_TestsOnboardingGitHubActions, SCR050_CodecovCLI (onboarding siblings)

**Regions**:
| Code | Label | Independence Signal |
|------|-------|---------------------|
| REG001 | MetricsSection | own aggregate query (`useTestResultsAggregates`/`useFlakeAggregates`) - `FailedTestsPage.tsx:13` |
| REG002 | FailedTestsTable | own paginated query (`useInfiniteTestResults`), own scroll container - `FailedTestsPage.tsx:14` |

---
## SCR049_TestsOnboardingGitHubActions
**Type**: atomic | **Route**: `/:repo/tests/new` (exact) - `FailedTestsTab.tsx:104,156-158`
**Description**: Test Analytics setup instructions using GitHub Actions (default setup option).
**Components**: FrameworkTabsCard (FrameworkTabs)
**Data Displayed**: repo upload token config (shared with coverage onboarding)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR050_CodecovCLI (mutually exclusive sibling via setup-option selector, `FailedTestsTab.tsx:29-90`)

---

## SCR050_CodecovCLI
**Type**: atomic | **Route**: `/:repo/tests/new/codecov-cli` (exact) - `FailedTestsTab.tsx:104,159-161`
**Description**: Test Analytics setup instructions using Codecov CLI.
**Components**: FrameworkTabsCard (FrameworkTabs)
**Data Displayed**: repo upload token config (shared with coverage onboarding)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR049_TestsOnboardingGitHubActions

---

## SCR051_RepoCommitsTab
**Type**: atomic | **Route**: `/:repo/commits`, `/:repo/commits/:branch` - `RepoPage.tsx:153-160`
**Description**: repo-level commit list with coverage status per commit.
**Components**: CommitsTable (Title), hooks
**Data Displayed**: commit list - GetCommits (ROUTE054)
**Self-Hosted**: PRESENT - gated `productEnabled && userAuthorizedtoViewRepo` (`RepoPage.tsx:153-160`)
**Related Screens**: SCR052_RepoPullsTab

---

## SCR052_RepoPullsTab
**Type**: atomic | **Route**: `/:repo/pulls` (exact) - `RepoPage.tsx:161-165`
**Description**: repo-level pull-request list with coverage status per PR.
**Components**: PullsTable (Title)
**Data Displayed**: pull list - GetPulls (ROUTE078)
**Self-Hosted**: PRESENT - same gate as SCR051
**Related Screens**: SCR051_RepoCommitsTab

---
## SCR053_ConfigurationManager
**Type**: atomic | **Route**: `/:repo/config` (exact) - `RepoPage.tsx:169-171`, `ConfigTab.tsx:52-54`
**Description**: repo config overview; shows which coverage-config steps are complete.
**Components**: FeatureGroup, FeatureItem, hooks/useRepoConfigurationStatus
**Data Displayed**: repo config status - GetRepoSettings (ROUTE094) / GetRepoSettingsTeam (ROUTE095)
**Self-Hosted**: PRESENT - `ConfigTab.tsx:32` renders SCR058_NotFound instead when `!currentOwner?.isCurrentUserPartOfOrg`
**Related Screens**: SCR054_RepoGeneralTab, SCR055_RepoYamlTab, SCR056_BadgesAndGraphsTab (sidebar siblings, `ConfigTab.tsx` Sidemenu)

---

## SCR054_RepoGeneralTab
**Type**: atomic | **Route**: `/:repo/config/general` (exact) - `ConfigTab.tsx:55-57`
**Description**: general repo settings - default branch, tokens, danger-zone actions.
**Components**: DangerZone (EraseRepo, RepoState/DeactivateRepoModal), DefaultBranch, Tokens (GraphToken, RepoUploadToken, StaticAnalysisToken, TokensTeam)
**Data Displayed**: repo config - RepoConfig (ROUTE087); EraseRepository (ROUTE082), RegenerateRepositoryToken (ROUTE098)
**Self-Hosted**: same gate as SCR053
**Related Screens**: SCR053_ConfigurationManager

---

## SCR055_RepoYamlTab
**Type**: atomic | **Route**: `/:repo/config/yaml` (exact) - `ConfigTab.tsx:58-60`
**Description**: repo-level YAML override editor.
**Components**: CurrentRepoSettings, SecretString, ValidateYaml, YAML
**Data Displayed**: repo YAML config - CommitYaml (ROUTE050); EncodeSecretString mutation (ROUTE081)
**Self-Hosted**: same gate as SCR053
**Related Screens**: SCR053_ConfigurationManager

---

## SCR056_BadgesAndGraphsTab
**Type**: atomic | **Route**: `/:repo/config/badge` (exact) - `ConfigTab.tsx:61-63`
**Description**: coverage badge/graph markdown snippets for the repo README.
**Components**: Badges, Graphs
**Data Displayed**: repo badge tokens - RepoConfig (ROUTE087)
**Self-Hosted**: same gate as SCR053
**Related Screens**: SCR053_ConfigurationManager

---

## SCR057_DeactivatedRepo
**Type**: atomic | **Route**: `/:repo`, `/:repo/bundles` (state variant) - `RepoPage.tsx:196-201`
**Description**: shown instead of SCR034/SCR040 when the repo is active but not activated (`isRepoActive && !isRepoActivated`).
**Components**: (self-contained activation-prompt screen, no sub-components observed)
**Data Displayed**: repo activation state - GetRepoOverview (ROUTE092)
**Self-Hosted**: PRESENT (no gating found beyond repo-activation state)
**Related Screens**: SCR034_RepoOverviewTab, SCR040_BundleContent (mutually exclusive by repo state on same routes)

---

## SCR058_NotFound
**Type**: atomic | **Route**: `/account/:provider/:owner/*` (`AccountSettings.jsx:79-81`), `/:repo/config/*` (`ConfigTab.tsx:64-66`)
**Description**: shared 404 screen rendered as the terminal fallback of two independent nested Switches; not a top-level app catch-all (the app-level `*` route renders `HomePageRedirect`, not this screen).
**File**: `src/pages/NotFound/NotFound.jsx:49-71`
**Components**: NotFoundErrorMessage (`NotFound.jsx:10`)
**Data Displayed**: none (static message)
**Self-Hosted**: PRESENT (no gating found)
**Related Screens**: SCR012_AccountAccessTab (sibling under AccountSettings), SCR053_ConfigurationManager (sibling under ConfigTab)

---

## Summary

- **Total Screens**: 58 (SCR001-SCR058, contiguous, no gaps)
- **Composite screens (with Regions)**: 3 (SCR034_RepoOverviewTab, SCR040_BundleContent, SCR048_FailedTestsPage) - 8 REG total
- **Router-outlet shells excluded (no own SCR)**: PullRequestPage, CommitDetailPage, RepoPage, ConfigTab, AccountSettings, AdminSettings, PlanPage, BundlesTab, BundleOnboarding, NewRepoTab, FailedTestsTab (11 shells)
- **Self-hosted-only screens**: SCR007 (EnterpriseLandingPage), SCR014-SCR015 (AdminSettings family)
- **Non-self-hosted-only screens**: SCR003 (MembersPage), SCR016-SCR022 (PlanPage family) - 8 total
- **[SIGNAL_INFERRED] uses**: none - all composite/atomic calls resolved via explicit H2/H3/H6 signals or the Composite Hard Guard's file-cardinality rule (no per-stack table gaps encountered for this JS/TS/React codebase)
- **[BARREL_IMPORT] advisory**: see general note in header; not tagged per-screen (most screens mix barrel + direct-file service imports, so the "ONLY barrel" trigger condition rarely fires cleanly - a per-import audit is left to Wave 2b BehaviorLogic)

---

## Cross-Reference Validation

- [x] All SCR### codes are unique (SCR001-SCR058, no duplicates)
- [x] All SCR### codes are referenced in screen-flow.md
- [x] All Related-Screen references point to codes that exist in this document
- [x] All routes cite `file:line` (either directly or via `route-list.md`'s already-validated citation, which this document reuses rather than re-deriving)
- [x] All SCR### codes referenced in FeatureList.md - verified after Wave 5: all 58 screens are cited by a feature
- [x] No orphaned screen references
- [x] No REG### nested inside another REG### (flat, 1 level, all 8 REG rows under their 3 parent SCRs)
- [x] No wildcard route emitted as its own SCR row (SCR058_NotFound documents the two wildcard terminals as citations, not as a wildcard SCR itself)
