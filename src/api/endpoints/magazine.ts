import { Article } from '../../types/article'
import { Effect } from 'effect'
import { ApiError, NetworkError } from '../../types/error'

const magazineProxy = import.meta.env.VITE_MAGAZINE_PROXY

const fetchFromApi = Effect.tryPromise({
    try: () => fetch(`${magazineProxy}/fangoria-articles`),
    catch: () => new NetworkError('네트워크 오류가 발생했습니다')
})

const parseResponse = (response: Response) => Effect.tryPromise({
    try: () => response.json() as Promise<Article[]>,
    catch: () => new ApiError('응답을 파싱하는데 실패했습니다')
})

export const fetchArticles: Effect.Effect<Article[], ApiError | NetworkError, never> = Effect.gen(function* (_) {
    const response = yield* _(fetchFromApi)

    if (!response.ok) {
        return yield* _(Effect.fail(
            new ApiError('기사를 가져오는데 실패했습니다')
        ))
    }

    const articles = yield* _(parseResponse(response))
    return articles
}) 