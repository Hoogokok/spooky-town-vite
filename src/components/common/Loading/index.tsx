import './loading.css'

export default function Loading() {
    return (
        <div className="loading" role="status" aria-label="로딩중">
            <div className="loadingSpinner"></div>
        </div>
    )
} 