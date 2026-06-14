export interface SearchUrlState {
  query: string;
  url: URL;
  changed: boolean;
}

export function normalizeSearchQuery(value: string): string {
  return value.trim();
}

export function readSearchQuery(url: URL): string {
  return normalizeSearchQuery(url.searchParams.get('q') ?? '');
}

export function createSearchUrl(url: URL, value: string): SearchUrlState {
  const query = normalizeSearchQuery(value);
  const nextUrl = new URL(url);
  const changed = readSearchQuery(url) !== query;

  nextUrl.searchParams.delete('q');

  if (query) {
    nextUrl.searchParams.set('q', query);
  }

  return { query, url: nextUrl, changed };
}
