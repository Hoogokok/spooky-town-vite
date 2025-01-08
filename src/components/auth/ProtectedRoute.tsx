import { Navigate, useLocation } from 'react-router-dom'
import { getSession } from '../../api/auth'
import { useQuery } from '@tanstack/react-query'
import Loading from '../common/Loading'

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation()
    const { data: session, isLoading } = useQuery({
        queryKey: ['session'],
        queryFn: getSession
    })

    if (isLoading) {
        return <Loading />
    }

    if (!session?.data.session) {
        return <Navigate
            to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
            replace
        />
    }

    return <>{children}</>
}