import { Article } from '../types/article'

export async function fetchArticles(): Promise<Article[]> {
    try {
        const response = await fetch(`${import.meta.env.VITE_MAGAZINE_PROXY}/api/fangoria-articles`)
        
        if (!response.ok) {
            throw new Error('기사를 가져오는데 실패했습니다')
        }
        
        return response.json()
    } catch (error) {
        console.error('기사를 가져오는 중 오류 발생:', error)
        throw error
    }
} 