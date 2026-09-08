---
authored_by: rebuild-spec
---
<!-- layout-exempt: rebuild-spec owns all docs/system|features|generated|flows paths -->
# Behavior Logic

**Project**: Athena (Sun* self-hosted Codecov)
**Generated**: 2026-09-08
**Analysis Scope**: JS/TS React SPA (Vite + craco), frontend only, VERSION 25.6.2

**Code Format**: All codes MUST follow `BL###_NameSlug` format (e.g., BL001_ScheduledReport, BL002_EventListener)

**Behavior Logic Types** (canonical 10 - language-neutral):
- `scheduled-job` - Cron-like scheduled tasks
- `queue-worker` - Background job workers (async queue consumers)
- `event-listener` - Event-driven handlers
- `observer` - Model lifecycle hooks (created/updated/deleted)
- `mail` - Email sending logic
- `notification` - In-app / push notification logic
- `middleware` - Request/response processing chain (non-auth)
- `custom-command` - CLI commands
- `integration` - Third-party integrations (external API clients)
- `webhook` - Incoming/outgoing webhook handlers

**Note**: Auth/permission middleware is NOT included - see Permissions.md

**Note**: Feature and UserStory mapping is managed in FeatureList.md and UserStories.md. This document contains behavior logic items without direct feature/story references.

**Note**: Notification/event/webhook entries SHOULD include `**Payload**` (the async data shape) - this is where async contracts live, since api-contracts.md covers synchronous surfaces only.

**Note**: File-exchange BL types SHOULD include `**File Schema**` - not applicable to any item in this document (no import/export/csv/xlsx BL detected in the scout inventory).

**Coverage note**: This is a frontend-only SPA with no server process. All 13 markers in the scout `## Background Logic Source Inventory` are client-side DOM/Service-Worker event listeners (`addEventListener`/`EventListener`). None of the other 9 canonical types (scheduled-job, queue-worker, observer, mail, notification, middleware, custom-command, integration, webhook) are represented - there is no backend code in this repo to host them.

---

## Behavior Logic Index

BA-first summary - one row per `BL###` item, banded by **Type**. `Payload` and `File Schema` are the
two columns BAs ask about most (the async data shape and the exchanged-file contract, respectively);
both are settled here and nowhere else. Full source citations, module/route/data-model links, and the
Cardinality Contract that governs how these items are counted live in the **Dev Appendix** below.

### Type: event-listener

| Code | Name | Trigger | Payload | File Schema |
|------|------|---------|---------|--------------|
| BL001 | ServiceWorkerLifecycle | Service Worker `install`/`activate`/`message`/`fetch` events | `install`/`activate`: no data. `message`: `event.data` string command (`KEEPALIVE_REQUEST`, `INTEGRITY_CHECK_REQUEST`, `MOCK_ACTIVATE`, `MOCK_DEACTIVATE`, `CLIENT_CLOSED`), replied to via `postMessage({type, payload})`. `fetch`: `FetchEvent` (request interception for MSW response mocking). | N/A - not a file-exchange type |
| BL002 | InvoicePrintAutoClose | `window` `afterprint` event, fired after `window.print()` when `?print` query param present | No data - handler is `window.close` directly | N/A - not a file-exchange type |
| BL003 | DisablePointerEventsOnScroll | `window` `scroll` event (passive) while a bound element ref is mounted | No data - toggles `style.pointerEvents` on the bound ref via a debounced rAF timeout | N/A - not a file-exchange type |
| BL004 | CodeRendererScrollPointerToggle | `window` `scroll` event (passive) while the code table is mounted | No data - toggles `style.pointerEvents` on the table ref via a debounced rAF timeout | N/A - not a file-exchange type |
| BL005 | DropdownAutoCloseOnBlur | `window` `blur` event, registered on every render while Dropdown Root is mounted | No data - closes the dropdown by setting `isOpen` false | N/A - not a file-exchange type |
| BL006 | ScrollLeftSync | `scroll` event (passive) on the primary scrolling element ref | No data - copies `scrollLeft` from the scrolling ref onto each ref in `refsToSync` | N/A - not a file-exchange type |

