import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './Chip.css'

export type ChipTone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger'
export type ChipSize = 'sm' | 'md'

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: ChipTone
  size?: ChipSize
  icon?: ReactNode
  /** Draw a colour dot instead of an icon — for legends and categories. */
  dot?: string
  /** Trailing figure, rendered with tabular numerals. */
  value?: ReactNode
}

export function Chip({
  tone = 'neutral',
  size = 'md',
  icon,
  dot,
  value,
  className,
  children,
  ...rest
}: ChipProps) {
  return (
    <span
      {...rest}
      className={cx(
        'mcb-chip',
        tone !== 'neutral' && `mcb-chip--${tone}`,
        size === 'sm' && 'mcb-chip--sm',
        className,
      )}
    >
      {dot ? <span className="mcb-chip__dot" style={{ background: dot }} aria-hidden="true" /> : null}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
      {value !== undefined ? <span className="mcb-chip__value">{value}</span> : null}
    </span>
  )
}

export interface ToggleChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  pressed: boolean
  size?: ChipSize
  icon?: ReactNode
  dot?: string
  value?: ReactNode
}

export function ToggleChip({
  pressed,
  size = 'md',
  icon,
  dot,
  value,
  className,
  children,
  type = 'button',
  ...rest
}: ToggleChipProps) {
  return (
    <button
      {...rest}
      type={type}
      aria-pressed={pressed}
      className={cx(
        'mcb-chip',
        'mcb-chip--button',
        size === 'sm' && 'mcb-chip--sm',
        className,
      )}
    >
      {dot ? <span className="mcb-chip__dot" style={{ background: dot }} aria-hidden="true" /> : null}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
      {value !== undefined ? <span className="mcb-chip__value">{value}</span> : null}
    </button>
  )
}
