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
                        <div className="moviePosterContainer">
                            <img
                                alt={movie.title}
                                src={movie.posterPath}
                                className="moviePoster"
                                loading={type === "upcoming" ? "eager" : "lazy"}
                            />
                        </div>
                        <span className="movieTitle">
                            {movie.title}
                        </span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
