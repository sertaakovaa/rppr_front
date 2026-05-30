import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '../utils/cn'

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn('input', className)} {...props} />
  },
)

export interface InputGroupProps {
  error?: boolean
  errorMessage?: string
  icon?: ReactNode
  className?: string
  children?: ReactNode
}

export function InputGroup({
  error,
  errorMessage,
  icon,
  className,
  children,
}: InputGroupProps) {
  return (
    <div className={cn('input-group', error && 'input-group--error', className)}>
      {icon ? <span className="input-group__icon">{icon}</span> : null}
      {children}
      {error && errorMessage ? (
        <span className="input-group__error-message">{errorMessage}</span>
      ) : null}
    </div>
  )
}
