import './footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footerContent">
                <div className="copyright">
                    © 2024 스푸키 타운. All rights reserved.
                </div>
                <nav className="footerNav">
                    <a href="/terms">이용약관</a>
                    <a href="/privacy">개인정보처리방침</a>
                    <a href="/about">소개</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer 