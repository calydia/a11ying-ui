import type { BreadcrumbItem } from '../../types/BreadcrumbItem';
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    ariaLabel: string;
    className?: string;
}
export declare function Breadcrumb({ items, ariaLabel, className }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element | null;
