import './movieSkeleton.css'

function MovieSkeleton() {
    return (
        <div className="imagesection">
            {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="image">
                    <div className="skeleton"></div>
                </div>
            ))}
        </div>
    )
}

export default MovieSkeleton 