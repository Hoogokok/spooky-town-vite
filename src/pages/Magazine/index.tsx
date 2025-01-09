import './magazine.css'
import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import ArticleCard from '../../components/ArticleCard'
import Loading from '../../components/common/Loading'
import ErrorComponent from '../../components/common/ErrorComponent'
import { fetchArticles } from '../../api/endpoints/magazine'
import { ApiError, NetworkError } from '../../types/error'

function Magazine() {
    const { data: result, isLoading, refetch } = useQuery({
        queryKey: ['articles'],
        queryFn: () => Effect.runPromise(fetchArticles),
        staleTime: 1000 * 60 * 60 * 12 // 12 hours
    })

    if (isLoading) return <Loading />

    if (result instanceof ApiError || result instanceof NetworkError) {
        return (
            <ErrorComponent
                code={result._tag}
                message={result.message}
                retry={() => refetch()}
            />
        )
    }

    if (!result?.length) {
        return <div>표시할 기사가 없습니다.</div>
    }

    return (
        <div className="magazineContainer" role="main">
            <h1 className="magazineTitle" id="magazine-title">Fangoria</h1>
            <div
                className="articlesGrid"
                role="feed"
                aria-labelledby="magazine-title"
            >
                {result.map((article) => (
                    <ArticleCard
                        key={article.url}
                        article={article}
                    />
                ))}
            </div>
        </div>
    )
}

export default Magazine 