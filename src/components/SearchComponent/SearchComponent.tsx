import type { FormEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { stringify } from 'qs-esm';
import type { SearchResults, SearchResultsResponse } from '../../types/SearchResults';
import {
  createSearchUrl,
  normalizeSearchQuery,
  readSearchQuery,
} from '../../lib/searchUrlState';

export interface SearchComponentProps {
  searchLabel: string;
  searchButton: string;
  searchMainHeading: string;
  searchResultLabel: string;
  searchNoResults: string;
  searchLoading: string;
  searchError: string;
  searchLocale: string;
  searchSiteName: string;
  searchContentType: string;
  /**
   * The Payload CMS base URL.
   * Pass `import.meta.env.PUBLIC_PAYLOAD_URL` from the consuming site.
   */
  payloadUrl: string;
  /**
   * Default base URL for result links. Defaults to '/'.
   * Set to the other site's URL (e.g. 'https://a11y.ing/') for cross-site results.
   */
  defaultResultBaseUrl?: string;
  /**
   * Per-collection base URL overrides.
   * Keys are Payload `relationTo` values; values are base URLs.
   * Example from a11ying-front: { reqpages: 'https://wcag.a11y.ing/', criteria: 'https://wcag.a11y.ing/' }
   * Example from wcag-front: { reqpages: '/', criteria: '/', guidelines: '/', principles: '/' }
   */
  resultBaseUrls?: Record<string, string>;
}

async function fetchSearchResults(
  payloadUrl: string,
  searchQuery: string,
  locale: string,
  signal: AbortSignal
): Promise<SearchResultsResponse> {
  const langParam = locale ? `locale=${locale}` : '';
  const url = `${payloadUrl}/api/search?${langParam}&pagination=false&${searchQuery}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Search request failed: ${res.status}`);
  return res.json();
}

function getSiteName(name: string, locale: string): string {
  const subSiteTypes = ['reqpages', 'criteria', 'guidelines', 'principles'];
  let siteName = locale === 'en' ? 'I would if I could' : 'Toki, jos voisin';
  if (subSiteTypes.includes(name)) {
    siteName = locale === 'en' ? 'Almost, but not quite' : 'Melkein, mutta ei ihan';
  }
  return siteName;
}

function getContentType(name: string, locale: string): string {
  const types: Record<string, { fi: string; en: string }> = {
    criteria: { fi: 'WCAG-kriteeri', en: 'WCAG criterion' },
    guidelines: { fi: 'WCAG-ohje', en: 'WCAG guideline' },
    principles: { fi: 'WCAG-periaate', en: 'WCAG principle' },
  };
  return types[name]?.[locale === 'fi' ? 'fi' : 'en'] ?? '';
}

type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

interface SearchState {
  status: SearchStatus;
  submittedQuery: string;
  results: SearchResultsResponse | null;
}

const initialSearchState: SearchState = {
  status: 'idle',
  submittedQuery: '',
  results: null,
};

export function SearchComponent({
  searchLabel,
  searchButton,
  searchMainHeading,
  searchResultLabel,
  searchNoResults,
  searchLoading,
  searchError,
  searchLocale,
  searchSiteName,
  searchContentType,
  payloadUrl,
  defaultResultBaseUrl = '/',
  resultBaseUrls = {},
}: SearchComponentProps) {
  const [searchWords, setSearchWords] = useState('');
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState);
  const activeRequest = useRef<AbortController | null>(null);
  const requestIdentity = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function getSiteUrl(relationTo: string): string {
    return resultBaseUrls[relationTo] ?? defaultResultBaseUrl;
  }

  const resetSearch = useCallback((updateDraft = true) => {
    activeRequest.current?.abort();
    activeRequest.current = null;
    requestIdentity.current += 1;

    if (updateDraft) {
      setSearchWords('');
    }

    setSearchState(initialSearchState);
  }, []);

  const searchDocs = useCallback(async (search: string) => {
    activeRequest.current?.abort();

    const controller = new AbortController();
    const identity = requestIdentity.current + 1;
    activeRequest.current = controller;
    requestIdentity.current = identity;

    setSearchState({
      status: 'loading',
      submittedQuery: search,
      results: null,
    });

    const queryObj = {
      where: {
        and: [
          {
            or: [
              { title: { like: search } },
              { searchLead: { like: search } },
              { searchContent: { like: search } },
              { searchDescription: { like: search } },
            ],
          },
        ],
      },
    };

    try {
      const results = await fetchSearchResults(
        payloadUrl,
        stringify(queryObj),
        searchLocale,
        controller.signal
      );

      if (requestIdentity.current !== identity) {
        return;
      }

      activeRequest.current = null;
      setSearchState({
        status: 'success',
        submittedQuery: search,
        results,
      });
    } catch (error) {
      if (
        controller.signal.aborted ||
        requestIdentity.current !== identity ||
        (error instanceof Error && error.name === 'AbortError')
      ) {
        return;
      }

      activeRequest.current = null;
      console.error(error);
      setSearchState({
        status: 'error',
        submittedQuery: search,
        results: null,
      });
    }
  }, [payloadUrl, searchLocale]);

  useEffect(() => {
    const restoreSearchFromUrl = () => {
      const query = readSearchQuery(new URL(window.location.href));
      setSearchWords(query);

      if (query) {
        void searchDocs(query);
      } else {
        resetSearch(false);
      }
    };

    restoreSearchFromUrl();
    window.addEventListener('popstate', restoreSearchFromUrl);

    return () => {
      window.removeEventListener('popstate', restoreSearchFromUrl);
      activeRequest.current?.abort();
      requestIdentity.current += 1;
    };
  }, [resetSearch, searchDocs]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const nextSearch = createSearchUrl(
      new URL(window.location.href),
      searchWords
    );

    setSearchWords(nextSearch.query);

    if (nextSearch.changed) {
      window.history.pushState({}, '', nextSearch.url);
    }

    inputRef.current?.focus();

    if (nextSearch.query) {
      await searchDocs(nextSearch.query);
    } else {
      resetSearch();
    }
  };

  const totalEstimatedHits = searchState.results?.totalDocs ?? 0;
  const isLoading = searchState.status === 'loading';
  const hasResults =
    searchState.status === 'success' && totalEstimatedHits > 0;
  const hasNoResults =
    searchState.status === 'success' && totalEstimatedHits === 0;

  let statusMessage = '';

  if (isLoading) {
    statusMessage = searchLoading;
  } else if (hasResults) {
    statusMessage = `${totalEstimatedHits} ${searchResultLabel}`;
  } else if (hasNoResults) {
    statusMessage = searchNoResults;
  }

  return (
    <div>
      <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
        <form
          id="site-search"
          onSubmit={handleSubmit}
          role="search"
          aria-busy={isLoading ? 'true' : undefined}
          className="flex flex-col flex-wrap w-full md:items-center md:gap-x-6 md:gap-y-2 md:flex-row"
        >
          <label htmlFor="search-input" className="text-lt-gray dark:text-dk-gray w-full">
            {searchLabel}
          </label>
          <input
            ref={inputRef}
            id="search-input"
            type="text"
            value={searchWords}
            className="w-full md:max-w-sm"
            onChange={(e) => setSearchWords(e.currentTarget.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="button item--transition max-md:my-4"
          >
            {searchButton}
          </button>
        </form>
      </div>

      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {statusMessage}
      </div>

      <div className="text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
        <div role="alert">
          {searchState.status === 'error' ? searchError : ''}
        </div>

        {hasResults && (
          <div className="border-t-4 gradient-border-light dark:gradient-border-dark pt-4">
            <h2>
              {searchMainHeading} {searchState.submittedQuery},{' '}
              {totalEstimatedHits} {searchResultLabel}
            </h2>
          </div>
        )}

        {hasResults && searchState.results && (
          <ul>
            {searchState.results.docs.map((result: SearchResults, index: number) => {
              const siteName = getSiteName(result.doc.relationTo, searchLocale);
              const contentType = getContentType(result.doc.relationTo, searchLocale);
              const siteUrl = getSiteUrl(result.doc.relationTo);

              return (
                <li
                  key={`result-${index}`}
                  className="my-2 py-6 flex flex-col border-t-2"
                >
                  <a
                    className="my-2 text-xl order-3 inline-flex items-baseline self-start"
                    href={`${siteUrl}${searchLocale}/${result.searchPageUrl}/`}
                  >
                    <h3 className="search-heading mt-0 mb-0.5 text-lg lg:text-xl inline">
                      {result.title}
                    </h3>
                  </a>
                  <span className="w-full self-end text-sm text-right order-1">
                    {searchSiteName} {siteName}
                  </span>
                  {contentType && (
                    <span className="w-full self-end text-sm order-2">
                      {searchContentType} {contentType}
                    </span>
                  )}
                  <span className="block text-lg order-4">{result.searchDescription}</span>
                </li>
              );
            })}
          </ul>
        )}

        {hasNoResults && <p>{searchNoResults}</p>}
      </div>
    </div>
  );
}
