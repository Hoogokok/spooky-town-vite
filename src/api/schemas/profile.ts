import { z } from 'zod'

export const profileUpdateSchema = z.object({
    name: z
        .string()
        .min(2, "이름은 최소 2자 이상이어야 합니다")
        .max(20, "이름은 최대 20자까지 가능합니다")
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema> 

export type ProfileData = {
    name: string
    email: string
    imageUrl?: string
}