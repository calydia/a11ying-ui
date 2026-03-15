import type { FormEvent, ReactNode } from 'react';
import { useState } from 'react';
import { stringify } from 'qs-esm';
import type { SearchResults, SearchResultsResponse } from '../../types/SearchResults';

export interface SearchComponentProps {
  searchLabel: string;
  searchButton: string;
  searchMainHeading: string;
  searchResultLabel: string;
  searchNoResults: string;
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
  locale: string
): Promise<SearchResultsResponse> {
  const langParam = locale ? `locale=${locale}` : '';
  const url = `${payloadUrl}/api/search?${langParam}&pagination=false&${searchQuery}`;
  const res = await fetch(url);
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

export function SearchComponent({
  searchLabel,
  searchButton,
  searchMainHeading,
  searchResultLabel,
  searchNoResults,
  searchLocale,
  searchSiteName,
  searchContentType,
  payloadUrl,
  defaultResultBaseUrl = '/',
  resultBaseUrls = {},
}: SearchComponentProps) {
  const [searchWords, setSearchWords] = useState('');
  const [searchPageResult, setSearchPageResult] = useState<SearchResultsResponse | null>(null);
  const [totalEstimatedHits, setTotalEstimatedHits] = useState<ReactNode>();
  const [sentSearchWords, setSentSearchWords] = useState('');

  function getSiteUrl(relationTo: string): string {
    return resultBaseUrls[relationTo] ?? defaultResultBaseUrl;
  }

  const searchDocs = async (search: string, locale: string) => {
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

    const results = await fetchSearchResults(payloadUrl, stringify(queryObj), locale);
    setSearchPageResult(results);
    setTotalEstimatedHits(results.totalDocs);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await searchDocs(searchWords, searchLocale);
      setSentSearchWords(searchWords);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="text-lt-gray dark:text-dk-gray py-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
        <form
          id="site-search"
          onSubmit={handleSubmit}
          role="search"
          className="flex flex-col flex-wrap w-full md:items-center md:gap-x-6 md:gap-y-2 md:flex-row"
        >
          <label htmlFor="search-input" className="text-lt-gray dark:text-dk-gray w-full">
            {searchLabel}
          </label>
          <input
            id="search-input"
            type="text"
            className="w-full md:max-w-sm"
            onChange={(e) => setSearchWords(e.currentTarget.value)}
          />
          <button type="submit" className="button item--transition max-md:my-4">
            {searchButton}
          </button>
        </form>
      </div>

      <div className="sr-only" role="status">
        {(totalEstimatedHits as number) > 0
          ? `${totalEstimatedHits} ${searchResultLabel}`
          : searchNoResults}
      </div>

      <div className="text-lt-gray dark:text-dk-gray pt-4 pb-2 px-4-px max-w-xl mx-auto md:py-6 md:px-8-px lg:max-w-4xl">
        {(totalEstimatedHits as number) > 0 && (
          <div className="border-t-4 gradient-border-light dark:gradient-border-dark pt-4">
            <h2>
              {searchMainHeading} {sentSearchWords}, {totalEstimatedHits} {searchResultLabel}
            </h2>
          </div>
        )}

        {searchPageResult && (
          <ul>
            {searchPageResult.docs.map((result: SearchResults, index: number) => {
              const siteName = getSiteName(result.doc.relationTo, searchLocale);
              const contentType = getContentType(result.doc.relationTo, searchLocale);
              const siteUrl = getSiteUrl(result.doc.relationTo);

              return (
                <li
                  key={`result-${index}`}
                  className="my-2 py-6 flex flex-col border-t-2"
                >
                  <a
                    className="my-2 text-xl order-3"
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

        {(totalEstimatedHits as number) === 0 && <p>{searchNoResults}</p>}
      </div>
    </div>
  );
}
