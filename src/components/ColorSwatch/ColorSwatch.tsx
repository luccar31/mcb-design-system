import { type HTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
import './ColorSwatch.css'

export type ColorSwatchSize = 'xs' | 'sm' | 'md'

export interface ColorSwatchProps extends HTMLAttributes<HTMLSpanElement> {
  color: string
  size?: ColorSwatchSize
  /** Give it a name when the swatch is the only carrier of meaning. */
  label?: string
}

export function ColorSwatch({
  color,
  size = 'sm',
  label,
  className,
  style,
  ...rest
}: ColorSwatchProps) {
  return (
    <span
      {...rest}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cx('mcb-color-swatch', `mcb-color-swatch--${size}`, className)}
      style={{ background: color, ...style }}
    />
  )
}
