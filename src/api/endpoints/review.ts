import { Effect } from 'effect'
import { Review, ReviewInput, ReviewsResponse, ReviewError } from '../../types/api/review'
import { FetchError, NetworkError } from './movie'

const BASE_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY
const fetchFromApi = (endpoint: string, options?: RequestInit) => Effect.tryPromise({
    try: () => {
        const token = localStorage.getItem('token')
        return fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                ...options?.headers,
                'X-API-Key': API_KEY,
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            }
        })
    },
    catch: () => new NetworkError('네트워크 오류가 발생했습니다')
})

const parseResponse = <T>(response: Response) => Effect.tryPromise({
    try: () => response.json() as Promise<T>,
    catch: () => new FetchError('응답을 파싱하는데 실패했습니다')
})

// 리뷰 목록 조회
const fetchReviews = (movieId: string, page = 1): Effect.Effect<ReviewsResponse, FetchError | NetworkError, never> =>
    Effect.gen(function* (_) {
        const response = yield* _(fetchFromApi(`/reviews/movie/${(movieId)}?page=${page}`))

        if (!response.ok) {
            return yield* _(Effect.fail(new FetchError('리뷰를 불러오는데 실패했습니다')))
        }

        return yield* _(parseResponse<ReviewsResponse>(response))
    })

// 리뷰 작성
const createReview = (movieId: string, input: ReviewInput) =>
    Effect.gen(function* (_) {
        const token = localStorage.getItem('token')
        if (!token) {
            return yield* _(Effect.fail<ReviewError>({
                code: 'Unauthorized',
                message: '로그인이 필요합니다'
            }))
        }

        const response = yield* _(fetchFromApi(`/reviews/movie/${movieId}`, {
            method: 'POST',
            body: JSON.stringify(input)
        }))

        if (!response.ok) {
            const errorData = yield* _(parseResponse<ReviewError>(response))
            return yield* _(Effect.fail(errorData))
        }

        return yield* _(parseResponse<Review>(response))
    })

// 리뷰 수정
const updateReview = (reviewId: string, input: ReviewInput) =>
    Effect.gen(function* (_) {
        const token = localStorage.getItem('token')
        if (!token) {
            return yield* _(Effect.fail<ReviewError>({
                code: 'Unauthorized',
                message: '로그인이 필요합니다'
            }))
        }

        const response = yield* _(fetchFromApi(`/reviews/movie/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify(input)
        }))

        if (!response.ok) {
            const error = yield* _(parseResponse<ReviewError>(response))
            return yield* _(Effect.fail(error))
        }

        return yield* _(parseResponse<Review>(response))
    })

// 리뷰 삭제
const deleteReview = (reviewId: string) =>
    Effect.gen(function* (_) {
        const token = localStorage.getItem('token')
        if (!token) {
            return yield* _(Effect.fail<ReviewError>({
                code: 'Unauthorized',
                message: '로그인이 필요합니다'
            }))
        }

        const response = yield* _(fetchFromApi(`/reviews/movie/${reviewId}`, {
            method: 'DELETE'
        }))

        if (!response.ok) {
            const error = yield* _(parseResponse<ReviewError>(response))
            return yield* _(Effect.fail(error))
        }
    })

export const reviewApi = {
    fetchReviews,
    createReview,
    updateReview,
    deleteReview
} 