export interface SearchUrlState {
    query: string;
    url: URL;
    changed: boolean;
}
export declare function normalizeSearchQuery(value: string): string;
export declare function readSearchQuery(url: URL): string;
export declare function createSearchUrl(url: URL, value: string): SearchUrlState;
