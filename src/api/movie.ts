interface MovieSearchResponse {
    movies: Array<{
        id: number;
        title: string;
        posterPath: string;
    }>;
    totalPages: number;
}

export async function searchMovies(
    provider: string,
    page: string,
    search: string
): Promise<MovieSearchResponse> {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/movies/streaming?` +
        new URLSearchParams({
            provider,
            page,
            search
        })
    )

    if (!response.ok) {
        throw new Error('Failed to fetch movies')
    }

    return response.json()
} 