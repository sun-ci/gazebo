# API Map

**Project**: Athena (Sun* self-hosted Codecov, frontend fork of codecov/gazebo)
**Generated**: 2026-09-08
**Scope**: this repo is FRONTEND-only (React SPA). The API described here belongs to the backend
repo `codecov/umbrella`, not in this tree. Everything below is the API **as consumed**: transport,
auth, which screen calls what, and how the client shapes/parses request and response bodies. No
server-side implementation is described past what the client's own code proves.

**Source of truth**: `plans/260908-1626-rebuild-spec/artifacts/route-list.md` (Wave 1, already
validated) for every endpoint's existence and `file:line`. This artifact restates none of those
citations from scratch — it groups the same 122 rows by domain and joins them against
`screen-list.md` for consumers. See **Coverage & Discrepancy Note** at the end for the one count
mismatch found in route-list.md's own summary and the joins this artifact does *not* attempt.

## Transport

Two transports, both through `src/shared/api/`, both same-origin `fetch` with `credentials:
'include'` (cookie session, no bearer token in JS):

### REST — `Api.get/post/patch/delete` (`src/shared/api/api.ts:20-64,167-171`)
- Base URL: `` `${config.API_URL}/internal{path}` `` (`src/shared/api/helpers.ts:53-59`).
- Request body: JS object → `snakeifyKeys()` (`src/shared/utils/snakeifyKeys.ts:1-16`) → `JSON.stringify`.
- Response body: `res.json()` → `camelizeKeys()` (`src/shared/utils/camelizeKeys.ts:1-17`) — so every
  hook consumes camelCase fields even though the wire format is snake_case.
- 14 distinct method+path call sites (REST rows in the tables below).

### GraphQL — `Api.graphql` / `Api.graphqlMutation` (`src/shared/api/api.ts:84-165`)
- Always `POST ${config.API_URL}/graphql/:provider` in this codebase (`api.ts:91-95`) — no call
  site sets `supportsServiceless: true`, so the serviceless `/graphql/` branch (`api.ts:91,94`) is
  dead code, not a live path (already noted in route-list.md's own header).
- Request body: `{ query, variables }`, raw (no snake-casing — GraphQL variable names stay as
  written in the query string).
- Response: NOT run through `camelizeKeys` — the GraphQL schema itself returns camelCase, so
  `res.json()` is used as-is.
- `graphqlMutation` additionally unwraps `res.data[mutationPath]` and throws (rather than
  resolving) when the mutation payload's `error.__typename` is one of `UnauthenticatedError` /
  `UnauthorizedError` / `NotFoundError` (`api.ts:143-165`), so those three error union members
  surface as thrown errors even on an HTTP 200.
- 108 distinct named operations (GraphQL rows in the tables below).

### Auth — `getHeaders(provider)` (`src/shared/api/helpers.ts:66-84`)
- No REST/GraphQL split: both transports call the same `getHeaders`.
- Always sends `Accept: application/json` and `Content-Type: application/json; charset=utf-8`.
- When `provider` is a recognized VCS provider (`gh`/`gl`/`bb`/`ghe`/`gle`/`bbs` and their long
  forms, `AllProvidersArray`, `helpers.ts:17-32`), adds a `Token-Type` header naming that
  provider's session cookie (`ProviderCookieKeyMapping`, `helpers.ts:34-47`) — the actual token
  lives in an httpOnly cookie set by the backend at login, never read or held by JS. Unrecognized
  or missing `provider` gets only the base headers (self-hosted admin-only REST calls like
  `ROUTE001`/`ROUTE002` pass no provider).

## Endpoints by Domain

Grouped by the `src/services/<domain>/` directory each operation's hook/query-opts file lives
in — 31 domains covering all 122 backend operations this frontend calls (13 REST + 103 named
GraphQL, `ROUTE001`-`ROUTE122`). Utility service directories with no backend call
(`file`, `image`, `impactedFiles`, `impersonate`, `navigation`, `toast`, `toastNotification`,
`tracking`, `usePaginatedContents`) are browser-local state/formatting helpers, not API domains,
and are out of scope here.

`Screens` cites SCR### codes whose own line in `screen-list.md` names this exact operation code.
A screen that calls the same hook family through a barrel import without screen-list.md citing the
specific ROUTE### is left as `-` here rather than inferred (screen-list.md itself is a compacted,
one-primary-query-per-screen artifact, not an exhaustive per-hook call graph — see Coverage Note).

