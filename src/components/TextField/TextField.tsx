import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './TextField.css'

export type FieldSize = 'sm' | 'md' | 'lg'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label. Use hideLabel when the surrounding UI already names it. */
  label: string
  hideLabel?: boolean
  hint?: ReactNode
  error?: ReactNode
  size?: FieldSize
  fullWidth?: boolean
  /** Tabular figures — for coordinates, dimensions, counts. */
  mono?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    hideLabel = false,
    hint,
    error,
    size = 'lg',
    fullWidth = true,
    mono = false,
    className,
    id,
    type = 'text',
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`

  return (
    <div
      className={cx(
        'mcb-field',
        `mcb-field--${size}`,
        fullWidth && 'mcb-field--block',
        mono && 'mcb-field--mono',
        error && 'mcb-field--invalid',
        className,
      )}
    >
      <label
        htmlFor={inputId}
        className={cx('mcb-field__label', hideLabel && 'mcb-visually-hidden')}
      >
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type={type}
        className="mcb-field__input"
        aria-invalid={error ? true : undefined}
        aria-describedby={cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined}
      />
      {hint ? (
        <span id={hintId} className="mcb-field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="mcb-field__error">
          {error}
        </span>
      ) : null}
    </div>
  )
})
