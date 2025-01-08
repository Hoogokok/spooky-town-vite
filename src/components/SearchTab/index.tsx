import { useMediaQuery } from '../../hooks/useMediaQuery'
import DesktopSearchTab from './DesktopSearchTab'
import MobileSearchTab from './MobileSearchTab'
import './searchTab.css'

interface SearchTabProps {
    onProviderChange: (provider: string) => void
    onSearch: (query: string) => void
    provider: string
    search: string
}

export default function SearchTab(props: SearchTabProps) {
    const isMobile = useMediaQuery('(max-width: 768px)')
    return isMobile ? <MobileSearchTab {...props} /> : <DesktopSearchTab {...props} />
} 