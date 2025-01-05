import { useQuery } from '@tanstack/react-query'
import './style.css'
import { movieApi } from '../../api/enpoints/movie'
import { MovieListResponse } from '../../api/types/movieResponses'
import MovieList from './MovieList'

function Home() {
    const { data: upcoming = [] } = useQuery<MovieListResponse[]>({
        queryKey: ['movies', 'upcoming'],
        queryFn: movieApi.fetchUpcomingMovies,
        staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시 유지
    })

    const { data: nowPlaying = [] } = useQuery<MovieListResponse[]>({
        queryKey: ['movies', 'nowPlaying'],
        queryFn: movieApi.fetchNowPlayingMovies,
        staleTime: 24 * 60 * 60 * 1000, // 24시간 캐시 유지
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