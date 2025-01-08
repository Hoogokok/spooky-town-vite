interface DesktopSearchTabProps {
    onProviderChange: (provider: string) => void
    onSearch: (query: string) => void
    provider: string
    search: string
}

export default function DesktopSearchTab({ onProviderChange, onSearch, provider, search }: DesktopSearchTabProps) {
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