import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/auth'

export function useLogout() {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            navigate('/')
        }
    })
} 