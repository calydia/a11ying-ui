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
export function Box({ variant = 'toc', children, className = '' }: BoxProps) {
  if (variant === 'blockquote') {
    return (
      <blockquote className={className || undefined}>
        {children}
      </blockquote>
    );
  }

  if (variant === 'notice') {
    return (
      <div className={`notice-box${className ? ` ${className}` : ''}`}>
        {children}
      </div>
    );
  }

  // toc (default)
  return (
    <div className={`toc-box${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}