### access (4 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE015 | MySessions | query | `src/services/access/SessionsQueryOpts.ts:50` | SCR012_AccountAccessTab |
| ROUTE016 | DeleteSession | mutation | `src/services/access/useDeleteSession.ts:10` | SCR012_AccountAccessTab |
| ROUTE017 | CreateUserToken | mutation | `src/services/access/useGenerateUserToken.ts:33` | SCR012_AccountAccessTab |
| ROUTE018 | RevokeUserToken | mutation | `src/services/access/useRevokeUserToken.ts:10` | SCR012_AccountAccessTab |

### account (14 operations)

| Code | Method | Path | Handler | Screens |
|------|--------|------|---------|---------|
| ROUTE008 | DELETE | `/{provider}/{owner}/account-details/` | useEraseAccount/getPathAccountDetails -- src/services/account/useEraseAccount.js:8,14-16 | - |
| ROUTE009 | PATCH | `/{provider}/{owner}/account-details/` | useUpgradePlan -- src/services/account/useUpgradePlan.ts:14,30,37; useAutoActivate -- src/services/account/useAutoActivate.js:6,26,33; useCancelPlan -- src/services/account/useCancelPlan.js:8,12,18 (1 endpoint, 3 callers, body differs) | - |
| ROUTE010 | GET | `/{provider}/{owner}/account-details/` | useAccountDetails/getPathAccountDetails -- src/services/account/useAccountDetails.ts:175,187-188 | - |
| ROUTE011 | PATCH | `/{provider}/{owner}/account-details/update_email` | useUpdateBillingEmail -- src/services/account/useUpdateBillingEmail.ts:20,26 | - |
| ROUTE012 | PATCH | `/{provider}/{owner}/account-details/update_payment` | useUpdatePaymentMethod -- src/services/account/useUpdatePaymentMethod.ts:38,79,81 | - |
| ROUTE013 | PATCH | `/{provider}/{owner}/account-details/update_billing_address` | useUpdateBillingAddress -- src/services/account/useUpdateBillingAddress.ts:40,47 | - |

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE019 | GetAvailablePlans | query | `src/services/account/useAvailablePlans.ts:32` | SCR017_UpgradePlanPage, SCR020_DowngradePlan, SCR021_TeamPlanSpecialOffer |
| ROUTE020 | CreateStripeSetupIntent | mutation | `src/services/account/useCreateStripeSetupIntent.ts:48` | SCR017_UpgradePlanPage |
| ROUTE021 | Invoice | query | `src/services/account/useInvoice.ts:10` | SCR016_CurrentOrgPlan, SCR019_InvoiceDetailsPage |
| ROUTE022 | Invoices | query | `src/services/account/useInvoices.ts:70` | SCR018_InvoicesPage |
| ROUTE023 | GetPlanData | query | `src/services/account/usePlanData.ts:73` | SCR016_CurrentOrgPlan, SCR020_DowngradePlan, SCR022_SpecialOffer |
| ROUTE024 | SendSentryToken | mutation | `src/services/account/useSentryToken.tsx:8` | - |
| ROUTE025 | UnverifiedPaymentMethods | query | `src/services/account/useUnverifiedPaymentMethods.tsx:9` | - |
| ROUTE026 | UpdateSelfHostedSettings | mutation | `src/services/account/useUpdateSelfHostedSettings.tsx:14` | - |

### ats (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE027 | RepoATSInfo | query | `src/services/ats/useRepoATS.tsx:33` | - |

