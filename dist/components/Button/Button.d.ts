import React from 'react';
export type ButtonVariant = 'primary' | 'alternative';
export interface ButtonProps {
    /** Button label */
    children: React.ReactNode;
    /** Visual style variant */
    variant?: ButtonVariant;
    /** Renders as an anchor when href is provided */
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}
/**
 * A11ying brand button. Supports a solid primary style and a text-only
 * alternative style. Both variants include accessible focus rings.
 */
export declare function Button({ children, variant, href, onClick, type, disabled, className, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
