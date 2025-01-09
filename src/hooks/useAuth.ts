import { useEffect, useState } from 'react'
import { getSession, onAuthStateChange } from '../api/auth'
import { User } from '@supabase/supabase-js'

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session)
            setUser(session?.user ?? null)
            setIsLoading(false)
        })

        const { data: { subscription } } = onAuthStateChange((session) => {
            setIsAuthenticated(!!session)
            setUser(session?.user ?? null)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        isAuthenticated,
        isLoading,
        user
    }
} 