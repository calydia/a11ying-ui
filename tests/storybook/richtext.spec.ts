import { expect, test } from '@playwright/test';

test('RichText heading IDs are unique and TOC links resolve', async ({ page }) => {
  await page.goto('/iframe.html?id=components-richtext--heading-id-pair&viewMode=story');
  await page.waitForLoadState('networkidle');

  const ids = await page.locator('[id]').evaluateAll((elements) =>
    elements.map((element) => element.id)
  );

  expect(new Set(ids).size).toBe(ids.length);

  const fragments = await page.locator('.toc-box a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute('href'))
  );

  expect(fragments).toEqual([
    '#nako-ja-aani',
    '#overview',
    '#overview-1',
    '#overview-2',
  ]);

  for (const fragment of fragments) {
    expect(fragment).not.toBeNull();
    await expect(page.locator(fragment!)).toHaveCount(1);
  }

  await expect(page.locator('#overview-3')).toHaveCount(1);
  await expect(page.locator('.toc-box a[href="#overview-3"]')).toHaveCount(0);
});