---

## Dev Appendix

Source citations, module/route/data-model links, and the deterministic rules `validate_behavior_logic.py`
enforces. Every `BL###` heading below carries the same code as its Index row above.

### Cardinality Contract (this document)

Per the Wave 2b task assignment, this document uses **one BL per source file** from the scout inventory (not one BL per marker occurrence). The scout's 13 `addEventListener`/`EventListener` marker hits collapse to 6 distinct source files, so BL001-BL006 map 1:1 to those 6 files. No file is split across multiple BL items and no two files are merged into one BL item.

| BL Code | Source File | Marker lines (scout inventory) |
|---|---|---|
| BL001 | `public/mockServiceWorker.js` | L16, L20, L24, L92 |
| BL002 | `src/pages/PlanPage/subRoutes/InvoiceDetailsPage/InvoiceDetail.jsx` | L34 |
| BL003 | `src/shared/useDisablePointerEvents/useDisablePointerEvents.ts` | L48, L52 |
| BL004 | `src/ui/CodeRenderer/CodeRenderer.tsx` | L71, L75 |
| BL005 | `src/ui/Dropdown/Dropdown.tsx` | L32, L35 |
| BL006 | `src/ui/VirtualRenderers/useScrollLeftSync.ts` | L34, L38 |

### Inclusion/Exclusion Matrix (scout-side filter)

Applied at Wave 0; not re-filtered here. All 6 files above are non-test, non-scaffold, non-vendor source files >= 10 LOC - none excluded.

---

## BL001_ServiceWorkerLifecycle

**Type**: event-listener
**Trigger**: Service Worker lifecycle/message/fetch events dispatched by the browser to the mock service worker
**Payload**: `install`/`activate` - no data (standard SW lifecycle). `message` - `event.data` is one of five string commands (`KEEPALIVE_REQUEST`, `INTEGRITY_CHECK_REQUEST`, `MOCK_ACTIVATE`, `MOCK_DEACTIVATE`, `CLIENT_CLOSED`); the worker replies via `client.postMessage({ type, payload })` (e.g. `{type: 'INTEGRITY_CHECK_RESPONSE', payload: {packageVersion, checksum}}`). `fetch` - standard `FetchEvent`, used by the MSW runtime to intercept and mock network requests.
**File Schema**: N/A - not a file-exchange type
**Source File**: `public/mockServiceWorker.js`
**Source Symbol**: `mockServiceWorker::self`

### Description

Auto-generated Mock Service Worker (MSW v2.4.11) runtime script, registered by `src/mocks/browser.js` (`setupWorker(...handlers)`) for dev-mode API mocking. Four top-level `self.addEventListener` registrations handle the SW lifecycle: `install` calls `self.skipWaiting()`; `activate` claims all clients; `message` implements a small command protocol (keepalive ping, integrity checksum check, mock activate/deactivate per client, and self-unregister when the last client closes); `fetch` is the interception point MSW uses to serve mocked responses instead of hitting the network. File header explicitly states "Please do NOT modify this file" - it is regenerated by the `msw init` CLI, not hand-authored.

### Related Modules

- `src/mocks/browser.js` - registers this worker via `setupWorker`
- `src/mocks/handlers.js` (referenced by browser.js, not itself a BL marker)

### Related Routes

- N/A - client-side dev-mocking infrastructure, not an application route

### Related Data Models

- N/A

---

## BL002_InvoicePrintAutoClose

**Type**: event-listener
**Trigger**: `window` `afterprint` event, registered only when the URL contains a `?print` query param, right before `window.print()` is invoked
**Payload**: No data - the handler is the native `window.close` function itself, not a custom callback
**File Schema**: N/A - not a file-exchange type
**Source File**: `src/pages/PlanPage/subRoutes/InvoiceDetailsPage/InvoiceDetail.jsx`
**Source Symbol**: `InvoiceDetail::usePrintPage`

