import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ArticleCard from './index'

describe('ArticleCard', () => {
    const mockArticle = {
        title: '테스트 기사',
        url: 'https://test.com',
        imageUrl: 'https://test.com/image.jpg',
        author: '테스트 작성자',
        excerpt: '테스트 요약'
    }

    it('renders article information correctly', () => {
        render(<ArticleCard article={mockArticle} />)

        // 제목 확인
        const title = screen.getByRole('heading', { name: mockArticle.title })
        expect(title).toBeInTheDocument()

        // 작성자 확인
        const author = screen.getByText(`BY ${mockArticle.author.toUpperCase()}`)
        expect(author).toBeInTheDocument()

        // 요약 확인
        const excerpt = screen.getByText(mockArticle.excerpt)
        expect(excerpt).toBeInTheDocument()

        // 이미지 확인
        const image = screen.getByAltText(`${mockArticle.title}의 대표 이미지`)
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', mockArticle.imageUrl)

        // 링크 확인
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', mockArticle.url)
    })

    it('handles missing optional fields', () => {
        const minimalArticle = {
            title: '최소 기사',
            url: 'https://test.com',
            imageUrl: 'https://test.com/image.jpg'
        }

        render(<ArticleCard article={minimalArticle} />)

        // 필수 필드 확인
        expect(screen.getByRole('heading', { name: minimalArticle.title })).toBeInTheDocument()

        // 선택적 필드 부재 확인
        expect(screen.queryByText(/BY/)).not.toBeInTheDocument()
        expect(screen.queryByLabelText('기사 요약')).not.toBeInTheDocument()
    })
}) 