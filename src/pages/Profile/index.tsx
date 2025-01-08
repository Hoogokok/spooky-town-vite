import { useEffect, useState } from 'react'
import { getProfile } from '../../api/endpoints/profile'
import { Effect } from 'effect'
import './profile.css'

interface ProfileData {
    name: string;
    email: string;
    imageUrl?: string;
}

type ProfileState = {
    status: 'idle' | 'loading' | 'success' | 'error';
    data: ProfileData | null;
    error: string | null;
}

function Profile() {
    const [profileState, setProfileState] = useState<ProfileState>({
        status: 'idle',
        data: null,
        error: null
    })

    useEffect(() => {
        setProfileState(prev => ({ ...prev, status: 'loading' }))

        Effect.runPromise(getProfile).then(
            (result) => setProfileState({
                status: 'success',
                data: result,
                error: null
            }),
            (error) => setProfileState({
                status: 'error',
                data: null,
                error: error.message
            })
        )
    }, [])

    const { status, data: profile, error } = profileState

    if (status === 'loading') {
        return <div>로딩 중...</div>
    }

    return (
        <div className="profileContainer" role="main">
            <div className="profileTitle">프로필</div>
            <section className="profileSection">
                <div className="profileInfo">
                    <div className="profileAvatar">
                        {profile?.imageUrl ? (
                            <img
                                src={profile.imageUrl}
                                alt="프로필 이미지"
                            />
                        ) : (
                            <img
                                src="/icons/profile.svg"
                                alt="기본 프로필 이미지"
                            />
                        )}
                    </div>
                    <div className="profileDetails">
                        <h2 className="profileName">{profile?.name || '사용자 이름'}</h2>
                        <p className="profileEmail">{profile?.email || 'user@example.com'}</p>
                    </div>
                </div>
            </section>
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Profile 