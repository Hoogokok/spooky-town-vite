import { Link } from 'react-router-dom'
import './login.css'

export default function LoginPage() {
    return (
        <div className="loginContainer">
            <form className="loginForm">
                <input
                    type="email"
                    name="email"
                    className="loginInput"
                    placeholder="이메일을 입력하세요"
                />
                <input
                    type="password"
                    name="password"
                    className="loginInput"
                    placeholder="비밀번호를 입력하세요"
                />
                <button type="submit" className="loginButton">로그인</button>
            </form>
            <Link to="/signup" className="loginLink">회원가입</Link>
        </div>
    )
} 