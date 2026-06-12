export interface SkipLinkProps {
    /** The ID of the element to skip to, e.g. "#main-content" */
    href: string;
    /** id attribute on the anchor itself, useful when multiple skip links are stacked */
    id?: string;
    /** Visible label text */
    label: string;
    /**
     * Force the link to always be visible.
     * Only intended for Storybook and automated testing — do not use in production.
     */
    forceVisible?: boolean;
}
/**
 * Skip link — visually hidden until focused, allowing keyboard users to jump
 * past repeated navigation blocks. Place as the very first interactive element
 * in the page.
 *
 * The i18n translation of `label` is intentionally left to the consuming site
 * so this component stays framework-agnostic.
 */
export declare function SkipLink({ href, id, label, forceVisible }: SkipLinkProps): import("react/jsx-runtime").JSX.Element;
