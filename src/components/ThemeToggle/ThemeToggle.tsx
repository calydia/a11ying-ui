import React, { useEffect, useState } from 'react';

export interface ThemeToggleProps {
  darkLabel: string;
  lightLabel: string;
}

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
    <path fill="currentColor" fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9a8.97 8.97 0 0 0 3.463-.69a.75.75 0 0 1 .981.98a10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5c0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
    <path fill="currentColor" d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0Zm11.394-5.834a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75Zm-3.916 6.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18Zm-4.242-.697a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12Zm.697-4.243a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
  </svg>
);

export function ThemeToggle({ darkLabel, lightLabel }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  const enableDark = (store = true) => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    if (store) localStorage.setItem('darkMode', 'enabled');
    setIsDark(true);
  };

  const disableDark = (store = true) => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (store) localStorage.setItem('darkMode', 'disabled');
    setIsDark(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'enabled') {
      enableDark();
    } else if (stored === 'disabled') {
      disableDark();
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      enableDark(false);
    } else {
      disableDark(false);
    }
  }, []);

  const handleClick = () => {
    if (document.documentElement.classList.contains('dark')) {
      disableDark();
    } else {
      enableDark();
    }
  };

  return (
    <button
      id="theme-toggle-button"
      aria-pressed={isDark}
      onClick={handleClick}
      className="py-2 px-3 text-black dark:text-white border-y-4 border-transparent
        hover:border-y-4 hover:border-lt-purple dark:hover:border-dk-blue-light
        focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-black dark:focus:outline-white"
    >
      <span className="darkmode-dark">
        <MoonIcon />
        <span className="sr-only">{darkLabel}</span>
      </span>
      <span className="darkmode-light">
        <SunIcon />
        <span className="sr-only">{lightLabel}</span>
      </span>
    </button>
  );
}
