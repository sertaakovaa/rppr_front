import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '../utils/cn'

export interface GridProps extends ComponentPropsWithoutRef<'div'> {
  cols?: 3
}

export function Grid({ cols, className, ...props }: GridProps) {
  return (
    <div
      className={cn('grid', cols === 3 && 'grid--3-cols', className)}
      {...props}
    />
  )
}
