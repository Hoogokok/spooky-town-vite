import { Link } from 'react-router-dom'
import './mobileNav.css'
import { navItems, loginItem } from '../../config/navigation'

function MobileNav() {
    return (
        <>
            <header className="header">
                <div className="logo">
                    스푸키 타운
                </div>
            </header>
            <nav className="nav">
                {navItems.map((item) => (
                    <Link key={item.href} to={item.href}>
                        <img src={item.icon} alt={item.alt} className="icon" />
                    </Link>
                ))}
                <Link to={loginItem.href}>
                    <img src={loginItem.icon} alt={loginItem.alt} className="icon" />
                </Link>
            </nav>
        </>
    )
}

export default MobileNav 