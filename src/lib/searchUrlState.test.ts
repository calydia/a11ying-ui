import { describe, expect, it } from 'vitest';
import {
  createSearchUrl,
  normalizeSearchQuery,
  readSearchQuery,
} from './searchUrlState';

describe('normalizeSearchQuery', () => {
  it.each([
    ['  contrast  ', 'contrast'],
    ['color   contrast', 'color   contrast'],
    ['', ''],
    ['   ', ''],
  ])('normalizes %j to %j', (input, expected) => {
    expect(normalizeSearchQuery(input)).toBe(expected);
  });
});

describe('readSearchQuery', () => {
  it.each([
    ['https://example.com/search/', ''],
    ['https://example.com/search/?q=', ''],
    ['https://example.com/search/?q=%20%20', ''],
    ['https://example.com/search/?q=N%C3%A4k%C3%B6%20%26%20%C3%A4%C3%A4ni', 'Näkö & ääni'],
    ['https://example.com/search/?q=first&q=second', 'first'],
  ])('reads %s as %j', (input, expected) => {
    expect(readSearchQuery(new URL(input))).toBe(expected);
  });
});

describe('createSearchUrl', () => {
  it('sets an encoded query while preserving other URL state', () => {
    const result = createSearchUrl(
      new URL('https://example.com/en/search/?page=2#results'),
      '  Näkö & ääni  '
    );

    expect(result.query).toBe('Näkö & ääni');
    expect(result.changed).toBe(true);
    expect(result.url.pathname).toBe('/en/search/');
    expect(result.url.searchParams.get('page')).toBe('2');
    expect(result.url.searchParams.get('q')).toBe('Näkö & ääni');
    expect(result.url.hash).toBe('#results');
  });

  it('removes every q parameter for an empty query', () => {
    const result = createSearchUrl(
      new URL('https://example.com/en/search/?q=first&q=second&page=2#results'),
      '  '
    );

    expect(result.query).toBe('');
    expect(result.changed).toBe(true);
    expect(result.url.searchParams.has('q')).toBe(false);
    expect(result.url.searchParams.get('page')).toBe('2');
    expect(result.url.hash).toBe('#results');
  });

  it('reports unchanged when the normalized first q value matches', () => {
    const result = createSearchUrl(
      new URL('https://example.com/en/search/?q=contrast&page=2'),
      ' contrast '
    );

    expect(result.query).toBe('contrast');
    expect(result.changed).toBe(false);
    expect(result.url.searchParams.get('q')).toBe('contrast');
    expect(result.url.searchParams.get('page')).toBe('2');
  });
});
