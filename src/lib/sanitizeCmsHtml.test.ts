import { describe, expect, it } from 'vitest';
import { sanitizeCmsHtml, sanitizeCmsUrl } from './sanitizeCmsHtml';

describe('sanitizeCmsHtml', () => {
  it('preserves approved content markup', () => {
    const html = '<h2 id="intro">Intro</h2><p lang="fi"><strong>Text</strong> <a href="/more">More</a></p>';

    expect(sanitizeCmsHtml(html)).toBe('<h2 id="intro">Intro</h2><p lang="fi"><strong>Text</strong> <a href="/more" class="underline underline-offset-4 decoration-1 hover:decoration-2">More</a></p>');
  });

  it('removes executable and presentation markup', () => {
    const html = '<script>alert(1)</script><p class="promo" style="color:red" onclick="alert(1)">Safe</p><iframe src="https://example.com"></iframe>';

    expect(sanitizeCmsHtml(html)).toBe('<p>Safe</p>');
  });

  it('removes unsafe URLs and secures new-window links', () => {
    const html = '<a href="javascript:alert(1)">Bad</a><a href="https://example.com" target="_blank">Good</a><img src="data:image/svg+xml,bad" alt="Bad">';

    expect(sanitizeCmsHtml(html)).toBe('<a class="underline underline-offset-4 decoration-1 hover:decoration-2">Bad</a><a href="https://example.com" target="_blank" class="underline underline-offset-4 decoration-1 hover:decoration-2" rel="noopener noreferrer">Good</a><img alt="Bad" />');
  });
});

describe('sanitizeCmsUrl', () => {
  it.each([
    ['/relative', '/relative'],
    ['../relative', '../relative'],
    ['#section', '#section'],
    ['https://example.com', 'https://example.com'],
    ['mailto:test@example.com', 'mailto:test@example.com'],
    ['javascript:alert(1)', undefined],
    ['//example.com', undefined],
  ])('sanitizes %s', (input, expected) => {
    expect(sanitizeCmsUrl(input)).toBe(expected);
  });
});
