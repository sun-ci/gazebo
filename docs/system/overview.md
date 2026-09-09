**Project**: Athena
**Generated**: 2026-09-08
**Architecture Type**: Client-side SPA (no SSR) — React 18 + TypeScript, built by Vite, consuming a separate backend over HTTPS/GraphQL+REST. Two-repo product: this repo is the frontend only (fork of `codecov/gazebo`); the backend (`codecov/umbrella`) lives in a separate repository and is NOT part of this tree.

## Executive Summary

Athena is Sun*'s self-hosted deployment of Codecov, calver version 25.6.2, served at `https://athena.sun-asterisk.vn`. This repository contains only the frontend: a React 18 + TypeScript single-page application originally named "Gazebo" (`package.json:2`, `README.md:1,10`), bootstrapped with Vite (`README.md:12`) and built via `tsc -b && vite build` (`package.json:8`). It talks to a Codecov backend (GraphQL + internal REST API) that is a distinct repository not present here (`src/shared/api/api.ts:91` builds requests against `config.API_URL`; no server code exists in this tree). The Makefile's release tooling confirms the Athena identity and self-hosted target: image `harbor.sun-asterisk.vn/sun-devops/athena/self-hosted-frontend`, `release_version := '25.6.2'`, default `ENV ?= ENTERPRISE` (`Makefile:1-5,10-20`).

The app is a routed multi-page SPA (react-router v5, with a v5-compat shim for incremental v6 migration — `src/index.tsx:11-12`) covering repo coverage/bundle/test-results dashboards, PR/commit detail pages, org/member/plan management, and account/admin settings (`src/App.tsx:22-34`, directory list in scout-report.md). Data fetching runs on TanStack Query, styling on Tailwind, charts on `recharts`/`d3`, and error/perf monitoring on Sentry (`src/sentry.ts`). Feature-flagging optionally uses LaunchDarkly, defaulting to safe fallbacks when unset — a deliberate accommodation for self-hosted builds that have no LaunchDarkly account (`src/shared/featureFlags/featureFlag.ts:15-47`).

For architecture diagrams and tech stack details, see [architecture.md](architecture.md).

## Key Design Decisions

### Decision 1: Self-hosted mode is a single build-time/runtime flag that reshapes routes and features

**Context**: The same codebase serves both Codecov's public SaaS product and Sun*'s self-hosted Athena deployment. The two modes need different routes (no SaaS billing on self-hosted, an admin panel only on self-hosted) and different feature availability (LaunchDarkly, Stripe billing, Pendo).

**Decision**: `src/config.js:25-27` derives `IS_SELF_HOSTED` from the `ENV` env var (`ENV.toLowerCase() === 'enterprise'`), sourced from `REACT_APP_ENV` at build time (Makefile passes `REACT_APP_ENV_ARG=${ENV}`, default `ENTERPRISE`, `Makefile:5,12-15`; `docker/Dockerfile:53-55` bakes it into the image as `REACT_APP_ENV`). `src/App.tsx` then branches routing on this single flag: `/admin/:provider` only exists when self-hosted (`src/App.tsx:105-111`); `/login`, `/plan/*`, and `/members/*` are hidden/redirected when self-hosted (`src/App.tsx:87-92,112-132`); the root `/` route renders `EnterpriseLandingPage` instead of the normal owner-redirect when self-hosted (`src/App.tsx:195-201`). The same flag also gates UI in `Footer.tsx:13`, `Header.tsx:45`, `ContextSwitcher.tsx:177`, `PlanPage.tsx:60`, `MembersPage.jsx:16`, `OwnerPage/Tabs/Tabs.tsx:40`, `AnalyticsPage/Tabs/Tabs.tsx:29`, `CodecovAIPage/Tabs/Tabs.tsx:26`, and forces a re-login on a 403 GraphQL error only in self-hosted mode (`src/shared/api/api.ts:120-126`).

**Rationale**: A single derived boolean (rather than parallel builds or per-feature flags) keeps the self-hosted/SaaS split legible at each call site and lets Athena inherit upstream Gazebo changes with minimal divergence — evidenced by every self-hosted-specific behavior in the app funneling through this one config field.

### Decision 2: Feature flags degrade to hardcoded fallbacks, not a hard dependency, for self-hosted builds

**Context**: Upstream Codecov gates rollouts through LaunchDarkly (SaaS-only external service). Self-hosted deployments like Athena have no LaunchDarkly account and must not depend on reaching an external flag service to render.

**Decision**: `withFeatureFlagProvider` only wraps the app with LaunchDarkly's provider `if (config.LAUNCHDARKLY)` (`src/shared/featureFlags/featureFlag.ts:15-27`); `useFlags(fallback)` returns the LD-evaluated flags when configured, otherwise logs a warning and returns the caller-supplied `fallback` object (`featureFlag.ts:35-47`) — every call site is required to pass an explicit self-hosted-safe default. Sentry's LaunchDarkly integration (`src/sentry.ts:157`) and its ignored-error list for `LaunchDarklyFlagFetchError` (`src/sentry.ts:15`) confirm LD is treated as a best-effort dependency, not a hard one.

