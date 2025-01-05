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
            <main className="content">
                {children}
            </main>
            <MobileNav />
        </div>
    )
}

export default MainLayout 