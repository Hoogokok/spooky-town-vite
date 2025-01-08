import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../../api/endpoints/profile'
import { Effect } from 'effect'
import Loading from '../../../components/common/Loading'
import { useNavigate } from 'react-router-dom'
import './edit.css'

interface ProfileData {
    name: string;
    email: string;
    imageUrl?: string;
}

function ProfileEdit() {
    const navigate = useNavigate()
    const { data: profile, isLoading, error } = useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: () => Effect.runPromise(getProfile)
    })

    const handleCancel = () => {
        navigate('/profile')
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: 프로필 업데이트 로직
        console.log('프로필 업데이트')
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="profileEditContainer" role="main">
            <div className="profileTitle">프로필 수정</div>
            <section className="profileEditSection">
                <form onSubmit={handleSubmit} className="profileEditForm">
                    <div className="profileEditAvatar">
                        <img
                            src={profile?.imageUrl || '/icons/profile.svg'}
                            alt="프로필 이미지"
                        />
                        <button type="button" className="changeImageButton">
                            이미지 변경
                        </button>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="name" className="formLabel">이름</label>
                        <input
                            id="name"
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
                        <button type="button" className="cancelButton" onClick={handleCancel}>
                            취소
                        </button>
                        <button type="submit" className="saveButton">
                            저장
                        </button>
                    </div>
                </form>
            </section>
            {error && <div className="error">{(error as Error).message}</div>}
        </div>
    )
}

export default ProfileEdit 