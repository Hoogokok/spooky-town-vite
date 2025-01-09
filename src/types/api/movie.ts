export interface StreamingMovie {
    id: number
    title: string
    posterPath: string
}

export interface TheaterMovie {
    id: number
    title: string
    posterPath: string
    releaseDate: string
}

// 스트리밍 검색 응답 타입
export interface MovieSearchResponse {
    movies: StreamingMovie[]
    totalPages: number
}

// 기본 영화 상세 정보 타입
export interface MovieDetail {
    id: number
    title: string
    posterPath: string
    overview: string
    watchProviders?: string[]
}

export interface StreamingMovieDetail extends MovieDetail {
    expirationDate?: string
}

// 극장 영화 상세 정보 타입
export interface TheaterMovieDetail extends MovieDetail {
    releaseDate: string
    status: 'upcoming' | 'released'
} 