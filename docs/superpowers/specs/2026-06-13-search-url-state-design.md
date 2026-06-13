# Search URL State And Accessibility

## Goal

Make `SearchComponent` searches shareable, restorable through browser history,
resistant to overlapping request races, and explicit about loading and failure
states for screen-reader users.

The shared component owns this behavior so `a11ying-front` and `wcag-front`
remain consistent in English and Finnish.

## URL Contract

The search query uses the `q` URL parameter.

- Loading a search page with a non-empty `?q=term` pre-fills the input and
  automatically runs that search.
- Explicit form submission trims the input and uses `history.pushState` when
  the normalized query differs from the current `q` value.
- Empty or whitespace-only submission removes `q` and returns the component to
  its initial idle state.
- Browser Back and Forward restore the input and matching search state without
  reloading the page or creating another history entry.
- Unrelated query parameters, the current pathname, and the URL hash are
  preserved.
- `URLSearchParams` performs all parsing and encoding.
- Search results and errors are not stored in `history.state`; they are
  reconstructed from `q`.

Initial URL processing and `popstate` handling do not call `pushState`.

## State Model

`SearchComponent` uses four explicit states:

- `idle`: no normalized query and no results, zero-results message, or error;
- `loading`: a request is active for the current normalized query;
- `success`: the latest request completed with zero or more results;
- `error`: the latest request failed.

The input is controlled and always reflects the current draft text. The
submitted normalized query is tracked separately so result headings and URL
state do not change while the user merely edits the field.

On mount, the component reads `q`, sets both the input and submitted query, and
searches when the normalized value is non-empty. On `popstate`, it repeats that
process without modifying browser history.

## Request Lifecycle

Every search starts with a new `AbortController` and monotonically increasing
request identity.

- Starting another search aborts the previous request.
- Returning to idle aborts any active request.
- Only the latest request identity may update results, counts, status, or
  errors.
- An aborted request does not produce a visible or announced error.
- Component unmount aborts the active request.

The fetch helper accepts an `AbortSignal`. A failed current request retains the
submitted query in the input and URL, clears stale results, and enters the
error state.

## Accessible UI

The existing search form and labels remain. The input keeps focus after
submission.

During loading:

- the submit button is disabled;
- the button's localized label does not change;
- the form exposes `aria-busy="true"`;
- a localized loading message is announced.

One persistent status container uses:

- `role="status"`;
- `aria-live="polite"`;
- `aria-atomic="true"`.

It announces:

- the localized loading message;
- the localized result count after a successful search with results;
- the localized no-results message after a successful search with zero
  results.

The status container stays mounted and is empty in the idle and error states.
This avoids announcing a zero-results message before any search occurs.

Request failures use a separate persistent visible container with
`role="alert"`. It contains the localized error message only in the error state
so the failure is announced assertively once. Error state does not also
announce or display the no-results message.

## Rendered Results

Successful searches preserve the current result markup, localized site and
content-type labels, and per-collection URL routing.

- A positive result count shows the localized result heading and result list.
- A zero result count shows the localized no-results paragraph.
- Idle, loading, and error states do not show stale result headings or lists.
- Loading begins by clearing stale results and prior errors.

## Public API

`SearchComponent` adds two required localized string props:

- `searchLoading`;
- `searchError`.

Both search routes in `a11ying-front` and both search routes in `wcag-front`
provide English and Finnish values. No consumer implements local URL or request
state logic.

## Error Handling

The component distinguishes:

- an aborted obsolete request, which is ignored;
- a failed latest request, which enters the visible and announced error state;
- a successful zero-result request, which enters success and uses the
  no-results message.

Network and non-success HTTP failures use the same localized user-facing error
message. Technical details may still be logged for diagnostics without being
shown to users.

## Testing

Shared unit and component tests will cover:

- query trimming and URL encoding;
- preserving unrelated parameters and hashes;
- initial non-empty `q` pre-fill and automatic search;
- empty or missing `q` remaining idle;
- explicit submission adding one history entry;
- repeated submission of the same normalized query not adding another entry;
- empty submission removing `q` and clearing visible state;
- Back and Forward restoring input and results;
- request abortion and latest-request-only updates;
- failures retaining `q`, clearing stale results, and showing `role="alert"`;
- aborted requests producing no error;
- persistent polite status semantics and exact loading/result/no-result
  announcements;
- `aria-busy` and disabled-submit behavior during loading;
- input focus retention;
- unchanged result URL routing.

Storybook will include deterministic success, zero-result, loading, and error
scenarios. Accessibility tests will verify the live-region and alert semantics;
visual coverage will be added only where a newly visible state needs a reviewed
baseline.

Both consumers will add localized props and URL/history Playwright coverage for
their English and Finnish routes. After the package release and dependency
updates, both full consumer quality gates must pass without unreviewed snapshot
changes.

## Ownership

URL synchronization, request cancellation, state transitions, announcements,
and result rendering belong in `a11ying-ui`. Consumers own route composition,
localized strings, Payload base URL configuration, and cross-site result URL
mapping.
