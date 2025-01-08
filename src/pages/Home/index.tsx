import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import './style.css'
import { movieApi, FetchError, NetworkError } from '../../api/enpoints/movie'
import MovieList from './MovieList'
import Loading from '../../components/common/Loading'

function Home() {
    const { data: upcomingResult, isLoading: upcomingLoading } = useQuery({
        queryKey: ['movies', 'upcoming'],
        queryFn: () => Effect.runPromise(movieApi.fetchUpcomingMovies()),
        staleTime: 24 * 60 * 60 * 1000,
    })

    const { data: nowPlayingResult, isLoading: nowPlayingLoading } = useQuery({
        queryKey: ['movies', 'nowPlaying'],
        queryFn: () => Effect.runPromise(movieApi.fetchNowPlayingMovies()),
        staleTime: 24 * 60 * 60 * 1000,
    })

    if (upcomingLoading || nowPlayingLoading) return <Loading />

    const upcomingError = upcomingResult instanceof FetchError || upcomingResult instanceof NetworkError
    const nowPlayingError = nowPlayingResult instanceof FetchError || nowPlayingResult instanceof NetworkError

    if (upcomingError && nowPlayingError) {
        return <div>영화 정보를 불러오는데 실패했습니다.</div>
    }

    const upcoming = upcomingError ? [] : upcomingResult || []
    const nowPlaying = nowPlayingError ? [] : nowPlayingResult || []

    return (
        <main className="main">
            <section className="imagesection">
                <div className="imagesectionTitle">개봉 예정 공포 영화</div>
                {upcoming.length ? (
                    <MovieList movies={upcoming} type="upcoming" />
                ) : (
                        <div className="movieContent">
                            {upcomingError ? "영화 정보를 불러오는데 실패했습니다" : "개봉 예정인 영화가 없어요!"}
                        </div>
                )}

                <div className="imagesectionTitle">상영중 공포 영화</div>
                {nowPlaying.length ? (
                    <MovieList movies={nowPlaying} type="released" />
                ) : (
                        <div className="movieContent">
                            {nowPlayingError ? "영화 정보를 불러오는데 실패했습니다" : "상영중인 영화가 없어요!"}
                        </div>
                )}
            </section>
        </main>
    )
}

export default Home