import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginUser } from '../api/auth'

interface LoginFormState {
    email: string
    password: string
}

interface LoginError {
    email?: string[]
    password?: string[]
    general?: string
}

export function useLogin() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const message = searchParams.get('message')
    const redirect = searchParams.get('redirect')

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
        setErrors(prev => ({
            ...prev,
            [name]: undefined
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        const { data, error, validationError } = await loginUser(formData)

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
            navigate(redirect || '/', { replace: true })
        }

        setIsLoading(false)
    }

    return {
        formData,
        errors,
        isLoading,
        message,
        handleChange,
        handleSubmit
    }
} 