import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './mobileNav.css';
import { navItems, loginItem } from '../../config/navigation';
import { useScroll } from '../../hooks/useScroll';

function MobileNav() {
    const location = useLocation();
    const { isHidden } = useScroll();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <>
            <header className="mobileHeader" role="banner">
                <div className="mobileLogo">
                    <h1>스푸키 타운</h1>
                </div>
            </header>
            <nav
                className={`mobileNav ${isHidden ? 'hidden' : ''}`}
                role="navigation"
                aria-label="모바일 메인 네비게이션"
            >
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={isActive(item.href) ? 'active' : ''}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                        role="menuitem"
                    >
                        <img src={item.icon} alt="" className="mobileIcon" aria-hidden="true" />
                        <span>{item.label}</span>
                    </Link>
                ))}
                <Link
                    to={loginItem.href}
                    className={isActive(loginItem.href) ? 'active' : ''}
                    aria-current={isActive(loginItem.href) ? 'page' : undefined}
                    role="menuitem"
                >
                    <img src={loginItem.icon} alt="" className="mobileIcon" aria-hidden="true" />
                    <span>{loginItem.label}</span>
                </Link>
            </nav>
        </>
    );
}

export default MobileNav; 