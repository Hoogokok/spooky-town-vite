import './error.css'

interface ErrorComponentProps {
    code: string
    message: string
    retry?: () => void
}

function ErrorComponent({ code, message, retry }: ErrorComponentProps) {
    return (
        <div className="errorContainer" role="alert">
            <div className="errorContent">
                <h2 className="errorTitle">오류가 발생했습니다</h2>
                <p className="errorCode">{code}</p>
                <p className="errorMessage">{message}</p>
                {retry && (
                    <button
                        onClick={retry}
                        className="retryButton"
                        aria-label="다시 시도"
                    >
                        다시 시도
                    </button>
                )}
            </div>
        </div>
    )
}

export default ErrorComponent 