import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signupUser } from '../../api/auth'
import './signup.css'

interface SignupFormState {
    email: string
    password: string
    name: string
}

interface SignupError {
    email?: string[]
    password?: string[]
    name?: string[]
    general?: string
}

export default function SignupPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<SignupFormState>({
        email: '',
        password: '',
        name: ''
    })
    const [errors, setErrors] = useState<SignupError>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        const { data, error, validationError } = await signupUser(formData)

        if (validationError) {
            setErrors(validationError)
            setIsLoading(false)
            return
        }

        if (error) {
            setErrors({ general: error })
            setIsLoading(false)
            return
        }

        if (data?.token) {
            localStorage.setItem('token', data.token)
            navigate('/', { replace: true })
        }

        setIsLoading(false)
    }

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