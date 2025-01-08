import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './password.css'

function PasswordChange() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: 비밀번호 변경 로직 구현
    }

    const handleCancel = () => {
        navigate('/profile/edit')
    }

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
                        />
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
                        />
                        <p className="formHint">
                            영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요
                        </p>
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
                        />
                    </div>
                    <div className="formActions">
                        <button
                            type="button"
                            className="cancelButton"
                            onClick={handleCancel}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="saveButton"
                        >
                            변경
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default PasswordChange 