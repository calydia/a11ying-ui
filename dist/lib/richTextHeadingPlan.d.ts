import type { RichTextNode } from '../types/RichTextNode';
export interface RichTextTocEntry {
    id: string;
    text: string;
    level: string;
}
export interface RichTextHeadingPlan {
    ids: WeakMap<RichTextNode, string>;
    tocEntries: RichTextTocEntry[];
}
export declare function slugifyHeading(value: string): string;
export declare function buildRichTextHeadingPlan(nodes: RichTextNode[]): RichTextHeadingPlan;
