import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './Button.css'

export type ButtonVariant = 'solid' | 'ghost' | 'primary'
export type ButtonTone = 'neutral' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  tone?: ButtonTone
  size?: ButtonSize
  /**
   * Selected / toggled-on look. Purely visual: pair it with aria-pressed for a
   * toggle, or use SegmentedControl when the choice is exclusive.
   */
  active?: boolean
  fullWidth?: boolean
  leadingIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    tone = 'neutral',
    size = 'lg',
    active = false,
    fullWidth = false,
    leadingIcon,
    className,
    children,
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
      className={cx(
        'mcb-btn',
        `mcb-btn--${variant}`,
        `mcb-btn--${size}`,
        tone === 'danger' && 'mcb-btn--danger',
        fullWidth && 'mcb-btn--block',
        active && 'is-active',
        className,
      )}
    >
      {leadingIcon ? (
        <span className="mcb-btn__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="mcb-btn__label">{children}</span>
    </button>
  )
})
