import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg']

export const profileUpdateSchema = z.object({
    name: z
        .string()
        .min(2, "이름은 최소 2자 이상이어야 합니다")
        .max(20, "이름은 최대 20자까지 가능합니다")
})

export const profileImageSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, '이미지 크기는 5MB 이하여야 합니다.')
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'JPG 또는 JPEG 형식의 이미지만 업로드 가능합니다.'
        )
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type ProfileImageInput = z.infer<typeof profileImageSchema>

export type ProfileData = {
    name: string
    email: string
    imageUrl?: string
}