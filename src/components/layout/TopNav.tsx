import { Link } from 'react-router-dom'
import './topNav.css'
import { navItems, authItems } from '../../config/navigation'
import { useAuth } from '../../hooks/useAuth'
import { useLogout } from '../../hooks/useLogout'
import { useScroll } from '../../hooks/useScroll'
import { useProfile } from '../../hooks/useProfile'
import ProfileAvatar from '../common/ProfileAvatar'
import Dropdown from '../common/Dropdown'

function TopNav() {
    const { isScrolled } = useScroll()
    const { isAuthenticated } = useAuth()
    const { data: profile } = useProfile()
    const logout = useLogout()

    const profileTrigger = (
        <button className="menu-item">
            <ProfileAvatar
                imageUrl={profile?.imageUrl}
                size="sm"
            />
            <span>{profile?.name || '프로필'}</span>
        </button>
    )

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
                    {isAuthenticated ? (
                        <Dropdown trigger={profileTrigger}>
                            <Link to="/profile" className="dropdown-item">
                                <img src="/icons/profile.svg" alt="" className="icon" />
                                <span>프로필 설정</span>
                            </Link>
                            <div className="dropdown-divider" />
                            <button
                                onClick={() => logout.mutate()}
                                className="dropdown-item"
                            >
                                <img src={authItems.logout.icon} alt="" className="icon" />
                                <span>{authItems.logout.label}</span>
                            </button>
                        </Dropdown>
                    ) : (
                        <Link to={authItems.login.href} className="menu-item">
                            <img src={authItems.login.icon} alt={authItems.login.alt} className="icon" />
                            <span>{authItems.login.label}</span>
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default TopNav 