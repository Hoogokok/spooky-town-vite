import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './mobileNav.css';
import { navItems, loginItem } from '../../config/navigation';

function MobileNav() {
    const location = useLocation();
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            // 스크롤이 끝에 도달했거나 맨 위일 때는 항상 표시
            if (currentScrollY >= maxScroll - 10 || currentScrollY <= 0) {
                setIsHidden(false);
            } else if (currentScrollY > lastScrollY) {
                // 아래로 스크롤
                setIsHidden(true);
            } else {
                // 위로 스크롤
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        // 스크롤 이벤트 쓰로틀링
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

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            <header className="mobileHeader">
                <div className="mobileLogo">
                    <h1>스푸키 타운</h1>
                </div>
            </header>
            <nav className={`mobileNav ${isHidden ? 'hidden' : ''}`}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={isActive(item.href) ? 'active' : ''}
                    >
                        <img src={item.icon} alt={item.alt} className="mobileIcon" />
                        <span>{item.label}</span>
                    </Link>
                ))}
                <Link
                    to={loginItem.href}
                    className={isActive(loginItem.href) ? 'active' : ''}
                >
                    <img src={loginItem.icon} alt={loginItem.alt} className="mobileIcon" />
                    <span>{loginItem.label}</span>
                </Link>
            </nav>
        </>
    );
}

export default MobileNav; 