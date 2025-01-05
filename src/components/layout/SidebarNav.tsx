import { Link } from 'react-router-dom'
import './sidebarNav.css'
import { navItems, loginItem } from '../../config/navigation'

function SidebarNav() {
    return (
        <nav className="nav">
            <div className="logo">
                <h1>스푸키 타운</h1>
            </div>
            <ul className="menu">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link to={item.href}>
                            <img src={item.icon} alt={item.alt} className="icon" />
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link to={loginItem.href}>
                        <img src={loginItem.icon} alt={loginItem.alt} className="icon" />
                        <span>{loginItem.label}</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarNav 