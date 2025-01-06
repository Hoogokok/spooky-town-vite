import { ReactNode } from 'react'
import './mainLayout.css'
import TopNav from './TopNav'
import MobileNav from './MobileNav'
import Footer from './Footer'

interface MainLayoutProps {
    children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="container">
            <TopNav />
            <div className="mainWrapper">
                <main className="content">
                    {children}
                </main>
                <Footer />
            </div>
            <MobileNav />
        </div>
    )
}

export default MainLayout 