import { ProfileImageEditor } from './components/ProfileImageEditor'
import { ProfileForm } from './components/ProfileForm'
import { ErrorMessage } from './components/ErrorMessage'
import Loading from '../../../components/common/Loading'
import { useProfileEdit } from './hooks/useProfileEdit'
import './edit.css'

function ProfileEdit() {
    const {
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
        handlePasswordChange,
    } = useProfileEdit()

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="profileEditContainer" role="main">
            <div className="profileTitle">프로필 수정</div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && (
                <div className="success" role="alert">
                    {successMessage}
                </div>
            )}
            <section className="profileEditSection">
                <ProfileImageEditor
                    imageUrl={profile?.imageUrl}
                    onImageSelect={handleImageSelect}
                    onImageUpload={handleImageUpload}
                    isUploading={isUploading}
                    selectedImage={selectedImage}
                />
                <ProfileForm
                    defaultName={profile?.name}
                    onSubmit={handleProfileUpdate}
                    onCancel={handleCancel}
                    onChangePassword={handlePasswordChange}
                    isSaving={isSaving}
                />
            </section>
            {fetchError && <ErrorMessage message={(fetchError as Error).message} />}
        </div>
    )
}

export default ProfileEdit 