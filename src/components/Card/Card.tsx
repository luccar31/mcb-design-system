import { type ButtonHTMLAttributes, type HTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
import './Card.css'

export type CardPadding = 'none' | 'tight' | 'normal' | 'loose'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
  selected?: boolean
}

export function Card({ padding = 'normal', selected = false, className, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cx(
        'mcb-card',
        `mcb-card--pad-${padding}`,
        selected && 'mcb-card--selected',
        className,
      )}
    />
  )
}

export interface CardButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  padding?: CardPadding
  selected?: boolean
}

/** A card that is itself the click target — a saved design, a preset. */
export function CardButton({
  padding = 'normal',
  selected = false,
  className,
  type = 'button',
  ...rest
}: CardButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-pressed={selected || undefined}
      className={cx(
        'mcb-card',
        'mcb-card--interactive',
        `mcb-card--pad-${padding}`,
        selected && 'mcb-card--selected',
        className,
      )}
    />
  )
}
