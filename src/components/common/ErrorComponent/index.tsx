import { useNavigate } from 'react-router-dom'
import './errorComponent.css'

interface ErrorComponentProps {
    code?: string
    message?: string
    retry?: () => void
}

function ErrorComponent({ code, message, retry }: ErrorComponentProps) {
    const navigate = useNavigate()

    const handleRetry = () => {
        if (retry) {
            retry()
        } else {
            navigate(0)
        }
    }

    return (
        <div className="errorContainer">
            <h2>{code || '오류가 발생했습니다'}</h2>
            <p>{message || '잠시 후 다시 시도해주세요'}</p>
            <button onClick={handleRetry}>
                다시 시도
            </button>
        </div>
    )
}

export default ErrorComponent 