import { type ComponentPropsWithoutRef } from 'react'
import { cn } from '../utils/cn'

export type CardSize = 'small' | 'medium' | 'large'

export interface CardProps extends ComponentPropsWithoutRef<'div'> {
  size?: CardSize
}

export function Card({ size, className, ...props }: CardProps) {
  return (
    <div className={cn('card', size && `card--${size}`, className)} {...props} />
  )
}

export function CardImage({
  className,
  alt = '',
  ...props
}: ComponentPropsWithoutRef<'img'>) {
  return <img className={cn('card__image', className)} alt={alt} {...props} />
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('card__content', className)} {...props} />
}

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<'h3'>) {
  return <h3 className={cn('card__title', className)} {...props} />
}

export function CardText({
  className,
  ...props
}: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('card__text', className)} {...props} />
}
