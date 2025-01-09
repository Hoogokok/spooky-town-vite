import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './mobileNav.css';
import { navItems, authItems } from '../../config/navigation';
import { useScroll } from '../../hooks/useScroll';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';

function MobileNav() {
    const location = useLocation();
    const { isHidden } = useScroll();
    const { isAuthenticated } = useAuth();
    const logout = useLogout();

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
                {isAuthenticated ? (
                    <button
                        onClick={() => logout.mutate()}
                        className="navButton"
                        role="menuitem"
                    >
                        <img src={authItems.logout.icon} alt="" className="mobileIcon" aria-hidden="true" />
                        <span>{authItems.logout.label}</span>
                    </button>
                ) : (
                        <Link
                            to={authItems.login.href}
                            className={isActive(authItems.login.href) ? 'active' : ''}
                            aria-current={isActive(authItems.login.href) ? 'page' : undefined}
                            role="menuitem"
                        >
                            <img src={authItems.login.icon} alt="" className="mobileIcon" aria-hidden="true" />
                            <span>{authItems.login.label}</span>
                        </Link>
                )}
            </nav>
        </>
    );
}

export default MobileNav; 