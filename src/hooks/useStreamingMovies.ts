import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import { searchStreamingMovies } from '../api/endpoints/streaming'

export function useStreamingMovies(provider: string, page: string, search: string) {
    return useQuery({
        queryKey: ['movies', provider, page, search],
        queryFn: async () => {
            const result = await Effect.runPromise(
                searchStreamingMovies(provider, page, search)
            )
            return result
        }
    })
} 