### branches (4 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE028 | GetBranch | query | `src/services/branches/useBranch.tsx:49` | - |
| ROUTE029 | GetBranchComponents | query | `src/services/branches/useBranchComponents.tsx:60` | - |
| ROUTE030 | GetBranches | query | `src/services/branches/useBranches.tsx:58` | - |
| ROUTE031 | GetBranchCommits | query | `src/services/branches/useBranchHasCommits.tsx:43` | - |

### bundleAnalysis (8 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE032 | BranchBundlesNames | query | `src/services/bundleAnalysis/BranchBundlesNamesQueryOpts.tsx:56` | - |
| ROUTE033 | BranchBundleSummaryData | query | `src/services/bundleAnalysis/BranchBundleSummaryQueryOpts.tsx:78` | SCR040_BundleContent |
| ROUTE034 | BundleAssets | query | `src/services/bundleAnalysis/BundleAssetsQueryOpts.tsx:117` | SCR040_BundleContent |
| ROUTE035 | GetBundleTrend | query | `src/services/bundleAnalysis/BundleTrendDataQueryOpts.tsx:84` | SCR040_BundleContent |
| ROUTE036 | CachedBundleList | query | `src/services/bundleAnalysis/CachedBundlesQueryOpts.tsx:57` | - |
| ROUTE037 | BundleAssetModules | query | `src/services/bundleAnalysis/useBundleAssetModules.tsx:81` | - |
| ROUTE038 | BundleSummary | query | `src/services/bundleAnalysis/useBundleSummary.tsx:74` | SCR040_BundleContent |
| ROUTE039 | UpdateBundleCacheConfig | mutation | `src/services/bundleAnalysis/useUpdateBundleCache.tsx:41` | - |

### charts (3 operations)

| Code | Method | Path | Handler | Screens |
|------|--------|------|---------|---------|
| ROUTE004 | GET | `/{provider}/{owner}/{repo}/coverage/tree` | SunburstCoverageQueryOpts -- src/services/charts/SunburstCoverageQueryOpts.ts:9-11,54-55 | SCR034_RepoOverviewTab |

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE040 | GetBranchCoverageMeasurements | query | `src/services/charts/BranchCoverageMeasurementsQueryOpts.tsx:42` | - |
| ROUTE041 | GetReposCoverageMeasurements | query | `src/services/charts/ReposCoverageMeasurementsQueryOpts.ts:22` | SCR004_AnalyticsPage |

### codecovAI (2 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE042 | GetCodecovAIAppInstallInfo | query | `src/services/codecovAI/useCodecovAIInstallation.tsx:16` | SCR005_CodecovAIPage |
| ROUTE043 | GetCodecovAIInstalledRepos | query | `src/services/codecovAI/useCodecovAIInstalledRepos.tsx:16` | SCR005_CodecovAIPage |

### commit (9 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE044 | Commit | query | `src/services/commit/useCommit.tsx:163` | SCR032_CommitFilesChangedTab |
| ROUTE045 | CommitBADropdownSummary | query | `src/services/commit/useCommitBADropdownSummary.tsx:65` | - |
| ROUTE046 | CommitBundleList | query | `src/services/commit/useCommitBundleList.tsx:79` | - |
| ROUTE047 | CommitComponents | query | `src/services/commit/useCommitComponents.tsx:45` | - |
| ROUTE048 | CommitDropdownSummary | query | `src/services/commit/useCommitCoverageDropdownSummary.tsx:80` | SCR032_CommitFilesChangedTab |
| ROUTE049 | GetCommitTeam | query | `src/services/commit/useCommitTeam.tsx:164` | - |
| ROUTE050 | CommitYaml | query | `src/services/commit/useCommitYaml.tsx:35` | SCR055_RepoYamlTab |
| ROUTE051 | CompareTotals | query | `src/services/commit/useCompareTotals.tsx:83` | SCR029_PullFilesChangedTab |
| ROUTE052 | GetCompareTotalsTeam | query | `src/services/commit/useCompareTotalsTeam.tsx:78` | SCR029_PullFilesChangedTab |

