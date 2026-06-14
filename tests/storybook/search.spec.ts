import { expect, test, type Page, type Route } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const storyUrl =
  '/iframe.html?id=components-searchcomponent--a-11-ying-front-english&viewMode=story';

function searchResponse(query: string) {
  return {
    totalDocs: 1,
    docs: [
      {
        title: `${query} result`,
        searchDescription: `Description for ${query}`,
        searchPageUrl: `results/${query}`,
        doc: { relationTo: 'pages' },
      },
    ],
  };
}

function requestQuery(route: Route): string {
  const requestUrl = decodeURIComponent(route.request().url());
  const match = requestUrl.match(/like(?:%5D|])?=([^&]+)/);
  return match?.[1] ?? '';
}

async function openStory(page: Page, query = '') {
  await page.goto(`${storyUrl}${query ? `&q=${encodeURIComponent(query)}` : ''}`);
  await expect(page.getByRole('textbox', { name: 'Search for content' })).toBeVisible();
}

async function submitSearch(page: Page, query: string) {
  const input = page.getByRole('textbox', { name: 'Search for content' });
  await input.fill(query);
  await page.getByRole('button', { name: 'Search' }).click();
  return input;
}

test('restores a URL query, preserves unrelated URL state, and avoids duplicate history entries', async ({
  page,
}) => {
  await page.route('https://example.com/api/search**', async (route) => {
    const query = requestQuery(route);
    await route.fulfill({ json: searchResponse(query) });
  });

  await openStory(page, 'contrast');
  await expect(page.getByRole('heading', { name: /contrast result/i })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Search for content' })).toHaveValue('contrast');

  await page.evaluate(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('keep', 'yes');
    url.hash = 'results';
    window.history.replaceState({}, '', url);
  });

  const historyLength = await page.evaluate(() => window.history.length);
  const input = await submitSearch(page, '  contrast  ');

  await expect(input).toBeFocused();
  await expect(input).toHaveValue('contrast');
  await expect.poll(() => page.evaluate(() => window.history.length)).toBe(historyLength);
  await expect.poll(() => page.evaluate(() => window.location.search)).toContain('keep=yes');
  await expect.poll(() => page.evaluate(() => window.location.hash)).toBe('#results');
});

test('uses browser back and forward to restore searches', async ({ page }) => {
  await page.route('https://example.com/api/search**', async (route) => {
    const query = requestQuery(route);
    await route.fulfill({ json: searchResponse(query) });
  });

  await openStory(page);
  await submitSearch(page, 'first');
  await expect(page.getByRole('heading', { name: /first result/i })).toBeVisible();
  await submitSearch(page, 'second');
  await expect(page.getByRole('heading', { name: /second result/i })).toBeVisible();

  await page.evaluate(() => window.history.back());
  await expect(page.getByRole('textbox', { name: 'Search for content' })).toHaveValue('first');
  await expect(page.getByRole('heading', { name: /first result/i })).toBeVisible();

  await page.evaluate(() => window.history.forward());
  await expect(page.getByRole('textbox', { name: 'Search for content' })).toHaveValue('second');
  await expect(page.getByRole('heading', { name: /second result/i })).toBeVisible();
});

test('cancels obsolete requests and never renders stale results', async ({ page }) => {
  let releaseSlowRequest: (() => void) | undefined;
  const slowRequest = new Promise<void>((resolve) => {
    releaseSlowRequest = resolve;
  });

  await page.route('https://example.com/api/search**', async (route) => {
    const query = requestQuery(route);
    if (query === 'slow') {
      await slowRequest;
    }
    await route.fulfill({ json: searchResponse(query) });
  });

  await openStory(page);
  await submitSearch(page, 'slow');
  await expect(page.getByRole('button', { name: 'Search' })).toBeDisabled();
  await expect(page.getByRole('status')).toHaveText('Searching…');

  await page.evaluate(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', 'fast');
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  await expect(page.getByRole('heading', { name: /fast result/i })).toBeVisible();
  releaseSlowRequest?.();
  await expect(page.getByRole('heading', { name: /slow result/i })).toHaveCount(0);
});

test('clears the query and results after an empty submission', async ({ page }) => {
  await page.route('https://example.com/api/search**', async (route) => {
    await route.fulfill({ json: searchResponse(requestQuery(route)) });
  });

  await openStory(page);
  await submitSearch(page, 'contrast');
  await expect(page.getByRole('heading', { name: /contrast result/i })).toBeVisible();
  await submitSearch(page, '   ');

  await expect(page.getByRole('textbox', { name: 'Search for content' })).toHaveValue('');
  await expect(page.getByRole('heading', { name: /contrast result/i })).toHaveCount(0);
  await expect.poll(() => page.evaluate(() => new URL(window.location.href).searchParams.has('q'))).toBe(false);
});

test('announces request errors and keeps the error state accessible', async ({ page }) => {
  await page.route('https://example.com/api/search**', async (route) => {
    await route.fulfill({ status: 500, body: 'Search unavailable' });
  });

  await openStory(page);
  await submitSearch(page, 'broken');

  await expect(page.getByRole('alert')).toHaveText('Search failed. Please try again.');
  await expect(page.getByRole('button', { name: 'Search' })).toBeEnabled();

  const results = await new AxeBuilder({ page })
    .include('[role="alert"]')
    .analyze();
  expect(results.violations).toEqual([]);
});
