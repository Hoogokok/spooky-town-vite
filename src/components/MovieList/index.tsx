import { Link } from 'react-router-dom'
import './movieList.css'
import { Movie } from '../../types/movie'

interface MovieListProps {
    movies: Movie[]
    posterUrl: string
    isDev: boolean
}

function MovieList({ movies, posterUrl, isDev }: MovieListProps) {
    return (
        <div className="streamingMovieList">
            {movies.map((movie: Movie) => (
                <Link to={`/movie/${movie.id}/streaming`} key={movie.id} className="streamingMovieItem">
                    <div className="streamingMoviePosterContainer">
                        <img
                            src={isDev
                                ? posterUrl + movie.posterPath
                                : movie.posterPath
                            }
                            width={250}
                            height={300}
                            alt={movie.title}
                            className="streamingMoviePoster"
                            loading="lazy"
                        />
                    </div>
                    <div className="streamingMovieTitle">
                        {movie.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default MovieList 