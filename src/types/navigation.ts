export interface NavItem {
    href: string;
    icon: string;
    alt: string;
    label: string;
}

export interface NavigationProps {
    items: NavItem[];
    variant: 'desktop' | 'mobile';
} 