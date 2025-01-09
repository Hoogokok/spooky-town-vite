export interface NavigationItem {
    id: string;
    label: string;
    path: string;
    icon: string;
}

export interface AuthNavigationItem extends NavigationItem {
    isAuthRequired?: boolean;
    showOnlyWhenLoggedOut?: boolean;
} 