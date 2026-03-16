# Design System v1.6.0 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add MainImage, SearchBlock, and Breadcrumb components plus MainMenu/MainMenuItem types to a11ying-ui v1.6.0, then migrate both consuming sites.

**Architecture:** Three new React components are added to a11ying-ui with their Storybook stories. Two type files are added. Both consuming sites delete their local Astro versions and use the shared components instead; their data-assembly Astro wrappers (Breadcrumb) are rewritten to produce `BreadcrumbItem[]` arrays. Build verification is the test harness throughout.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, Vite (lib build), Storybook 10, Astro 5, `github:calydia/a11ying-ui` npm dependency.

---

## Chunk 1: a11ying-ui — Types, Components, Build, Publish

### Task 1: Add BreadcrumbItem type

**Files:**
- Create: `a11ying-ui/src/types/BreadcrumbItem.ts`

- [ ] **Step 1: Create the type file**

  ```ts
  // a11ying-ui/src/types/BreadcrumbItem.ts
  export interface BreadcrumbItem {
    label: string;
    href?: string; // omit for the current page (rendered as plain text)
  }
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add src/types/BreadcrumbItem.ts
  git commit -m "Add BreadcrumbItem type

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 2: Add MainMenu and MainMenuItem types

**Files:**
- Create: `a11ying-ui/src/types/MainMenu.ts`

- [ ] **Step 1: Create the type file**

  `relationTo` is `optional` because a11ying-front includes it and wcag-front omits it.
  `firstLevel` stays inline (not extracted) to exactly match source structure.

  ```ts
  // a11ying-ui/src/types/MainMenu.ts
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

- [ ] **Step 2: Commit**

  ```bash
  git add src/types/MainMenu.ts
  git commit -m "Add MainMenu and MainMenuItem types

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 3: Add MainImage component

**Files:**
- Create: `a11ying-ui/src/components/MainImage/MainImage.tsx`
- Create: `a11ying-ui/src/components/MainImage/MainImage.stories.tsx`

- [ ] **Step 1: Create the component**

  Uses `useState` with a lazy initialiser so the random value is computed once on client mount (avoids SSR/client mismatch when consumed with `client:only="react"`). Background images are `.jpg` — both sites serve `/mountains/1.jpg` through `/mountains/6.jpg` from their `public/` folders.

  ```tsx
  // a11ying-ui/src/components/MainImage/MainImage.tsx
  import React, { useState } from 'react';

  export function MainImage() {
    const [imageNumber] = useState(() => Math.floor(Math.random() * 6) + 1);

    return (
      <div aria-hidden="true" className="main-image--wrapper relative w-full h-125-px md:h-250-px lg:h-350-px overflow-hidden">
        <div
          className="relative w-screen h-125-px md:h-250-px lg:h-350-px bg-cover bg-center"
          style={{ backgroundImage: `url('/mountains/${imageNumber}.jpg')` }}
        />
      </div>
    );
  }
  ```

- [ ] **Step 2: Create the story**

  ```tsx
  // a11ying-ui/src/components/MainImage/MainImage.stories.tsx
  import type { Meta, StoryObj } from '@storybook/react';
  import { MainImage } from './MainImage';

  const meta: Meta<typeof MainImage> = {
    title: 'Components/MainImage',
    component: MainImage,
    parameters: { layout: 'fullscreen' },
  };

  export default meta;
  type Story = StoryObj<typeof MainImage>;

  export const Default: Story = {};
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/MainImage/
  git commit -m "Add MainImage component

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 4: Add SearchBlock component

**Files:**
- Create: `a11ying-ui/src/components/SearchBlock/SearchBlock.tsx`
- Create: `a11ying-ui/src/components/SearchBlock/SearchBlock.stories.tsx`

- [ ] **Step 1: Create the component**

  SVG path is from `a11ying-front/src/icons/magnifying-glass-solid.svg`. `client:load` is used (not `client:only`) because the link must be visible on first paint.

  ```tsx
  // a11ying-ui/src/components/SearchBlock/SearchBlock.tsx
  import React from 'react';

  export interface SearchBlockProps {
    searchLabel: string;
    searchUrl: string;
  }

  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      aria-hidden="true"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5a6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
        clipRule="evenodd"
      />
    </svg>
  );

  export function SearchBlock({ searchLabel, searchUrl }: SearchBlockProps) {
    return (
      <div id="search-a" className="text-black dark:text-white px-3 relative">
        <a
          href={searchUrl}
          className="inline-block py-2 px-1 text-black dark:text-white border-y-4 border-transparent
            hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
            focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white"
        >
          <SearchIcon />
          <span className="sr-only">{searchLabel}</span>
        </a>
      </div>
    );
  }
  ```

