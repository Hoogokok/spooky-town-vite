import { Article } from '../../types/article'

interface ArticleCardProps {
    article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
    return (
        <div className="articleCard">
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="articleImage"
                />
            )}
            <div className="articleContent">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <h2 className="articleTitle">{article.title}</h2>
                </a>
                {article.author && (
                    <p className="articleAuthor">BY {article.author.toUpperCase()}</p>
                )}
                {article.excerpt && (
                    <p className="articleExcerpt">{article.excerpt}</p>
                )}
            </div>
        </div>
    )
}

export default ArticleCard 