import { Effect } from 'effect'
import { MovieListResponse } from '../types/movieResponses'

export class FetchError {
    readonly _tag = 'FetchError'
    constructor(readonly message: string) { }
}

export class NetworkError {
    readonly _tag = 'NetworkError'
    constructor(readonly message: string) { }
}

const BASE_URL = import.meta.env.VITE_MOVIE_API
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY

const fetchFromApi = (endpoint: string) => Effect.tryPromise({
    try: () => fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'X-API-Key': API_KEY
        }
    }),
    catch: () => new NetworkError('네트워크 오류가 발생했습니다')
})

const parseResponse = (response: Response) => Effect.tryPromise({
    try: () => response.json() as Promise<MovieListResponse[]>,
    catch: () => new FetchError('응답을 파싱하는데 실패했습니다')
})

const fetchMovies = (endpoint: string): Effect.Effect<MovieListResponse[], FetchError | NetworkError, never> =>
    Effect.gen(function* (_) {
        const response = yield* _(fetchFromApi(endpoint))

        if (!response.ok) {
            return yield* _(Effect.fail<FetchError | NetworkError>(
                new FetchError('영화 정보를 가져오는데 실패했습니다')
            ))
        }

        const movies = yield* _(parseResponse(response))
        return movies
    })

export const movieApi = {
    fetchUpcomingMovies: () => fetchMovies('/movies/theater/upcoming'),
    fetchNowPlayingMovies: () => fetchMovies('/movies/theater/released')
} 
