import { Link } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import './signup.css'

export default function SignupPage() {
    const { formData, errors, isLoading, handleChange, handleSubmit } = useSignup()

    return (
        <div className="signupContainer">
            <form className="signupForm" role="form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    className="signupInput" 
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.email && <p className="signupError">{errors.email[0]}</p>}

                <input 
                    type="password" 
                    name="password" 
                    className="signupInput" 
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.password && <p className="signupError">{errors.password[0]}</p>}

                <input
                    type="password"
                    name="passwordConfirm"
                    className="signupInput"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.passwordConfirm && <p className="signupError">{errors.passwordConfirm[0]}</p>}

                <input 
                    type="text" 
                    name="name" 
                    className="signupInput" 
                    placeholder="별명을 입력하세요"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                {errors.name && <p className="signupError">{errors.name[0]}</p>}

                <button 
                    type="submit" 
                    className="signupButton" 
                    name="signup"
                    disabled={isLoading}
                >
                    {isLoading ? '가입 중...' : '회원가입'}
                </button>
                {errors.general && (
                    <div className="signupErrorContainer">
                        <p className="signupError">{errors.general}</p>
                    </div>
                )}
            </form>
            <Link to="/login" className="signupLink">
                이미 계정이 있으신가요? 로그인하기
            </Link>
        </div>
    )
} 