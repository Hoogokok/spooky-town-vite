import { Link } from 'react-router-dom'
import './style.css'
import { TheaterMovie } from '../../types/api/movie';

interface MovieListProps {
    movies: TheaterMovie[]
    type: 'released' | 'upcoming'
}

export default function MovieList({ movies, type }: MovieListProps) {
    return (
        <div className="movieContent">
            {movies.map((movie: TheaterMovie) => (
                <div key={movie.id} className="movieItem">
                    <Link to={`/movie/${movie.id}/${type}`} className="movieLink">
                        <img
                            alt={movie.title}
                            src={import.meta.env.VITE_POSTER_URL + movie.posterPath}
                            className="movieImage"
                            loading={type === "upcoming" ? "eager" : "lazy"}
                        />
                        <span className="movieTitle">
                            {movie.title}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
