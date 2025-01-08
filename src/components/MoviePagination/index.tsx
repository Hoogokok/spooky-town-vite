import { useSearchParams, useLocation } from 'react-router-dom'
import { generatePagination } from '../../utils/pagination'
import './moviePagination.css'

interface PaginationProps {
    totalPages: number
}

function MoviePagination({ totalPages }: PaginationProps) {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const currentPage = Number(searchParams.get('page')) || 1

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${location.pathname}?${params.toString()}`
    }

    const allPages = generatePagination(currentPage, totalPages)

    return (
        <div className="pagenation">
            {allPages.map((page, index) => (
                typeof page === 'string' ? (
                    <span key={index} className="middle">{page}</span>
                ) : (
                    <a
                        key={page}
                        href={createPageURL(page)}
                        className={page === currentPage ? "pageNumberActive" : "pageNumber"}
                    >
                        {page}
                    </a>
                )
            ))}
        </div>
    )
}

export default MoviePagination 