import { useId, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import { IconButton } from '../IconButton/IconButton'
import './Slider.css'

export interface SliderProps {
  label: string
  hideLabel?: boolean
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
  disabled?: boolean
  /** Prominent read-out above the track, e.g. "y = 12". */
  displayValue?: ReactNode
  /** Decrement / increment buttons for one-step precision. */
  steppers?: boolean
  stepperLabels?: { decrease: string; increase: string }
  /** Footer line showing the usable range. */
  showRange?: boolean
  className?: string
}

export function Slider({
  label,
  hideLabel = false,
  value,
  min,
  max,
  step = 1,
  onChange,
  disabled = false,
  displayValue,
  steppers = false,
  stepperLabels = { decrease: 'Bajar una capa', increase: 'Subir una capa' },
  showRange = false,
  className,
}: SliderProps) {
  const id = useId()

  return (
    <div className={cx('mcb-slider', className)}>
      <div className="mcb-slider__header">
        <label
          htmlFor={id}
          className={cx('mcb-slider__label', hideLabel && 'mcb-visually-hidden')}
        >
          {label}
        </label>
        {displayValue !== undefined ? (
          <span className="mcb-slider__value">{displayValue}</span>
        ) : null}
      </div>

      <input
        id={id}
        className="mcb-slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
      />

      {steppers || showRange ? (
        <div className="mcb-slider__footer">
          {steppers ? (
            <>
              <IconButton
                size="sm"
                variant="ghost"
                icon="▼"
                label={stepperLabels.decrease}
                disabled={disabled || value <= min}
                onClick={() => onChange(Math.max(min, value - step))}
              />
              <IconButton
                size="sm"
                variant="ghost"
                icon="▲"
                label={stepperLabels.increase}
                disabled={disabled || value >= max}
                onClick={() => onChange(Math.min(max, value + step))}
              />
            </>
          ) : null}
          {showRange ? (
            <span className="mcb-slider__range">
              {min} – {max}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
