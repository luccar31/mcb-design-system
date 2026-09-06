import { useRef, type KeyboardEvent, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './SegmentedControl.css'

export type SegmentedSize = 'sm' | 'md' | 'lg'

export interface SegmentedOption<T extends string> {
  value: T
  label: ReactNode
  /** Longer explanation; becomes the native tooltip. */
  title?: string
  disabled?: boolean
}

export interface SegmentedControlProps<T extends string> {
  /** Names the group for assistive tech. Required — the options alone rarely say what they choose. */
  label: string
  options: readonly SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  size?: SegmentedSize
  /** Split the available width evenly across the options. */
  stretch?: boolean
  wrap?: boolean
  className?: string
}

const NEXT_KEYS = ['ArrowRight', 'ArrowDown']
const PREV_KEYS = ['ArrowLeft', 'ArrowUp']

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  size = 'md',
  stretch = false,
  wrap = false,
  className,
}: SegmentedControlProps<T>) {
  const groupRef = useRef<HTMLDivElement>(null)

  const move = (delta: number) => {
    const enabled = options.filter((o) => !o.disabled)
    if (enabled.length === 0) return
    const current = enabled.findIndex((o) => o.value === value)
    const next = enabled[(current + delta + enabled.length) % enabled.length]
    if (!next) return
    onChange(next.value)
    const target = groupRef.current?.querySelector<HTMLButtonElement>(
      `[data-value="${CSS.escape(next.value)}"]`,
    )
    target?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (NEXT_KEYS.includes(event.key)) {
      event.preventDefault()
      move(1)
    } else if (PREV_KEYS.includes(event.key)) {
      event.preventDefault()
      move(-1)
    }
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cx(
        'mcb-segmented',
        `mcb-segmented--${size}`,
        stretch && 'mcb-segmented--stretch',
        wrap && 'mcb-segmented--wrap',
        className,
      )}
    >
      {options.map((option) => {
        const checked = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            data-value={option.value}
            // Roving tabindex: the group is one tab stop, arrows move inside it.
            tabIndex={checked ? 0 : -1}
            disabled={option.disabled}
            title={option.title}
            onClick={() => onChange(option.value)}
            className="mcb-segmented__item"
          >
            <span className="mcb-segmented__label">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
