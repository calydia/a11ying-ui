import React from 'react';

export interface SearchBlockProps {
  searchLabel: string;
  searchUrl: string;
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    aria-hidden="true"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5a6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export function SearchBlock({ searchLabel, searchUrl }: SearchBlockProps) {
  return (
    <div id="search-a" className="text-black dark:text-white px-3 relative">
      <a
        href={searchUrl}
        className="inline-block py-2 px-1 text-black dark:text-white border-y-4 border-transparent
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white"
      >
        <SearchIcon />
        <span className="sr-only">{searchLabel}</span>
      </a>
    </div>
  );
}
