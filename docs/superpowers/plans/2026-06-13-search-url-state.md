# Search URL State And Accessibility Implementation Plan

> **Design:** `docs/superpowers/specs/2026-06-13-search-url-state-design.md`

**Goal:** Make shared search URLs shareable and history-aware, prevent stale
request updates, and provide explicit accessible loading, result, empty, and
error announcements in English and Finnish.

**Repositories:**

- `a11ying-ui`: URL helpers, component state machine, tests, release
- `a11ying-front`: localized props, deterministic route tests, dependency update
- `wcag-front`: localized props, deterministic route tests, dependency update

**Target release:** `a11ying-ui` `v2.0.10`

---

## Task 1: Add tested search URL helpers

**Files:**

- Create: `src/lib/searchUrlState.ts`
- Create: `src/lib/searchUrlState.test.ts`

- [ ] **Step 1: Write failing normalization and read tests**

Cover:

- surrounding whitespace is trimmed;
- internal whitespace is preserved;
- missing `q`, empty `q`, and whitespace-only `q` normalize to `''`;
- encoded Unicode and punctuation are decoded through `URLSearchParams`;
- repeated `q` parameters use the first value consistently.

- [ ] **Step 2: Write failing URL update tests**

Given a full URL, assert that setting or clearing `q`:

- preserves pathname;
- preserves unrelated query parameters;
- preserves hash;
- encodes the normalized query through `URLSearchParams`;
- removes `q` when the normalized query is empty;
- reports whether the normalized URL query actually changed.

Use this return shape:

```ts
{
  query: string;
  url: URL;
  changed: boolean;
}
```

- [ ] **Step 3: Confirm the focused test fails**

```bash
npx vitest run src/lib/searchUrlState.test.ts
```

Expected: failure because the helper module does not exist.

- [ ] **Step 4: Implement pure helpers**

Implement package-internal functions for:

- normalizing draft query text;
- reading normalized `q` from a `URL` or search string;
- creating the next URL while preserving unrelated state.

Do not export these helpers from `src/index.ts`.

- [ ] **Step 5: Run focused and full unit tests**

```bash
npx vitest run src/lib/searchUrlState.test.ts
npm run test:unit
```

Expected: all tests pass.

- [ ] **Step 6: Commit URL helpers**

```bash
git add src/lib/searchUrlState.ts src/lib/searchUrlState.test.ts
git commit -m "feat: add search URL state helpers"
```

---

## Task 2: Refactor SearchComponent into an explicit state machine

**Files:**

- Modify: `src/components/SearchComponent/SearchComponent.tsx`
- Review: `src/index.ts`

- [ ] **Step 1: Define private state and request types**

Inside the component module, add:

- `SearchStatus = 'idle' | 'loading' | 'success' | 'error'`;
- one state object containing status, submitted query, result response, and
  total count;
- a ref for the active `AbortController`;
- a ref for monotonically increasing request identity;
- a ref for the search input.

Keep draft input text in controlled React state.

- [ ] **Step 2: Add the required localized props**

Extend `SearchComponentProps` with:

```ts
searchLoading: string;
searchError: string;
```

Do not add default English strings in the shared component. Consumers must
provide localized values.

- [ ] **Step 3: Make the fetch helper abortable**

Pass an `AbortSignal` to `fetchSearchResults` and then to `fetch`.

Preserve the existing non-success HTTP error with status context. Treat
`AbortError` as obsolete control flow, not a user-facing error.

- [ ] **Step 4: Implement latest-request-only search execution**

Create one internal async function that:

1. aborts the previous controller;
2. increments request identity;
3. clears stale results and enters `loading`;
4. performs the request;
5. ignores completion when its identity is no longer current;
6. enters `success` with the response;
7. enters `error` with cleared results for the latest non-abort failure.

Log the technical failure once for diagnostics.

- [ ] **Step 5: Implement idle reset**

The reset path must:

- abort the active request;
- invalidate its identity;
- set the draft and submitted query to `''`;
- clear results and errors;
- enter `idle`.

- [ ] **Step 6: Implement initial URL hydration**

In an effect that runs only in the browser:

- read normalized `q` from `window.location`;
- set the controlled input;
- search automatically when non-empty;
- otherwise remain idle;
- register `popstate`;
- abort and remove the listener on unmount.

Do not call `pushState` or `replaceState` during initial processing.

- [ ] **Step 7: Implement form submission and history**

On submit:

- prevent navigation;
- normalize the draft;
- derive the next URL with the helper;
- call `history.pushState` only when normalized `q` changed;
- retain input focus;
- run the normalized search even when the same `q` is resubmitted;
- clear to idle when normalized input is empty.

For empty submission, remove `q` while preserving other parameters and hash.

- [ ] **Step 8: Implement Back/Forward restoration**

The `popstate` handler reads the current URL and:

- updates the controlled input;
- runs the restored non-empty query;
- clears to idle for missing or empty `q`;
- never writes browser history.

- [ ] **Step 9: Render state-specific accessible output**

Update markup so:

