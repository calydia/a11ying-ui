# RichText Heading IDs Implementation Plan

> **Design:** `docs/superpowers/specs/2026-06-13-richtext-heading-ids-design.md`

**Goal:** Generate deterministic, ASCII-compatible, collision-safe heading IDs
for all headings rendered by one top-level `RichText`, while preserving current
table of contents membership and the public component API.

**Repositories:**

- `a11ying-ui`: implementation, tests, Storybook coverage, release
- `a11ying-front`: dependency update and consumer verification
- `wcag-front`: dependency update and consumer verification

---

## Task 1: Add the heading plan as a tested internal unit

**Files:**

- Create: `src/lib/richTextHeadingPlan.ts`
- Create: `src/lib/richTextHeadingPlan.test.ts`
- Read: `src/types/RichTextNode.ts`

- [ ] **Step 1: Write failing slug normalization tests**

Cover these exact behaviors:

- `Näkö ja ääni` becomes `nako-ja-aani`.
- `  Hello,   world!  ` becomes `hello-world`.
- combining marks are removed after NFKD normalization;
- remaining non-ASCII-only or symbol-only text produces an empty base slug so
  the caller can select a type-specific fallback.

- [ ] **Step 2: Run the focused unit test and confirm failure**

Run:

```bash
npx vitest run src/lib/richTextHeadingPlan.test.ts
```

Expected: failure because the helper does not exist.

- [ ] **Step 3: Implement the ASCII slug helper**

Create an internal helper that:

1. lowercases;
2. applies `normalize('NFKD')`;
3. removes Unicode combining marks;
4. converts runs outside `[a-z0-9]` to `-`;
5. trims leading and trailing hyphens.

Do not export this helper from `src/index.ts`; it is package-internal.

- [ ] **Step 4: Add failing heading allocation tests**

Build small `RichTextNode` fixtures and assert:

- duplicate headings allocate `overview`, `overview-1`, `overview-2`;
- a natural `overview-1` slug cannot collide with a generated suffix;
- normal and ContentBox headings share one namespace;
- empty normal headings use `heading`;
- empty ContentBox headings use `content-box`;
- headings inside ContentBox and DisclosureWidget bodies receive IDs;
- nested headings are excluded from TOC entries;
- top-level normal and ContentBox headings remain in TOC entries;
- mixed inline text is collected in document order.

- [ ] **Step 5: Implement `buildRichTextHeadingPlan`**

Return an internal plan containing:

- a node-to-ID lookup for rendered normal and ContentBox heading nodes;
- ordered TOC entries with `id`, `text`, and `level`.

Use a `Set<string>` of allocated IDs and per-base suffix counters. Before
accepting any candidate, check the full allocated set so source text such as
`overview-1` cannot collide with a suffix generated for `overview`.

Traverse nodes in rendered document order:

- allocate a normal heading before visiting its ordinary children;
- allocate a ContentBox heading before visiting `boxContent`;
- visit DisclosureWidget `content` where it renders;
- carry a TOC-membership flag that becomes `false` inside field-backed nested
  RichText content;
- continue to allocate IDs when TOC membership is `false`.

- [ ] **Step 6: Run focused and full unit tests**

Run:

```bash
npx vitest run src/lib/richTextHeadingPlan.test.ts
npm run test:unit
```

Expected: all tests pass.

- [ ] **Step 7: Commit the internal heading plan**

```bash
git add src/lib/richTextHeadingPlan.ts src/lib/richTextHeadingPlan.test.ts
git commit -m "feat: plan stable RichText heading IDs"
```

---

## Task 2: Make RichText consume the shared heading plan

**Files:**

- Modify: `src/components/RichText/RichText.tsx`
- Create: `src/components/RichText/RichText.test.tsx`

- [ ] **Step 1: Add failing rendering integration assertions**

Use `renderToStaticMarkup` from `react-dom/server`. Assert that:

- normal heading `id` values match planned IDs;
- ContentBox heading `id` values match planned IDs;
- nested headings use the top-level collision namespace;
- TOC `href` fragments exactly match the corresponding rendered IDs when the
  same nodes are rendered in TOC and content modes.

Do not introduce a browser DOM test dependency solely for these assertions.

- [ ] **Step 2: Remove independent slugging from `RichText.tsx`**

Delete the local `slugify` and `collectHeadings` paths. Build the heading plan
once per top-level `RichText` call with `useMemo`.

- [ ] **Step 3: Thread the plan through content rendering**

Extend private renderer arguments or add a private rendering context so:

- normal heading renderers look up their assigned ID;
- ContentBox heading renderers look up their assigned ID;
- nested ContentBox and DisclosureWidget nodes render through the same private
  content renderer and plan instead of mounting a fresh public `RichText`;
- missing lookups fail closed to the type-specific fallback only as defensive
  behavior, not as a second slugging path.

Keep `RichTextProps` and all public exports unchanged.

- [ ] **Step 4: Render the TOC from the plan**

Use the plan's ordered TOC entries. Preserve:

- current localized/default TOC labels;
- current TOC-only behavior when `withTOC` is `true`;
- existing markup and classes;
- current membership rules.

Use a key that remains unique even when visible heading text repeats.

- [ ] **Step 5: Run tests and build**

Run:

```bash
npm run test:unit
npm run build
```

Expected: unit tests pass and declarations/build output completes without
public API changes.

- [ ] **Step 6: Commit RichText integration**

```bash
git add src/components/RichText/RichText.tsx src/components/RichText/RichText.test.tsx
git commit -m "feat: stabilize RichText heading fragments"
```

---

## Task 3: Expand Storybook regression coverage

**Files:**

