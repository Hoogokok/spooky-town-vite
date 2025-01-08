import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../api/endpoints/profile'
import { Effect } from 'effect'
import Loading from '../../components/common/Loading'
import './profile.css'

interface ProfileData {
    name: string;
    email: string;
    imageUrl?: string;
}

function Profile() {
    const { data: profile, isLoading, error } = useQuery<ProfileData>({
        queryKey: ['profile'],
        queryFn: () => Effect.runPromise(getProfile)
    })

    if (isLoading) {
        return <Loading />
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
            {error && <div className="error">{(error as Error).message}</div>}
        </div>
    )
}

export default Profile 