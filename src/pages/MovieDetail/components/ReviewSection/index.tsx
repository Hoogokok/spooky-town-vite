import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import { reviewApi } from '../../../../api/endpoints/review'
import Loading from '../../../../components/common/Loading'
import ErrorComponent from '../../../../components/common/ErrorComponent'
import './reviewSection.css'
import ReviewForm from '../ReviewForm'

interface ReviewSectionProps {
    movieId: string
}

export default function ReviewSection({ movieId }: ReviewSectionProps) {
    const { data: reviewsData, isLoading, error } = useQuery({
        queryKey: ['reviews', movieId],
        queryFn: () => Effect.runPromise(reviewApi.fetchReviews(movieId))
    })

    console.log(reviewsData)

    if (isLoading) return <Loading />
    if (error) return <ErrorComponent code="FetchError" message="리뷰를 불러오는데 실패했습니다" />

    return (
        <section className="reviewSection">
            <h2 className="reviewTitle">리뷰</h2>
            <ReviewForm movieId={movieId} />
            { reviewsData && reviewsData.reviews.length > 0 ? (
                <div className="reviewList">
                    {reviewsData.reviews.map((review) => (
                        <div key={review.id} className="reviewItem">
                            <div className="reviewHeader">
                                <span className="reviewAuthor">{review.userName}</span>
                                <span className="reviewRating">★ {review.rating}</span>
                                <span className="reviewDate">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="reviewContent">{review.content}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="noReviews">아직 작성된 리뷰가 없습니다.</p>
            )}
        </section>
    )
} 