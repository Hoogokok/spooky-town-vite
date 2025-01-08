import './magazine.css'
import { useQuery } from '@tanstack/react-query'
import { Effect } from 'effect'
import ArticleCard from '../../components/ArticleCard'
import Loading from '../../components/common/Loading'
import { fetchArticles, FetchError, NetworkError } from '../../api/enpoints/magazine'

function Magazine() {
    const { data: result, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: () => Effect.runPromise(fetchArticles)
    })

    if (isLoading || !result) return <Loading />

    if (result instanceof FetchError || result instanceof NetworkError) {
        return <div>{result.message}</div>
    }

    if (!result.length) {
        return <div>표시할 기사가 없습니다.</div>
    }

    return (
        <div className="magazineContainer">
            <h1 className="magazineTitle">Fangoria</h1>
            <div className="articlesGrid">
                {result.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </div>
        </div>
    )
}

export default Magazine 