### commitErrors (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE053 | CommitErrors | query | `src/services/commitErrors/useCommitErrors.tsx:20` | - |

### commits (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE054 | GetCommits | query | `src/services/commits/useCommits.tsx:124` | SCR026_PullCommitsTab, SCR051_RepoCommitsTab |

### comparison (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE055 | ImpactedFileComparedWithParent | query | `src/services/comparison/useComparisonForCommitAndParent/query.ts:4` | SCR025_PullIndirectChangesTab, SCR033_CommitIndirectChangesTab |

### config (2 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE056 | GetLoginProviders | query | `src/services/config/LoginProvidersQueryOpts.ts:28` | SCR001_LoginPage |
| ROUTE057 | GetSyncProviders | query | `src/services/config/SyncProvidersQueryOpts.ts:27` | SCR007_EnterpriseLandingPage |

### defaultOrganization (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE058 | updateDefaultOrganization | mutation | `src/services/defaultOrganization/useUpdateDefaultOrganization.ts:8` | - |

### deleteComponentMeasurements (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE059 | deleteComponentMeasurements | mutation | `src/services/deleteComponentMeasurements/useDeleteComponentMeasurements.ts:18` | SCR036_RepoComponentsTab |

### deleteFlag (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE060 | deleteFlag | mutation | `src/services/deleteFlag/useDeleteFlag.js:15` | SCR035_RepoFlagsTab |

### events (2 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE061 | RepoContext | query | `src/services/events/hooks.tsx:129` | - |
| ROUTE062 | OwnerContext | query | `src/services/events/hooks.tsx:63` | - |

### orgUploadToken (2 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE063 | GetOrgUploadToken | query | `src/services/orgUploadToken/useOrgUploadToken.ts:15` | SCR013_OrgUploadToken, SCR041_ViteOnboarding |
| ROUTE064 | RegenerateOrgUploadToken | mutation | `src/services/orgUploadToken/useRegenerateOrgUploadToken.tsx:10` | SCR013_OrgUploadToken |

### pathContents (4 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE065 | BranchContents | query | `src/services/pathContents/branch/dir/constants.ts:2` | SCR034_RepoOverviewTab |
| ROUTE066 | CommitPathContents | query | `src/services/pathContents/commit/dir/constants.ts:56` | SCR030_CommitFileExplorer |
| ROUTE067 | CoverageForFile | query | `src/services/pathContents/constants.ts:107` | SCR024_PullFileViewer, SCR031_CommitFileViewer, SCR034_RepoOverviewTab |
| ROUTE068 | PullPathContents | query | `src/services/pathContents/pull/dir/constants.ts:85` | SCR023_PullFileExplorer |

### pull (9 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE069 | ImpactedFileComparison | query | `src/services/pull/usePrefetchSingleFileComp.tsx:51 (also: useSingularImpactedFileComparison.tsx:26)` | - |
| ROUTE070 | Pull | query | `src/services/pull/usePull.tsx:200` | - |
| ROUTE071 | PullBADropdownSummary | query | `src/services/pull/usePullBADropdownSummary.tsx:66` | - |
| ROUTE072 | PullBundleComparisonList | query | `src/services/pull/usePullBundleComparisonList.tsx:75` | - |
| ROUTE073 | PullBundleHeadList | query | `src/services/pull/usePullBundleHeadList.tsx:63` | - |
| ROUTE074 | GetPullCompareTotalsTeam | query | `src/services/pull/usePullCompareTotalsTeam.tsx:79` | - |
| ROUTE075 | PullComponentsSelector | query | `src/services/pull/usePullComponents.tsx:18` | SCR028_PullComponentsTab |
| ROUTE076 | PullCoverageDropdownSummary | query | `src/services/pull/usePullCoverageDropdownSummary.tsx:60` | - |
| ROUTE077 | GetPullTeam | query | `src/services/pull/usePullTeam.tsx:100` | - |

