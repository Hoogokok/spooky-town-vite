import './magazine.css'
import { Article } from '../../types/article'
import ArticleCard from '../../components/ArticleCard'

function Magazine() {
    // 임시 데이터
    const articles: Article[] = []

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