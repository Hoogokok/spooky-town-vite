import { useState, useEffect } from 'react';

interface ScrollState {
    isHidden: boolean;
    isScrolled: boolean;
}

export function useScroll(threshold = 50): ScrollState {
    const [isHidden, setIsHidden] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsHidden(currentScrollY > lastScrollY && currentScrollY > threshold);
            setLastScrollY(currentScrollY);

            setIsScrolled(currentScrollY > 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, threshold]);

    return { isHidden, isScrolled };
} 