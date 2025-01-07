import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import './login.css'

interface LoginFormState {
    email: string
    password: string
}

export default function LoginPage() {
    const [searchParams] = useSearchParams()
    const message = searchParams.get('message')
    const redirectTo = searchParams.get('redirectTo')

    const [formData, setFormData] = useState<LoginFormState>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="loginContainer">
            <form className="loginForm">
              {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}
              {message && <p className="loginMessage">{message}</p>}

              <input
                  type="email"
                  name="email"
                  className="loginInput"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
              />
              <input
                  type="password"
                  name="password"
                  className="loginInput"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleChange}
              />
              <button type="submit" className="loginButton">로그인</button>
          </form>
          <Link to="/signup" className="loginLink">회원가입</Link>
      </div>
  )
} 