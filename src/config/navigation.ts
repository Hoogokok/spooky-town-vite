import { NavItem } from '../types/navigation'

export const navItems = [
    {
        href: '/',
        icon: '/icons/home.svg',
        label: '홈',
        alt: '홈 아이콘'
    },
    {
        href: '/videos',
        icon: '/icons/search.svg',
        label: '영상',
        alt: '영상 아이콘'
    },
    {
        href: '/manga',
        icon: '/icons/manga.svg',
        label: '만화',
        alt: '만화 아이콘'
    },
    {
        href: '/games',
        icon: '/icons/game.svg',
        label: '게임',
        alt: '게임 아이콘'
    }
]

export const loginItem = {
    href: '/login',
    icon: '/icons/login.svg',
    label: '로그인',
    alt: '로그인 아이콘'
}

export const profileItem = {
    href: '/profile',
    icon: '/icons/profile.svg',
    label: '프로필',
    alt: '프로필 아이콘'
} 