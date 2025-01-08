import { Video } from '../api/endpoints/game'

export const mockVideos: Video[] = [
    {
        id: { videoId: '1' },
        snippet: {
            title: '무서운 게임 1편',
            description: '이것은 무서운 게임의 첫 번째 에피소드입니다...',
            thumbnails: {
                medium: {
                    url: 'https://picsum.photos/320/180'
                }
            },
            publishedAt: '2024-01-01T00:00:00Z'
        }
    },
    {
        id: { videoId: '2' },
        snippet: {
            title: '무서운 게임 2편',
            description: '더욱 무서워진 두 번째 에피소드...',
            thumbnails: {
                medium: {
                    url: 'https://picsum.photos/320/180'
                }
            },
            publishedAt: '2024-01-02T00:00:00Z'
        }
    },
    {
        id: { videoId: '3' },
        snippet: {
            title: '무서운 게임 3편',
            description: '더욱 무서워진 세 번째 에피소드...',
            thumbnails: {
                medium: { url: 'https://picsum.photos/320/180' }
            },
            publishedAt: '2024-01-03T00:00:00Z'
        }
    },
    {
        id: { videoId: '4' },
        snippet: {
            title: '무서운 게임 4편',
            description: '더욱 무서워진 네 번째 에피소드...',
            thumbnails: { medium: { url: 'https://picsum.photos/320/180' } },
            publishedAt: '2024-01-04T00:00:00Z'
        }
    },

    {
        id: { videoId: '5' },
        snippet: {
            title: '무서운 게임 5편',
            description: '더욱 무서워진 다섯 번째 에피소드...',
            thumbnails: { medium: { url: 'https://picsum.photos/320/180' } },
            publishedAt: '2024-01-05T00:00:00Z'
        }
    }
] 