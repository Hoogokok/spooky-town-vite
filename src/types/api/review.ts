// 리뷰 기본 타입
export interface Review {
    id: string
    movieId: string
    userId: string
    userName: string
    rating: number
    content: string
    createdAt: string
    updatedAt?: string
}

// 리뷰 작성/수정 시 사용할 입력 타입
export interface ReviewInput {
    rating: number
    content: string
}

// 리뷰 목록 응답 타입 (페이지네이션)
export interface ReviewsResponse {
    reviews: Review[]
    totalCount: number
    currentPage: number
    totalPages: number
}

// 리뷰 API 에러 타입
export interface ReviewError {
    code: 'InvalidRating' | 'ContentTooLong' | 'NotFound' | 'Unauthorized' | 'AlreadyExists'
    message: string
} 