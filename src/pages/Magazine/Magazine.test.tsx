import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Magazine from './index'
import { Effect } from 'effect'
import { useQuery } from '@tanstack/react-query'

const mockFetchArticles = vi.fn()
vi.mock('../../api/enpoints/magazine', () => ({
    fetchArticles: () => mockFetchArticles()
}))

describe('Magazine', () => {
    let queryClient: QueryClient

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    gcTime: 0,
                    staleTime: 0,
                    refetchOnMount: false
                }
            }
        })
        vi.clearAllMocks()
    })

    const mockArticles = [
        {
            title: '테스트 기사 1',
            url: 'https://test.com/1',
            imageUrl: 'https://test.com/image1.jpg',
            author: '작성자 1',
            excerpt: '요약 1'
        },
        {
            title: '테스트 기사 2',
            url: 'https://test.com/2',
            imageUrl: 'https://test.com/image2.jpg',
            author: '작성자 2',
            excerpt: '요약 2'
        }
    ]

    const renderWithQuery = (ui: React.ReactElement) => {
        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )

        return {
            ...render(ui, { wrapper: Wrapper }),
            result: renderHook(() => useQuery({
                queryKey: ['articles'],
                queryFn: () => mockFetchArticles()
            }), { wrapper: Wrapper }).result
        }
    }

    it('초기 로딩 상태를 표시한다', () => {
        mockFetchArticles.mockReturnValue(Effect.succeed(mockArticles))
        renderWithQuery(<Magazine />)
        expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('기사가 없을 때 적절한 메시지를 표시한다', async () => {
        mockFetchArticles.mockReturnValue(Effect.succeed([]))

        renderWithQuery(<Magazine />)

        await waitFor(() => {
            expect(screen.getByText('표시할 기사가 없습니다.')).toBeInTheDocument()
        })
    })
}) 