import { useSearchParams } from 'react-router-dom'
import { useStreamingMovies } from '../../hooks/useStreamingMovies'
import SearchTab from '../../components/SearchTab'
import MovieList from '../../components/MovieList'
import MoviePagination from '../../components/MoviePagination'
import MovieSkeleton from '../../components/MovieSkeleton'
import ErrorComponent from '../../components/common/ErrorComponent'
import './streaming.css'

function StreamingPage() {
    const [searchParams, setSearchParams] = useSearchParams()
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

    if (error) {
        return <ErrorComponent
            code="FetchError"
            message="영화 정보를 불러오는데 실패했습니다"
        />
    }

    return (
        <div className="streamingContainer">
            <div className="streamingSearchContainer">
                <SearchTab
                    onProviderChange={handleProviderChange}
                    onSearch={handleSearch}
                    provider={provider}
                    search={search}
                />
            </div>
            <div className="imageGalleryWrapper">
                {isLoading ? (
                    <MovieSkeleton />
                ) : (
                        data?.movies && (
                            <MovieList
                                movies={data.movies.map(movie => ({
                                    ...movie,
                                    posterPath: import.meta.env.VITE_POSTER_URL + movie.posterPath
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