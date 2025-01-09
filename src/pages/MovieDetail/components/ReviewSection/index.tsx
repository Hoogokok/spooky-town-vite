import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Effect } from 'effect'
import { reviewApi } from '../../../../api/endpoints/review'
import Loading from '../../../../components/common/Loading'
import ErrorComponent from '../../../../components/common/ErrorComponent'
import ReviewForm from '../ReviewForm'
import './reviewSection.css'
import { useAuth } from '../../../../hooks/useAuth'

interface ReviewSectionProps {
    movieId: string
}

export default function ReviewSection({ movieId }: ReviewSectionProps) {
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
    const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null)
    const queryClient = useQueryClient()
    const { data: reviewsData, isLoading, error } = useQuery({
        queryKey: ['reviews', movieId],
        queryFn: () => Effect.runPromise(reviewApi.fetchReviews(movieId))
    })

    const { user } = useAuth()

    const hasUserReviewed = reviewsData?.reviews.some(
        review => review.userId === user?.id
    )

    const { mutate: deleteReview } = useMutation({
        mutationFn: (reviewId: string) => Effect.runPromise(reviewApi.deleteReview(reviewId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', movieId] })
            setDeletingReviewId(null)
        }
    })

    const handleDeleteClick = (reviewId: string) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            deleteReview(reviewId)
        }
    }

    if (isLoading) return <Loading />
    if (error) return <ErrorComponent code="FetchError" message="리뷰를 불러오는데 실패했습니다" />

    return (
        <section className="reviewSection">
            <h2 className="reviewTitle">리뷰</h2>
            {!editingReviewId && !hasUserReviewed && <ReviewForm movieId={movieId} />}
            {hasUserReviewed && !editingReviewId && (
                <p className="reviewMessage">이미 리뷰를 작성하셨습니다.</p>
            )}
            {reviewsData && reviewsData.reviews.length > 0 ? (
                <div className="reviewList">
                    {reviewsData.reviews.map((review) => (
                        <div key={review.id} className="reviewItem">
                            {editingReviewId === review.id ? (
                                <ReviewForm
                                    movieId={movieId}
                                    initialReview={review}
                                    onCancel={() => setEditingReviewId(null)}
                                />
                            ) : (
                                <>
                                        <div className="reviewHeader">
                                            <span className="reviewAuthor">{review.userName}</span>
                                            <span className="reviewRating">★ {review.rating}</span>
                                            <span className="reviewDate">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                            {review.userId === user?.id && (
                                                <div className="reviewActions">
                                                    <button
                                                        className="editButton"
                                                        onClick={() => setEditingReviewId(review.id)}
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        className="deleteButton"
                                                        onClick={() => handleDeleteClick(review.id)}
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="reviewContent">{review.content}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="noReviews">아직 작성된 리뷰가 없습니다.</p>
            )}
        </section>
    )
} 