import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './IconButton.css'

export type IconButtonVariant = 'solid' | 'ghost'
export type IconButtonTone = 'neutral' | 'danger'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label' | 'title'> {
  /** Required: the only name a screen reader and the tooltip get. */
  label: string
  icon: ReactNode
  variant?: IconButtonVariant
  tone?: IconButtonTone
  size?: IconButtonSize
  active?: boolean
  /** Stretch to the column width and stay square — for tool grids. */
  square?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      icon,
      variant = 'solid',
      tone = 'neutral',
      size = 'lg',
      active = false,
      square = false,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={cx(
          'mcb-icon-btn',
          `mcb-icon-btn--${variant}`,
          `mcb-icon-btn--${size}`,
          tone === 'danger' && 'mcb-icon-btn--danger',
          square && 'mcb-icon-btn--square',
          active && 'is-active',
          className,
        )}
      >
        <span aria-hidden="true">{icon}</span>
      </button>
    )
  },
)
