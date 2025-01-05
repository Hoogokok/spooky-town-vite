import { useQuery } from '@tanstack/react-query'
import './main.css'
import { movieApi } from './api/movie'
import { MovieResponse } from './types/movie'
import MovieList from './MovieList'

function Home() {
    const { data: upcoming = [] } = useQuery<MovieResponse[]>({
        queryKey: ['movies', 'upcoming'],
        queryFn: movieApi.fetchUpcomingMovies,
        staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    })

    const { data: nowPlaying = [] } = useQuery<MovieResponse[]>({
        queryKey: ['movies', 'nowPlaying'],
        queryFn: movieApi.fetchNowPlayingMovies
    })

    return (
        <main className="main">
            <section className="imagesection">
                <div className="imagesectionTitle">개봉 예정 공포 영화</div>
                {upcoming.length ? (
                    <MovieList movies={upcoming} type="upcoming" />
                ) : (
                    <div className="content">개봉 예정인 영화가 없어요!</div>
                )}

                <div className="imagesectionTitle">상영중 공포 영화</div>
                {nowPlaying.length ? (
                    <MovieList movies={nowPlaying} type="released" />
                ) : (
                    <div className="content">상영중인 영화가 없어요!</div>
                )}
            </section>
        </main>
    )
}

export default Home