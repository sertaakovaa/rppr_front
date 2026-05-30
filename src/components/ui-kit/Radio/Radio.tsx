import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode
}

export function Radio({ label, className, id, ...props }: RadioProps) {
  const inputId = id ?? (typeof label === 'string' ? label : undefined)

  return (
    <div className="form-group">
      <input
        type="radio"
        id={inputId}
        className={cn('radio', className)}
        {...props}
      />
      {label ? <label htmlFor={inputId}>{label}</label> : null}
    </div>
  )
}
