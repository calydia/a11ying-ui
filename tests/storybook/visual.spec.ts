import { test, expect } from '@playwright/test';

// MainImage is intentionally excluded — random background image produces different snapshots each run.
// Box/RichText included for key stories. Excluded (near-identical rendering to included stories):
//   LanguageSwitcher/FrontPage, DemoPage; SearchComponent/WcagFrontEnglish;
//   Breadcrumb/SingleItem, Breadcrumb/Empty; RichText/WithTableOfContents variants.
const stories: { id: string; name: string }[] = [
  { id: 'components-button--primary', name: 'button-primary' },
  { id: 'components-button--alternative', name: 'button-alternative' },
  { id: 'components-button--as-link', name: 'button-as-link' },
  { id: 'components-button--disabled', name: 'button-disabled' },
  { id: 'components-skiplink--default', name: 'skiplink-default' },
  { id: 'components-skiplink--visible', name: 'skiplink-visible' },
  { id: 'components-themetoggle--default', name: 'themetoggle-default' },
  { id: 'components-themetoggle--finnish', name: 'themetoggle-finnish' },
  { id: 'components-languageswitcher--english-page', name: 'languageswitcher-english-page' },
  { id: 'components-languageswitcher--finnish-page', name: 'languageswitcher-finnish-page' },
  { id: 'components-searchblock--english', name: 'searchblock-english' },
  { id: 'components-searchblock--finnish', name: 'searchblock-finnish' },
  { id: 'components-breadcrumb--default', name: 'breadcrumb-default' },
  { id: 'components-breadcrumb--long-path', name: 'breadcrumb-long-path' },
  { id: 'components-searchcomponent--a-11-ying-front-english', name: 'searchcomponent-english' },
  { id: 'components-searchcomponent--a-11-ying-front-finnish', name: 'searchcomponent-finnish' },
  { id: 'components-box--table-of-contents', name: 'box-table-of-contents' },
  { id: 'components-box--notice', name: 'box-notice' },
  { id: 'components-richtext--default', name: 'richtext-default' },
  { id: 'components-richtext--finnish', name: 'richtext-finnish' },
];

for (const { id, name } of stories) {
  test(`${name} — matches visual snapshot`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot(`${name}.png`, {
      maxDiffPixelRatio: 0.02,
    });
  });
}
