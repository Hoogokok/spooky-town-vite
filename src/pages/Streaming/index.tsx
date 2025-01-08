import { useSearchParams } from 'react-router-dom'
import { Suspense } from 'react'
import MovieList from '../../components/MovieList'
import MovieSearch from '../../components/MovieSearch'
import MoviePagination from '../../components/MoviePagination'
import MovieSkeleton from '../../components/MovieSkeleton'
import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../../api/movie'
import './streaming.css'

function StreamingPage() {
    const [searchParams] = useSearchParams()
    const provider = searchParams.get('provider') || 'all'
    const page = searchParams.get('page') || '1'
    const search = searchParams.get('search') || ''

    const { data, isLoading } = useQuery({
        queryKey: ['movies', provider, page, search],
        queryFn: () => searchMovies(provider, page, search)
    })

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