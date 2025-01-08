import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { passwordChangeSchema, type PasswordChangeInput } from '../../../../api/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import { Effect } from 'effect'
import { ProfileError, updatePassword } from '../../../../api/endpoints/profile'

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

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: (data: PasswordChangeInput) => Effect.runPromise(updatePassword(data)),
        onSuccess: () => {
            navigate('/profile')  // 성공 시 프로필 페이지로 이동
        },
        onError: (error: Error | ProfileError) => {
            if ('_tag' in error && error._tag === 'ProfileError') {
                switch (error.message) {
                    case '비밀번호 변경에 실패했습니다':
                        setErrors({ general: '비밀번호 변경 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.' })
                        break
                    case '인증이 필요합니다':
                        setErrors({ general: '로그인이 필요한 기능이에요.' })
                        break
                    default:
                        setErrors({ general: '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.' })
                }
            } else {
                setErrors({ general: '알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.' })
            }
        }
    })

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
        setErrors({})

        const validation = passwordChangeSchema.safeParse(formData)
        if (!validation.success) {
            setErrors(validation.error.formErrors.fieldErrors)
            return
        }

        mutate(validation.data)
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