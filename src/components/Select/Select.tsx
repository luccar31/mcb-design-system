import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
// The .mcb-field shell is shared with TextField so both controls cannot drift.
import '../TextField/TextField.css'
import './Select.css'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'children'> {
  label: string
  hideLabel?: boolean
  options: readonly SelectOption[]
  hint?: ReactNode
  error?: ReactNode
  size?: SelectSize
  fullWidth?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    hideLabel = false,
    options,
    hint,
    error,
    size = 'lg',
    fullWidth = true,
    className,
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = `${selectId}-hint`
  const errorId = `${selectId}-error`

  return (
    <div
      className={cx(
        'mcb-field',
        `mcb-field--${size}`,
        fullWidth && 'mcb-field--block',
        error && 'mcb-field--invalid',
        className,
      )}
    >
      <label
        htmlFor={selectId}
        className={cx('mcb-field__label', hideLabel && 'mcb-visually-hidden')}
      >
        {label}
      </label>
      <div className="mcb-field__select-wrap">
        <select
          {...rest}
          ref={ref}
          id={selectId}
          className="mcb-field__select"
          aria-invalid={error ? true : undefined}
          aria-describedby={
            cx(hint ? hintId : undefined, error ? errorId : undefined) || undefined
          }
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="mcb-field__select-arrow" aria-hidden="true">
          ▾
        </span>
      </div>
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
