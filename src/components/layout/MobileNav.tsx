import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './mobileNav.css';
import { navItems, loginItem } from '../../config/navigation';

function MobileNav() {
    const location = useLocation();

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
            <nav className="mobileNav">
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