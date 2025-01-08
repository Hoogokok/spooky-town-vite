import { Link } from 'react-router-dom'
import './movieList.css'
import { Movie } from '../../types/movie'

interface MovieListProps {
    movies: Movie[]
}

function MovieList({ movies }: MovieListProps) {
    // 8개씩 영화를 그룹화하는 함수로 변경
    const movieRows = movies.reduce((acc: Movie[][], curr, i) => {
        if (i % 8 === 0) acc.push([]);
        acc[acc.length - 1].push(curr);
        return acc;
    }, []);

    return (
        <div className="streamingMovieList">
            {movieRows.map((row, rowIndex) => (
                <div key={rowIndex} className="movieRow">
                    {row.map((movie) => (
                        <Link to={`/movie/${movie.id}/streaming`} key={movie.id} className="streamingMovieItem">
                            <div className="streamingMoviePosterContainer">
                                <img
                                    src={movie.posterPath}
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
            ))}
        </div>
    );
}

export default MovieList 