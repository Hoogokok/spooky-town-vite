import { useSearchParams } from 'react-router-dom'
import { useStreamingMovies } from '../../hooks/useStreamingMovies'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import MovieList from '../../components/MovieList'
import MoviePagination from '../../components/MoviePagination'
import MovieSkeleton from '../../components/MovieSkeleton'
import ErrorComponent from '../../components/common/ErrorComponent'
import './streaming.css'

function StreamingPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const provider = searchParams.get('provider') || 'all'
    const page = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''

    const { data, isLoading, error } = useStreamingMovies(provider, page, search)

    const handleProviderChange = (newProvider: string) => {
        setSearchParams(prev => {
            if (newProvider === 'all') {
                prev.delete('provider')
            } else {
                prev.set('provider', newProvider)
            }
            prev.set('page', '1')
            return prev
        })
    }

    const handleSearch = (query: string) => {
        setSearchParams(prev => {
            if (query) {
                prev.set('search', query)
            } else {
                prev.delete('search')
            }
            prev.set('page', '1')
            return prev
        })
    }

    const SearchTab = isMobile ? (
        <div className="searchTabWrapper">
            <select
                onChange={(e) => handleProviderChange(e.target.value)}
                className="mobileSelect"
                value={provider}
            >
                <option value="all">전체</option>
                <option value="netflix">넷플릭스</option>
                <option value="disney">디즈니+</option>
                <option value="wavve">웨이브</option>
                <option value="naver">네이버</option>
                <option value="googleplay">구글 플레이</option>
            </select>
            <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    ) : (
        <div className="searchTabWrapper">
            <button onClick={() => handleProviderChange('all')} className="searchButton">모든 서비스</button>
            <button onClick={() => handleProviderChange('netflix')} className="searchButton">넷플릭스</button>
            <button onClick={() => handleProviderChange('disney')} className="searchButton">디즈니+</button>
            <button onClick={() => handleProviderChange('wavve')} className="searchButton">웨이브</button>
            <button onClick={() => handleProviderChange('naver')} className="searchButton">네이버</button>
            <button onClick={() => handleProviderChange('googleplay')} className="searchButton">구글 플레이</button>
            <input
                type="text"
                    value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )

    if (error) {
        return <ErrorComponent
            code="FetchError"
            message="영화 정보를 불러오는데 실패했습니다"
        />
    }

    return (
        <div className="streamingContainer">
            <div className="streamingSearchContainer">
                {SearchTab}
            </div>
            <div className="imageGalleryWrapper">
                {isLoading ? (
                    <MovieSkeleton />
                ) : (
                        data?.movies && (
                            <MovieList
                                movies={data.movies.map(movie => ({
                                    ...movie,
                                posterPath: import.meta.env.VITE_DEV
                                    ? import.meta.env.VITE_POSTER_URL + movie.posterPath
                                    : movie.posterPath
                            }))}
                            />
                        )
                )}
            </div>
            {data?.totalPages && (
                <div className="paginationWrapper">
                    <MoviePagination totalPages={data.totalPages} />
                </div>
            )}
        </div>
    )
}

export default StreamingPage 