import { SearchTabProps } from './types'

export default function DesktopSearchTab(props: SearchTabProps) {
    return (
        <div className="searchTabWrapper">
            <button onClick={() => props.onProviderChange('all')} className="searchButton">모든 서비스</button>
            <button onClick={() => props.onProviderChange('netflix')} className="searchButton">넷플릭스</button>
            <button onClick={() => props.onProviderChange('disney')} className="searchButton">디즈니+</button>
            <button onClick={() => props.onProviderChange('wavve')} className="searchButton">웨이브</button>
            <button onClick={() => props.onProviderChange('naver')} className="searchButton">네이버</button>
            <button onClick={() => props.onProviderChange('googleplay')} className="searchButton">구글 플레이</button>
            <input
                type="text"
                value={props.search}
                onChange={(e) => props.onSearch(e.target.value)}
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )
} 