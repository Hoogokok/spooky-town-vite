import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../api/auth'

interface SignupFormState {
    email: string
    password: string
    passwordConfirm: string
    name: string
}

interface SignupError {
    email?: string[]
    password?: string[]
    passwordConfirm?: string[]
    name?: string[]
    general?: string
}

export function useSignup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<SignupFormState>({
        email: '',
        password: '',
        passwordConfirm: '',
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

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit
    }
} 