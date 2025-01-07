import { Link } from 'react-router-dom'
import './signup.css'

export default function SignupPage() {
    return (
        <div className="signupContainer">
            <form className="signupForm" role="form">
                <input 
                    type="email" 
                    name="email" 
                    className="signupInput" 
                    placeholder="이메일을 입력하세요" 
                />
                <input 
                    type="password" 
                    name="password" 
                    className="signupInput" 
                    placeholder="비밀번호를 입력하세요" 
                />
                <input 
                    type="text" 
                    name="name" 
                    className="signupInput" 
                    placeholder="별명을 입력하세요"
                />
                <button 
                    type="submit" 
                    className="signupButton" 
                    name="signup"
                >
                    회원가입
                </button>
            </form>
            <Link to="/login" className="signupLink">
                이미 계정이 있으신가요? 로그인하기
            </Link>
        </div>
    )
} 