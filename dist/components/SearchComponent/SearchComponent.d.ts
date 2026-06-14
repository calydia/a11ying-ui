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
export declare function SearchComponent({ searchLabel, searchButton, searchMainHeading, searchResultLabel, searchNoResults, searchLoading, searchError, searchLocale, searchSiteName, searchContentType, payloadUrl, defaultResultBaseUrl, resultBaseUrls, }: SearchComponentProps): import("react").JSX.Element;
