import { Movie } from '../types/movie'

const generateMockMovies = (page: number, itemsPerPage: number = 12): Movie[] => {
    const startIndex = (page - 1) * itemsPerPage
    return Array.from({ length: itemsPerPage }, (_, index) => ({
        id: startIndex + index + 1,
        title: `테스트 영화 ${startIndex + index + 1}`,
        posterPath: `https://picsum.photos/300/450?random=${startIndex + index + 1}`
    }))
}

export const getMockStreamingMovies = (
    provider: string,
    page: string,
    search: string
) => {
    const currentPage = parseInt(page)
    const totalPages = 10 // 총 120개의 영화 (12 * 10)

    let movies = generateMockMovies(currentPage)

    if (search) {
        movies = movies.filter(movie =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        )
    }

    if (provider !== 'all') {
        // provider별로 다른 영화를 보여주기 위해 id를 변경
        movies = movies.map(movie => ({
            ...movie,
            id: movie.id * (provider === 'netflix' ? 2 :
                provider === 'disney' ? 3 :
                    provider === 'wavve' ? 4 :
                        provider === 'naver' ? 5 : 6)
        }))
    }

    return {
        movies,
        totalPages
    }
}
