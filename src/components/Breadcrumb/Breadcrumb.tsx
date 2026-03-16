import React from 'react';
import type { BreadcrumbItem } from '../../types/BreadcrumbItem';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  ariaLabel: string;
  className?: string;
}

export function Breadcrumb({ items, ariaLabel, className = '' }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="block list-none m-0 p-0">
        {items.map((item, index) => (
          <li key={index} className="inline">
            {index > 0 && (
              <span aria-hidden="true" className="mx-2">
                /
              </span>
            )}
            {item.href ? <a href={item.href}>{item.label}</a> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
