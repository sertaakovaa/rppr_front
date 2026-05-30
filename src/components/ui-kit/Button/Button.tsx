import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '../utils/cn'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant,
  size = 'medium',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'btn',
        variant && `btn--${variant}`,
        `btn--${size}`,
        className,
      )}
      {...props}
    />
  )
}
