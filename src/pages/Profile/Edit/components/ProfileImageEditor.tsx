import React, { useState, useEffect } from 'react';

interface ProfileImageEditorProps {
    imageUrl?: string;
    onImageSelect: (file: File) => void;
    onImageUpload: (file: File) => void;
    isUploading: boolean;
    selectedImage: File | null;
}

export function ProfileImageEditor({
    imageUrl,
    onImageSelect,
    onImageUpload,
    isUploading,
    selectedImage
}: ProfileImageEditorProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const objectUrl = URL.createObjectURL(file)
        setPreviewUrl(objectUrl)
        onImageSelect(file)
    }

    return (
        <div className="profileEditAvatar">
            <img
                src={previewUrl || imageUrl || '/icons/profile.svg'}
                alt="프로필 이미지"
            />
            <div className="imageActions">
                <input
                    type="file"
                    id="profileImage"
                    accept=".jpg,.jpeg"
                    onChange={handleFileSelect}
                    className="hidden"
                />
                <button
                    type="button"
                    className="changeImageButton"
                    onClick={() => document.getElementById('profileImage')?.click()}
                >
                    선택
                </button>
                {selectedImage && (
                    <button
                        type="button"
                        className="uploadImageButton"
                        onClick={() => onImageUpload(selectedImage)}
                        disabled={isUploading}
                    >
                        {isUploading ? '업로드 중...' : '저장'}
                    </button>
                )}
            </div>
        </div>
    )
} 