import { useSearchParams } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import './movieSearch.css'

export default function MovieSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isMobile = useMediaQuery('(max-width: 768px)')

    const handleProviderChange = (provider: string) => {
        setSearchParams(prev => {
            prev.set('provider', provider)
            prev.set('page', '1')
            return prev
        })
    }

    const handleMobileProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleProviderChange(e.target.value)
    }

    const MobileSearch = () => (
        <div className="searchTabWrapper">
            <select
                onChange={handleMobileProviderChange}
                className="mobileSelect"
                value={searchParams.get('provider') || 'all'}
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
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )

    const DesktopSearch = () => (
        <div className="searchTabWrapper">
            <button onClick={() => handleProviderChange('all')} className="searchButton">모든 서비스</button>
            <button onClick={() => handleProviderChange('netflix')} className="searchButton">넷플릭스</button>
            <button onClick={() => handleProviderChange('disney')} className="searchButton">디즈니+</button>
            <button onClick={() => handleProviderChange('wavve')} className="searchButton">웨이브</button>
            <button onClick={() => handleProviderChange('naver')} className="searchButton">네이버</button>
            <button onClick={() => handleProviderChange('googleplay')} className="searchButton">구글 플레이</button>
            <input
                type="text"
                placeholder="영화 검색"
                className="searchInput"
            />
        </div>
    )

    return isMobile ? <MobileSearch /> : <DesktopSearch />
} 