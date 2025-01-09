import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Effect } from 'effect'
import { reviewApi } from '../../../../api/endpoints/review'
import { Review, ReviewInput } from '../../../../types/api/review'
import { reviewInputSchema } from '../../../../api/schemas/review'
import './reviewForm.css'

interface ReviewFormProps {
    movieId: string
    initialReview?: Review
    onCancel?: () => void
}

export default function ReviewForm({ movieId, initialReview, onCancel }: ReviewFormProps) {
    const [rating, setRating] = useState(initialReview?.rating ?? 0)
    const [content, setContent] = useState(initialReview?.content ?? '')
    const [validationError, setValidationError] = useState<string>('')
    const queryClient = useQueryClient()

    const { mutate: submitReview, error } = useMutation({
        mutationFn: (input: ReviewInput) => Effect.runPromise(
            initialReview
                ? reviewApi.updateReview(initialReview.id, input)
                : reviewApi.createReview(movieId, input)
        ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['reviews', movieId] })
            setRating(0)
            setContent('')
            setValidationError('')
            onCancel?.()
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setValidationError('')

        const result = reviewInputSchema.safeParse({ rating, content })
        if (!result.success) {
            setValidationError(result.error.errors[0].message)
            return
        }

        submitReview(result.data)
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
                placeholder="리뷰를 작성해주세요 (최소 10자, 최대 500자)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            {validationError && <p className="errorMessage">{validationError}</p>}
            {error && <p className="errorMessage">리뷰 작성에 실패했습니다</p>}
            <div className="formFooter">
                <span className="charCount">{content.length}/500</span>
                <div className="buttonGroup">
                    {onCancel && (
                        <button type="button" className="cancelButton" onClick={onCancel}>
                            취소
                        </button>
                    )}
                    <button type="submit" className="submitButton" disabled={rating === 0}>
                        {initialReview ? '수정하기' : '리뷰 작성'}
                    </button>
                </div>
            </div>
        </form>
    )
} 