- the form has `aria-busy="true"` only while loading;
- the submit button is disabled only while loading;
- one persistent `role="status" aria-live="polite" aria-atomic="true"`
  contains loading, positive count, or no-results text;
- one persistent visible `role="alert"` contains text only on current request
  failure;
- idle has empty status and alert regions;
- loading and error show no stale result list or result heading;
- zero-result success shows the visible no-results paragraph;
- error does not also show no-results text;
- the controlled input has `value={searchWords}`;
- result links and metadata remain unchanged.

- [ ] **Step 10: Build and type-check**

```bash
npm run test:unit
npm run build
```

Expected: public declarations include the two required props and no test
declarations are published.

- [ ] **Step 11: Commit the component state machine**

```bash
git add src/components/SearchComponent/SearchComponent.tsx dist
git commit -m "feat: synchronize search state with the URL"
```

---

## Task 3: Add deterministic Storybook browser coverage

**Files:**

- Modify: `src/components/SearchComponent/SearchComponent.stories.tsx`
- Create: `tests/storybook/search.spec.ts`
- Modify: `tests/storybook/a11y.spec.ts`

- [ ] **Step 1: Update every story for the required props**

Add English and Finnish loading/error labels:

- English loading: `Searching…`
- English error: `Search failed. Please try again.`
- Finnish loading: `Haetaan…`
- Finnish error: `Haku epäonnistui. Yritä uudelleen.`

Use the same final strings in both consumers.

- [ ] **Step 2: Add deterministic browser request routing**

In `tests/storybook/search.spec.ts`, route
`https://example.com/api/search*` per test. Provide fixtures for:

- positive result response;
- zero result response;
- delayed response;
- HTTP 500 response;
- two overlapping requests completed in reverse order.

Do not depend on external network access.

- [ ] **Step 3: Test initial URL and accessible loading**

Navigate to the English story iframe with `?q=contrast` represented in the
iframe URL. Assert:

- input is pre-filled;
- one search request is sent;
- form becomes busy;
- button becomes disabled;
- status region contains `Searching…`;
- focus can remain or be placed on the input without forced focus movement;
- success replaces loading with the count announcement and results.

If Storybook consumes its own query parameters for story selection, set the
iframe history URL with `page.evaluate` and dispatch `popstate` before the
assertions.

- [ ] **Step 4: Test submit URL synchronization**

Assert:

- trimmed input becomes encoded `q`;
- unrelated parameters and hash survive;
- one changed submission adds one history entry;
- resubmitting the same normalized query performs a request without adding
  another history entry;
- input remains focused after submit.

- [ ] **Step 5: Test Back/Forward**

Submit two queries with distinct fixtures, then:

- navigate Back and assert URL, input, and first results restore;
- navigate Forward and assert URL, input, and second results restore;
- verify history navigation does not add entries.

- [ ] **Step 6: Test empty reset**

Submit whitespace after a successful result and assert:

- `q` is removed;
- unrelated URL state remains;
- input is empty;
- active request is aborted;
- status and alert are empty;
- no results heading, list, or no-results paragraph remains.

- [ ] **Step 7: Test request races and abort handling**

Start a slow search, then a fast search. Assert:

- the first request is aborted or its late response is ignored;
- only the fast query controls URL, heading, count, and results;
- no error alert appears for the aborted request.

- [ ] **Step 8: Test failures and announcements**

For HTTP 500:

- normalized `q` remains in URL and input;
- stale results disappear;
- `role="alert"` contains the localized error;
- status region is empty;
- no no-results message appears.

Also verify zero-result success uses the polite status and visible no-results
message rather than the alert.

- [ ] **Step 9: Extend axe coverage**

Keep the English and Finnish SearchComponent stories in `a11y.spec.ts`. Add a
dedicated error-state accessibility test after routing the request to fail,
then run axe with the existing component-frame rule exclusions.

- [ ] **Step 10: Confirm existing visual coverage remains stable**

Do not add a new visual story or snapshot. Loading uses existing form markup,
and the error is plain visible text within the existing content container.
The full Storybook suite must confirm all existing snapshots remain unchanged.

- [ ] **Step 11: Run shared verification**

```bash
npm run test:unit
npm run build
npx playwright test tests/storybook/search.spec.ts --config playwright.storybook.config.ts
npm run test:storybook
```

Expected: all behavior, accessibility, and existing visual tests pass.

- [ ] **Step 12: Commit Storybook coverage**

```bash
git add src/components/SearchComponent/SearchComponent.stories.tsx tests/storybook
git commit -m "test: cover accessible search URL state"
```

---

## Task 4: Release `a11ying-ui` v2.0.10

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Confirm package state and browser-safe bundle**

```bash
git status --short
git log --oneline --decorate -8
rg -n 'from "sanitize-html"|require\("sanitize-html"\)' dist/index.js dist/index.cjs
```

Expected:

- worktree is clean before the version bump;
- the bundle does not import or require `sanitize-html`;
- React and `qs-esm` remain the intended externals.

- [ ] **Step 2: Bump without automatic commit**

