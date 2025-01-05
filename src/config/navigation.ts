import { NavItem } from '../types/navigation'

export const navItems: NavItem[] = [
    {
        href: '/',
        icon: '/icons/home.svg',
        alt: '홈 아이콘',
        label: '홈'
    },
    {
        href: '/movies',
        icon: '/icons/search.svg',
        alt: '영화 아이콘',
        label: '영화'
    }
]

export const loginItem: NavItem = {
    href: '/login',
    icon: '/icons/login.svg',
    alt: '로그인 아이콘',
    label: '로그인'
} 