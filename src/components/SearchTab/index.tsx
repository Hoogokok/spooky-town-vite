import { useMediaQuery } from '../../hooks/useMediaQuery'
import './searchTab.css'

interface SearchTabProps {
    onProviderChange: (provider: string) => void
    onSearch: (query: string) => void
    provider: string
    search: string
}

export default function SearchTab({ onProviderChange, onSearch, provider, search }: SearchTabProps) {
    const isMobile = useMediaQuery('(max-width: 768px)')

    if (isMobile) {
        return (
            <div className="searchTabWrapper">
                <select
                    onChange={(e) => onProviderChange(e.target.value)}
                    className="mobileSelect"
                    value={provider}
                >
                    <option value="all">전체</option>
                    <option value="netflix">넷플릭스</option>
                    <option value="disney">디즈니+</option>
                    <option value="wavve">웨이브</option>
                    <option value="naver">네이버</option>
                    <option value="googleplay">구글 플레이</option>
                </select>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="영화 검색"
                    className="searchInput"
                />
            </div>
        )
    }

    return (
        <div className="searchTabWrapper">
            <button onClick={() => onProviderChange('all')} className="searchButton">모든 서비스</button>
            <button onClick={() => onProviderChange('netflix')} className="searchButton">넷플릭스</button>
            <button onClick={() => onProviderChange('disney')} className="searchButton">디즈니+</button>
            <button onClick={() => onProviderChange('wavve')} className="searchButton">웨이브</button>
            <button onClick={() => onProviderChange('naver')} className="searchButton">네이버</button>
            <button onClick={() => onProviderChange('googleplay')} className="searchButton">구글 플레이</button>
            <input
                type="text"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )
} 