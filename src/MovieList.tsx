import { MovieResponse } from './types/movie'
import { Link } from 'react-router-dom'
import './main.css'

interface MovieListProps {
    movies: MovieResponse[]
    type: 'released' | 'upcoming'
}

export default function MovieList({ movies, type }: MovieListProps) {
    return (
        <div className="content">
            {movies.map((movie: MovieResponse) => (
                <div key={movie.id} className="movieItem">
                    <img
                        alt={movie.title}
                        src={import.meta.env.VITE_POSTER_URL + movie.posterPath}
                        width={250}
                        height={300}
                        className="movieImage"
                        loading={type === "upcoming" ? "eager" : "lazy"}
                    />
                    <Link to={`/movie/${movie.id}/${type}`} className="movieTitle">
                        {movie.title}
                    </Link>
                </div>
            ))}
        </div>
    );
}
