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