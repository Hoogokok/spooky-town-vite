import { ReactNode } from 'react'
import './mainLayout.css'
import SidebarNav from './SidebarNav'
import MobileNav from './MobileNav'

interface MainLayoutProps {
    children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="container">
            <SidebarNav />
            <div className="content">
                {children}
            </div>
            <MobileNav />
        </div>
    )
}

export default MainLayout 