import React from 'react'
import { useEffect, useState } from 'react'
import { getProfile } from '../../api/endpoints/profile'
import { Effect } from 'effect'
import './profile.css'

function Profile() {
    const [profile, setProfile] = useState<{
        name: string;
        email: string;
        imageUrl?: string;
    } | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        Effect.runPromise(getProfile).then(
            (result) => setProfile(result),
            (error) => setError(error.message)
        )
    }, [])

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