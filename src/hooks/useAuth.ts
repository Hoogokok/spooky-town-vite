import { useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from '../api/auth'

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session)
            setIsLoading(false)
        })

        const { data: { subscription } } = onAuthStateChange((session) => {
            setIsAuthenticated(!!session)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        isAuthenticated,
        isLoading
    }
} 