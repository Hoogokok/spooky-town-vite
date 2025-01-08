import { Link } from 'react-router-dom'
import './movieList.css'
import { Movie } from '../../types/movie'

interface MovieListProps {
    movies: Movie[]
}

function MovieList({ movies }: MovieListProps) {
    return (
        <div className="streamingMovieList">
            {movies.map((movie: Movie) => (
                <Link to={`/movie/${movie.id}/streaming`} key={movie.id} className="streamingMovieItem">
                    <div className="streamingMoviePosterContainer">
                        <img
                            src={import.meta.env.DEV
                                ? movie.posterPath
                                : import.meta.env.VITE_POSTER_URL + movie.posterPath
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