### Description

Local hook `usePrintPage()` inside `InvoiceDetail.jsx` parses the URL query string; if `print` is present, it registers `window.addEventListener('afterprint', window.close, { signal: controller.signal })` and immediately calls `window.print()`. The listener is torn down via an `AbortController` on unmount. Effect: opening the invoice detail page with `?print` in the URL opens the print dialog and auto-closes the window/tab once printing finishes or is cancelled.

### Related Modules

- `InvoiceDetail` component (same file) - renders the invoice and exposes the "Print" link (`A` with `href=...+'?print'`) that triggers this flow

### Related Routes

- N/A - client-side only, triggered by a query-string flag on the existing invoice-detail route, no distinct HTTP route

### Related Data Models

- N/A

---

## BL003_DisablePointerEventsOnScroll

**Type**: event-listener
**Trigger**: `window` `scroll` event (`{ passive: true }`), registered in a `useLayoutEffect` whenever the consumer passes an element ref
**Payload**: No data - internal state only (`pointerEventsRaf` ref holding a `requestAnimationTimeout` id)
**File Schema**: N/A - not a file-exchange type
**Source File**: `src/shared/useDisablePointerEvents/useDisablePointerEvents.ts`
**Source Symbol**: `useDisablePointerEvents::useDisablePointerEvents`

### Description

Shared hook that disables `pointerEvents` on a bound element while the window is scrolling, then re-enables them ~50ms after scrolling stops (via `requestAnimationTimeout`), to reduce hit-testing work during repaint on large virtualized tables. Registers/unregisters `window.addEventListener('scroll', onScroll, { passive: true })` per mount/ref change.

### Related Modules

- `src/ui/VirtualRenderers/VirtualFileRenderer.tsx`
- `src/ui/VirtualRenderers/VirtualDiffRenderer.tsx`

### Related Routes

- N/A - cross-cutting UI performance hook, not route-specific

### Related Data Models

- N/A

---

## BL004_CodeRendererScrollPointerToggle

**Type**: event-listener
**Trigger**: `window` `scroll` event (`{ passive: true }`), registered in a `useLayoutEffect` on mount of `CodeRenderer`
**Payload**: No data - internal state only (`pointerEventsRaf` ref)
**File Schema**: N/A - not a file-exchange type
**Source File**: `src/ui/CodeRenderer/CodeRenderer.tsx`
**Source Symbol**: `CodeRenderer::CodeRenderer`

### Description

Same disable/re-enable-pointer-events-while-scrolling pattern as BL003, implemented independently (duplicated, not reused via the shared hook) inside the `CodeRenderer` component, targeting its own `<table>` ref (`tableRef`) instead of an externally-supplied ref. Wrapped for export by `Sentry.withProfiler(CodeRenderer, { name: 'CodeRenderer' })`.

### Related Modules

- `src/ui/VirtualRenderers/VirtualFileRenderer.tsx`
- `src/ui/VirtualRenderers/VirtualDiffRenderer.tsx`
- `src/shared/RawFileViewer/RawFileViewer.tsx`
- `src/pages/PullRequestPage/PullCoverage/routes/FilesChangedTab/FilesChanged/PullFileDiff/PullFileDiff.tsx`
- `src/pages/CommitDetailPage/CommitCoverage/routes/FilesChangedTab/shared/CommitFileDiff/CommitFileDiff.tsx`

### Related Routes

- N/A - reused presentational renderer, not route-specific

### Related Data Models

- N/A

---

## BL005_DropdownAutoCloseOnBlur

