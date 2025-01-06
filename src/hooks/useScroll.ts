import { useState, useEffect } from 'react';

interface ScrollState {
    isHidden: boolean;
    lastScrollY: number;
}

export function useScroll(): ScrollState {
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            if (currentScrollY >= maxScroll - 10 || currentScrollY <= 0) {
                setIsHidden(false);
            } else if (currentScrollY > lastScrollY) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        let timeoutId: ReturnType<typeof setTimeout> | null = null;
        const throttledScroll = () => {
            if (timeoutId) return;

            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = null;
            }, 100);
        };

        window.addEventListener('scroll', throttledScroll);
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [lastScrollY]);

    return { isHidden, lastScrollY };
} 