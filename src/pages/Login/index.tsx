import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'
import './login.css'

export default function LoginPage() {
    const {
        formData,
        errors,
        isLoading,
        message,
        handleChange,
        handleSubmit
    } = useLogin()

    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit={handleSubmit}>
                {message && <p className="loginMessage">{message}</p>}
                <input
                    type="email"
                    name="email"
                    className="loginInput" 
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.email && <p className="loginError">{errors.email[0]}</p>}

                <input
                    type="password"
                    name="password"
                    className="loginInput" 
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.password && <p className="loginError">{errors.password[0]}</p>}

                <button
                    type="submit" 
                    className="loginButton"
                    disabled={isLoading}
                >
                    {isLoading ? '로그인 중...' : '로그인'}
                </button>
                {errors.general && <p className="loginError">{errors.general}</p>}
            </form>
            <Link to="/signup" className="loginLink">회원가입</Link>
        </div>
    )
} 