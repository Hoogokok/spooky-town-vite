import { Effect } from 'effect'
import { z } from 'zod'
import { ApiError } from '../../types/error'

const VideoSchema = z.object({
    id: z.object({
        videoId: z.string()
    }),
    snippet: z.object({
        title: z.string(),
        description: z.string(),
        thumbnails: z.object({
            medium: z.object({
                url: z.string()
            })
        }),
        publishedAt: z.string()
    })
})

const VideoResponseSchema = z.array(VideoSchema)

export type Video = z.infer<typeof VideoSchema>

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const BASE_URL = 'https://www.googleapis.com/youtube/v3'

export const fetchLatestVideos = (channelId: string) =>
    Effect.gen(function* (_) {
        const response = yield* _(Effect.tryPromise(() =>
            fetch(`${BASE_URL}/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${YOUTUBE_API_KEY}`)
        ))

        if (!response.ok) {
            return yield* _(Effect.fail(new ApiError('Failed to fetch videos')))
        }

        const data = yield* _(Effect.tryPromise(() => response.json()))
        const parsed = VideoResponseSchema.safeParse(data.items)

        if (!parsed.success) {
            return yield* _(Effect.fail(new ApiError('Invalid response format')))
        }

        return parsed.data
    })