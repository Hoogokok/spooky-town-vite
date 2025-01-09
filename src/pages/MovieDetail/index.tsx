import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import { movieApi } from '../../api/endpoints/movie'
import Loading from '../../components/common/Loading'
import ErrorComponent from '../../components/common/ErrorComponent'
import { StreamingMovieDetail, TheaterMovieDetail } from '../../types/api/movie'
import './movieDetail.css'
import { lazy, Suspense } from 'react'

const ReviewSection = lazy(() => import('./components/ReviewSection'))

function MovieDetail() {
    const { id, type } = useParams<{ id: string; type: 'streaming' | 'upcoming' | 'released' }>()

    const { data: movie, isLoading, error } = useQuery<StreamingMovieDetail | TheaterMovieDetail>({
        queryKey: ['movie', id, type],
        queryFn: async () => {
            if (!id || !type) throw new Error('Invalid parameters')

            const result = type === 'streaming'
                ? await Effect.runPromise(movieApi.fetchStreamingMovieDetail(id))
                : await Effect.runPromise(movieApi.fetchTheaterMovieDetail(id))

            if (result instanceof Error) throw result
            return result
        },
        enabled: !!id && !!type
    })

    if (isLoading) return <Loading />

    if (error || !movie) {
        return <ErrorComponent
            code="FetchError"
            message="영화 정보를 불러오는데 실패했습니다"
        />
    }
    return (
        <div className="movieDetailContainer">
            <div className="movieHeader">
                <div className="posterContainer">
                    <img
                        src={movie.posterPath}
                        alt={`${movie.title} 포스터`}
                        className="posterImage"
                    />
                </div>
                <div className="movieInfo">
                    <h1 className="movieTitle">{movie.title}</h1>
                    {'releaseDate' in movie && (
                        <p className="releaseDate">
                            {new Date(movie.releaseDate).toLocaleDateString('ko-KR')}
                            {movie.status === 'upcoming' ? ' 개봉 예정' : ' 개봉'}
                        </p>
                    )}
                    <p className="overview">{movie.overview}</p>
                    {movie.watchProviders && movie.watchProviders.length > 0 && (
                        <div className="streamingServices">
                            <h2 className="streamingTitle">시청 가능한 곳</h2>
                            <div className="providerList">
                                {movie.watchProviders?.map((provider: string) => (
                                    <span key={provider} className="provider">
                                        {provider}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Suspense fallback={<Loading />}>
                <ReviewSection movieId={movie.id.toString()} />
            </Suspense>
        </div>
    )
}

export default MovieDetail 