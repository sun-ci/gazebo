# Permissions

**Project**: Athena (Sun* self-hosted Codecov, frontend fork of codecov/gazebo)
**Generated**: 2026-09-08
**Analysis Scope**: FRONTEND-only SPA. Every rule below is enforced by the React app deciding
what to render or where to redirect - none of it is a server-side security boundary that this
repo can prove. Wherever a rule matters for security (destructive actions, tokens, admin
screens), assume the real check must also live on the backend; this document only describes
what the frontend does today.

> **Curated, plain-language view.** The raw PERM### matrix with file:line citations lives at
> [permissions-matrix.md](./permissions-matrix.md). This document is derived from it.

## Authorization System Type

**System Type**: hybrid

Athena combines three separate kinds of access control, and mixing them up is the most common
way to misread this system:

1. **Who you are, per the git provider** - GitHub/GitLab/Bitbucket tells Athena whether you
   belong to an organization. Athena calls this "org membership" and uses it everywhere as the
   first, broadest gate.
2. **What role you hold inside Athena** - on top of org membership, Athena distinguishes an
   ordinary member from an admin. There are actually TWO admin roles that never overlap:
   an **org admin** (scoped to one org, only exists when the instance is NOT self-hosted) and a
   **self-hosted instance admin** (scoped to the whole self-hosted install, only exists when it
   IS self-hosted). The code names both `isAdmin`, but they come from different data and control
   different screens - this document keeps them apart throughout.
3. **What the deploy itself allows** - a small number of screens simply do not exist depending
   on how the instance was deployed (self-hosted vs. not). This is not a permission at all; see
   Special Conditions below.

**Identified Roles**:
- Non-Member (authenticated, but not part of the org whose data they're trying to view)
- Org Member (ordinary, non-admin)
- Org Admin (self-hosted instances never have this role)
- Self-Hosted Instance Admin (non-self-hosted instances never have this role)

## Curated View

- **Non-Member** can browse a repo's coverage/bundle/test screens only once that product is
  already turned on for the repo, and only if the repo is public (or they're an activated,
  paying seat on a private repo). They cannot open any repo Config screen, any Plan/billing
  screen, or the org-admin account screen - they get a 404 or a redirect instead. On the
  Members page they see the member list but not the surrounding tab navigation.
- **Org Member** can do everything a Non-Member can, plus: see every repo tab regardless of
  whether the product is already enabled, use Commits/Pulls on private repos once activated,
  reach every repo Config screen including the destructive "erase repository" and "deactivate
  repository" actions (the frontend does not require anything more than plain membership for
  those two actions), and see the sibling-tab navigation everywhere.
- **Org Admin** can do everything an Org Member can, plus: manage the org's admin list, view the
  admin-only account screen, regenerate the org's shared upload token, and delete a flag or a
  component from a repo's Coverage tab (the delete button on those two tables only renders for
  this same org-admin role, checked again through a second, separate data fetch on the repo
  page). This role does not exist on a self-hosted instance.
- **Self-Hosted Instance Admin** can manage the whole self-hosted install: who has instance
  access, and instance-wide seat activation. This role has nothing to do with any single org's
  admin list, and does not exist on a non-self-hosted (SaaS-style) instance.
- **Every signed-in user**, before reaching any of the above, must first clear a global gate:
  agree to Terms of Service (skipped entirely on self-hosted) and have synced at least one
  git-provider organization - otherwise they see a Terms interstitial or get sent to the sync
  page instead of the screen they asked for.

## Access Boundaries

The line between Non-Member and Org Member is drawn by the git provider, not by Athena - a
person becomes a member by being added to the org on GitHub/GitLab/Bitbucket, and Athena simply
reflects that back. This is the widest boundary in the system: it decides whether repo
Config, Plan/billing, and the org-admin account screen exist at all for that person, and it
also decides whether the private-repo Commits/Pulls tabs and Test Analytics dashboard need an
extra "already enabled" condition to be visible.

The line between Org Member and Org Admin is drawn inside Athena and matters for three things
on the frontend today: which of the two account-root screens renders (a plain member falls
through to the YAML tab), who can regenerate the org's upload token, and who sees the delete
button on the repo Coverage tab's Flags and Components tables. That third check is fetched
independently - a separate query made from the repo page rather than the account-settings
query - but it asks the same backend for the same fact (is this person an org admin of this
owner), so it is the same role checked twice from two different screens, not a new one. Notably,
the repo Config screen's destructive actions (erase, deactivate) still require only org
membership, not org admin, at the frontend layer - so "destructive" alone doesn't predict which
role a given action needs; each action was checked individually.

The self-hosted instance-admin boundary is entirely separate infrastructure: a different query,
a different screen family (instance-wide access + member list), and a different header nav
link. An org admin on one org has no special standing here, and a self-hosted instance admin has
no special standing inside any single org's admin list.

One plan-tier boundary exists outside the role system entirely: the Okta SSO screen is gated on
the org being on an Enterprise plan, not on any role - an Org Admin on a Free-plan org cannot
reach it, while an ordinary member of an Enterprise-plan org can see the route registered (the
screen itself likely still expects an admin to act on it, though no additional role gate was
found on the route).

## Special Conditions

- **Self-hosted vs. not is a deploy-time toggle, not a permission.** Whichever way the instance
  is deployed, a fixed set of screens simply doesn't exist for anyone: on a self-hosted deploy,
  login and the Plan/Members screens don't exist and get redirected away; on a non-self-hosted
  deploy, the self-hosted admin-access screens don't exist and the self-hosted landing page
  doesn't exist. A second, independent deploy-time toggle can additionally hide the Access
  (personal tokens/sessions) tab on a self-hosted deploy. Neither toggle is a role, and neither
  can be changed by a user during a session - full detail with citations lives in the raw matrix.
- **One feature flag gates a whole tab.** The "Codecov AI" tab (with its beta badge) only shows
  up in the owner-level navigation when a LaunchDarkly-style flag is turned on; off by default.
  This is the only feature-flag-driven gate found in the codebase - no A/B experiments and no
  locale-based branching were found anywhere in the source.
- **Everyone clears a global gate before anything else.** Terms-of-Service acceptance and having
  at least one synced git-provider organization are checked ahead of every other rule in this
  document, on every screen. Self-hosted deployments skip the Terms-of-Service half of this
  check outright.
- No time-based or IP-based access rules were found anywhere in the codebase.
