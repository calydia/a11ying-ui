export interface LanguageSwitcherProps {
    englishURL: string;
    finnishURL: string;
    currentPage: string;
    currentLang: string;
    type?: string;
    ariaLabel: string;
    languageLabel: string;
}
export declare function LanguageSwitcher({ englishURL, finnishURL, currentPage, currentLang, type, ariaLabel, languageLabel, }: LanguageSwitcherProps): import("react/jsx-runtime").JSX.Element;