**Type**: event-listener
**Trigger**: `window` `blur` event, re-registered on every render of `Dropdown.Root` (`React.useEffect` with no dependency array)
**Payload**: No data - closes the dropdown by calling `setIsOpen(false)`
**File Schema**: N/A - not a file-exchange type
**Source File**: `src/ui/Dropdown/Dropdown.tsx`
**Source Symbol**: `Dropdown::Root`

### Description

The `Root` component of the shared `Dropdown` primitive (built on `@radix-ui/react-dropdown-menu`) registers `window.addEventListener('blur', handleBlur)` where `handleBlur` forces `isOpen` to `false`, so any open dropdown/menu closes when the browser window itself loses focus (e.g. user alt-tabs away). The effect has no dependency array, so the listener is torn down and re-attached on every render.

### Related Modules

- `src/ui/SummaryDropdown/SummaryDropdown.tsx`
- `src/layouts/Header/components/HelpDropdown/HelpDropdown.tsx`
- `src/layouts/Header/components/UserDropdown/UserDropdown.tsx`
- `src/pages/RepoPage/CoverageTab/OverviewTab/Summary/TrendDropdown/TrendDropdown.jsx`

### Related Routes

- N/A - global UI primitive, used across many routes via `Header` and various tab pages

### Related Data Models

- N/A

---

## BL006_ScrollLeftSync

**Type**: event-listener
**Trigger**: `scroll` event (`{ passive: true }`) on the primary scrolling element ref, registered in a `useLayoutEffect`
**Payload**: No data - copies `scrollLeft` from the scrolling ref onto every ref in `refsToSync`
**File Schema**: N/A - not a file-exchange type
**Source File**: `src/ui/VirtualRenderers/useScrollLeftSync.ts`
**Source Symbol**: `useScrollLeftSync::useScrollLeftSync`

### Description

Hook that keeps the horizontal scroll position of one or more secondary elements (`refsToSync`, e.g. sticky headers) in sync with a primary scrolling element (`scrollingRef`), by listening for `scroll` on the primary element and imperatively setting `scrollLeft` on each synced ref. Used by the virtualized file/diff renderers to keep a frozen header row aligned with the scrollable code body.

### Related Modules

- `src/ui/VirtualRenderers/VirtualFileRenderer.tsx`
- `src/ui/VirtualRenderers/VirtualDiffRenderer.tsx`

### Related Routes

- N/A - cross-cutting UI sync hook, not route-specific

### Related Data Models

- N/A

---

## Summary

- **Total Behavior Logic Items**: 6
- **By Type**: custom-command: 0, event-listener: 6, integration: 0, mail: 0, middleware: 0, notification: 0, observer: 0, queue-worker: 0, scheduled-job: 0, webhook: 0

---

## Cross-Reference Validation

- [x] All BL### codes are unique
- [ ] All BL### codes are referenced in UserStories.md (type=system) - deferred to Wave 3 (UserStories synthesis not yet run at time of this artifact)
- [ ] All BL### codes are referenced in FeatureList.md - deferred to Wave 3/4 (FeatureList synthesis not yet run)
- [x] All related route references are valid - no ROUTE### citations made (all 6 items are client-side-only; correctly marked N/A rather than fabricated)
- [x] All related data model references are valid - no MODEL### citations made (no data-model touchpoints found in source)
- [x] No orphaned behavior logic references
- [x] All BL items have Source File + Source Symbol fields (Rule C2)
- [x] All Source File paths match scout Background Logic Source Inventory entries (Rule C2/C3) - verified 1:1 against `_scout-bl-inventory.md`

---

## Client-Side Logic

Document client-side patterns found in the codebase. For each, record: pattern type, trigger location (file:line), and brief description of what it does.

### Debounce / Throttle

`N/A - no debounce or throttle patterns detected.` (BL001-BL006 use a `requestAnimationTimeout`-based rAF delay to re-enable pointer events, which is a scroll-settle pattern already captured as BL003/BL004 above, not a classic debounce/throttle wrapper around a handler function.)

### Optimistic UI

`N/A - no optimistic UI patterns detected in the files covered by this pass.`

