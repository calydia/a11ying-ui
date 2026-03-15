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
export function SkipLink({ href, id, label, forceVisible = false }: SkipLinkProps) {
  const base =
    'text-xl p-4 text-black bg-lt-blue-light dark:bg-dk-purple dark:text-white ' +
    'hover:text-lt-purple dark:hover:text-dk-blue-light hover:underline hover:decoration-2 hover:underline-offset-2 ' +
    'focus:outline focus:outline-2 focus:outline-black dark:focus:outline-white';

  const visibilityClasses = forceVisible
    ? 'absolute top-8 left-8'
    : 'sr-only focus:not-sr-only focus:absolute focus:top-8 focus:left-8';

  return (
    <a href={href} id={id} className={`${visibilityClasses} ${base}`}>
      {label}
    </a>
  );
}
