import { SearchTabProps } from './types'

export default function MobileSearchTab(props: SearchTabProps) {
    return (
        <div className="searchTabWrapper">
            <select
                onChange={(e) => props.onProviderChange(e.target.value)}
                className="mobileSelect"
                value={props.provider}
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
                value={props.search}
                onChange={(e) => props.onSearch(e.target.value)}
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )
} 