### pulls (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE078 | GetPulls | query | `src/services/pulls/usePulls.tsx:132` | SCR052_RepoPullsTab |

### repo (18 operations)

| Code | Method | Path | Handler | Screens |
|------|--------|------|---------|---------|
| ROUTE014 | PATCH | `/{provider}/{owner}/repos/{repo}/` | useUpdateRepo/getRepoPath -- src/services/repo/useUpdateRepo.js:8,13,18 | - |

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE079 | ActivateMeasurements | mutation | `src/services/repo/useActivateMeasurements.tsx:40` | - |
| ROUTE080 | BackfillComponentMemberships | query | `src/services/repo/useComponentsBackfilled.tsx:13` | - |
| ROUTE081 | EncodeSecretString | mutation | `src/services/repo/useEncodeString.tsx:8` | SCR055_RepoYamlTab |
| ROUTE082 | EraseRepository | mutation | `src/services/repo/useEraseRepoContent.tsx:8` | SCR054_RepoGeneralTab |
| ROUTE083 | GetRepo | query | `src/services/repo/useRepo.tsx:40` | SCR041_ViteOnboarding |
| ROUTE084 | BackfillFlagMemberships | query | `src/services/repo/useRepoBackfilled.tsx:13` | - |
| ROUTE085 | ComponentMeasurements | query | `src/services/repo/useRepoComponents.tsx:15` | SCR036_RepoComponentsTab |
| ROUTE086 | RepoComponentsSelector | query | `src/services/repo/useRepoComponentsSelect.tsx:13` | SCR036_RepoComponentsTab |
| ROUTE087 | RepoConfig | query | `src/services/repo/useRepoConfig.tsx:54` | SCR054_RepoGeneralTab, SCR056_BadgesAndGraphsTab |
| ROUTE088 | GetRepoCoverage | query | `src/services/repo/useRepoCoverage.tsx:51` | SCR034_RepoOverviewTab |
| ROUTE089 | FlagMeasurements | query | `src/services/repo/useRepoFlags.tsx:16` | SCR027_PullFlagsTab, SCR035_RepoFlagsTab |
| ROUTE090 | PullFlagsSelect | query | `src/services/repo/useRepoFlagsSelect.tsx:225` | SCR027_PullFlagsTab |
| ROUTE091 | FlagsSelect | query | `src/services/repo/useRepoFlagsSelect.tsx:66` | SCR035_RepoFlagsTab |
| ROUTE092 | GetRepoOverview | query | `src/services/repo/useRepoOverview.tsx:32` | SCR057_DeactivatedRepo |
| ROUTE093 | GetRepoRateLimitStatus | query | `src/services/repo/useRepoRateLimitStatus.tsx:27` | - |
| ROUTE094 | GetRepoSettings | query | `src/services/repo/useRepoSettings.tsx:43` | SCR053_ConfigurationManager |
| ROUTE095 | GetRepoSettingsTeam | query | `src/services/repo/useRepoSettingsTeam.tsx:40` | SCR053_ConfigurationManager |

### repoUploadToken (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE099 | RegenerateRepositoryUploadToken | mutation | `src/services/repoUploadToken/useRegenerateRepoUploadToken.tsx:10` | - |

### repos (2 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE096 | ReposForOwner | query | `src/services/repos/ReposQueryOpts.tsx:61` | SCR006_OwnerPage |
| ROUTE097 | GetReposTeam | query | `src/services/repos/ReposTeamQueryOpts.tsx:58` | SCR006_OwnerPage |

### repositoryToken (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE098 | RegenerateRepositoryToken | mutation | `src/services/repositoryToken/useRegenerateRepositoryToken.js:16` | SCR037_CoverageOnboardingGitHubActions, SCR038_CoverageOnboardingCircleCI, SCR039_CoverageOnboardingOtherCI, SCR054_RepoGeneralTab |

### selfHosted (7 operations)

