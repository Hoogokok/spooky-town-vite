import { ReactNode } from 'react'

interface MainLayoutProps {
    children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="layout">
            <header className="header">
                {/* 헤더 내용은 나중에 추가 */}
            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                {/* 푸터 내용은 나중에 추가 */}
            </footer>
        </div>
    )
}

export default MainLayout 