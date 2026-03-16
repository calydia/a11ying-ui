# Design System Expansion: MainImage, SearchBlock, Breadcrumb, MainMenu Types

**Date:** 2026-03-16
**Version target:** v1.6.0

## Problem

Several components and types are duplicated verbatim (or near-verbatim) across `a11ying-front` and `wcag-front` but have not yet been moved to the shared `a11ying-ui` design system. This adds maintenance overhead and risks the sites drifting apart over time.

## Scope

This spec covers four items to migrate into `a11ying-ui`:

1. `MainImage` — purely decorative hero image with random mountain background
2. `SearchBlock` — header search icon/link
3. `Breadcrumb` — display-layer breadcrumb navigation
4. `MainMenu` / `MainMenuItem` types — shared navigation interfaces

---

## 1. MainImage

### What it does

Displays a full-width decorative hero image band. Randomly selects one of six mountain images on client mount. Renders `aria-hidden="true"` since it is purely decorative.

### Design

- **Component:** `src/components/MainImage/MainImage.tsx`
- **Props:** none
- **Implementation:** Uses `useState(() => Math.floor(Math.random() * 6) + 1)` to pick image index once on mount (produces values 1–6 inclusive). Background image set via inline `style` prop (instead of scoped Astro CSS).
- **Astro usage:** `<MainImage client:only="react" />` — `client:only` avoids SSR/client hydration mismatch since the random selection differs between server and browser.
- **CSS:** The `.main-image--wrapper::before` overlay stays in each site's `Layout.astro` (it references site-specific dark/light class colour variables and is already defined there).
- **Images:** Both sites serve `/mountains/1.jpg` through `/mountains/6.jpg` and their `.webp` equivalents from their own `public/` folders.

### Migration

- Delete `src/components/MainImage.astro` from both sites.
- Replace with `<MainImage client:only="react" />` imported from `a11ying-ui`.

---

## 2. SearchBlock

### What it does

Renders a search icon link in the site header. Tapping it navigates to the language-appropriate search page.

### Design

- **Component:** `src/components/SearchBlock/SearchBlock.tsx`
- **Props:**
  - `searchLabel: string` — screen-reader label (from site i18n)
  - `searchUrl: string` — href for the search page link (e.g. `/en/search/`)
- **Implementation:** Inline SVG for the magnifying glass icon (same pattern as `ThemeToggle` and `LanguageSwitcher`). Uses `client:load` in Astro — the link is meaningful on first paint (unlike `MainImage` which is purely decorative), so `client:only` would cause a visible link to be absent until hydration.
- **URL resolution:** Each site's Astro wrapper resolves the correct locale-based URL and passes it as `searchUrl`. The component has no i18n dependency.
- **Props type:** `SearchBlockProps`

### Migration

- Delete `src/components/SearchBlock.astro` from both sites.
- In `Layout.astro` of each site, replace `<SearchBlock locale={locale} />` with:
  ```astro
  import { SearchBlock } from 'a11ying-ui';
  ...
  <SearchBlock
    searchLabel={t('search-block-label')}
    searchUrl={locale === 'en' ? '/en/search/' : '/fi/haku/'}
    client:load
  />
  ```

---

## 3. Breadcrumb

### What it does

Renders accessible breadcrumb navigation as `<nav><ol>`. Items before the last are rendered as links; the last item (current page) is plain text.

### Design

- **Component:** `src/components/Breadcrumb/Breadcrumb.tsx`
- **Types:** `BreadcrumbItem` exported from `src/types/BreadcrumbItem.ts`
- **Props:**
  - `items: BreadcrumbItem[]` — ordered list of breadcrumb items
  - `ariaLabel: string` — accessible label for the `<nav>` element
  - `className?: string` — optional extra CSS classes on the `<nav>` wrapper (used by a11ying-front for grid layout class)
- **BreadcrumbItem interface:**
  ```ts
  export interface BreadcrumbItem {
    label: string;
    href?: string; // omit for the current page (rendered as plain text)
  }
  ```
- **Props type:** `BreadcrumbProps`
- **Rendering:** Items separated by `<span aria-hidden="true" className="mx-2">/</span>`. Uses `<ol>` (corrects the existing `<ul>` in a11ying-front).
- **Edge cases:** If `items` is empty, render nothing (return `null`). If `items` has one entry, render it as plain text with no separator.
- **Stories:** Default (3 items with links + current page), single item, empty array, long path (5+ items).
- **Astro usage:** `<Breadcrumb items={...} ariaLabel={...} client:load />`

### Site wrappers (data assembly stays local)

**a11ying-front `Breadcrumb.astro`** — retains the existing CMS fetch (`menuTitles` endpoint) and URL path parsing logic. Assembles a `BreadcrumbItem[]` array, then renders `<Breadcrumb>`.

**wcag-front `Breadcrumb.astro`** — retains the WCAG page hierarchy prop-to-items logic (principle → guideline → criterion). Assembles `BreadcrumbItem[]`, then renders `<Breadcrumb>`.

