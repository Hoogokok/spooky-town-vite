import { Article } from '../../types/article'

interface ArticleCardProps {
    article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
    return (
        <article className="articleCard">
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={`${article.title}의 대표 이미지`}
                    className="articleImage"
                    loading="lazy"
                />
            )}
            <div className="articleContent">
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="articleLink"
                    aria-label={`${article.title} - 새 창에서 열기`}
                >
                    <h2 className="articleTitle">{article.title}</h2>
                </a>
                {article.author && (
                    <p className="articleAuthor" aria-label="작성자">
                        BY {article.author.toUpperCase()}
                    </p>
                )}
                {article.excerpt && (
                    <p className="articleExcerpt" aria-label="기사 요약">
                        {article.excerpt}
                    </p>
                )}
            </div>
        </article>
    )
}

export default ArticleCard 