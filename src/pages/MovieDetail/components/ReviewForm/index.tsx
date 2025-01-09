import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Effect } from 'effect'
import { reviewApi } from '../../../../api/endpoints/review'
import { ReviewInput } from '../../../../types/api/review'
import './reviewForm.css'

interface ReviewFormProps {
    movieId: string
}

export default function ReviewForm({ movieId }: ReviewFormProps) {
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()

    const { mutate: submitReview, error } = useMutation({
        mutationFn: (input: ReviewInput) => Effect.runPromise(reviewApi.createReview(movieId, input)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', movieId] })
            setRating(0)
            setContent('')
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (rating === 0) return
        submitReview({ rating, content })
    }

    return (
        <form className="reviewForm" onSubmit={handleSubmit}>
            <div className="ratingContainer">
                <span className="ratingLabel">별점</span>
                <div className="starRating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className={`star ${star <= rating ? 'active' : ''}`}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>
            <textarea
                className="reviewContent"
                placeholder="리뷰를 작성해주세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {error && <p className="errorMessage">리뷰 작성에 실패했습니다</p>}
            <button type="submit" className="submitButton" disabled={rating === 0}>
                리뷰 작성
            </button>
        </form>
    )
} 