```bash
npm version 2.0.10 --no-git-tag-version
```

- [ ] **Step 3: Run the final package gate**

```bash
npm run test:unit
npm run build
npm audit --omit=dev
npm run test:storybook
```

Expected:

- unit and browser behavior tests pass;
- declarations and browser-safe bundles build;
- production audit reports zero vulnerabilities;
- accessibility and reviewed visual baselines pass.

- [ ] **Step 4: Commit, tag, and push**

```bash
git add package.json package-lock.json
git commit -m "chore: release a11ying-ui 2.0.10"
git tag v2.0.10
git push origin main
git push origin v2.0.10
```

Verify the remote tag before consumer installation.

---

## Task 5: Update `a11ying-front` routes and deterministic tests

**Files:**

- Modify: `src/pages/en/search.astro`
- Modify: `src/pages/fi/haku.astro`
- Create: `tests/search.spec.ts`
- Modify later: `package.json`
- Modify later: `package-lock.json`

- [ ] **Step 1: Add localized props**

Pass:

```astro
searchLoading="Searching…"
searchError="Search failed. Please try again."
```

on the English route and:

```astro
searchLoading="Haetaan…"
searchError="Haku epäonnistui. Yritä uudelleen."
```

on the Finnish route.

- [ ] **Step 2: Add deterministic search route tests**

Create `tests/search.spec.ts`. Route `**/api/search*` in Playwright so tests do
not depend on the mock server gaining query-parser knowledge.

Cover both `/en/search/` and `/fi/haku/`:

- initial `?q=` pre-fill and automatic results;
- localized loading and error announcements;
- submit updates URL and keeps focus;
- empty submission removes `q`;
- Back/Forward restores input and results;
- unrelated parameters and hash survive;
- failed request retains `q` and shows only the localized alert;
- all result URL mappings remain correct for local and WCAG collections.

- [ ] **Step 3: Install the released package**

```bash
npm install github:calydia/a11ying-ui#v2.0.10
```

Confirm manifest, lockfile, installed package version, and resolved commit.

- [ ] **Step 4: Run focused tests**

```bash
E2E_USE_MOCKS=true npx playwright test tests/search.spec.ts --workers 1
npm run check
```

- [ ] **Step 5: Run the full quality gate**

```bash
npm run quality
```

If the live-CMS production build has a transient connection failure, rerun the
failed stage and record the exact external error. Do not hide actual component
or accessibility failures.

- [ ] **Step 6: Commit the consumer update**

```bash
git add src/pages/en/search.astro src/pages/fi/haku.astro tests/search.spec.ts package.json package-lock.json
git commit -m "feat: synchronize search with URL state"
```

---

## Task 6: Update `wcag-front` routes and deterministic tests

**Files:**

- Modify: `src/pages/en/search.astro`
- Modify: `src/pages/fi/haku.astro`
- Modify: `tests/search.spec.ts`
- Modify later: `package.json`
- Modify later: `package-lock.json`

- [ ] **Step 1: Add the same localized props**

Use the exact English and Finnish loading/error strings from Task 5.

- [ ] **Step 2: Replace live search assumptions with request routing**

Refactor `tests/search.spec.ts` so all result, empty, delayed, and error
responses are provided through Playwright `page.route`.

Keep existing label and role checks, then add:

- initial URL search;
- submit URL update and focus;
- Back/Forward restoration;
- empty clearing;
- localized polite status and alert behavior;
- unrelated URL parameter/hash preservation;
- local WCAG and cross-site A11ying result URLs.

- [ ] **Step 3: Install `v2.0.10`**

```bash
npm install github:calydia/a11ying-ui#v2.0.10
```

Confirm the resolved commit matches the release tag.

- [ ] **Step 4: Run focused and full verification**

```bash
npx playwright test tests/search.spec.ts --workers 1
npm run quality
```

Expected: check, functional, production build, axe, and visual suites pass
without unreviewed snapshot changes.

- [ ] **Step 5: Commit the consumer update**

```bash
git add src/pages/en/search.astro src/pages/fi/haku.astro tests/search.spec.ts package.json package-lock.json
git commit -m "feat: synchronize search with URL state"
```

---

## Task 7: Final cross-repository verification and publication

- [ ] **Step 1: Compare repository states**

In all three repositories:

```bash
git status --short
git branch -vv
git log --oneline --decorate -6
```

Expected:

- `a11ying-ui` is clean at tagged `v2.0.10`;
- both consumers are clean and one intended commit ahead until pushed;
- no generated reports, test artifacts, or snapshot changes are staged.

- [ ] **Step 2: Push consumer commits**

```bash
git push origin main
```

Run in `a11ying-front` and `wcag-front` after reviewing both diffs and test
results.

- [ ] **Step 3: Update the continuation note**

Record:

- package release commit and tag;
- consumer commits;
- exact unit, behavior, build, axe, visual, and audit results;
- any transient external failures and successful retries;
- whether snapshots changed;
- the next bounded candidate: Payload URL configuration, requests, and
  caching.

Commit and push the note separately in `a11ying-front`.
