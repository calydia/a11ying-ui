import type { RichTextNode } from '../../types/RichTextNode';
export interface RichTextProps {
    nodes: RichTextNode[];
    /** BCP 47 language tag, e.g. "en" or "fi". Used by inline language blocks. */
    lang: string;
    /** Render a table-of-contents box above the content. */
    withTOC?: boolean;
    /**
     * Label for the table-of-contents heading.
     * Defaults to "On this page" for English, "Tällä sivulla" for Finnish.
     * Pass this prop to override or support additional languages.
     */
    tocLabel?: string;
}
export declare function RichText({ nodes, lang, withTOC, tocLabel }: RichTextProps): import("react/jsx-runtime").JSX.Element;
