import { Link } from 'react-router-dom'
import './movieList.css'
import { Movie } from '../../types/movie'

interface MovieListProps {
    movies: Movie[]
}

function MovieList({ movies }: MovieListProps) {
    return (
        <div className="movieList">
            {movies.map((movie: Movie) => (
                <Link to={`/movie/${movie.id}/streaming`} key={movie.id} className="movieItem">
                    <div className="moviePosterContainer">
                        <img
                            src={import.meta.env.VITE_POSTER_URL + movie.posterPath}
                            alt={movie.title}
                            className="moviePoster"
                            loading="lazy"
                        />
                    </div>
                    <div className="movieTitle">
                        {movie.title}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default MovieList 