| Code | Method | Path | Handler | Screens |
|------|--------|------|---------|---------|
| ROUTE001 | GET | `/users` | SelfHostedUserListQueryOpts -- src/services/selfHosted/SelfHostedUserListQueryOpts.ts:40-41 | SCR009_AccountAdminTab, SCR014_AdminAccess |
| ROUTE002 | GET | `/users/current` | SelfHostedCurrentUserQueryOpts -- src/services/selfHosted/SelfHostedCurrentUserQueryOpts.ts:28 | - |
| ROUTE003 | PATCH | `/users/{ownerid}` | MemberTable seat-activation toggle -- src/pages/AdminSettings/AdminMembers/MemberList/MemberTable.tsx:177 | SCR015_AdminMembers |

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE100 | HasAdmins | query | `src/services/selfHosted/SelfHostedHasAdminsQueryOpts.ts:18` | - |
| ROUTE101 | SelfHostedSeatsAndLicense | query | `src/services/selfHosted/SelfHostedSeatsAndLicenseQueryOpts.ts:23` | SCR015_AdminMembers |
| ROUTE102 | Seats | query | `src/services/selfHosted/SelfHostedSeatsConfigQueryOpts.ts:19` | SCR015_AdminMembers |
| ROUTE103 | SelfHostedSettings | query | `src/services/selfHosted/SelfHostedSettingsQueryOpts.tsx:15` | - |

### testAnalytics (5 operations)

> These five queries are declared inside page-local hooks under `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/`
> rather than in `src/services/`, which is why the first inventory pass missed them.

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE118 | GetTestResults | query | `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useInfiniteTestResults/useInfiniteTestResults.tsx:101` | SCR048_FailedTestsPage |
| ROUTE119 | GetTestResultsAggregates | query | `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useTestResultsAggregates/useTestResultsAggregates.tsx:52` | SCR048_FailedTestsPage |
| ROUTE120 | GetFlakeAggregates | query | `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useFlakeAggregates/useFlakeAggregates.tsx:36` | SCR048_FailedTestsPage |
| ROUTE121 | GetTestResultsFlags | query | `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useTestResultsFlags/useTestResultsFlags.tsx:28` | SCR048_FailedTestsPage |
| ROUTE122 | GetTestResultsTestSuites | query | `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useTestResultsTestSuites/useTestResultsTestSuites.tsx:43` | SCR048_FailedTestsPage |

### trial (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE104 | startTrial | mutation | `src/services/trial/useStartTrial.ts:23` | - |

### uploadTokenRequired (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE105 | GetUploadTokenRequired | query | `src/services/uploadTokenRequired/useUploadTokenRequired.tsx:17` | - |

### useIsTeamPlan (1 operation)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE106 | IsTeamPlan | query | `src/services/useIsTeamPlan/useIsTeamPlan.ts:23` | - |

### user (10 operations)

| Code | Method | Path | Handler | Screens |
|------|--------|------|---------|---------|
| ROUTE005 | GET | `/user` | useInternalUser -- src/services/user/useInternalUser.ts:47-48 | - |

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE107 | OwnerTokenlessData | query | `src/services/user/TokenlessQueryOpts.ts:28` | - |
| ROUTE108 | MyContexts | query | `src/services/user/useMyContexts.ts:47` | - |
| ROUTE109 | OnboardUser | mutation | `src/services/user/useOnboardUser.ts:54` | - |
| ROUTE110 | DetailOwner | query | `src/services/user/useOwner.ts:36` | - |
| ROUTE111 | GetOwnerRateLimitStatus | query | `src/services/user/useOwnerRateLimitStatus.tsx:21` | - |
| ROUTE112 | IsSyncing | query | `src/services/user/useResyncUser.ts:19` | SCR002_SyncProviderPage |
| ROUTE113 | SyncData | mutation | `src/services/user/useResyncUser.ts:32` | SCR002_SyncProviderPage |
| ROUTE114 | UpdateProfile | mutation | `src/services/user/useUpdateProfile.ts:109` | SCR008_AccountProfile |
| ROUTE115 | CurrentUser | query | `src/services/user/useUser.ts:138` | SCR008_AccountProfile |

