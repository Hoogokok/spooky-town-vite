import './profileAvatar.css'

interface ProfileAvatarProps {
    imageUrl?: string | null;
    size?: 'sm' | 'md' | 'lg';
    alt?: string;
}

export default function ProfileAvatar({
    imageUrl,
    size = 'md',
    alt = '프로필 이미지'
}: ProfileAvatarProps) {
    return (
        <div className={`avatar avatar-${size}`}>
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={alt}
                    className="avatar-image"
                />
            ) : (
                <img
                    src="/icons/profile.svg"
                    alt="기본 프로필 아이콘"
                    className="avatar-default"
                />
            )}
        </div>
    )
} 