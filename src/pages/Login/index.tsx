import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../../api/auth'
import './login.css'

interface LoginFormState {
    email: string
    password: string
}

interface LoginError {
    email?: string[]
    password?: string[]
    general?: string
}

export default function LoginPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const message = searchParams.get('message')
    const redirectTo = searchParams.get('redirectTo')

    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<LoginError>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // 입력 시 해당 필드의 에러 메시지 제거
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        try {
            const response = await loginUser(formData)
            // 로그인 성공 처리
            localStorage.setItem('token', response.token)
            navigate(redirectTo || '/')
        } catch (error) {
            if (error instanceof Error) {
                setErrors({
                    general: error.message
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit={handleSubmit}>
                {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
                {message && <p className="loginMessage">{message}</p>}
                {errors.general && <p className="loginError">{errors.general}</p>}

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
            </form>
            <Link to="/signup" className="loginLink">회원가입</Link>
        </div>
    )
} 