### users (2 operations)

| Code | Method | Path | Handler | Screens |
|------|--------|------|---------|---------|
| ROUTE006 | GET | `/{provider}/{owner}/users/` | useUsers/getPathUsers -- src/services/users/useUsers.js:5-11; useInfiniteUser -- src/services/users/useInfiniteUser.tsx:63-64 | SCR009_AccountAdminTab |
| ROUTE007 | PATCH | `/{provider}/{owner}/users/{targetUserOwnerid}/` | useUpdateUser/patchPathUsers -- src/services/users/useUpdateUser.js:7-38 | - |

### yaml (2 operations)

| Code | Operation | Kind | Source | Screens |
|------|-----------|------|--------|---------|
| ROUTE116 | UpdateYamlConfig | mutation | `src/services/yaml/useUpdateYaml.js:7` | SCR011_AccountYAMLTab |
| ROUTE117 | YamlConfig | query | `src/services/yaml/useYamlConfig.js:9` | SCR011_AccountYAMLTab |

## Response Shapes — Source of Truth

This repo cannot see the backend resolver/serializer code, so the *only* reliable description of
"what comes back" is the client's own `zod` schema, where one exists, plus the GraphQL query
string's selection set (which fields are asked for). Neither is a full backend contract — a field
absent from the query is not proof the backend can't return it, just that this screen doesn't ask.

**Pattern** (representative, `src/services/repo/useRepoOverview.tsx:1-51`, `GetRepoOverview`
/ `ROUTE091`):
- Query string selects `owner.isCurrentUserActivated` and a `repository` union
  (`... on Repository` / `... on NotFoundError`).
- `RequestSchema` (zod, lines 9-30) declares the exact runtime shape the hook trusts: a nullable
  `owner` object, `repository` as `z.discriminatedUnion('__typename', [RepositorySchema,
  RepoNotFoundErrorSchema])`.
- `useRepoOverview` (lines 62+) validates the raw response against `RequestSchema` before handing
  data to the component (typical `.safeParse`/`.parse` call further down the same file).

This query→schema pairing repeats across `src/services/**/*.{ts,tsx}` for every GraphQL hook in
the Endpoints table above (each schema lives beside its hook, often in a `schemas/` subfolder or
inline like `useRepoOverview.tsx`). Any "what shape does X return" claim in a downstream artifact
should cite the zod schema `file:line`, not this document — this document maps *which* operation a
screen calls, not the full response contract of all 103 operations (out of scope per the 800-line
cap; see Coverage Note).

The 13 REST endpoints have no per-call zod schema observed in the domains scanned for this
artifact (`account`, `users`, `selfHosted`, `charts`, `user`, `repo`) — their response shape is
whatever `camelizeKeys(res.json())` returns, consumed directly by the calling hook without a
validation layer.

## Error Handling — Uniform Client Behavior

Both transports funnel failures into the same shape (`{ status, data }`), but the trigger differs:

| | REST (`api.ts:41-55`) | GraphQL (`api.ts:117-140`) |
|---|---|---|
| Non-2xx HTTP | `Promise.reject({ status: res.status, data })` | same reject shape |
| 2xx but app-level error | n/a (REST has no error envelope here) | `data.errors[0]` present even on HTTP 200 |
| Special 403 self-hosted path | not present | `data.errors[0].extensions.status === 403 && config.IS_SELF_HOSTED` → hard redirect `window.location.href = '/login'` (`api.ts:120-126`) before the promise even resolves/rejects — a session-expiry kick-out specific to self-hosted GraphQL |
| Mutation-only throw | n/a | `graphqlMutation` additionally throws (not just rejects) when the unwrapped mutation payload's `error.__typename` is `UnauthenticatedError`/`UnauthorizedError`/`NotFoundError`, explicitly to "get a full page error via NetworkErrorBoundary" (`api.ts:153-163`, comment in source) |

