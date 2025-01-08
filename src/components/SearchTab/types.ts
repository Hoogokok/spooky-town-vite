export interface SearchTabProps {
    onProviderChange: (provider: string) => void
    onSearch: (query: string) => void
    provider: string
    search: string
} 