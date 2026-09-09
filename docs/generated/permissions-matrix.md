# Permissions Matrix

**Project**: Athena (Sun* self-hosted Codecov, frontend fork of codecov/gazebo)
**Generated**: 2026-09-08
**Analysis Scope**: FRONTEND-only SPA. Every gate documented below is a CLIENT-side check
(conditional render / redirect in React) discovered by reading the frontend source. This repo
contains no backend code, so no gate here can be verified as server-enforced — where real
enforcement must live server-side, the item says so explicitly rather than implying the
frontend check is sufficient on its own.

> **Raw PERM### matrix.** Machine-generated inventory of every client-side access-control gate.
> The plain-language curated view lives at [permissions.md](./permissions.md). This file was
> written first; permissions.md is derived from it.

**Code Format**: `PERM###_NameSlug`

**Three access layers in this codebase** (kept separate throughout, per this pass's scope):
1. **Git-provider identity / org membership** — `isCurrentUserPartOfOrg`, sourced from the
   external VCS provider (GitHub/GitLab/Bitbucket) via the backend, surfaced to the frontend as
   a boolean on `owner`/`repo` GraphQL responses.
2. **Athena roles** — `isAdmin`. Two DISTINCT roles share this name in code: **org admin**
   (`owner.isAdmin` from the `DetailOwner` GraphQL query, org-scoped, non-self-hosted only) and
   **self-hosted instance admin** (`SelfHostedCurrentUserQueryOpts.isAdmin` from `GET
   /users/current`, instance-scoped, self-hosted only). Never conflated below.
3. **Self-hosted build gating** — `config.IS_SELF_HOSTED` (`src/config.js:26`, true when
   `ENV=enterprise`) and `config.HIDE_ACCESS_TAB` (`src/config.js:34-35`). This is a deploy-time
   toggle, not a permission — it removes whole screens outright. Documented in its own section
   below, never mixed into the PERM### index.

**Permission Types** (only types actually observed are used): `route-guard`, `role-based`,
`screen-permission`, `data-permission`, `action-permission`, `feature-flag`. Not observed in
this codebase: `resource-ownership`, `field-permission`, `api-scope`, `experiment`,
`env-gate` (see Build Gating section — `IS_SELF_HOSTED`/`HIDE_ACCESS_TAB` are deliberately
excluded from `env-gate` PERM treatment per this task's scope), `locale-gate`.

## Permissions Index

| Code | Name | Type | Enforced At |
|------|------|------|-------------|
| PERM001 | GlobalOrgSyncAndToSGate | route-guard | client (all `BaseLayout` screens) |
| PERM002 | SelfHostedInstanceAdminAccess | role-based | client |
| PERM003 | OrgMembershipGateRepoConfig | route-guard | client |
| PERM004 | OrgMembershipGateRepoTabVisibility | screen-permission | client |
| PERM005 | PrivateRepoActivationGateCommitsPulls | data-permission | client |
| PERM006 | TestAnalyticsAccessGate | screen-permission | client |
| PERM007 | OrgMembershipGatePlanPages | route-guard | client |
| PERM008 | OrgMembershipGateMembersPageTabNav | screen-permission | client |
| PERM009 | OrgAdminOnlyAccountAdminTab | role-based | client |
| PERM010 | OrgAdminOnlyOrgUploadToken | action-permission | client |
| PERM011 | EnterprisePlanGateOktaAccess | screen-permission | client |
| PERM012 | CodecovAITabFeatureFlag | feature-flag | client |
| PERM013 | OrgAdminOnlyRepoFlagComponentDelete | action-permission | client |

---

## PERM001: GlobalOrgSyncAndToSGate

**Type**: route-guard
**Enforced At**: client - wraps every screen mounted under BaseLayout. Server must
independently reject actions until ToS is accepted / an org is synced; not verifiable in this
repo.

### Description

First checkpoint after login, evaluated on every BaseLayout-wrapped screen. Non-self-hosted
users who have not agreed to Terms of Service see a ToS interstitial instead of the requested
screen; users with zero synced git-provider orgs get redirected to /sync. Gates git-provider
identity (synced-org count) and account compliance (ToS) - not an Athena role.

**Source**: src/layouts/BaseLayout/hooks/useUserAccessGate.js:74-105, consumed at
src/layouts/BaseLayout/BaseLayout.tsx:70-125

### Related Screens

- SCR002_SyncProviderPage (redirect target)
- All other authenticated screens (global wrapper, not enumerated individually)

### Permission Rules

| Segment | Allow | Conditions |
|---------|-------|------------|
| ToS not agreed (non-self-hosted) | fail | ToS interstitial renders in place of children; no distinct SCR |
| Zero synced orgs, not already on /sync | fail | redirect to SCR002_SyncProviderPage |
| Self-hosted user | pass | ToS half of the check is skipped entirely (!config.IS_SELF_HOSTED guard) |
| ToS agreed + >=1 synced org | pass | full experience, screen renders |

### Related Modules

- useUserAccessGate.js
- BaseLayout.tsx

---

## PERM002: SelfHostedInstanceAdminAccess

**Type**: role-based
**Enforced At**: client only - GET /users/current itself needs a valid session cookie
server-side, but the isAdmin branch that decides what renders is a frontend redirect; real
authorization enforcement must be server-side.

### Description

Self-hosted only. This is the self-hosted instance admin role
(SelfHostedCurrentUserQueryOpts.isAdmin, from GET /users/current) - a SEPARATE role from
the org-scoped admin in PERM009/PERM010, even though both are named isAdmin in code. Gates
the instance-wide access/member-activation screens and the header "Admin" nav link.

**Source**: src/pages/AdminSettings/AdminSettings.jsx:29-58; nav-link mirror at
src/layouts/Header/components/AdminLink/AdminLink.tsx:16-18

### Related Routes

- (GET) /users/current (ROUTE002)
- (GET) /users (ROUTE001)

### Related Screens

- SCR014_AdminAccess
- SCR015_AdminMembers

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Self-Hosted Instance Admin | pass | data?.isAdmin === true |
| Any other self-hosted user | fail | redirect to /{provider} (SCR006_OwnerPage); header "Admin" nav link also hidden |

### Related Modules

- AdminSettings.jsx, AdminAccessTable, AdminMembers/MemberList, AdminLink.tsx

---

## PERM003: OrgMembershipGateRepoConfig

**Type**: route-guard
**Enforced At**: client only (renders NotFound in place of the route) - real enforcement must
be server-side.

### Description

Non-members of the repo's org see a 404 instead of any Config-tab screen - including
destructive actions in RepoGeneralTab (Erase Repo, Deactivate Repo). No additional admin check
was found for those destructive actions beyond plain org membership.

**Source**: src/pages/RepoPage/ConfigTab/ConfigTab.tsx:32

### Related Screens

- SCR053_ConfigurationManager
- SCR054_RepoGeneralTab
- SCR055_RepoYamlTab
- SCR056_BadgesAndGraphsTab
- SCR058_NotFound (fallback target)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Member | pass | full Config tab family, including Erase/Deactivate Repo - no extra admin check found client-side |
| Non-Member | fail | SCR058_NotFound rendered instead |

### Related Modules

- ConfigTab.tsx, GeneralTab (DangerZone)

---

## PERM004: OrgMembershipGateRepoTabVisibility

**Type**: screen-permission
**Enforced At**: client only.

### Description

Controls which top-level repo tabs (Coverage, Bundles, Tests, Commits, Pulls, Config) render in
the repo nav, combining org membership with whether the underlying product (coverage / bundle /
test analytics) is already enabled for the repo.

**Source**: src/pages/RepoPage/RepoPageTabs.tsx:72-133

### Related Routes

- (POST) GetRepo (ROUTE083)

### Related Screens

- SCR034_RepoOverviewTab, SCR035_RepoFlagsTab, SCR036_RepoComponentsTab, SCR040_BundleContent,
  SCR048_FailedTestsPage, SCR051_RepoCommitsTab, SCR052_RepoPullsTab, SCR053_ConfigurationManager

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Member | pass | all applicable tabs shown regardless of product-enabled state |
| Non-Member | conditional | tab shown ONLY if the product is already enabled for that repo (coverageEnabled, jsOrTsPresent, etc.); otherwise hidden |

### Related Modules

- RepoPageTabs.tsx

---

## PERM005: PrivateRepoActivationGateCommitsPulls

**Type**: data-permission
**Enforced At**: client only.

### Description

On a private repo, the Commits and Pulls tabs require the current user to be "activated"
(seat-based) on that repo. On a public repo, anyone reaching the route can view them.

**Source**: src/pages/RepoPage/RepoPage.tsx:63-70,153-165

### Related Routes

- (POST) GetCommits (ROUTE054)
- (POST) GetPulls (ROUTE078)

### Related Screens

- SCR051_RepoCommitsTab
- SCR052_RepoPullsTab

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Activated user, private repo | pass | isRepoPrivate && isCurrentUserActivated |
| Any user, public repo | pass | !isRepoPrivate |
| Non-activated user, private repo | fail | tabs omitted from the route Switch entirely |

### Related Modules

- RepoPage.tsx

---

## PERM006: TestAnalyticsAccessGate

**Type**: screen-permission
**Enforced At**: client only.

### Description

The Test Analytics dashboard is visible to org members unconditionally, and to non-members only
once test analytics is already enabled for the repo; otherwise non-members see an
ActivationAlert in its place (not a separate routed screen).

**Source**: src/pages/RepoPage/RepoPage.tsx:140-152;
src/pages/RepoPage/FailedTestsTab/FailedTestsTab.tsx:128,138-141

### Related Routes

- (POST) GetRepoOverview (ROUTE092)

### Related Screens

- SCR048_FailedTestsPage

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Member | pass | always, regardless of testAnalyticsEnabled |
| Non-Member | conditional | only if testAnalyticsEnabled is already true; else ActivationAlert shown instead |

### Related Modules

- RepoPage.tsx, FailedTestsTab.tsx

---

## PERM007: OrgMembershipGatePlanPages

**Type**: route-guard
**Enforced At**: client only.

### Description

The billing/plan screen family requires org membership. (The self-hosted half of this same
conditional is build gating, not a permission - see the Build Gating section below.)

**Source**: src/pages/PlanPage/PlanPage.tsx:60

### Related Routes

- (POST) GetPlanData (ROUTE023)

### Related Screens

- SCR016_CurrentOrgPlan, SCR017_UpgradePlanPage, SCR018_InvoicesPage, SCR019_InvoiceDetailsPage,
  SCR020_DowngradePlan, SCR021_TeamPlanSpecialOffer, SCR022_SpecialOffer

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Member (non-self-hosted) | pass | |
| Non-Member | fail | redirect to SCR006_OwnerPage |

### Related Modules

- PlanPage.tsx

---

## PERM008: OrgMembershipGateMembersPageTabNav

**Type**: screen-permission
**Enforced At**: client only.

### Description

The member-activation page renders for any authenticated user reaching the route, but the
shared sibling-tab nav (Repos / Analytics / Codecov AI / Members / Plan / Settings) only appears
for org members.

**Source**: src/pages/MembersPage/MembersPage.jsx:22

### Related Screens

- SCR003_MembersPage

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Member | pass | sibling-tab nav renders |
| Non-Member | partial | page content still renders; sibling-tab nav hidden |

### Related Modules

- MembersPage.jsx, MembersPage/Tabs/Tabs.tsx

---

## PERM009: OrgAdminOnlyAccountAdminTab

**Type**: role-based
**Enforced At**: client only.

### Description

Resolves which screen renders at the account-settings root route by combining an ownership
check ("is this your own account") with the org admin role (non-self-hosted only). This org
admin role (useIsCurrentUserAnAdmin -> GraphQL DetailOwner.owner.isAdmin) is SEPARATE from
the self-hosted instance-admin role in PERM002.

**Source**: src/pages/AccountSettings/AccountSettings.jsx:32,48-52

### Related Routes

- (POST) DetailOwner (ROUTE110)

### Related Screens

- SCR008_AccountProfile, SCR009_AccountAdminTab, SCR011_AccountYAMLTab (fallback redirect target)

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Viewing own account (self-hosted) | pass | renders SCR008_AccountProfile |
| Org Admin (non-self-hosted) | pass | renders SCR009_AccountAdminTab |
| Neither | fail | redirect to SCR011_AccountYAMLTab |

### Related Modules

- AccountSettings.jsx, AccountSettingsSideMenu.jsx (mirrors nav-link visibility)

---

## PERM010: OrgAdminOnlyOrgUploadToken

**Type**: action-permission
**Enforced At**: client only.

### Description

Regenerating the org-wide upload token is restricted to the org admin role (same role as
PERM009).

**Source**: src/pages/AccountSettings/AccountSettings.jsx:69-78

### Related Routes

- (GET) GetOrgUploadToken (ROUTE063)
- (POST) RegenerateOrgUploadToken (ROUTE064)

### Related Screens

- SCR013_OrgUploadToken

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Admin | pass | |
| Ordinary Org Member | fail | redirect to SCR011_AccountYAMLTab |

### Related Modules

- AccountSettings.jsx

---

## PERM011: EnterprisePlanGateOktaAccess

**Type**: screen-permission
**Enforced At**: client only.

### Description

Not a role check - a plan-tier attribute gate. The Okta SSO configuration screen only appears
for orgs on an Enterprise plan, regardless of admin/member status.

**Source**: src/pages/AccountSettings/AccountSettings.jsx:36,56-60

### Related Screens

- SCR010_OktaAccess

### Permission Rules

| Attribute | Allow | Conditions |
|-----------|-------|------------|
| Enterprise-plan org | pass | data.plan.isEnterprisePlan === true |
| Any other plan tier | fail | route not registered in the Switch at all |

### Related Modules

- AccountSettings.jsx

---

## PERM012: CodecovAITabFeatureFlag

**Type**: feature-flag
**Trigger**: evaluated on mount of the shared owner-level Tabs nav
**Source**: src/pages/OwnerPage/Tabs/Tabs.tsx:13-14,28-38 (duplicated at
src/pages/MembersPage/Tabs/Tabs.tsx:8-17, src/pages/AnalyticsPage/Tabs/Tabs.tsx:8-17,
src/pages/PlanPage/Tabs/Tabs.tsx:8-17)
**Effect**: codecovAiFeaturesTab=true -> "Codecov AI" tab (beta badge) shown in nav, linking to
SCR005_CodecovAIPage; false (default fallback) -> tab hidden

### Related Screens

- SCR005_CodecovAIPage

---

## PERM013: OrgAdminOnlyRepoFlagComponentDelete

**Type**: action-permission
**Enforced At**: client only - the delete button's visibility is a frontend conditional; the
underlying delete mutations must independently re-check authorization server-side, not
verifiable in this repo.

### Description

Gates the per-row delete button (trash icon) in the repo-level Flags table and Components
table. Reads `repoData?.isAdmin`, which is the return value of `useRepo()`
(`src/services/repo/useRepo.tsx:122`) resolving the `owner.isAdmin` field of the `GetRepo`
GraphQL query (`src/services/repo/useRepo.tsx:39-42`).

**This is NOT a third, distinct role.** `owner.isAdmin` here is the same org-admin permission
already documented as PERM009/PERM010 (`useIsCurrentUserAnAdmin` -> `DetailOwner.owner.isAdmin`,
`src/services/user/useOwner.ts:36,42`) - both call sites request the identical backend field
(`Owner.isAdmin`) for the same current-user/org pair, just through two independent GraphQL
queries (`DetailOwner` vs `GetRepo`) with two separate frontend cache entries. What was
previously undocumented is not a new role, but a new ACTION SURFACE that role gates: deleting a
flag or a component from the repo Coverage tab, which no existing PERM entry covers.

**Source**: src/pages/RepoPage/CoverageTab/FlagsTab/subroute/FlagsTable/FlagsTable.tsx:107;
src/pages/RepoPage/CoverageTab/FlagsTab/subroute/FlagsTable/hooks/useRepoFlagsTable.ts:48-53,78;
src/pages/RepoPage/CoverageTab/ComponentsTab/subroute/ComponentsTable/ComponentsTable.tsx:178;
src/pages/RepoPage/CoverageTab/ComponentsTab/subroute/ComponentsTable/hooks/useRepoComponentsTable.ts:48-53

### Related Routes

- (POST) GetRepo (ROUTE083)

### Related Screens

- SCR035_RepoFlagsTab
- SCR036_RepoComponentsTab

### Permission Rules

| Role | Allow | Conditions |
|------|-------|------------|
| Org Admin (owner.isAdmin === true, via GetRepo) | pass | delete (trash icon) button rendered on each Flags/Components table row |
| Ordinary Org Member / non-member | fail | `delete` column renders `null`; no button, no client-side path to the delete modal or mutation |

### Related Modules

- FlagsTable.tsx, useRepoFlagsTable.ts, DeleteFlagModal
- ComponentsTable.tsx, useRepoComponentsTable.ts, DeleteComponentModal

---

## Build Gating (NOT a Permission)

`config.IS_SELF_HOSTED` (`src/config.js:26`, true when `ENV=enterprise`) and
`config.HIDE_ACCESS_TAB` (`src/config.js:34-35`) are deploy-time toggles baked in at build/deploy
time, not runtime authorization decisions about a signed-in user. Grouped here, separate from
the PERM### index, per this task's scope.

### IS_SELF_HOSTED effects

| Screen(s) affected | Effect | Source |
|---------------------|--------|--------|
| SCR001_LoginPage | absent - redirects to `/` on self-hosted | `src/App.tsx:87,92` |
| SCR007_EnterpriseLandingPage | present ONLY on self-hosted (login route otherwise renders `HomePageRedirect`) | `src/App.tsx:194-198` |
| SCR003_MembersPage | absent - `MembersPage.jsx` redirects to `/{provider}/{owner}` | `src/pages/MembersPage/MembersPage.jsx:16-18` |
| SCR016-SCR022 (PlanPage family) | absent - `PlanPage.tsx` redirects (self-hosted half of the same conditional as PERM007) | `src/pages/PlanPage/PlanPage.tsx:60` |
| SCR014_AdminAccess, SCR015_AdminMembers | present ONLY on self-hosted; route omitted entirely otherwise | `src/App.tsx:105-111` |
| Owner-nav tabs (Members, Plan) | both tabs omitted from nav entirely on self-hosted | `src/pages/OwnerPage/Tabs/Tabs.tsx:40-42` (same pattern replicated in `MembersPage/Tabs`, `AnalyticsPage/Tabs`, `PlanPage/Tabs`) |
| SCR008_AccountProfile vs SCR009_AccountAdminTab | which one renders at the account root branches first on `IS_SELF_HOSTED`, before the PERM009 ownership/admin check applies | `src/pages/AccountSettings/AccountSettings.jsx:48-52` |

### HIDE_ACCESS_TAB effects (self-hosted only, independent second toggle)

| Screen(s) affected | Effect | Source |
|---------------------|--------|--------|
| SCR012_AccountAccessTab | present only if `!IS_SELF_HOSTED \|\| !HIDE_ACCESS_TAB` | `src/pages/AccountSettings/AccountSettings.jsx:64` |
| Account side-menu "Access" link | mirrors the same toggle | `src/pages/AccountSettings/AccountSettingsSideMenu.jsx:19` |

### Guard mechanics reference

No `canActivate`/route-guard framework hook exists in this react-router-dom v5 codebase; every
gate above and in the PERM### index is a plain conditional JSX / early `<Redirect>` inside the
page component. Full route-omission mechanics for `IS_SELF_HOSTED`: `screen-flow.md` GUARD-001
(`src/App.tsx:87,92,105-132`).

---

## Summary

- **Total Permission Items**: 13 (PERM001-PERM013, contiguous, no gaps, no duplicates)
- **By Type**: route-guard: 3, screen-permission: 4, role-based: 2, data-permission: 1,
  action-permission: 2, feature-flag: 1, resource-ownership: 0, field-permission: 0,
  api-scope: 0, experiment: 0, env-gate: 0, locale-gate: 0
- **Build-gating items** (not counted as permissions): 2 config flags (`IS_SELF_HOSTED`,
  `HIDE_ACCESS_TAB`) affecting 9 screens + 4 nav-tab components, documented above

---

## Cross-Reference Validation

- [x] All PERM### codes are unique (PERM001-PERM013)
- [x] All PERM### codes are referenced in FeatureList.md - verified after Wave 5: all 13 permissions are cited by a feature
- [x] All related route references are valid (ROUTE001, ROUTE002, ROUTE022, ROUTE053, ROUTE062,
      ROUTE063, ROUTE077, ROUTE082, ROUTE083, ROUTE091, ROUTE109 all present in route-list.md)
- [x] All related screen references are valid (SCR002, SCR003, SCR005, SCR006, SCR008, SCR009,
      SCR010, SCR011, SCR013, SCR014-SCR022, SCR034-SCR036, SCR040, SCR048, SCR051-SCR056, SCR058
      all present in screen-list.md; SCR035/SCR036 also referenced by PERM013)
- [x] All related module references are valid (verified by direct Read/Grep against the source
      tree during this pass)
- [x] No orphaned permission references
- [x] Both distinct `isAdmin` roles (org admin vs self-hosted instance admin) are named
      differently in this document and never merged into one role
- [x] PERM013's `owner.isAdmin` (via `GetRepo`) confirmed as the SAME org-admin role as
      PERM009/PERM010 (via `DetailOwner`), not a third role - verified by reading both
      GraphQL query bodies and the shared `Owner.isAdmin` field they request
