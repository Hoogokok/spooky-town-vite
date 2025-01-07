import './magazine.css'
import { useQuery } from '@tanstack/react-query'
import { Article } from '../../types/article'
import ArticleCard from '../../components/ArticleCard'
import Loading from '../../components/common/Loading'
import { fetchArticles } from '../../api/magazine'

function Magazine() {
    const { data: articles, isLoading, error } = useQuery<Article[]>({
        queryKey: ['articles'],
        queryFn: fetchArticles
    })

    if (isLoading) return <Loading />
    
    if (error) return <div>기사를 불러오는데 실패했습니다.</div>
    
    if (!articles?.length) return <div>표시할 기사가 없습니다.</div>

    return (
        <div className="magazineContainer">
            <h1 className="magazineTitle">Fangoria</h1>
            <div className="articlesGrid">
                {articles.map((article, index) => (
                    <ArticleCard key={index} article={article} />
                ))}
            </div>
        </div>
    )
}

export default Magazine 