- [ ] **Step 2: Create the story**

  ```tsx
  // a11ying-ui/src/components/SearchBlock/SearchBlock.stories.tsx
  import type { Meta, StoryObj } from '@storybook/react';
  import { SearchBlock } from './SearchBlock';

  const meta: Meta<typeof SearchBlock> = {
    title: 'Components/SearchBlock',
    component: SearchBlock,
    parameters: { layout: 'centered' },
  };

  export default meta;
  type Story = StoryObj<typeof SearchBlock>;

  export const English: Story = {
    args: {
      searchLabel: 'Search',
      searchUrl: '/en/search/',
    },
  };

  export const Finnish: Story = {
    args: {
      searchLabel: 'Haku',
      searchUrl: '/fi/haku/',
    },
  };
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/SearchBlock/
  git commit -m "Add SearchBlock component

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 5: Add Breadcrumb component

**Files:**
- Create: `a11ying-ui/src/components/Breadcrumb/Breadcrumb.tsx`
- Create: `a11ying-ui/src/components/Breadcrumb/Breadcrumb.stories.tsx`

- [ ] **Step 1: Create the component**

  Items with `href` become `<a>` links; items without are plain text (current page). Empty array returns `null`. Separator is `aria-hidden`.

  ```tsx
  // a11ying-ui/src/components/Breadcrumb/Breadcrumb.tsx
  import React from 'react';
  import type { BreadcrumbItem } from '../../types/BreadcrumbItem';

  export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    ariaLabel: string;
    className?: string;
  }

  export function Breadcrumb({ items, ariaLabel, className = '' }: BreadcrumbProps) {
    if (items.length === 0) return null;

    return (
      <nav aria-label={ariaLabel} className={className}>
        <ol className="block list-none m-0 p-0">
          {items.map((item, index) => (
            <li key={index} className="inline">
              {index > 0 && (
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
              )}
              {item.href ? <a href={item.href}>{item.label}</a> : item.label}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
  ```

- [ ] **Step 2: Create the story**

  Covers the four spec scenarios: default, single item, empty array, long path.

  ```tsx
  // a11ying-ui/src/components/Breadcrumb/Breadcrumb.stories.tsx
  import type { Meta, StoryObj } from '@storybook/react';
  import { Breadcrumb } from './Breadcrumb';

  const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    parameters: { layout: 'padded' },
  };

  export default meta;
  type Story = StoryObj<typeof Breadcrumb>;

  export const Default: Story = {
    args: {
      ariaLabel: 'Breadcrumb',
      items: [
        { label: 'Home', href: '/en/' },
        { label: 'Fundamentals', href: '/en/fundamentals/' },
        { label: 'The basics' },
      ],
    },
  };

  export const SingleItem: Story = {
    args: {
      ariaLabel: 'Breadcrumb',
      items: [{ label: 'Home' }],
    },
  };

  export const Empty: Story = {
    args: {
      ariaLabel: 'Breadcrumb',
      items: [],
    },
  };

  export const LongPath: Story = {
    args: {
      ariaLabel: 'Breadcrumb',
      items: [
        { label: 'Home', href: '/en/' },
        { label: 'WCAG', href: '/en/wcag/' },
        { label: '1 Perceivable', href: '/en/wcag/perceivable/' },
        { label: '1.1 Text alternatives', href: '/en/wcag/perceivable/text-alternatives/' },
        { label: '1.1.1 Non-text content' },
      ],
    },
  };
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/Breadcrumb/
  git commit -m "Add Breadcrumb component

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 6: Update exports, bump version, build, tag, push

**Files:**
- Modify: `a11ying-ui/src/index.ts`
- Modify: `a11ying-ui/package.json`

- [ ] **Step 1: Update `src/index.ts`**

  The current file ends with these exports in the Types block:
  ```ts
  export type { FooterMenu, FooterMenuRaw, FooterMenuItem } from './types/FooterMenu';
  ```
  Append the new component and type exports immediately after:

  ```ts
  // Components (add after existing LanguageSwitcher export):
  export { MainImage } from './components/MainImage/MainImage';

  export { SearchBlock } from './components/SearchBlock/SearchBlock';
  export type { SearchBlockProps } from './components/SearchBlock/SearchBlock';

  export { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
  export type { BreadcrumbProps } from './components/Breadcrumb/Breadcrumb';

  // Types (add after FooterMenu exports):
  export type { BreadcrumbItem } from './types/BreadcrumbItem';
  export type { MainMenu, MainMenuItem } from './types/MainMenu';
  ```

- [ ] **Step 2: Bump version in `package.json`**

  Change `"version": "1.0.0"` to `"version": "1.6.0"`.

  _(Note: package.json `version` field is `"1.0.0"` — the git tags track the actual release versions. Bump to match tag.)_

- [ ] **Step 3: Build and verify**

  ```bash
  cd /Users/sannamakinen/projects/a11ying-ui
  npm run build && ls dist/index.js dist/index.cjs dist/global.css dist/tailwind.config.cjs
  ```

  Expected: build succeeds, all four dist files listed. No TypeScript errors.

- [ ] **Step 4: Commit, tag, push**

  ```bash
  git add src/index.ts package.json dist/
  git commit -m "Add MainImage, SearchBlock, Breadcrumb components and BreadcrumbItem/MainMenu types (v1.6.0)

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  git tag v1.6.0
  git push origin main --tags
  ```

---

## Chunk 2: a11ying-front Migration

### Task 7: Install v1.6.0 and update SearchBlock + MainImage in Layout

**Files:**
- Modify: `a11ying-front/package.json` (via npm install)
- Modify: `a11ying-front/src/layouts/Layout.astro`
- Delete: `a11ying-front/src/components/SearchBlock.astro`
- Delete: `a11ying-front/src/components/MainImage.astro`

- [ ] **Step 1: Install new version**

  ```bash
  cd /Users/sannamakinen/projects/a11ying-front
  npm install github:calydia/a11ying-ui#v1.6.0
  ```

- [ ] **Step 2: Update imports in `Layout.astro`**

  Replace line 6 (MainImage import):
  ```astro
  // Remove:
  import MainImage from '../components/MainImage.astro';
  // Add (with other a11ying-ui imports — line 2-4 already import from 'a11ying-ui'):
  import { MainImage } from 'a11ying-ui';
  ```

  Replace line 11 (SearchBlock import):
  ```astro
  // Remove:
  import SearchBlock from '../components/SearchBlock.astro';
  // Add:
  import { SearchBlock } from 'a11ying-ui';
  ```

  _(Consolidate: existing lines 2–4 already import `ThemeToggle`, `LanguageSwitcher`, `SkipLink` from `'a11ying-ui'`. Add `MainImage` and `SearchBlock` to that same import line.)_

  Final consolidated import:
  ```astro
  import { ThemeToggle, LanguageSwitcher, SkipLink, MainImage, SearchBlock } from 'a11ying-ui';
  ```

- [ ] **Step 3: Update SearchBlock usage (line 81)**

  ```astro
  // Remove:
  <SearchBlock locale={locale} />
  // Replace with:
  <SearchBlock searchLabel={t('search-block-label')} searchUrl={locale === 'en' ? '/en/search/' : '/fi/haku/'} client:load />
  ```

- [ ] **Step 4: Update MainImage usage (line 100)**

  ```astro
  // Remove:
  <MainImage />
  // Replace with:
  <MainImage client:only="react" />
  ```

- [ ] **Step 5: Delete local component files**

  ```bash
  rm src/components/SearchBlock.astro
  rm src/components/MainImage.astro
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add -A
  git commit -m "Migrate SearchBlock and MainImage to a11ying-ui v1.6.0

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 8: Rewrite Breadcrumb.astro as data-assembly wrapper

**Files:**
- Modify: `a11ying-front/src/components/Breadcrumb.astro`

This wrapper retains all CMS-fetching and URL-parsing logic but assembles a `BreadcrumbItem[]` array and passes it to the shared `<Breadcrumb>` component instead of rendering HTML directly.

- [ ] **Step 1: Replace `Breadcrumb.astro` content**

  ```astro
  ---
  import fetchApi from '../lib/payload';
  import type { MenuTitleInterface } from '../interfaces/menuTitleInterface';
  import { getLangFromUrl, useTranslations } from '../i18n/utils';
  import { Breadcrumb } from 'a11ying-ui';
  import type { BreadcrumbItem } from 'a11ying-ui';

  const lang = getLangFromUrl(Astro.url);
  const t = useTranslations(lang);

  const menuTitles = await fetchApi<MenuTitleInterface>({
    endpoint: 'menuTitles',
    global: true,
    lang: lang,
  });

  const menuTitleList = menuTitles.list.menuItems;
  const pathArray = (Astro.props.currentUrl !== '/') ? Astro.props.currentUrl.split('/') : null;
  const currentSlug = Astro.props.currentSlug;
  const currentTitle = Astro.props.currentTitle;
  const currentTitleCap = currentTitle.charAt(0).toUpperCase() + currentTitle.slice(1);
  const pageType = Astro.props.type;
  const demoTitle = lang === 'en' ? 'Demos' : 'Demot';

  const items: BreadcrumbItem[] = [{ label: t('home-link'), href: `/${lang}/` }];

  if (pageType === 'demo') {
    items.push({ label: demoTitle });
  }

  if (pathArray) {
    for (const menuItem of pathArray) {
      let found = false;
      for (const i in menuTitleList) {
        if (menuTitleList[i].menuPath === menuItem) {
          items.push({ label: menuTitleList[i].menuTitle });
          found = true;
          break;
        }
      }
      if (!found) {
        const label = (menuItem === currentSlug)
          ? currentTitleCap
          : (() => {
              const name = menuItem.replaceAll('-', ' ');
              return name.charAt(0).toUpperCase() + name.slice(1);
            })();
        items.push({ label });
      }
    }
  }
  ---

  <Breadcrumb
    items={items}
    ariaLabel={t('breadcrumb-aria')}
    className={`${Astro.props.gridClass} breadcrumb p-4-px md:px-8-px text-lt-gray dark:text-dk-gray`}
    client:load
  />
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add src/components/Breadcrumb.astro
  git commit -m "Rewrite Breadcrumb.astro as data-assembly wrapper for shared Breadcrumb

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 9: Migrate MainMenu types and build

**Files:**
- Modify: `a11ying-front/src/interfaces/menuInterfaces.ts`
- Modify: `a11ying-front/src/components/MainNavigation.astro`
- Modify: `a11ying-front/src/components/SideMenu.astro`
- Modify: `a11ying-front/src/components/HumanSitemap.astro`

- [ ] **Step 1: Remove MainMenu/MainMenuItem from `menuInterfaces.ts`**

  After this removal `menuInterfaces.ts` will be empty — delete the file entirely:

  ```bash
  rm src/interfaces/menuInterfaces.ts
  ```

- [ ] **Step 2: Update `MainNavigation.astro` import**

  ```astro
  // Remove:
  import type { MainMenu, MainMenuItem } from '../interfaces/menuInterfaces';
  // Replace with:
  import type { MainMenu, MainMenuItem } from 'a11ying-ui';
  ```

- [ ] **Step 3: Update `SideMenu.astro` import**

  ```astro
  // Remove:
  import type { MainMenuItem, MainMenu } from '../interfaces/menuInterfaces';
  // Replace with:
  import type { MainMenu, MainMenuItem } from 'a11ying-ui';
  ```

- [ ] **Step 4: Update `HumanSitemap.astro` import**

  `HumanSitemap.astro` already has `import type { FooterMenu, FooterMenuItem } from 'a11ying-ui'`. Merge `MainMenu` and `MainMenuItem` into that same import line rather than adding a second import from the same module:

  ```astro
  // Remove:
  import type { MainMenuItem, MainMenu } from '../interfaces/menuInterfaces';
  // Update existing a11ying-ui import to also include MainMenu and MainMenuItem:
  import type { FooterMenu, FooterMenuItem, MainMenu, MainMenuItem } from 'a11ying-ui';
  ```

- [ ] **Step 5: Build to verify**

  ```bash
  npm run build
  ```

  Expected: `222 page(s) built`. No TypeScript or import errors.

- [ ] **Step 6: Commit**

  ```bash
  git add -A
  git commit -m "Migrate MainMenu types and Breadcrumb to a11ying-ui v1.6.0

  - MainMenu/MainMenuItem now imported from a11ying-ui
  - menuInterfaces.ts deleted (was empty after migration)
  - Breadcrumb.astro rewritten as data-assembly wrapper

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

## Chunk 3: wcag-front Migration

### Task 10: Install v1.6.0 and update SearchBlock + MainImage in Layout

**Files:**
- Modify: `wcag-front/package.json` (via npm install)
- Modify: `wcag-front/src/layouts/Layout.astro`
- Delete: `wcag-front/src/components/SearchBlock.astro`
- Delete: `wcag-front/src/components/MainImage.astro`

- [ ] **Step 1: Install new version**

  ```bash
  cd /Users/sannamakinen/projects/wcag-front
  npm install github:calydia/a11ying-ui#v1.6.0
  ```

- [ ] **Step 2: Update imports in `Layout.astro`**

  wcag-front `Layout.astro` line 6 (MainImage) and line 9 (SearchBlock).

  Replace both with a consolidated import from `'a11ying-ui'`:
  ```astro
  import { ThemeToggle, LanguageSwitcher, SkipLink, MainImage, SearchBlock } from 'a11ying-ui';
  ```

- [ ] **Step 3: Update SearchBlock usage (line 75)**

  ```astro
  // Remove:
  <SearchBlock locale={locale} />
  // Replace with:
  <SearchBlock searchLabel={t('search-block-label')} searchUrl={locale === 'en' ? '/en/search/' : '/fi/haku/'} client:load />
  ```

- [ ] **Step 4: Update MainImage usage (line 94)**

  ```astro
  // Remove:
  <MainImage />
  // Replace with:
  <MainImage client:only="react" />
  ```

- [ ] **Step 5: Delete local component files**

  ```bash
  rm src/components/SearchBlock.astro
  rm src/components/MainImage.astro
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add -A
  git commit -m "Migrate SearchBlock and MainImage to a11ying-ui v1.6.0

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 11: Rewrite Breadcrumb.astro and BreadcrumbForPages.astro

**Files:**
- Modify: `wcag-front/src/components/Breadcrumb.astro`
- Modify: `wcag-front/src/components/BreadcrumbForPages.astro`

wcag-front has two breadcrumb variants: `Breadcrumb.astro` (WCAG hierarchy with links) and `BreadcrumbForPages.astro` (CMS-fetched, similar to a11ying-front).

- [ ] **Step 1: Replace `Breadcrumb.astro`** (WCAG hierarchy variant)

  ```astro
  ---
  import { getLangFromUrl, useTranslations } from '../i18n/utils';
  import { Breadcrumb } from 'a11ying-ui';
  import type { BreadcrumbItem } from 'a11ying-ui';

  const lang = getLangFromUrl(Astro.url);
  const t = useTranslations(lang);

  const navLanguage = Astro.props.language;
  const currentNumber = Astro.props.currentNumber;
  const currentPage = Astro.props.currentPage;
  const pageType = Astro.props.type;

  const items: BreadcrumbItem[] = [
    { label: t('home-link'), href: `/${navLanguage}/` },
  ];

  if (pageType === 'guideline' || pageType === 'criterion') {
    items.push({
      label: `${Astro.props.principleNumber} ${Astro.props.principleName}`,
      href: `/${navLanguage}/wcag/${Astro.props.principleSlug}/`,
    });
  }

  if (pageType === 'criterion') {
    items.push({
      label: `${Astro.props.guidelineNumber} ${Astro.props.guidelineName}`,
      href: `/${navLanguage}/wcag/${Astro.props.principleSlug}/${Astro.props.guidelineSlug}/`,
    });
  }

  items.push({ label: `${currentNumber} ${currentPage}` });
  ---

  <Breadcrumb items={items} ariaLabel={t('breadcrumb-aria')} client:load />
  ```

- [ ] **Step 2: Replace `BreadcrumbForPages.astro`** (CMS-fetched variant)

  ```astro
  ---
  import fetchApi from '../lib/payload';
  import type { MenuTitleInterface } from '../interfaces/menuTitleInterface';
  import { getLangFromUrl, useTranslations } from '../i18n/utils';
  import { Breadcrumb } from 'a11ying-ui';
  import type { BreadcrumbItem } from 'a11ying-ui';

  const lang = getLangFromUrl(Astro.url);
  const t = useTranslations(lang);

  const menuTitles = await fetchApi<MenuTitleInterface>({
    endpoint: 'menuTitles',
    global: true,
    lang: lang,
  });

  const menuTitleList = menuTitles.list.menuItems;
  const pathArray = (Astro.props.currentUrl !== '/') ? Astro.props.currentUrl.split('/') : null;
  const currentSlug = Astro.props.currentSlug;
  const currentTitle = Astro.props.currentTitle;
  const currentTitleCap = currentTitle.charAt(0).toUpperCase() + currentTitle.slice(1);

  const items: BreadcrumbItem[] = [{ label: t('home-link'), href: `/${lang}/` }];

  if (pathArray) {
    for (const menuItem of pathArray) {
      let found = false;
      for (const i in menuTitleList) {
        if (menuTitleList[i].menuPath === menuItem) {
          items.push({ label: menuTitleList[i].menuTitle });
          found = true;
          break;
        }
      }
      if (!found) {
        const label = (menuItem === currentSlug)
          ? currentTitleCap
          : (() => {
              const name = menuItem.replaceAll('-', ' ');
              return name.charAt(0).toUpperCase() + name.slice(1);
            })();
        items.push({ label });
      }
    }
  }
  ---

  <Breadcrumb
    items={items}
    ariaLabel={t('breadcrumb-aria')}
    className="breadcrumb p-0 m-0 text-base text-lt-gray dark:text-dk-gray"
    client:load
  />
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/components/Breadcrumb.astro src/components/BreadcrumbForPages.astro
  git commit -m "Rewrite Breadcrumb components as data-assembly wrappers for shared Breadcrumb

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```

---

### Task 12: Migrate MainMenu types and build

**Files:**
- Modify: `wcag-front/src/interfaces/menuInterfaces.ts`
- Modify: `wcag-front/src/components/MainNavigation.astro`
- Modify: `wcag-front/src/components/SideMenu.astro`
- Modify: `wcag-front/src/components/HumanSitemap.astro`

- [ ] **Step 1: Remove MainMenu/MainMenuItem from `menuInterfaces.ts`**

  After removal the file will be empty — delete it:

  ```bash
  rm src/interfaces/menuInterfaces.ts
  ```

- [ ] **Step 2: Update `MainNavigation.astro` import**

  ```astro
  // Remove:
  import type { MainMenu, MainMenuItem } from '../interfaces/menuInterfaces';
  // Replace with:
  import type { MainMenu, MainMenuItem } from 'a11ying-ui';
  ```

- [ ] **Step 3: Update `SideMenu.astro` import**

  ```astro
  // Remove:
  import type { MainMenu, MainMenuItem } from '../interfaces/menuInterfaces';
  // Replace with:
  import type { MainMenu, MainMenuItem } from 'a11ying-ui';
  ```

- [ ] **Step 4: Update `HumanSitemap.astro` import**

  `HumanSitemap.astro` already imports `FooterMenu` and `FooterMenuItem` from `'a11ying-ui'`. In wcag-front the existing import line is:
  `import type { MainMenuItem, FooterMenuItem, FooterMenu, MainMenu } from '../interfaces/menuInterfaces';`
  Replace the entire line with a single merged import from `'a11ying-ui'`:

  ```astro
  import type { FooterMenu, FooterMenuItem, MainMenu, MainMenuItem } from 'a11ying-ui';
  ```

- [ ] **Step 5: Build to verify**

  ```bash
  npm run build
  ```

  Expected: `230 page(s) built`. No TypeScript or import errors.

- [ ] **Step 6: Final commit**

  ```bash
  git add -A
  git commit -m "Migrate MainMenu types and Breadcrumb to a11ying-ui v1.6.0

  - MainMenu/MainMenuItem now imported from a11ying-ui
  - menuInterfaces.ts deleted (was empty after migration)
  - Breadcrumb.astro and BreadcrumbForPages.astro rewritten as data-assembly wrappers

  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
  ```
