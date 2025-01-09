import { Effect } from 'effect'
import { TheaterMovie, MovieDetail, StreamingMovieDetail, TheaterMovieDetail } from '../../types/api/movie'

export class FetchError {
    readonly _tag = 'FetchError'
    constructor(readonly message: string) { }
}

export class NetworkError {
    readonly _tag = 'NetworkError'
    constructor(readonly message: string) { }
}

const BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const fetchFromApi = (endpoint: string) => Effect.tryPromise({
    try: () => fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'X-API-Key': API_KEY
        }
    }),
    catch: () => new NetworkError('네트워크 오류가 발생했습니다')
})

const parseResponse = <T>(response: Response) => Effect.tryPromise({
    try: () => response.json() as Promise<T>,
    catch: () => new FetchError('응답을 파싱하는데 실패했습니다')
})

const fetchMovies = (endpoint: string): Effect.Effect<TheaterMovie[], FetchError | NetworkError, never> =>
    Effect.gen(function* (_) {
        const response = yield* _(fetchFromApi(endpoint))

        if (!response.ok) {
            return yield* _(Effect.fail<FetchError | NetworkError>(
                new FetchError('영화 정보를 가져오는데 실패했습니다')
            ))
        }

        const movies = yield* _(parseResponse<TheaterMovie[]>(response))
        return movies
    })

// 스트리밍 영화 상세 정보 조회
const fetchStreamingMovieDetail = (id: string): Effect.Effect<StreamingMovieDetail, FetchError | NetworkError, never> =>
    Effect.gen(function* (_) {
        const response = yield* _(fetchFromApi(`/movies/streaming/${id}`))

        if (!response.ok) {
            return yield* _(Effect.fail<FetchError | NetworkError>(
                new FetchError('영화 상세 정보를 가져오는데 실패했습니다')
            ))
        }

        const movie = yield* _(parseResponse<StreamingMovieDetail>(response))
        return movie
    })

// 극장 영화 상세 정보 조회
const fetchTheaterMovieDetail = (id: string): Effect.Effect<TheaterMovieDetail, FetchError | NetworkError, never> =>
    Effect.gen(function* (_) {
        const response = yield* _(fetchFromApi(`/movies/theater/${id}`))

        if (!response.ok) {
            return yield* _(Effect.fail<FetchError | NetworkError>(
                new FetchError('영화 상세 정보를 가져오는데 실패했습니다')
            ))
        }

        const movie = yield* _(parseResponse<TheaterMovieDetail>(response))
        return movie
    })

export const movieApi = {
    fetchUpcomingMovies: () => fetchMovies('/movies/theater/upcoming'),
    fetchNowPlayingMovies: () => fetchMovies('/movies/theater/released'),
    fetchStreamingMovieDetail: (id: string) => fetchStreamingMovieDetail(id),
    fetchTheaterMovieDetail: (id: string) => fetchTheaterMovieDetail(id)
} 
