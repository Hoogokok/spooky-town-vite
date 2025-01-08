import { useSearchParams } from 'react-router-dom'
import { Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import MovieList from '../../components/MovieList'
import MovieSearch from '../../components/MovieSearch'
import MoviePagination from '../../components/MoviePagination'
import MovieSkeleton from '../../components/MovieSkeleton'
import { searchStreamingMovies } from '../../api/endpoints/streaming'
import './streaming.css'
import ErrorComponent from '../../components/common/ErrorComponent'

function StreamingPage() {
    const [searchParams] = useSearchParams()
    const provider = searchParams.get('provider') || 'all'
    const page = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''

    const { data, isLoading, error } = useQuery({
        queryKey: ['movies', provider, page, search],
        queryFn: async () => {
            const result = await Effect.runPromise(
                searchStreamingMovies(provider, page, search)
            )
            return result
        }
    })

    if (error) {
        return <ErrorComponent
            code="FetchError"
            message="영화 정보를 불러오는데 실패했습니다"
        />
    }

    return (
        <div className="streamingContainer">
            <div className="searchTabWrapper">
                <MovieSearch />
            </div>
            <div className="imageGalleryWrapper">
                <Suspense fallback={<MovieSkeleton />}>
                    {isLoading ? (
                        <MovieSkeleton />
                    ) : (
                        data?.movies && <MovieList movies={data.movies} />
                    )}
                </Suspense>
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