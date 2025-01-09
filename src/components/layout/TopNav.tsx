import { Link } from 'react-router-dom'
import './topNav.css'
import { navItems, authItems } from '../../config/navigation'
import { useAuth } from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout'
import { useScroll } from '../../hooks/useScroll'

function TopNav() {
    const { isScrolled } = useScroll()
    const { isAuthenticated } = useAuth()
    const logout = useLogout()

    return (
        <nav className={`topNav ${isScrolled ? 'scrolled' : ''}`}>
            <div className={`navContent ${isScrolled ? 'scrolled' : ''}`}>
                <div className="logo">
                    <h1>스푸키 타운</h1>
                </div>
                <ul className="menu">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link to={item.href} className="menu-item">
                                <img src={item.icon} alt={item.alt} className="icon" />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        {isAuthenticated ? (
                            <button onClick={() => logout.mutate()} className="menu-item">
                                <img src={authItems.logout.icon} alt={authItems.logout.alt} className="icon" />
                                <span>{authItems.logout.label}</span>
                            </button>
                        ) : (
                            <Link to={authItems.login.href} className="menu-item">
                                <img src={authItems.login.icon} alt={authItems.login.alt} className="icon" />
                                <span>{authItems.login.label}</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TopNav 