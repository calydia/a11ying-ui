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
export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled,
  className = '',
}: ButtonProps) {
  const cls =
    variant === 'primary'
      ? `button item--transition${className ? ` ${className}` : ''}`
      : `button--alternative item--transition${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
