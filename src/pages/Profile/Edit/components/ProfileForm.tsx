interface ProfileFormProps {
    defaultName?: string;
    onSubmit: (name: string) => void;
    onCancel: () => void;
    onChangePassword: () => void;
    isSaving: boolean;
}

export function ProfileForm({
    defaultName,
    onSubmit,
    onCancel,
    onChangePassword,
    isSaving
}: ProfileFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const name = formData.get('name') as string
        onSubmit(name)
    }

    return (
        <form onSubmit={handleSubmit} className="profileEditForm">
            <div className="formGroup">
                <label htmlFor="name" className="formLabel">이름</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="formInput"
                    defaultValue={defaultName}
                    placeholder="이름을 입력하세요"
                    minLength={2}
                    maxLength={20}
                />
                <p className="formHint">
                    이름은 최소 2자, 최대 20자까지 입력이 가능해요 수정한 정보는 다른 서비스에도 동일하게 표시돼요
                </p>
            </div>
            <div className="formGroup">
                <button
                    type="button"
                    className="changePasswordButton"
                    onClick={onChangePassword}
                >
                    비밀번호 변경
                </button>
            </div>
            <div className="formActions">
                <button
                    type="button"
                    className="cancelButton"
                    onClick={onCancel}
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
    )
} 