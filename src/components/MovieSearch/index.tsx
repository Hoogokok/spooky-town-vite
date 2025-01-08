import { useState } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import './movieSearch.css'

function MovieSearch() {
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('')

    const handleClick = useDebounce((provider: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (provider === 'all') {
            params.delete('provider')
        } else {
            params.set('provider', provider)
        }
        navigate(`${location.pathname}?${params.toString()}`)
    }, 300)

    const handleSearch = useDebounce((query: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', '1')
        if (query) {
            params.set('search', query)
        } else {
            params.delete('search')
        }
        navigate(`${location.pathname}?${params.toString()}`)
    }, 300)

    return (
        <div className="searchTab">
            <button onClick={() => handleClick("all")} className="searchButton">
                모든 서비스
            </button>
            <button onClick={() => handleClick("netflix")} className="searchButton">
                넷플릭스
            </button>
            <button onClick={() => handleClick("disney")} className="searchButton">
                디즈니+
            </button>
            <button onClick={() => handleClick("wavve")} className="searchButton">
                웨이브
            </button>
            <button onClick={() => handleClick("naver")} className="searchButton">
                네이버
            </button>
            <button onClick={() => handleClick("googleplay")} className="searchButton">
                구글 플레이
            </button>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearch(e.target.value)
                }}
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )
}

export default MovieSearch 