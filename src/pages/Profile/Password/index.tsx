import { usePasswordChange } from './hooks/usePasswordChange'
import './password.css'

function PasswordChange() {
    const {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        handleCancel
    } = usePasswordChange()

    return (
        <div className="passwordChangeContainer" role="main">
            <div className="passwordChangeTitle">비밀번호 변경</div>
            <section className="passwordChangeSection">
                <form onSubmit={handleSubmit} className="passwordChangeForm">
                    <div className="formGroup">
                        <label htmlFor="currentPassword" className="formLabel">
                            현재 비밀번호
                        </label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            className="formInput"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="현재 비밀번호를 입력하세요"
                            disabled={isLoading}
                        />
                        {errors.currentPassword && (
                            <p className="formError">{errors.currentPassword[0]}</p>
                        )}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="newPassword" className="formLabel">
                            새 비밀번호
                        </label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            className="formInput"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="새 비밀번호를 입력하세요"
                            disabled={isLoading}
                        />
                        <p className="formHint">
                            영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요
                        </p>
                        {errors.newPassword && (
                            <p className="formError">{errors.newPassword[0]}</p>
                        )}
                    </div>
                    <div className="formGroup">
                        <label htmlFor="confirmPassword" className="formLabel">
                            새 비밀번호 확인
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            className="formInput"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="새 비밀번호를 다시 입력하세요"
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && (
                            <p className="formError">{errors.confirmPassword[0]}</p>
                        )}
                    </div>
                    <div className="formActions">
                        <button
                            type="button"
                            className="cancelButton"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="saveButton"
                            disabled={isLoading}
                        >
                            {isLoading ? '변경 중...' : '변경'}
                        </button>
                    </div>
                    {errors.general && (
                        <p className="formError">{errors.general}</p>
                    )}
                </form>
            </section>
        </div>
    )
}

export default PasswordChange 