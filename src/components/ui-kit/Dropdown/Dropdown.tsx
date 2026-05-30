import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { cn } from '../utils/cn'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

function useDropdownContext() {
  const ctx = useContext(DropdownContext)
  if (!ctx) {
    throw new Error('Dropdown subcomponents must be used within <Dropdown>')
  }
  return ctx
}

export interface DropdownProps {
  className?: string
  children?: ReactNode
}

export function Dropdown({ className, children }: DropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className={cn('dropdown', className)}>{children}</div>
    </DropdownContext.Provider>
  )
}

export interface DropdownToggleProps {
  className?: string
  children?: ReactNode
}

export function DropdownToggle({ className, children }: DropdownToggleProps) {
  const { open, setOpen } = useDropdownContext()

  return (
    <div
      className={cn('dropdown__toggle', className)}
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen(!open)
        }
      }}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export interface DropdownMenuProps {
  className?: string
  children?: ReactNode
}

export function DropdownMenu({ className, children }: DropdownMenuProps) {
  const { open } = useDropdownContext()

  return (
    <div className={cn('dropdown__menu', open && 'active', className)}>
      {children}
    </div>
  )
}

export function DropdownItem({
  className,
  onClick,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const { setOpen } = useDropdownContext()

  return (
    <a
      className={cn('dropdown__item', className)}
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      {...props}
    />
  )
}
