import { type HTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
import './Hud.css'

export type HudPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface HudBarProps extends HTMLAttributes<HTMLDivElement> {
  position?: HudPosition
  /** Translucent, blurred backing so the 3D scene stays visible behind it. */
  glass?: boolean
  label?: string
}

export function HudBar({
  position = 'bottom-right',
  glass = true,
  label,
  className,
  ...rest
}: HudBarProps) {
  return (
    <div
      {...rest}
      role="toolbar"
      aria-label={label}
      className={cx('mcb-hud', `mcb-hud--${position}`, glass && 'mcb-hud--glass', className)}
    />
  )
}

export interface HudReadoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Ordered pairs, e.g. [['x', 12], ['y', 4], ['z', 9]]. */
  entries: readonly (readonly [string, string | number])[]
  label?: string
}

export function HudReadout({
  entries,
  label = 'Coordenadas del cursor',
  className,
  ...rest
}: HudReadoutProps) {
  return (
    <div {...rest} aria-label={label} className={cx('mcb-hud-readout', className)}>
      {entries.map(([key, value], index) => (
        <span key={key}>
          {index > 0 ? ' · ' : ''}
          <span className="mcb-hud-readout__key">{key} </span>
          <span className="mcb-hud-readout__value">{value}</span>
        </span>
      ))}
    </div>
  )
}

export interface ViewportModeFrameProps {
  mode: 'build' | 'navigate'
}

/** Redundant mode signal: the border says it even when the cursor is off-screen. */
export function ViewportModeFrame({ mode }: ViewportModeFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={cx('mcb-viewport-mode', `mcb-viewport-mode--${mode}`)}
    />
  )
}
