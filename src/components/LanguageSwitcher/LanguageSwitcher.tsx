import React, { useState } from 'react';

export interface LanguageSwitcherProps {
  englishURL: string;
  finnishURL: string;
  currentPage: string;
  currentLang: string;
  type?: string;
  ariaLabel: string;
  languageLabel: string;
}

const LanguageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
    <path fill="currentColor" fillRule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.506a49.38 49.38 0 0 1 5.343.371a.75.75 0 1 1-.186 1.489a46.7 46.7 0 0 0-1.99-.206a18.67 18.67 0 0 1-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 1 1-1.07 1.052A18.902 18.902 0 0 1 9 13.687a18.823 18.823 0 0 1-5.656 4.482a.75.75 0 1 1-.688-1.333a17.323 17.323 0 0 0 5.396-4.353A18.72 18.72 0 0 1 5.89 8.598a.75.75 0 0 1 1.388-.568A17.21 17.21 0 0 0 9 11.224a17.17 17.17 0 0 0 2.391-5.165a48.038 48.038 0 0 0-8.298.307a.75.75 0 0 1-.186-1.489a49.159 49.159 0 0 1 5.343-.371V3A.75.75 0 0 1 9 2.25ZM15.75 9a.75.75 0 0 1 .68.433l5.25 11.25a.75.75 0 0 1-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 0 1-1.36-.634l5.25-11.25A.75.75 0 0 1 15.75 9Zm-2.672 8.25h5.344l-2.672-5.726l-2.672 5.726Z" clipRule="evenodd" />
  </svg>
);

export function LanguageSwitcher({
  englishURL,
  finnishURL,
  currentPage,
  currentLang,
  type,
  ariaLabel,
  languageLabel,
}: LanguageSwitcherProps) {
  const [expanded, setExpanded] = useState(false);

  const resolveUrl = (slug: string, lang: string): string => {
    if (type === 'demo') return `/${lang}/demo/${slug}/`;
    if (slug === 'front') return `/${lang}/`;
    return `/${lang}/${slug}/`;
  };

  const engUrl = resolveUrl(englishURL, 'en');
  const fiUrl = resolveUrl(finnishURL, 'fi');

  const ariaCurrentEn: 'page' | undefined =
    englishURL === currentPage && currentLang !== 'fi' ? 'page' : undefined;
  const ariaCurrentFi: 'page' | undefined =
    finnishURL === currentPage && currentLang !== 'en' ? 'page' : undefined;

  return (
    <div id="language-switcher" className="lang-switcher text-black dark:text-white px-3 relative">
      <button
        id="language-menu-button"
        aria-label={ariaLabel}
        aria-expanded={expanded}
        aria-controls="lang-switcher"
        onClick={() => setExpanded((prev) => !prev)}
        className="lang-switcher flex gap-2 py-2 border-y-4 border-transparent items-center
          hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
          focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white"
      >
        <LanguageIcon />
        {languageLabel}
      </button>
      <ul
        id="lang-switcher"
        className="p-4 right-0 mt-1 mr-1.5 absolute flex flex-col gap-4 border-solid border-2 border-black bg-lt-code-bg dark:border-white w-[140%] md:w-[200%] dark:bg-dk-code-bg"
      >
        {englishURL && (
          <li>
            <a href={engUrl} hrefLang="en" lang="en" aria-current={ariaCurrentEn}>
              English (EN)
            </a>
          </li>
        )}
        {finnishURL && (
          <li>
            <a href={fiUrl} hrefLang="fi" lang="fi" aria-current={ariaCurrentFi}>
              Suomi (FI)
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
