import React from 'react';
export type BoxVariant = 'toc' | 'notice' | 'blockquote';
export interface BoxProps {
    /** Box style variant */
    variant?: BoxVariant;
    children: React.ReactNode;
    className?: string;
}
/**
 * A11ying brand content box. Covers the three main box patterns used across
 * both sites: table-of-contents (toc), notice/callout, and blockquote.
 */
export declare function Box({ variant, children, className }: BoxProps): import("react/jsx-runtime").JSX.Element;
