import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { passwordChangeSchema } from '../../../../api/schemas/auth'
import { updatePassword } from '../../../../api/auth'

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setIsLoading(true)

        const validation = passwordChangeSchema.safeParse(formData)
        if (!validation.success) {
            setErrors(validation.error.formErrors.fieldErrors)
            setIsLoading(false)
            return
        }

        const { error } = await updatePassword(formData.newPassword)

        if (error) {
            setErrors({ general: '비밀번호 변경에 실패했습니다. 다시 시도해주세요.' })
            setIsLoading(false)
            return
        }

        navigate('/profile')
    }

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