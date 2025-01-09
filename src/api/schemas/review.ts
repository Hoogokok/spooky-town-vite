import { z } from 'zod'

export const reviewInputSchema = z.object({
    rating: z.number()
        .min(1, '별점을 선택해주세요')
        .max(5, '별점은 5점까지 가능합니다'),
    content: z.string()
        .min(10, '리뷰는 최소 10자 이상 작성해주세요')
        .max(500, '리뷰는 최대 500자까지 작성 가능합니다')
})

export type ReviewInputSchema = z.infer<typeof reviewInputSchema> 