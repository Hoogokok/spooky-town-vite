import { useState, useRef, useCallback, useEffect } from 'react'

export function useDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }, [])

    const toggle = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const close = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [handleClickOutside])

    return {
        isOpen,
        dropdownRef,
        toggle,
        close
    }
} 