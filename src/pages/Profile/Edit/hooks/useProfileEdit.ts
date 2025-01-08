import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProfileData, ProfileUpdateInput, profileImageSchema } from "../../../../api/schemas/profile"
import { Effect } from "effect"
import { getProfile, updateProfile as updateProfileApi, uploadProfileImage } from "../../../../api/endpoints/profile"

type ProfileError = {
    _tag: 'ProfileError';
    message: string;
}

export function useProfileEdit() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const handleError = (error: Error | ProfileError) => {
        if ('_tag' in error && error._tag === 'ProfileError') {
            switch (error.message) {
                case '프로필 업데이트에 실패했습니다':
                    setErrorMessage('프로필을 수정하는 중에 문제가 발생했어요. 잠시 후 다시 시도해주세요.')
                    break
                case '인증이 필요합니다':
                    setErrorMessage('로그인이 필요한 기능이에요.')
                    break
                default:
                    setErrorMessage('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
            }
        } else {
            setErrorMessage('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
        }
    }

    const { data: profile, isLoading, error: fetchError } = useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: () => Effect.runPromise(getProfile)
    })

    const { mutate: updateProfile, isPending: isSaving } = useMutation({
        mutationFn: (data: ProfileUpdateInput) => Effect.runPromise(updateProfileApi(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            navigate('/profile')
        },
        onError: handleError
    })

    const { mutate: uploadImage, isPending: isUploading } = useMutation({
        mutationFn: (file: File) => Effect.runPromise(uploadProfileImage(file)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            setSelectedImage(null)
            setSuccessMessage('이미지가 성공적으로 업로드되었습니다.')
            setTimeout(() => setSuccessMessage(null), 3000)
        },
        onError: handleError
    })

    const handleImageSelect = (file: File) => {
        const validation = profileImageSchema.safeParse({ image: file })
        if (!validation.success) {
            setErrorMessage(validation.error.errors[0].message)
            return
        }
        setSelectedImage(file)
    }

    const handleImageUpload = (file: File) => {
        uploadImage(file)
    }

    const handleProfileUpdate = (name: string) => {
        updateProfile({ name })
    }

    const handleCancel = () => {
        navigate('/profile')
    }

    return {
        profile,
        isLoading,
        errorMessage,
        selectedImage,
        handleImageSelect,
        handleImageUpload,
        handleProfileUpdate,
        handleCancel,
        isUploading,
        isSaving,
        fetchError,
        successMessage,
    }
} 