- Modify: `src/components/RichText/RichText.stories.tsx`
- Modify: `tests/storybook/a11y.spec.ts`
- Create: `tests/storybook/richtext.spec.ts`
- Modify: `tests/storybook/visual.spec.ts`
- Create: `tests/storybook/visual.spec.ts-snapshots/richtext-heading-ids-chromium-darwin.png`

- [ ] **Step 1: Update the TOC fixture**

Add one paired TOC-plus-content story that renders the same fixture once with
`withTOC` and once without it. Include:

- Finnish accented text;
- duplicate heading text;
- a ContentBox collision;
- a nested heading that receives a unique ID but stays outside the TOC.

Keep the story readable as component documentation.

- [ ] **Step 2: Add Storybook behavior assertions**

Create `tests/storybook/richtext.spec.ts`. For the paired story, assert:

- all rendered IDs are unique;
- every TOC fragment resolves to exactly one element;
- nested headings are absent from TOC links.

- [ ] **Step 3: Add the paired story to accessibility and visual coverage**

Add the story ID to `a11y.spec.ts` and `visual.spec.ts`. Generate its new
snapshot, inspect the rendered image, then rerun the visual test without update
mode. Do not modify existing snapshots.

- [ ] **Step 4: Run package verification**

Run:

```bash
npm run test:unit
npm run build
npx playwright test tests/storybook/richtext.spec.ts --config playwright.storybook.config.ts
npx playwright test tests/storybook/visual.spec.ts --config playwright.storybook.config.ts --grep "richtext-heading-ids" --update-snapshots
npm run test:storybook
```

Expected:

- all unit tests pass;
- package build passes;
- RichText fragment behavior assertions pass;
- Storybook accessibility and visual tests pass;
- only the reviewed paired-story snapshot is added.

- [ ] **Step 5: Commit Storybook coverage**

```bash
git add src/components/RichText/RichText.stories.tsx tests/storybook
git commit -m "test: cover RichText heading fragments"
```

---

## Task 4: Release `a11ying-ui`

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Confirm a clean package worktree**

Run:

```bash
git status --short
git log --oneline --decorate -5
```

Expected: only the intended version files will change in this task.

- [ ] **Step 2: Bump the patch version**

Change `2.0.7` to `2.0.8` in `package.json` and `package-lock.json` using the
repository's normal npm version workflow without creating an automatic commit.

- [ ] **Step 3: Run the final package gate**

Run:

```bash
npm run test:unit
npm run build
npm audit --omit=dev
npm run test:storybook
```

Expected: all checks pass and the production dependency audit reports no
unresolved vulnerabilities.

- [ ] **Step 4: Commit, tag, and push**

```bash
git add package.json package-lock.json
git commit -m "chore: release a11ying-ui 2.0.8"
git tag v2.0.8
git push origin main
git push origin v2.0.8
```

Verify the remote tag exists before updating either consumer.

---

## Task 5: Update and verify `a11ying-front`

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Preserve: `docs/superpowers/specs/2026-06-12-cross-project-improvements-continuation.md`

- [ ] **Step 1: Reconfirm branch state**

Run:

```bash
git status --short
git branch -vv
git log --oneline --decorate -3
```

Expected:

- `main` still contains the existing local `7b8d95c` consumer commit;
- the continuation note remains untracked and is not included in the package
  update commit.

- [ ] **Step 2: Install `a11ying-ui` v2.0.8**

Run:

```bash
npm install github:calydia/a11ying-ui#v2.0.8
```

Confirm both manifest and lockfile resolve to `v2.0.8`.

- [ ] **Step 3: Run the full consumer quality gate**

Run:

```bash
npm run quality
```

Expected: static checks, functional tests, accessibility tests, and visual
tests all pass without snapshot updates.

- [ ] **Step 4: Commit the dependency update**

```bash
git add package.json package-lock.json
git commit -m "chore: update a11ying-ui to v2.0.8"
```

Do not add the continuation note to this commit.

---

## Task 6: Update and verify `wcag-front`

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Reconfirm branch state**

Run:

```bash
git status --short
git branch -vv
git log --oneline --decorate -3
```

Expected: `main` still contains the existing local `a359fc0` consumer commit
and no unrelated changes are present.

- [ ] **Step 2: Install `a11ying-ui` v2.0.8**

Run:

```bash
npm install github:calydia/a11ying-ui#v2.0.8
```

Confirm both manifest and lockfile resolve to `v2.0.8`.

- [ ] **Step 3: Run the full consumer quality gate**

Run:

```bash
npm run quality
```

Expected: static checks, functional tests, accessibility tests, and visual
tests all pass without snapshot updates.

- [ ] **Step 4: Commit the dependency update**

```bash
git add package.json package-lock.json
git commit -m "chore: update a11ying-ui to v2.0.8"
```

---

## Task 7: Final cross-repository verification and publication

- [ ] **Step 1: Compare final repository states**

In all three repositories, run:

```bash
git status --short
git branch -vv
git log --oneline --decorate -5
```

Expected:

- `a11ying-ui` is clean and includes tag `v2.0.8`;
- each consumer is clean except for previously documented untracked notes;
- each consumer contains both the prior sanitization commit and the new
  dependency update commit.

- [ ] **Step 2: Push consumer commits**

After reviewing the commit stacks:

```bash
git push origin main
```

Run in `a11ying-front` and `wcag-front`. This publishes both the previously
unpublished sanitization commits and the new `v2.0.8` dependency commits.

- [ ] **Step 3: Record verification**

Update the cross-project continuation note with:

- released package version and commit;
- consumer update commits;
- exact unit, build, accessibility, functional, visual, and audit results;
- whether any snapshots changed;
- the next bounded improvement candidate.

Commit the note separately only if it is intended to become repository
documentation.
