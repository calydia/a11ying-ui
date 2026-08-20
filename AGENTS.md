# AGENTS.md

## Project

`a11ying-ui` is the shared design system for the A11ying with Sanna family. It
provides framework-neutral brand foundations for four public sites and React
components and complete global styles for the two closest application
consumers. The package contains:

- accessible shared UI components;
- brand colors, typography, spacing, and global element styles;
- TypeScript data contracts shared by the consuming sites;
- Storybook stories for component development and documentation;
- Playwright accessibility and visual regression tests against Storybook.

Vite builds ESM and CommonJS component bundles into `dist/` and copies the
global stylesheet and Tailwind configuration there. Public package exports are
defined in `package.json` and component/type exports are collected in
`src/index.ts`.

## Related Repositories

The sibling repositories normally live under the same `projects` directory:

| Repository | Role |
| --- | --- |
| `../a11ying-ui` | This shared design-system package. |
| `../a11ying-front` | Broad bilingual accessibility education and reference site; full React and style consumer. |
| `../wcag-front` | Focused bilingual WCAG guide; full React and style consumer. |
| `../a11y-testing-astro` | English hands-on accessibility testing lab; tokens-only Astro consumer. |
| `../sanna` | Bilingual personal/professional site and English blog; tokens-only Astro consumer. |

All four sites consume a tagged GitHub version of `a11ying-ui`; they are not
automatically linked to this sibling checkout. A completed shared change
therefore includes package verification, a release/tag when appropriate,
dependency updates in every affected consumer, and consumer-level testing.

The public sites have distinct responsibilities. A11ying teaches broad
accessibility knowledge, WCAG explains the standard and its criteria, Testing
Lab teaches and exercises practical testing, and Sanna provides personal,
professional, speaking, projects, and editorial-blog context. Shared branding
does not make their routing, content models, or page composition interchangeable.

Use these ownership boundaries:

- Put stable brand colors, font-family tokens, dark-mode foundations, and
  cross-site custom properties in the framework-neutral tokens export.
- Put reusable React components, shared React interaction behavior, and broad
  global styles here only when they form a stable contract for A11ying and WCAG.
- Keep site routing, CMS requests, page composition, redirects, metadata, and
  content-specific logic in the consumer repositories.
- Keep Testing Lab and Sanna Astro components local. Do not add React to either
  site merely to reuse a small component.
- Avoid adding a prop or abstraction for a single-site workaround unless it
  represents a stable reusable contract.
- Treat all four sites as supported token consumers. A package change is not
  complete if it breaks a relevant consumer integration.

Use this decision order: keep content and site behavior local; share stable
brand primitives as tokens; consider React component ownership only for a
reusable need shared by A11ying and WCAG; keep merely similar or single-site
components local.

## Commit and Push Authority

This is the only repository in the family where an agent may commit and push
changes. That permission supports the tagged package release workflow and does
not extend to any public-site repository. After releasing a package change, an
agent may update and verify affected consumers, but those consumer changes must
remain uncommitted for human review.

## Repository Map

- `src/components/`: React components, colocated prop types, and Storybook
  stories.
- `src/foundations/`: Storybook documentation for shared visual foundations.
- `src/styles/global.css`: complete base styles and shared component classes for
  the full React/style consumers; it imports the shared tokens.
- `src/styles/tokens.css`: framework-neutral brand foundations used by all four
  public sites.
- `src/types/`: exported cross-project data contracts.
- `src/index.ts`: public component and type API.
- `.storybook/`: Storybook Vite configuration and global preview styling.
- `tests/storybook/`: Playwright accessibility and visual tests.
- `vite.config.build.ts`: package bundle and non-JavaScript asset build.
- `tailwind.config.cjs`: exported compatibility/configuration surface.
- `dist/` and `storybook-static/`: generated output.

## Component Rules

- Accessibility is part of the component API. Preserve semantic elements,
  keyboard operation, visible focus, accessible names, state attributes, and
  sensible disabled behavior.
- Prefer native HTML behavior before adding ARIA or custom event handling.
- Keep consumer-provided labels and URLs explicit where localization or routing
  differs between sites.
- Support the package's `.light` and `.dark` class model and test meaningful
  visual changes in both contexts.
- Keep components focused and reusable. Site-specific data adaptation should
  happen in an Astro wrapper in the relevant consumer.
- Add or update a Storybook story whenever public behavior, states, or visual
  output changes.
- Export new public components and types from `src/index.ts`.
- Consider the package export map and built `dist/` contents when adding a new
  public asset or entry point.
- Do not manually edit generated `dist/` or `storybook-static/` files.
- Do not update visual snapshots until the rendered change has been reviewed
  and confirmed intentional.

## Commands

Run commands from this repository root:

```bash
npm install
npm run storybook
npm run build
npm run build-storybook
npm run test:storybook
```

For intentional Storybook visual changes:

```bash
npm run test:storybook:update
npm run test:storybook
```

`npm run test:storybook` runs both axe checks and visual snapshots. Use
`npm run build` as the package/API gate and `npm run build-storybook` when
changing Storybook configuration or documentation behavior.

## Cross-Repository Changes

For a shared component or token change:

1. Implement the smallest reusable API in this repository.
2. Add or update Storybook coverage for relevant states.
3. Run `npm run build` and `npm run test:storybook`.
4. Release/tag the package as appropriate.
5. Update the dependency and lockfile in every affected consumer.
6. Run focused tests in affected sites; run each full quality gate for
   foundation, layout, navigation, theme, or broadly visual changes.
7. Leave all public-site changes uncommitted for human review.

This package publishes declarations from `dist/index.d.ts`. When changing
public React types, verify the generated declarations and both full consumers. Missing or
incorrect package types must be fixed here rather than patched with consumer
ambient module shims.