### Polling

`N/A - no polling patterns detected in the files covered by this pass.`

### Upload Progress

`N/A - no upload progress patterns detected in the files covered by this pass.`

### Realtime (WebSocket / SSE / EventSource)

`N/A - no realtime (WebSocket/EventSource/SSE) patterns detected in the files covered by this pass.` (BL001's Service Worker `fetch`/`message` events are same-origin browser-runtime messaging for MSW mocking, not a network realtime channel.)

### Query-string / Pagination State (Wave 2a re-check)

Not a template-enumerated pattern, but the Wave 2a agent asked for this to be verified across SCR029, SCR032, SCR035, SCR036, SCR048, SCR051, SCR052. Findings, read directly from source:

- **SCR029** (`FilesChangedTab.tsx`, pull) and **SCR032** (`FilesChangedTab.tsx`, commit): only `useParams()` for route params (`provider`, `owner`); no query-string or pagination state.
- **SCR035** (`FlagsTab.jsx`) and **SCR036** (`ComponentsTab.tsx`): only `useParams()` for route params (`provider`, `owner`, `repo`); no query-string state.
- **SCR048** (`FailedTestsPage.tsx`): no `useLocationParams`/`useState` at this level; delegates to `FailedTestsTable`, which holds local component `useState` for TanStack Table sorting and uses cursor-based infinite scroll (`useInfiniteTestResults`) - not URL-query-string-backed.
- **SCR051** (`CommitsTab.jsx`) and **SCR052** (`PullsTab.jsx`): DO have query-string state, via the shared hook `src/services/navigation/useLocationParams.ts` (`qs.parse`/`qs.stringify` + `useHistory().push`). CommitsTab syncs `coverageStatus`/`search`; PullsTab syncs `order`/`prStates`.

This hook (`useLocationParams.ts`) contains no `addEventListener` marker and does not appear in the scout's `## Background Logic Source Inventory`, so per the Inclusion/Exclusion Matrix and Cardinality Contract it is **not** promoted to a new BL item here - the scout inventory is authoritative and this pass does not add entries beyond it. It also does not fit any of the 10 canonical BL types (it is a React-Router URL-state-sync utility, not an event-listener/observer/middleware/etc.). Recorded here as a verified negative/positive split, not as a BL entry.

### Dirty-State (Unsaved-Changes) Guards (Wave 2a re-check)

Not a template-enumerated pattern, but the Wave 2a agent asked for this to be verified across SCR011, SCR054, SCR055. Findings, read directly from source:

- **SCR011** (`YAML.jsx`, `src/pages/AccountSettings/tabs/YAML/YAML.jsx`): uses react-hook-form's `isDirty` from `formState`, but only to gate the Save button (`disabled={!isDirty}`, line 100). There is no `beforeunload` listener, no React Router `Prompt`/`useBlocker`, and no `window.confirm` - navigating away with unsaved YAML changes is **not** blocked or warned.
- **SCR055** (`RepoYamlTab.jsx` -> `YamlTab/YAML/YAML.jsx`): the embedded YAML view is rendered `readOnly` with no form/`useForm` at all - it is a display-only repo-YAML preview, not an editable form, so there is nothing to guard.
- **SCR054** (`RepoGeneralTab.tsx` -> `DangerZone/EraseRepo.jsx`, `DangerZone/RepoState/DeactivateRepoModal.jsx`): these are confirm-modal toggles (`useState` show/hide), not dirty-state guards - no unsaved-changes warning pattern present.

Conclusion: **no dirty-state/unsaved-changes navigation guard exists anywhere in this scope.** This is a genuine absence, not a detection gap - confirmed by direct grep for `beforeunload`, `isDirty`, `Prompt`, `useBlocker`, `window.confirm` across all three screens' component trees, with zero guard hits. No BL entry results (the canonical types have no "form navigation guard" category, and even if one existed, nothing was found to attribute it to).