**Rationale**: This lets one component tree serve both deployment targets without conditional imports, at the cost of every flagged feature carrying a second, manually-maintained "self-hosted default" that can drift from the SaaS behavior it mirrors.

### Decision 3: Vite build targets both modern and legacy browsers from one bundle graph

**Context**: The prior CRA-based toolchain (evidenced by the surviving-but-unused `craco.config.cjs` at repo root and the `REACT_APP_` env-var convention still required by `config.js:23` and `README.md:79`) has been replaced by Vite (`README.md:12`; `package.json:8-9` — `vite build`/`vite preview`), but `craco.config.cjs` is no longer wired into any `package.json` script (verified: no `craco` reference remains in `package.json`).

**Decision**: `vite.config.mjs` explicitly emits a legacy fallback bundle via `@vitejs/plugin-legacy` for `>0.2%, not dead, not op_mini all` browsers (`vite.config.mjs:131-136`) alongside the modern ESM build, and hand-splits vendor chunks (`react`, `react-router`, `recharts`, `sentry`, `radix-ui`, icon sets, etc.) to bound per-chunk cache-busting churn (`vite.config.mjs:80-119`). Optional Codecov bundle-analysis (`vite.config.mjs:19-33`) and Sentry sourcemap upload (`vite.config.mjs:35-57`) plugins activate only when their respective env vars/tokens are present, so neither is a hard requirement of a self-hosted build.

**Rationale**: One build config serving two browser tiers plus opt-in observability plugins avoids maintaining parallel build pipelines for SaaS (which likely wires the Codecov/Sentry tokens) versus self-hosted (which may not).

## Security Overview

- **Authentication**: Delegated to the (out-of-tree) backend via per-git-provider OAuth session cookies. `src/shared/api/helpers.ts:34-47` maps each provider (`gh`, `gl`, `bb`, `ghe`, `gle`, `bbs`, ...) to a `Token-Type` header value; every fetch sends `credentials: 'include'` (`src/shared/api/api.ts:39,111`) so the actual bearer token is an httpOnly cookie set by the backend, never held in FE JS state. Self-hosted deployments additionally support Okta SSO, configured through an admin-only form (`src/pages/AccountSettings/tabs/OktaAccess/OktaAccess.tsx:11-28`); the SSO handshake itself is backend-side and out of scope for this repo. **No data**: token issuance/refresh/expiry logic (backend-owned, not in this tree).
- **Authorization**: Enforced server-side; this repo only mirrors it in the UI. Admin-gated UI checks `useIsCurrentUserAnAdmin` (`OktaAccess.tsx:13,25`); self-hosted-only routes are gated by `config.IS_SELF_HOSTED` (`src/App.tsx:105-111`); org-membership checks gate the Plan page (`src/pages/PlanPage/PlanPage.tsx:60`). **No data**: no client-side RBAC/ABAC policy engine exists in this repo — real authorization is enforced by the backend on every request; a client-side gate hidden here without a matching server check would be a security gap, but confirming that is out of scope for this frontend-only artifact.
- **Data Encryption**: **No data** for TLS termination — `docker/nginx.conf:33-35` shows the container's nginx listening on plain `8080` with no TLS directives, so certificate/TLS termination happens upstream of this repo (ingress/load balancer, not present in this tree).
- **API Security**: Requests use cookie-based session auth (`credentials: 'include'`) plus a custom `Token-Type` header for provider disambiguation (`src/shared/api/helpers.ts:66-84`); no CSRF token header was found anywhere in `src/` (grepped, none present), so CSRF protection, if any, is the backend's responsibility (e.g., SameSite cookies) and **no data** confirms its mechanism from this repo alone. The one `Access-Control-Allow-Origin: *` header present (`docker/nginx.conf:48`) applies only to the static SPA shell served by this container's nginx, not to the backend API (which lives in the separate backend repo and is not configured here).

## Scalability

- **Current Capacity**: **No data** — capacity planning is an infrastructure/backend concern; this repo has no server, autoscaling config, or load-test artifacts.
- **Scaling Strategy**: Client-side performance techniques only: route-level code-splitting via `React.lazy` for every heavy page (`src/App.tsx:24-34`), hand-tuned Vite vendor-chunk splitting to cap cache-invalidation blast radius (`vite.config.mjs:80-119`), a dedicated legacy-browser bundle to avoid shipping modern-only polyfills to older clients (`vite.config.mjs:131-136`), and virtualized long lists/tables via `@tanstack/react-virtual` (`src/ui/VirtualRenderers/`, `package.json:51`). TanStack Query's 2-minute `staleTime` (`src/index.tsx:49,55,77`) reduces redundant refetches after Suspense remounts.
- **Performance Targets**: **No data** — a Codecov bundle-analysis Vite plugin exists but only activates when `CODECOV_API_URL`/`CODECOV_ORG_TOKEN`/`UPLOAD_CODECOV_BUNDLE_STATS=true` are set (`vite.config.mjs:19-33`); no bundle-size budget or performance-target file was found in this repo.
