import { Effect } from 'effect'
import { ApiError, NetworkError } from '../../types/error'
import { MovieSearchResponse } from '../../types/api/movie'

const BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const fetchFromApi = (provider: string, page: string, search: string) =>
    Effect.tryPromise({
        try: async () => {
            return fetch(
                `${BASE_URL}/movies/streaming?` +
                new URLSearchParams({ provider, page, search }),
                {
                    headers: {
                        'X-API-Key': API_KEY
                    }
                }
            )
        },
        catch: () => new NetworkError('네트워크 오류가 발생했습니다')
    })

const parseResponse = (response: Response) =>
    Effect.tryPromise({
        try: () => response.json() as Promise<MovieSearchResponse>,
        catch: () => new ApiError('응답을 파싱하는데 실패했습니다')
    })

export const searchStreamingMovies = (
    provider: string,
    page: string,
    search: string
): Effect.Effect<MovieSearchResponse, ApiError | NetworkError, never> =>
    Effect.gen(function* (_) {
        const response = yield* _(fetchFromApi(provider, page, search))

        if (!response.ok) {
            return yield* _(Effect.fail(
                new ApiError('영화 정보를 가져오는데 실패했습니다')
            ))
        }

        const data = yield* _(parseResponse(response))
        return data
    }) 