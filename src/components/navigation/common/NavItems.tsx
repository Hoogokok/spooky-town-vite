import { Link } from 'react-router-dom'
import { NavItem } from '../../../types/navigation'
import './navItems.css'

interface NavItemsProps {
    items: NavItem[];
    variant: 'desktop' | 'mobile';
}

function NavItems({ items, variant }: NavItemsProps) {
    return (
        <>
            {items.map((item) => (
                <Link key={item.href} to={item.href} className={`nav-item ${variant}`}>
                    <img src={item.icon} alt={item.alt} className="icon" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </>
    )
}

export default NavItems 