# Route List

**Project**: Athena (Sun* self-hosted Codecov, frontend fork of codecov/gazebo)
**Generated**: 2026-09-08
**Repo shape**: FRONTEND-only SPA (React + react-router-dom v5, Vite + craco). No server code in this repo. "Backend Routes" below enumerates the REST + GraphQL endpoints the frontend calls against the external Codecov API (`config.API_URL`), discovered via Tier-2 static parse (no Tier-1 probe manifest — app was not booted).

## Backend Routes

> **Completeness Contract:** exactly ONE row per leaf route in this file. No resource-summary tables, no `~N`/`(+nhiều)`/`etc.` approximation markers, no wildcard paths beyond what react-router itself declares in source. `Owner F###` is `—` throughout this artifact — feature-list synthesis has not run yet at Wave 1 (`feature_count: <pending-W5>` per session context); a later wave may backfill this column.
>
> REST calls go through the shared wrapper `src/shared/api/api.ts` (`Api.get/post/patch/delete`). Base URL = `${config.API_URL}/internal{path}` (`src/shared/api/helpers.ts:53-54`). GraphQL calls go through `Api.graphql` / `Api.graphqlMutation` (same file, `src/shared/api/api.ts:84-141`), always `POST {config.API_URL}/graphql/:provider` in this codebase — no call site here passes `supportsServiceless: true`, so the serviceless `/graphql/` variant (`api.ts:91,94`) is unused dead-code path, not a live endpoint.

### File: src/shared/api/api.ts (REST wrapper — one row per distinct method+path call site)

| Method | Path | Code | Owner F### | Handler | Middleware |
|--------|------|------|------------|---------|------------|
| GET | /users | ROUTE001 | — | SelfHostedUserListQueryOpts — `src/services/selfHosted/SelfHostedUserListQueryOpts.ts:40-41` | self-hosted admin session (cookie) |
| GET | /users/current | ROUTE002 | — | SelfHostedCurrentUserQueryOpts — `src/services/selfHosted/SelfHostedCurrentUserQueryOpts.ts:28` | self-hosted admin session (cookie) |
| PATCH | /users/{ownerid} | ROUTE003 | — | MemberTable seat-activation toggle — `src/pages/AdminSettings/AdminMembers/MemberList/MemberTable.tsx:177` | self-hosted admin session (cookie) |
| GET | /{provider}/{owner}/{repo}/coverage/tree | ROUTE004 | — | SunburstCoverageQueryOpts — `src/services/charts/SunburstCoverageQueryOpts.ts:9-11,54-55` | provider auth cookie |
| GET | /user | ROUTE005 | — | useInternalUser — `src/services/user/useInternalUser.ts:47-48` | session cookie |
| GET | /{provider}/{owner}/users/ | ROUTE006 | — | useUsers/getPathUsers — `src/services/users/useUsers.js:5-11`; useInfiniteUser — `src/services/users/useInfiniteUser.tsx:63-64` | provider auth cookie |
| PATCH | /{provider}/{owner}/users/{targetUserOwnerid}/ | ROUTE007 | — | useUpdateUser/patchPathUsers — `src/services/users/useUpdateUser.js:7-38` | provider auth cookie |
| DELETE | /{provider}/{owner}/account-details/ | ROUTE008 | — | useEraseAccount/getPathAccountDetails — `src/services/account/useEraseAccount.js:8,14-16` | provider auth cookie |
| PATCH | /{provider}/{owner}/account-details/ | ROUTE009 | — | One endpoint, three callers differing only by request body: useUpgradePlan — `src/services/account/useUpgradePlan.ts:14,30,37`; useAutoActivate — `src/services/account/useAutoActivate.js:6,26,33`; useCancelPlan — `src/services/account/useCancelPlan.js:8,12,18` | provider auth cookie |
| GET | /{provider}/{owner}/account-details/ | ROUTE010 | — | useAccountDetails/getPathAccountDetails — `src/services/account/useAccountDetails.ts:175,187-188` | provider auth cookie |
| PATCH | /{provider}/{owner}/account-details/update_email | ROUTE011 | — | useUpdateBillingEmail — `src/services/account/useUpdateBillingEmail.ts:20,26` | provider auth cookie |
| PATCH | /{provider}/{owner}/account-details/update_payment | ROUTE012 | — | useUpdatePaymentMethod — `src/services/account/useUpdatePaymentMethod.ts:38,79,81` | provider auth cookie |
| PATCH | /{provider}/{owner}/account-details/update_billing_address | ROUTE013 | — | useUpdateBillingAddress — `src/services/account/useUpdateBillingAddress.ts:40,47` | provider auth cookie |
| PATCH | /{provider}/{owner}/repos/{repo}/ | ROUTE014 | — | useUpdateRepo/getRepoPath — `src/services/repo/useUpdateRepo.js:8,13,18` | provider auth cookie |

### File: src/shared/api/api.ts (GraphQL operations — one row per distinct named query/mutation)

> All rows below hit the single GraphQL endpoint `POST /graphql/:provider`. The `Path` column
> appends `#<OperationName>` so each named operation is addressable as its own row; the wire
> path is `/graphql/:provider` in every case. `Handler` cites the operation name, its kind, and the `file:line` where the operation is defined (some are defined once in a shared `constants.ts`/`query.ts` and reused by 1-2 additional hook call sites — those additional call sites are not separately numbered; the operation, not the caller, is the distinct endpoint per the task's completeness rule). `Middleware` = operation kind (`query`|`mutation`); auth is the provider session cookie set via `getHeaders()` (`src/shared/api/helpers.ts:66-84`) for every row, so it is not repeated per row.

| Method | Path | Code | Owner F### | Handler | Middleware |
|--------|------|------|------------|---------|------------|
| POST | /graphql/:provider#MySessions | ROUTE015 | — | MySessions (query) -- src/services/access/SessionsQueryOpts.ts:50 | query |
| POST | /graphql/:provider#DeleteSession | ROUTE016 | — | DeleteSession (mutation) -- src/services/access/useDeleteSession.ts:10 | mutation |
| POST | /graphql/:provider#CreateUserToken | ROUTE017 | — | CreateUserToken (mutation) -- src/services/access/useGenerateUserToken.ts:33 | mutation |
| POST | /graphql/:provider#RevokeUserToken | ROUTE018 | — | RevokeUserToken (mutation) -- src/services/access/useRevokeUserToken.ts:10 | mutation |
| POST | /graphql/:provider#GetAvailablePlans | ROUTE019 | — | GetAvailablePlans (query) -- src/services/account/useAvailablePlans.ts:32 | query |
| POST | /graphql/:provider#CreateStripeSetupIntent | ROUTE020 | — | CreateStripeSetupIntent (mutation) -- src/services/account/useCreateStripeSetupIntent.ts:48 | mutation |
| POST | /graphql/:provider#Invoice | ROUTE021 | — | Invoice (query) -- src/services/account/useInvoice.ts:10 | query |
| POST | /graphql/:provider#Invoices | ROUTE022 | — | Invoices (query) -- src/services/account/useInvoices.ts:70 | query |
| POST | /graphql/:provider#GetPlanData | ROUTE023 | — | GetPlanData (query) -- src/services/account/usePlanData.ts:73 | query |
| POST | /graphql/:provider#SendSentryToken | ROUTE024 | — | SendSentryToken (mutation) -- src/services/account/useSentryToken.tsx:8 | mutation |
| POST | /graphql/:provider#UnverifiedPaymentMethods | ROUTE025 | — | UnverifiedPaymentMethods (query) -- src/services/account/useUnverifiedPaymentMethods.tsx:9 | query |
| POST | /graphql/:provider#UpdateSelfHostedSettings | ROUTE026 | — | UpdateSelfHostedSettings (mutation) -- src/services/account/useUpdateSelfHostedSettings.tsx:14 | mutation |
| POST | /graphql/:provider#RepoATSInfo | ROUTE027 | — | RepoATSInfo (query) -- src/services/ats/useRepoATS.tsx:33 | query |
| POST | /graphql/:provider#GetBranch | ROUTE028 | — | GetBranch (query) -- src/services/branches/useBranch.tsx:49 | query |
| POST | /graphql/:provider#GetBranchComponents | ROUTE029 | — | GetBranchComponents (query) -- src/services/branches/useBranchComponents.tsx:60 | query |
| POST | /graphql/:provider#GetBranches | ROUTE030 | — | GetBranches (query) -- src/services/branches/useBranches.tsx:58 | query |
| POST | /graphql/:provider#GetBranchCommits | ROUTE031 | — | GetBranchCommits (query) -- src/services/branches/useBranchHasCommits.tsx:43 | query |
| POST | /graphql/:provider#BranchBundlesNames | ROUTE032 | — | BranchBundlesNames (query) -- src/services/bundleAnalysis/BranchBundlesNamesQueryOpts.tsx:56 | query |
| POST | /graphql/:provider#BranchBundleSummaryData | ROUTE033 | — | BranchBundleSummaryData (query) -- src/services/bundleAnalysis/BranchBundleSummaryQueryOpts.tsx:78 | query |
| POST | /graphql/:provider#BundleAssets | ROUTE034 | — | BundleAssets (query) -- src/services/bundleAnalysis/BundleAssetsQueryOpts.tsx:117 | query |
| POST | /graphql/:provider#GetBundleTrend | ROUTE035 | — | GetBundleTrend (query) -- src/services/bundleAnalysis/BundleTrendDataQueryOpts.tsx:84 | query |
| POST | /graphql/:provider#CachedBundleList | ROUTE036 | — | CachedBundleList (query) -- src/services/bundleAnalysis/CachedBundlesQueryOpts.tsx:57 | query |
| POST | /graphql/:provider#BundleAssetModules | ROUTE037 | — | BundleAssetModules (query) -- src/services/bundleAnalysis/useBundleAssetModules.tsx:81 | query |
| POST | /graphql/:provider#BundleSummary | ROUTE038 | — | BundleSummary (query) -- src/services/bundleAnalysis/useBundleSummary.tsx:74 | query |
| POST | /graphql/:provider#UpdateBundleCacheConfig | ROUTE039 | — | UpdateBundleCacheConfig (mutation) -- src/services/bundleAnalysis/useUpdateBundleCache.tsx:41 | mutation |
| POST | /graphql/:provider#GetBranchCoverageMeasurements | ROUTE040 | — | GetBranchCoverageMeasurements (query) -- src/services/charts/BranchCoverageMeasurementsQueryOpts.tsx:42 | query |
| POST | /graphql/:provider#GetReposCoverageMeasurements | ROUTE041 | — | GetReposCoverageMeasurements (query) -- src/services/charts/ReposCoverageMeasurementsQueryOpts.ts:22 | query |
| POST | /graphql/:provider#GetCodecovAIAppInstallInfo | ROUTE042 | — | GetCodecovAIAppInstallInfo (query) -- src/services/codecovAI/useCodecovAIInstallation.tsx:16 | query |
| POST | /graphql/:provider#GetCodecovAIInstalledRepos | ROUTE043 | — | GetCodecovAIInstalledRepos (query) -- src/services/codecovAI/useCodecovAIInstalledRepos.tsx:16 | query |
| POST | /graphql/:provider#Commit | ROUTE044 | — | Commit (query) -- src/services/commit/useCommit.tsx:163 | query |
| POST | /graphql/:provider#CommitBADropdownSummary | ROUTE045 | — | CommitBADropdownSummary (query) -- src/services/commit/useCommitBADropdownSummary.tsx:65 | query |
| POST | /graphql/:provider#CommitBundleList | ROUTE046 | — | CommitBundleList (query) -- src/services/commit/useCommitBundleList.tsx:79 | query |
| POST | /graphql/:provider#CommitComponents | ROUTE047 | — | CommitComponents (query) -- src/services/commit/useCommitComponents.tsx:45 | query |
| POST | /graphql/:provider#CommitDropdownSummary | ROUTE048 | — | CommitDropdownSummary (query) -- src/services/commit/useCommitCoverageDropdownSummary.tsx:80 | query |
| POST | /graphql/:provider#GetCommitTeam | ROUTE049 | — | GetCommitTeam (query) -- src/services/commit/useCommitTeam.tsx:164 | query |
| POST | /graphql/:provider#CommitYaml | ROUTE050 | — | CommitYaml (query) -- src/services/commit/useCommitYaml.tsx:35 | query |
| POST | /graphql/:provider#CompareTotals | ROUTE051 | — | CompareTotals (query) -- src/services/commit/useCompareTotals.tsx:83 | query |
| POST | /graphql/:provider#GetCompareTotalsTeam | ROUTE052 | — | GetCompareTotalsTeam (query) -- src/services/commit/useCompareTotalsTeam.tsx:78 | query |
| POST | /graphql/:provider#CommitErrors | ROUTE053 | — | CommitErrors (query) -- src/services/commitErrors/useCommitErrors.tsx:20 | query |
| POST | /graphql/:provider#GetCommits | ROUTE054 | — | GetCommits (query) -- src/services/commits/useCommits.tsx:124 | query |
| POST | /graphql/:provider#ImpactedFileComparedWithParent | ROUTE055 | — | ImpactedFileComparedWithParent (query) -- src/services/comparison/useComparisonForCommitAndParent/query.ts:4 | query |
| POST | /graphql/:provider#GetLoginProviders | ROUTE056 | — | GetLoginProviders (query) -- src/services/config/LoginProvidersQueryOpts.ts:28 | query |
| POST | /graphql/:provider#GetSyncProviders | ROUTE057 | — | GetSyncProviders (query) -- src/services/config/SyncProvidersQueryOpts.ts:27 | query |
| POST | /graphql/:provider#updateDefaultOrganization | ROUTE058 | — | updateDefaultOrganization (mutation) -- src/services/defaultOrganization/useUpdateDefaultOrganization.ts:8 | mutation |
| POST | /graphql/:provider#deleteComponentMeasurements | ROUTE059 | — | deleteComponentMeasurements (mutation) -- src/services/deleteComponentMeasurements/useDeleteComponentMeasurements.ts:18 | mutation |
| POST | /graphql/:provider#deleteFlag | ROUTE060 | — | deleteFlag (mutation) -- src/services/deleteFlag/useDeleteFlag.js:15 | mutation |
| POST | /graphql/:provider#RepoContext | ROUTE061 | — | RepoContext (query) -- src/services/events/hooks.tsx:129 | query |
| POST | /graphql/:provider#OwnerContext | ROUTE062 | — | OwnerContext (query) -- src/services/events/hooks.tsx:63 | query |
| POST | /graphql/:provider#GetOrgUploadToken | ROUTE063 | — | GetOrgUploadToken (query) -- src/services/orgUploadToken/useOrgUploadToken.ts:15 | query |
| POST | /graphql/:provider#RegenerateOrgUploadToken | ROUTE064 | — | RegenerateOrgUploadToken (mutation) -- src/services/orgUploadToken/useRegenerateOrgUploadToken.tsx:10 | mutation |
| POST | /graphql/:provider#BranchContents | ROUTE065 | — | BranchContents (query) -- src/services/pathContents/branch/dir/constants.ts:2 | query |
| POST | /graphql/:provider#CommitPathContents | ROUTE066 | — | CommitPathContents (query) -- src/services/pathContents/commit/dir/constants.ts:56 | query |
| POST | /graphql/:provider#CoverageForFile | ROUTE067 | — | CoverageForFile (query) -- src/services/pathContents/constants.ts:107 | query |
| POST | /graphql/:provider#PullPathContents | ROUTE068 | — | PullPathContents (query) -- src/services/pathContents/pull/dir/constants.ts:85 | query |
| POST | /graphql/:provider#ImpactedFileComparison | ROUTE069 | — | ImpactedFileComparison (query) -- src/services/pull/usePrefetchSingleFileComp.tsx:51 (also defined: src/services/pull/useSingularImpactedFileComparison.tsx:26) | query |
| POST | /graphql/:provider#Pull | ROUTE070 | — | Pull (query) -- src/services/pull/usePull.tsx:200 | query |
| POST | /graphql/:provider#PullBADropdownSummary | ROUTE071 | — | PullBADropdownSummary (query) -- src/services/pull/usePullBADropdownSummary.tsx:66 | query |
| POST | /graphql/:provider#PullBundleComparisonList | ROUTE072 | — | PullBundleComparisonList (query) -- src/services/pull/usePullBundleComparisonList.tsx:75 | query |
| POST | /graphql/:provider#PullBundleHeadList | ROUTE073 | — | PullBundleHeadList (query) -- src/services/pull/usePullBundleHeadList.tsx:63 | query |
| POST | /graphql/:provider#GetPullCompareTotalsTeam | ROUTE074 | — | GetPullCompareTotalsTeam (query) -- src/services/pull/usePullCompareTotalsTeam.tsx:79 | query |
| POST | /graphql/:provider#PullComponentsSelector | ROUTE075 | — | PullComponentsSelector (query) -- src/services/pull/usePullComponents.tsx:18 | query |
| POST | /graphql/:provider#PullCoverageDropdownSummary | ROUTE076 | — | PullCoverageDropdownSummary (query) -- src/services/pull/usePullCoverageDropdownSummary.tsx:60 | query |
| POST | /graphql/:provider#GetPullTeam | ROUTE077 | — | GetPullTeam (query) -- src/services/pull/usePullTeam.tsx:100 | query |
| POST | /graphql/:provider#GetPulls | ROUTE078 | — | GetPulls (query) -- src/services/pulls/usePulls.tsx:132 | query |
| POST | /graphql/:provider#ActivateMeasurements | ROUTE079 | — | ActivateMeasurements (mutation) -- src/services/repo/useActivateMeasurements.tsx:40 | mutation |
| POST | /graphql/:provider#BackfillComponentMemberships | ROUTE080 | — | BackfillComponentMemberships (query) -- src/services/repo/useComponentsBackfilled.tsx:13 | query |
| POST | /graphql/:provider#EncodeSecretString | ROUTE081 | — | EncodeSecretString (mutation) -- src/services/repo/useEncodeString.tsx:8 | mutation |
| POST | /graphql/:provider#EraseRepository | ROUTE082 | — | EraseRepository (mutation) -- src/services/repo/useEraseRepoContent.tsx:8 | mutation |
| POST | /graphql/:provider#GetRepo | ROUTE083 | — | GetRepo (query) -- src/services/repo/useRepo.tsx:40 | query |
| POST | /graphql/:provider#BackfillFlagMemberships | ROUTE084 | — | BackfillFlagMemberships (query) -- src/services/repo/useRepoBackfilled.tsx:13 | query |
| POST | /graphql/:provider#ComponentMeasurements | ROUTE085 | — | ComponentMeasurements (query) -- src/services/repo/useRepoComponents.tsx:15 | query |
| POST | /graphql/:provider#RepoComponentsSelector | ROUTE086 | — | RepoComponentsSelector (query) -- src/services/repo/useRepoComponentsSelect.tsx:13 | query |
| POST | /graphql/:provider#RepoConfig | ROUTE087 | — | RepoConfig (query) -- src/services/repo/useRepoConfig.tsx:54 | query |
| POST | /graphql/:provider#GetRepoCoverage | ROUTE088 | — | GetRepoCoverage (query) -- src/services/repo/useRepoCoverage.tsx:51 | query |
| POST | /graphql/:provider#FlagMeasurements | ROUTE089 | — | FlagMeasurements (query) -- src/services/repo/useRepoFlags.tsx:16 | query |
| POST | /graphql/:provider#PullFlagsSelect | ROUTE090 | — | PullFlagsSelect (query) -- src/services/repo/useRepoFlagsSelect.tsx:225 | query |
| POST | /graphql/:provider#FlagsSelect | ROUTE091 | — | FlagsSelect (query) -- src/services/repo/useRepoFlagsSelect.tsx:66 | query |
| POST | /graphql/:provider#GetRepoOverview | ROUTE092 | — | GetRepoOverview (query) -- src/services/repo/useRepoOverview.tsx:32 | query |
| POST | /graphql/:provider#GetRepoRateLimitStatus | ROUTE093 | — | GetRepoRateLimitStatus (query) -- src/services/repo/useRepoRateLimitStatus.tsx:27 | query |
| POST | /graphql/:provider#GetRepoSettings | ROUTE094 | — | GetRepoSettings (query) -- src/services/repo/useRepoSettings.tsx:43 | query |
| POST | /graphql/:provider#GetRepoSettingsTeam | ROUTE095 | — | GetRepoSettingsTeam (query) -- src/services/repo/useRepoSettingsTeam.tsx:40 | query |
| POST | /graphql/:provider#ReposForOwner | ROUTE096 | — | ReposForOwner (query) -- src/services/repos/ReposQueryOpts.tsx:61 | query |
| POST | /graphql/:provider#GetReposTeam | ROUTE097 | — | GetReposTeam (query) -- src/services/repos/ReposTeamQueryOpts.tsx:58 | query |
| POST | /graphql/:provider#RegenerateRepositoryToken | ROUTE098 | — | RegenerateRepositoryToken (mutation) -- src/services/repositoryToken/useRegenerateRepositoryToken.js:16 | mutation |
| POST | /graphql/:provider#RegenerateRepositoryUploadToken | ROUTE099 | — | RegenerateRepositoryUploadToken (mutation) -- src/services/repoUploadToken/useRegenerateRepoUploadToken.tsx:10 | mutation |
| POST | /graphql/:provider#HasAdmins | ROUTE100 | — | HasAdmins (query) -- src/services/selfHosted/SelfHostedHasAdminsQueryOpts.ts:18 | query |
| POST | /graphql/:provider#SelfHostedSeatsAndLicense | ROUTE101 | — | SelfHostedSeatsAndLicense (query) -- src/services/selfHosted/SelfHostedSeatsAndLicenseQueryOpts.ts:23 | query |
| POST | /graphql/:provider#Seats | ROUTE102 | — | Seats (query) -- src/services/selfHosted/SelfHostedSeatsConfigQueryOpts.ts:19 | query |
| POST | /graphql/:provider#SelfHostedSettings | ROUTE103 | — | SelfHostedSettings (query) -- src/services/selfHosted/SelfHostedSettingsQueryOpts.tsx:15 | query |
| POST | /graphql/:provider#startTrial | ROUTE104 | — | startTrial (mutation) -- src/services/trial/useStartTrial.ts:23 | mutation |
| POST | /graphql/:provider#GetUploadTokenRequired | ROUTE105 | — | GetUploadTokenRequired (query) -- src/services/uploadTokenRequired/useUploadTokenRequired.tsx:17 | query |
| POST | /graphql/:provider#IsTeamPlan | ROUTE106 | — | IsTeamPlan (query) -- src/services/useIsTeamPlan/useIsTeamPlan.ts:23 | query |
| POST | /graphql/:provider#OwnerTokenlessData | ROUTE107 | — | OwnerTokenlessData (query) -- src/services/user/TokenlessQueryOpts.ts:28 | query |
| POST | /graphql/:provider#MyContexts | ROUTE108 | — | MyContexts (query) -- src/services/user/useMyContexts.ts:47 | query |
| POST | /graphql/:provider#OnboardUser | ROUTE109 | — | OnboardUser (mutation) -- src/services/user/useOnboardUser.ts:54 | mutation |
| POST | /graphql/:provider#DetailOwner | ROUTE110 | — | DetailOwner (query) -- src/services/user/useOwner.ts:36 | query |
| POST | /graphql/:provider#GetOwnerRateLimitStatus | ROUTE111 | — | GetOwnerRateLimitStatus (query) -- src/services/user/useOwnerRateLimitStatus.tsx:21 | query |
| POST | /graphql/:provider#IsSyncing | ROUTE112 | — | IsSyncing (query) -- src/services/user/useResyncUser.ts:19 | query |
| POST | /graphql/:provider#SyncData | ROUTE113 | — | SyncData (mutation) -- src/services/user/useResyncUser.ts:32 | mutation |
| POST | /graphql/:provider#UpdateProfile | ROUTE114 | — | UpdateProfile (mutation) -- src/services/user/useUpdateProfile.ts:109 | mutation |
| POST | /graphql/:provider#CurrentUser | ROUTE115 | — | CurrentUser (query) -- src/services/user/useUser.ts:138 | query |
| POST | /graphql/:provider#UpdateYamlConfig | ROUTE116 | — | UpdateYamlConfig (mutation) -- src/services/yaml/useUpdateYaml.js:7 | mutation |
| POST | /graphql/:provider#YamlConfig | ROUTE117 | — | YamlConfig (query) -- src/services/yaml/useYamlConfig.js:9 | query |
| POST | /graphql/:provider#GetTestResults | ROUTE118 | — | GetTestResults (query) -- `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useInfiniteTestResults/useInfiniteTestResults.tsx:101` | query |
| POST | /graphql/:provider#GetTestResultsAggregates | ROUTE119 | — | GetTestResultsAggregates (query) -- `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useTestResultsAggregates/useTestResultsAggregates.tsx:52` | query |
| POST | /graphql/:provider#GetFlakeAggregates | ROUTE120 | — | GetFlakeAggregates (query) -- `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useFlakeAggregates/useFlakeAggregates.tsx:36` | query |
| POST | /graphql/:provider#GetTestResultsFlags | ROUTE121 | — | GetTestResultsFlags (query) -- `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useTestResultsFlags/useTestResultsFlags.tsx:28` | query |
| POST | /graphql/:provider#GetTestResultsTestSuites | ROUTE122 | — | GetTestResultsTestSuites (query) -- `src/pages/RepoPage/FailedTestsTab/FailedTestsPage/hooks/useTestResultsTestSuites/useTestResultsTestSuites.tsx:43` | query |

## Frontend Routes/Pages

> Router: react-router-dom v5 Switch/SentryRoute (Sentry-wrapped Route, src/sentry.ts:72). Top-level table is src/App.tsx's MainAppRoutes (src/App.tsx:83-207). Where a top-level entry is a container that mounts a page which runs its own nested Switch, the container row is listed once and its own leaf paths are enumerated in the page's own subsection below.

### File: src/App.tsx

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /login/:provider | LoginPage (LoginLayout) | login-provider | self-hosted redirects to / instead (src/App.tsx:87, config.IS_SELF_HOSTED, src/config.js:26) |
| /login | LoginPage (LoginLayout) | login | same self-hosted redirect (src/App.tsx:92) |
| /sync (exact) | SyncProviderPage (BaseLayout) | sync | src/App.tsx:100-104 |
| /plan/:provider (exact) | HomePageRedirect (BaseLayout) | plan-provider-redirect | only when not self-hosted (src/App.tsx:112-118) |
| /members/:provider/:owner | MembersPage (BaseLayout) | members | only when not self-hosted (src/App.tsx:126-132); no nested routes |
| /analytics/:provider/:owner (exact) | AnalyticsPage (BaseLayout) | analytics | src/App.tsx:133-137; no nested routes |
| /codecovai/:provider/:owner (exact) | CodecovAIPage (BaseLayout) | codecovai | src/App.tsx:138-142; no nested routes |
| /:provider (exact) | HomePageRedirect (BaseLayout) | provider-home | src/App.tsx:143-147 |
| /:provider/:owner (exact) | OwnerPage (BaseLayout) | owner | src/App.tsx:148-152; no nested routes |
| / (exact) | EnterpriseLandingPage (self-hosted) or HomePageRedirect | root | src/App.tsx:194-202, config.IS_SELF_HOSTED |
| * (catch-all) | HomePageRedirect | catch-all | src/App.tsx:203-205 |

Client-side redirects (not screens, listed for completeness):
- /:provider/:owner/:repo/compare/* to /:provider/:owner/:repo/pull/* (src/App.tsx:153-156)

Container mounts (each expands into its own subsection below):
- /account/:provider/:owner to AccountSettings (src/App.tsx:95-99) - see AccountSettings section
- /admin/:provider to AdminSettings, only when config.IS_SELF_HOSTED (src/App.tsx:105-111, src/config.js:26) - see AdminSettings section
- /plan/:provider/:owner to PlanPage, only when not self-hosted (src/App.tsx:119-125) - see PlanPage section
- /:provider/:owner/:repo/pull/:pullId/tree/:path+ (exact, src/App.tsx:157-161) and /:provider/:owner/:repo/pull/:pullId (src/App.tsx:162-166) to PullRequestPage - see PullRequestPage section
- /:provider/:owner/:repo/commit/:commit/:path+ (exact, src/App.tsx:167-171) and /:provider/:owner/:repo/commit/:commit (exact, src/App.tsx:172-176) to CommitDetailPage - see CommitDetailPage section
- to RepoPage, from seven declared paths (`src/App.tsx:177-193`): /:provider/:owner/:repo/commits/:branch, /:provider/:owner/:repo/tree/:branch, /:provider/:owner/:repo/flags/:branch, /:provider/:owner/:repo/components/:branch, /:provider/:owner/:repo/bundles/:branch, /:provider/:owner/:repo/tests/:branch, and /:provider/:owner/:repo - see RepoPage section

### File: src/pages/AccountSettings/AccountSettings.jsx

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /account/:provider/:owner/ (exact) | Profile or AdminTab or Redirect-to-yaml | account-index | self-hosted+own-settings to Profile; non-self-hosted admin to AdminTab; else Redirect to .../yaml/ (AccountSettings.jsx:47-55) |
| /account/:provider/:owner/okta-access/ (exact) | OktaAccess | account-okta-access | gated on data.plan.isEnterprisePlan (AccountSettings.jsx:36,56-60) |
| /account/:provider/:owner/yaml/ (exact) | YAMLTab | account-yaml | AccountSettings.jsx:61-63 |
| /account/:provider/:owner/access/ (exact) | AccessTab | account-access | gated !IS_SELF_HOSTED or !HIDE_ACCESS_TAB (AccountSettings.jsx:64-68, src/config.js:34-35) |
| /account/:provider/:owner/org-upload-token (exact) | OrgUploadToken or Redirect-to-yaml | account-org-upload-token | admin only, else Redirect (AccountSettings.jsx:69-78) |
| /account/:provider/:owner/* | NotFound | account-not-found | catch-all (AccountSettings.jsx:79-81) |

### File: src/pages/AdminSettings/AdminSettings.jsx

Self-hosted only - reachable only via /admin/:provider, gated by config.IS_SELF_HOSTED (src/App.tsx:105-111).

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /admin/:provider/access (exact) | AdminAccess | admin-access | AdminSettings.jsx:43-45; admin-only, else Redirect to /{provider} (AdminSettings.jsx:57) |
| /admin/:provider/users (exact) | AdminMembers | admin-users | AdminSettings.jsx:46-48 |
| /admin/:provider | Redirect to /admin/:provider/access | admin-fallback | AdminSettings.jsx:49-51 |

### File: src/pages/PlanPage/PlanPage.tsx

Non-self-hosted only - mounted only when not self-hosted (src/App.tsx:119-125); PlanPage itself also redirects to /{provider}/{owner} if self-hosted or user not part of org (PlanPage.tsx:60-62).

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /plan/:provider/:owner (exact) | CurrentOrgPlan | plan-current | PlanPage.tsx:85-87 |
| /plan/:provider/:owner/upgrade (exact) | UpgradePlanPage | plan-upgrade | PlanPage.tsx:88-90 |
| /plan/:provider/:owner/invoices (exact) | InvoicesPage | plan-invoices | PlanPage.tsx:91-93 |
| /plan/:provider/:owner/invoices/:id (exact) | InvoiceDetailsPage | plan-invoice-detail | PlanPage.tsx:94-96 |
| /plan/:provider/:owner/cancel/downgrade (exact) | DowngradePlan | plan-cancel-downgrade | subRoutes/CancelPlanPage/CancelPlanPage.tsx:60-64 |
| /plan/:provider/:owner/cancel (exact) | TeamPlanSpecialOffer or SpecialOffer | plan-cancel | only when showCancelPage (discount not applied + monthly, or team-eligible); else redirected to .../cancel/downgrade (CancelPlanPage.tsx:53-70) |

### File: src/pages/PullRequestPage/PullCoverage/PullCoverage.tsx

Mount gate: src/App.tsx:157-166 (two entries both render PullRequestPage, which always renders PullCoverage - PullRequestPage.tsx:143-161). The leaves below are PullCoverageContent's own Switch (PullCoverage.tsx:68-125), the real router for this screen family.

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /:provider/:owner/:repo/pull/:pullId/tree/:path+ | FileExplorer | pull-tree-path | PullCoverage.tsx:69-77 |
| /:provider/:owner/:repo/pull/:pullId/tree/ | FileExplorer | pull-tree-root | same route array, PullCoverage.tsx:69-77 |
| /:provider/:owner/:repo/pull/:pullId/blob/:path+ | FileViewer | pull-blob | PullCoverage.tsx:79-84 |
| /:provider/:owner/:repo/pull/:pullId/indirect-changes (exact) | IndirectChangesTab | pull-indirect-changes | PullCoverage.tsx:86-93 |
| /:provider/:owner/:repo/pull/:pullId/commits (exact) | CommitsTab | pull-commits | PullCoverage.tsx:94-98 |
| /:provider/:owner/:repo/pull/:pullId/flags (exact) | FlagsTab | pull-flags | PullCoverage.tsx:99-105 |
| /:provider/:owner/:repo/pull/:pullId/components (exact) | ComponentsTab | pull-components | PullCoverage.tsx:106-115 |
| /:provider/:owner/:repo/pull/:pullId (exact) | FilesChangedTab | pull-files-changed | PullCoverage.tsx:116-120 |

### File: src/pages/CommitDetailPage/CommitCoverage/CommitCoverage.jsx

Mount gate: src/App.tsx:167-176 (two entries both render CommitDetailPage to CommitCoverage). The leaves below are CommitRoutes's own Switch (CommitCoverage.jsx:76-111).

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /:provider/:owner/:repo/commit/:commit/tree/:path+ | CommitDetailFileExplorer | commit-tree-path | CommitCoverage.jsx:77-84 |
| /:provider/:owner/:repo/commit/:commit/tree/ | CommitDetailFileExplorer | commit-tree-root | same route array, CommitCoverage.jsx:77-84 |
| /:provider/:owner/:repo/commit/:commit/blob/:path+ | CommitDetailFileViewer | commit-blob | CommitCoverage.jsx:85-91 |
| /:provider/:owner/:repo/commit/:commit (exact) | FilesChangedTab | commit-files-changed | CommitCoverage.jsx:92-94 |
| /:provider/:owner/:repo/commit/:commit/indirect-changes (exact) | IndirectChangesTab | commit-indirect-changes | gated on showIndirectChanges = !(overview.private && isTeamPlan) (CommitCoverage.jsx:71,96-105) |

### File: src/pages/RepoPage/RepoPage.tsx

Mount gate: src/App.tsx:177-193 (one array of 7 :branch-carrying prefixes, all rendering RepoPage). RepoPage.tsx's own Routes() (RepoPage.tsx:52-224) is the real router, branching 3-way on repo state (active+activated / active only / neither). Leaves are the union across all 3 states; state gating is noted per row.

| Path | Component | Route Name | Notes |
|------|-----------|------------|-------|
| /:provider/:owner/:repo (exact) | OverviewTab (via CoverageTab) | repo-overview | coverage enabled, active+activated repo (RepoPage.tsx:76-96, CoverageTab.tsx:61-71) |
| /:provider/:owner/:repo/tree/:branch (exact) | OverviewTab | repo-tree-branch | RepoPage.tsx:86, CoverageTab.tsx:65 |
| /:provider/:owner/:repo/tree/:branch/:path+ (exact) | OverviewTab | repo-tree-branch-path | RepoPage.tsx:87, CoverageTab.tsx:66 |
| /:provider/:owner/:repo/blob/:ref/:path+ (exact) | OverviewTab | repo-blob | RepoPage.tsx:85, CoverageTab.tsx:64 |
| /:provider/:owner/:repo/flags (exact) | FlagsTab | repo-flags | RepoPage.tsx:79-83, CoverageTab.tsx:43-51 |
| /:provider/:owner/:repo/flags/:branch (exact) | FlagsTab | repo-flags-branch | same route array |
| /:provider/:owner/:repo/components (exact) | ComponentsTab | repo-components | RepoPage.tsx:83-84, CoverageTab.tsx:52-60 |
| /:provider/:owner/:repo/components/:branch (exact) | ComponentsTab | repo-components-branch | same route array |
| /:provider/:owner/:repo/new (exact) | NewRepoTab | repo-new | coverage NOT enabled branch (RepoPage.tsx:97-107, CoverageOnboarding/NewRepoTab.tsx:108-110); also fallback for fully-inactive repo (RepoPage.tsx:227-231) |
| /:provider/:owner/:repo/new/circle-ci (exact) | NewRepoTab (CircleCI step) | repo-new-circle-ci | NewRepoTab.tsx:111-113 |
| /:provider/:owner/:repo/new/other-ci (exact) | NewRepoTab (OtherCI step) | repo-new-other-ci | NewRepoTab.tsx:114-118 |
| /:provider/:owner/:repo/bundles (exact) | BundlesTab | repo-bundles | bundle analysis enabled (RepoPage.tsx:109-123) |
| /:provider/:owner/:repo/bundles/:branch (exact) | BundlesTab (BundleContent) | repo-bundles-branch | same route array; sub-switch in BundleContent.tsx:73-96 selects chart vs empty-table, same URL |
| /:provider/:owner/:repo/bundles/:branch/:bundle (exact) | BundlesTab (BundleContent) | repo-bundles-branch-bundle | same route array |
| /:provider/:owner/:repo/bundles/new (exact) | BundleOnboarding | repo-bundles-new | bundle analysis NOT enabled + JS/TS present (RepoPage.tsx:124-138, BundleOnboarding.tsx:169-171) |
| /:provider/:owner/:repo/bundles/new/rollup | BundleOnboarding (RollupOnboarding) | repo-bundles-new-rollup | BundleOnboarding.tsx:172-174 |
| /:provider/:owner/:repo/bundles/new/webpack | BundleOnboarding (WebpackOnboarding) | repo-bundles-new-webpack | BundleOnboarding.tsx:175-177 |
| /:provider/:owner/:repo/bundles/new/remix-vite | BundleOnboarding (RemixOnboarding) | repo-bundles-new-remix-vite | BundleOnboarding.tsx:178-180 |
| /:provider/:owner/:repo/bundles/new/nuxt | BundleOnboarding (NuxtOnboarding) | repo-bundles-new-nuxt | BundleOnboarding.tsx:181-183 |
| /:provider/:owner/:repo/bundles/new/sveltekit | BundleOnboarding (SvelteKitOnboarding) | repo-bundles-new-sveltekit | BundleOnboarding.tsx:187-189 |
| /:provider/:owner/:repo/bundles/new/solidstart | BundleOnboarding (SolidStartOnboarding) | repo-bundles-new-solidstart | BundleOnboarding.tsx:184-186 |
| /:provider/:owner/:repo/tests (exact) | FailedTestsTab | repo-tests | gated isCurrentUserPartOfOrg or testAnalyticsEnabled (RepoPage.tsx:140-152) |
| /:provider/:owner/:repo/tests/new (exact) | FailedTestsTab (onboarding) | repo-tests-new | FailedTestsTab.tsx:156-158 |
| /:provider/:owner/:repo/tests/new/codecov-cli (exact) | FailedTestsTab (CodecovCLI step) | repo-tests-new-cli | FailedTestsTab.tsx:159-161 |
| /:provider/:owner/:repo/tests/:branch (exact) | FailedTestsTab | repo-tests-branch | same route array |
| /:provider/:owner/:repo/commits (exact) | CommitsTab | repo-commits | gated productEnabled && userAuthorizedtoViewRepo (RepoPage.tsx:153-160) |
| /:provider/:owner/:repo/commits/:branch (exact) | CommitsTab | repo-commits-branch | same route array |
| /:provider/:owner/:repo/pulls (exact) | PullsTab | repo-pulls | same gate (RepoPage.tsx:161-165) |
| /:provider/:owner/:repo/config (exact) | ConfigurationManager | repo-config | RepoPage.tsx:169-171 mounts ConfigTab, whose own Switch (ConfigTab.tsx:51-67) is the real router |
| /:provider/:owner/:repo/config/general (exact) | GeneralTab | repo-config-general | ConfigTab.tsx:55-57 |
| /:provider/:owner/:repo/config/yaml (exact) | YamlTab | repo-config-yaml | ConfigTab.tsx:58-60 |
| /:provider/:owner/:repo/config/badge (exact) | BadgesAndGraphsTab | repo-config-badge | ConfigTab.tsx:61-63 |
| /:provider/:owner/:repo/config/* | NotFound | repo-config-not-found | catch-all, gated on currentOwner.isCurrentUserPartOfOrg (ConfigTab.tsx:32,64-66) |

Repo-state notes (not separate leaf rows - same paths, different component, gated by repo activation state):
- Deactivated repo (isRepoActive && !isRepoActivated): /:provider/:owner/:repo and /:provider/:owner/:repo/bundles render DeactivatedRepo instead (RepoPage.tsx:196-201); /config still renders ConfigTab.
- Fully inactive repo (!isRepoActive): only /new*, /tests*, /bundles/new*, /config are reachable; everything else redirects to /new (RepoPage.tsx:203-224).

Client-side redirects under RepoPage (not screens):
- {path}/compare to {path}/pulls (RepoPage.tsx:166-168)
- {path}/bundles to {path}/bundles/new when bundle analysis disabled + JS/TS present (RepoPage.tsx:173-178)
- {path}/tests/new/* to {path}/tests/new (RepoPage.tsx:179)
- {path} and {path}/* to {path}/new when coverage disabled (RepoPage.tsx:180-183)
- /:provider/:owner/:repo/* to /:provider/:owner/:repo catch-all (RepoPage.tsx:184-187)

## Summary

> REST count reflects one row per distinct endpoint. Three call sites that share an
> endpoint with an existing row (useInfiniteUser on the users endpoint; useAutoActivate and
> useCancelPlan on the account-details PATCH) are listed as additional callers inside that
> endpoint's Handler cell rather than as separate rows.

| Category | Count |
|----------|-------|
| Backend Routes - REST (src/shared/api/api.ts) | 14 |
| Backend Routes - GraphQL operations (POST /graphql/:provider) | 108 |
| Backend Routes Total (ROUTE001-ROUTE122) | 122 |
| Frontend Pages/Leaf Routes (App.tsx + AccountSettings + AdminSettings + PlanPage + PullCoverage + CommitCoverage + RepoPage) | 72 |
| Total | 194 |

Notes on the frontend count (72): 11 App.tsx standalone/exact entries + 6 AccountSettings leaves + 3 AdminSettings leaves + 6 PlanPage leaves + 8 PullCoverage leaves + 5 CommitCoverage leaves + 33 RepoPage leaves (8 coverage + 3 onboarding + 3 bundles + 7 bundle-onboarding + 4 tests + 2 commits + 1 pulls + 5 config) = 72. App.tsx's 5 container-mount declarations (account, admin, plan, pull x2, commit x2, repo x1 array) are cited as mount gates in prose, not double-counted as leaf rows.
