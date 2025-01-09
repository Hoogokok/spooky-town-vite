import { Effect } from 'effect'
import { ApiError, NetworkError } from '../../types/error'
import { getSession } from '../auth'
import { profileImageSchema, profileUpdateSchema, type ProfileUpdateInput } from '../schemas/profile'
import { passwordChangeSchema, type PasswordChangeInput } from '../schemas/auth'
import { hashPassword } from '../../utils/crypto'

interface Profile {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
}

export class ProfileError {
    readonly _tag = 'ProfileError'
    constructor(readonly message: string) { }
}

const fetchFromApi = Effect.tryPromise({
    try: async () => {
        const session = await getSession()
        const token = session?.data.session?.access_token

        if (!token) {
            throw new ProfileError('인증이 필요합니다')
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-API-Key': import.meta.env.VITE_API_KEY
            }
        })
        if (!response.ok) {
            throw new ProfileError('프로필을 가져오는데 실패했습니다')
        }
        return response
    },
    catch: () => new NetworkError('네트워크 오류가 발생했습니다')
})

const parseResponse = (response: Response) => Effect.tryPromise({
    try: () => response.json() as Promise<Profile>,
    catch: () => new ApiError('응답을 파싱하는데 실패했습니다')
})

export const getProfile = Effect.gen(function* (_) {
    const response = yield* _(fetchFromApi)
    const profile = yield* _(parseResponse(response))
    return profile
})

export const updateProfile = (data: ProfileUpdateInput) => Effect.gen(function* (_) {
    const validation = profileUpdateSchema.safeParse(data)

    if (!validation.success) {
        throw new ProfileError(validation.error.errors[0].message)
    }

    const session = yield* _(Effect.tryPromise(() => getSession()))
    const token = session?.data.session?.access_token

    if (!token) {
        throw new ProfileError('인증이 필요합니다')
    }

    const response = yield* _(Effect.tryPromise(() =>
        fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-API-Key': import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify(validation.data)
        })
    ))

    if (!response.ok) {
        throw new ProfileError('프로필 업데이트에 실패했습니다')
    }

    return response.json()
})

export const uploadProfileImage = (file: File) => Effect.gen(function* (_) {
    const session = yield* _(Effect.tryPromise(() => getSession()))
    const token = session?.data.session?.access_token

    if (!token) {
        throw new ProfileError('인증이 필요합니다')
    }

    const validation = profileImageSchema.safeParse({ image: file })

    if (!validation.success) {
        throw new ProfileError(validation.error.errors[0].message)
    }

    const formData = new FormData()
    formData.append('image', file)

    const response = yield* _(Effect.tryPromise(() =>
        fetch(`${import.meta.env.VITE_API_URL}/users/profile/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-API-Key': import.meta.env.VITE_API_KEY
            },
            body: formData
        })
    ))

    if (!response.ok) {
        throw new ProfileError('이미지 업로드에 실패했습니다')
    }

    return response.json()
}) 