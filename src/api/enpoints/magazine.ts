import { Article } from '../../types/article'
import { Effect } from 'effect'

// 커스텀 에러 타입 정의
export class FetchError {
    readonly _tag = 'FetchError'
    constructor(readonly message: string) { }
}

export class NetworkError {
    readonly _tag = 'NetworkError'
    constructor(readonly message: string) { }
}

const fetchFromApi = Effect.tryPromise({
    try: () => fetch(`${import.meta.env.VITE_MAGAZINE_PROXY}/api/fangoria-articles`),
    catch: () => new NetworkError('네트워크 오류가 발생했습니다')
})

const parseResponse = (response: Response) => Effect.tryPromise({
    try: () => response.json() as Promise<Article[]>,
    catch: () => new FetchError('응답을 파싱하는데 실패했습니다')
})

export const fetchArticles: Effect.Effect<Article[], FetchError | NetworkError, never> = Effect.gen(function* (_) {
    const response = yield* _(fetchFromApi)

    if (!response.ok) {
        return yield* _(Effect.fail<FetchError | NetworkError>(
            new FetchError('기사를 가져오는데 실패했습니다')
        ))
    }

    const articles = yield* _(parseResponse(response))
    return articles
}) 