import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateProfile, uploadProfileImage } from '../../../api/endpoints/profile'
import { type ProfileUpdateInput } from '../../../api/schemas/profile'
import { Effect } from 'effect'
import Loading from '../../../components/common/Loading'
import { useNavigate } from 'react-router-dom'
import './edit.css'
import { useState } from 'react'

interface ProfileData {
    name: string;
    email: string;
    imageUrl?: string;
}

function ProfileEdit() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { data: profile, isLoading, error: fetchError } = useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: () => Effect.runPromise(getProfile)
    })

    const { mutate, isPending: isSaving } = useMutation({
        mutationFn: (data: ProfileUpdateInput) => Effect.runPromise(updateProfile(data)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
            navigate('/profile')
        },
        onError: (error: Error) => {
            if (error && '_tag' in error && error._tag === 'ProfileError') {
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
    })

    const imageMutation = useMutation({
        mutationFn: (file: File) => Effect.runPromise(uploadProfileImage(file)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
        onError: (error: Error) => {
            if (error && '_tag' in error && error._tag === 'ProfileError') {
                switch (error.message) {
                    case '이미지 업로드에 실패했습니다':
                        setErrorMessage('이미지 업로드 중 문제가 발생했어요. 다시 시도해주세요.')
                        break
                    default:
                        setErrorMessage('알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.')
                }
            }
        }
    })

    const handleCancel = () => {
        navigate('/profile')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const name = formData.get('name') as string

        mutate({ name })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // 파일 크기 체크 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrorMessage('이미지 크기는 5MB 이하여야 합니다.')
            return
        }

        // 파일 타입 체크
        if (!file.type.startsWith('image/')) {
            setErrorMessage('이미지 파일만 업로드 가능합니다.')
            return
        }

        imageMutation.mutate(file)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="profileEditContainer" role="main">
            <div className="profileTitle">프로필 수정</div>
            {errorMessage && (
                <div className="error" role="alert">
                    {errorMessage}
                </div>
            )}
            <section className="profileEditSection">
                <form onSubmit={handleSubmit} className="profileEditForm">
                    <div className="profileEditAvatar">
                        <img
                            src={profile?.imageUrl || '/icons/profile.svg'}
                            alt="프로필 이미지"
                        />
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            className="changeImageButton"
                            onClick={() => document.getElementById('profileImage')?.click()}
                            disabled={imageMutation.isPending}
                        >
                            {imageMutation.isPending ? '업로드 중...' : '이미지 변경'}
                        </button>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="name" className="formLabel">이름</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="formInput"
                            defaultValue={profile?.name}
                            placeholder="이름을 입력하세요"
                            minLength={2}
                            maxLength={20}
                        />
                        <p className="formHint">
                        이름은 최소 2자, 최대 20자까지 입력이 가능해요 수정한 정보는 다른 서비스에도 동일하게 표시돼요
                        </p>
                    </div>
                    <div className="formActions">
                        <button
                            type="button"
                            className="cancelButton"
                            onClick={handleCancel}
                            disabled={isSaving}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="saveButton"
                            disabled={isSaving}
                        >
                            {isSaving ? '저장 중...' : '저장'}
                        </button>
                    </div>
                </form>
            </section>
            {fetchError && <div className="error">{(fetchError as Error).message}</div>}
        </div>
    )
}

export default ProfileEdit 