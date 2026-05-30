import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '../utils/cn'

export interface CheckboxProps extends ComponentPropsWithoutRef<'input'> {
  label?: ReactNode
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const inputId = id ?? (typeof label === 'string' ? label : undefined)

  return (
    <div className="form-group">
      <input
        type="checkbox"
        id={inputId}
        className={cn('checkbox', className)}
        {...props}
      />
      {label ? <label htmlFor={inputId}>{label}</label> : null}
    </div>
  )
}
