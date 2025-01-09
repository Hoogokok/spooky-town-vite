import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../api/endpoints/profile'

export function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: 5 * 60 * 1000, // 5분
    })
} 