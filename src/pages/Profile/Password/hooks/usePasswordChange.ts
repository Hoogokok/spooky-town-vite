import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { passwordChangeSchema, type PasswordChangeInput } from '../../../../api/schemas/auth'

interface PasswordErrors {
    currentPassword?: string[];
    newPassword?: string[];
    confirmPassword?: string[];
    general?: string;
}

export function usePasswordChange() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<PasswordErrors>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // 에러 메시지 초기화
        setErrors(prev => ({
            ...prev,
            [name]: undefined,
            general: undefined
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        const validation = passwordChangeSchema.safeParse(formData)
        if (!validation.success) {
            setErrors(validation.error.formErrors.fieldErrors)
            setIsLoading(false)
            return
        }

        // TODO: API 호출 로직 구현
        console.log('비밀번호 변경 요청:', validation.data)
        setIsLoading(false)
    }

    const handleCancel = () => {
        navigate('/profile/edit')
    }

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        handleCancel
    }
} 