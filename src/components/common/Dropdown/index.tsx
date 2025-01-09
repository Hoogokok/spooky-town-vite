import { useDropdown } from '../../../hooks/useDropdown'
import './dropdown.css'

interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    align?: 'left' | 'right';
}

export default function Dropdown({ trigger, children, align = 'right' }: DropdownProps) {
    const { isOpen, dropdownRef, toggle } = useDropdown()

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div onClick={toggle}>
                {trigger}
            </div>
            {isOpen && (
                <div className={`dropdown-menu dropdown-${align}`}>
                    {children}
                </div>
            )}
        </div>
    )
} 