**Presentation layer** — `NetworkErrorBoundary` (`src/layouts/shared/NetworkErrorBoundary/NetworkErrorBoundary.jsx:202-244`) is a class error boundary mounted in every layout (`BaseLayout`, `SidebarLayout`, `EnterpriseLoginLayout`). It catches:
- any rejected `{status}` matching its `errorToUI` map — `400`, `401` ("Please log in", links to `/login`), `403` ("Unauthorized"), `404`, `429` ("Rate limit exceeded"), `500` — each with its own illustration/title/description (lines ~17-50ish, `errorToUI` object at file top).
- any thrown GraphQL error object whose `__typename` is in `graphQLErrorToUI` (`UnauthenticatedError` → "Please log in" link), i.e. exactly the three types `graphqlMutation` promotes to a throw.

**Non-2xx-but-caught custom errors** — a second layer, `rejectNetworkError` (`src/shared/api/rejectNetworkError.ts:1-93`), is a *manually invoked* helper (not automatic on every call) some hooks use to normalize app-level failures — `Parsing Error`→400, `Not Found Error`→404, `Owner Not Activated`→403 — logging a Sentry breadcrumb + message per rejection (`determineSentryLevel`/`determineStatusCode`, lines 34-59) before rejecting in the same `{status, data, dev}` shape `NetworkErrorBoundary` expects. Not every hook calls this — it is a shared utility, not a global interceptor.

## Background Jobs

None owned by this repo. The only `addEventListener`/event-listener markers found (scout-report.md
`## Background Logic Source Inventory`, lines 1967-1984) are browser DOM listeners (mock service
worker, disable-pointer-events hook, code renderer, dropdown, scroll sync) — UI event handling,
not server-side scheduled/queued jobs. Real background jobs (report generation, upload processing,
notifications) live in `codecov/umbrella`, outside this tree, and are not describable from here.

## Webhooks / External Calls

None found as outgoing/incoming HTTP integrations in this repo's own code. Third-party SDKs loaded
client-side (Sentry, Stripe.js via `useCreateStripeSetupIntent`/`ROUTE019`) are browser libraries,
not webhook endpoints this frontend exposes or calls directly — Stripe's own webhook target is
backend-side and not visible here.

## Coverage & Discrepancy Note

- **A count conflict was found here and has since been fixed at its source.** When this
  document was first written, `route-list.md`'s own `## Summary` claimed 16 REST rows and a
  total of 119, while a direct count of its table gave 13 and 116. The orchestrator resolved
  it in `route-list.md` itself: three REST rows that were separate call sites on one endpoint
  were merged into single rows listing their callers, one endpoint missing from the
  enumeration (`PATCH /users/{ownerid}`) was added, and the five Test Analytics queries
  declared in page-local hooks were added. The summary there now reports what its table
  contains. Both documents agree on 122 backend routes, `ROUTE001`-`ROUTE122`.
- **Screen-consumer join is partial by design, not by omission.** 68 of 122 operations (56%) have
  an explicit `SCR###` citation in `screen-list.md`; the other 54 are real, cited endpoints
  (`route-list.md`) reached through hooks that `screen-list.md` — itself compacted to one
  "Data Displayed" line per screen to hold its own 800-line cap — doesn't individually name.
  Inventing a screen association for those 54 would violate the "don't add beyond what you've
  read" rule, so they show `-` rather than a guess.
- **Response-shape depth.** Only one operation (`GetRepoOverview`/`ROUTE091`) is walked in detail
  as the representative zod pattern; asserting all 103 GraphQL response shapes would mean reading
  103 schema files, which the 800-line budget for this artifact cannot carry as prose — each
  domain table's `Source` column is the pointer a later, per-feature spec pass should follow to
  pull the exact shape when it needs one.
- **REST error/response depth.** No zod schemas were found for the 6 domains backing the 13 REST
  calls in the files opened for this pass; a REST-specific schema search across all of
  `src/services/{selfHosted,charts,user,users,account,repo}` was not exhaustive.