**wcag-front `BreadcrumbForPages.astro`** — retains the CMS fetch (`menuTitles` endpoint). Assembles `BreadcrumbItem[]`, then renders `<Breadcrumb>`.

### Note on `<ul>` fix

a11ying-front's current `Breadcrumb.astro` uses `<ul>`. Breadcrumbs are an ordered sequence; `<ol>` is semantically correct (and matches wcag-front's existing implementation). This is a safe fix — no visual change, improved semantics.

---

## 4. MainMenu / MainMenuItem Types

### What they are

Shared TypeScript interfaces for the site main navigation menu structure. Currently defined in `menuInterfaces.ts` in both sites (identical content).

### Design

- **File:** `src/types/MainMenu.ts`
- Exports `MainMenu` and `MainMenuItem` interfaces. The `firstLevel` array element shape stays inline inside `MainMenu` (matching both sites). `relationTo` is `optional` because a11ying-front includes it while wcag-front omits it — `optional` satisfies both consumers without a breaking change:
  ```ts
  export interface MainMenu {
    firstLevel: Array<{
      element: string;
      iconClass?: string;
      button?: string;
      mainPath?: string;
      menuPath?: string;
      menuLink?: {
        relationTo?: string;
        value: { title: string; pageUrl: string };
      };
      secondLevel?: MainMenuItem[];
      thirdLevel?: MainMenuItem[];
    }>;
  }

  export interface MainMenuItem {
    element: string;
    iconClass?: string;
    button?: string;
    mainPath?: string;
    menuPath?: string;
    menuLink?: {
      relationTo?: string;
      value: { title: string; pageUrl: string };
    };
    secondLevel?: MainMenuItem[];
    thirdLevel?: MainMenuItem[];
  }
  ```
- Both sites remove `MainMenu` and `MainMenuItem` from their local `menuInterfaces.ts` and import both from `a11ying-ui` instead. Note: `MainMenu.firstLevel` items and `MainMenuItem` share an identical shape by design — they are kept as separate types to exactly match the source structure and to avoid confusion between the first-level nav items (within `MainMenu`) and the general `MainMenuItem` used for recursive second/third levels.
- `MainNavigation.astro`, `SideMenu.astro`, and `HumanSitemap.astro` in both sites update their import lines.

---

## Versioning

All four items ship together as **v1.6.0**. Both sites update their `package.json` dependency to `github:calydia/a11ying-ui#v1.6.0`.

## Files Changed

### a11ying-ui (new/modified)
- `src/components/MainImage/MainImage.tsx` *(new)*
- `src/components/MainImage/MainImage.stories.tsx` *(new)*
- `src/components/SearchBlock/SearchBlock.tsx` *(new)*
- `src/components/SearchBlock/SearchBlock.stories.tsx` *(new)*
- `src/components/Breadcrumb/Breadcrumb.tsx` *(new)*
- `src/components/Breadcrumb/Breadcrumb.stories.tsx` *(new)*
- `src/types/BreadcrumbItem.ts` *(new)*
- `src/types/MainMenu.ts` *(new)*
- `src/index.ts` *(updated — add the following exports)*:
  ```ts
  export { MainImage } from './components/MainImage/MainImage';
  export { SearchBlock } from './components/SearchBlock/SearchBlock';
  export type { SearchBlockProps } from './components/SearchBlock/SearchBlock';
  export { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
  export type { BreadcrumbProps } from './components/Breadcrumb/Breadcrumb';
  export type { BreadcrumbItem } from './types/BreadcrumbItem';
  export type { MainMenu, MainMenuItem } from './types/MainMenu';
  ```
- `package.json` *(updated — bump to 1.6.0)*

### a11ying-front (modified)
- `src/layouts/Layout.astro` — swap `SearchBlock` and `MainImage` imports
- `src/components/Breadcrumb.astro` — data assembly wrapper, renders shared `<Breadcrumb>`
- `src/components/MainNavigation.astro` — update type import
- `src/components/SideMenu.astro` — update type import
- `src/components/HumanSitemap.astro` — update type import
- `src/interfaces/menuInterfaces.ts` — remove `MainMenu`/`MainMenuItem`
- `src/components/SearchBlock.astro` *(deleted)*
- `src/components/MainImage.astro` *(deleted)*

### wcag-front (modified)
- `src/layouts/Layout.astro` — swap `SearchBlock` and `MainImage` imports
- `src/components/Breadcrumb.astro` — data assembly wrapper, renders shared `<Breadcrumb>`
- `src/components/BreadcrumbForPages.astro` — data assembly wrapper, renders shared `<Breadcrumb>`
- `src/components/MainNavigation.astro` — update type import
- `src/components/SideMenu.astro` — update type import
- `src/components/HumanSitemap.astro` — update type import
- `src/interfaces/menuInterfaces.ts` — remove `MainMenu`/`MainMenuItem`
- `src/components/SearchBlock.astro` *(deleted)*
- `src/components/MainImage.astro` *(deleted)*
