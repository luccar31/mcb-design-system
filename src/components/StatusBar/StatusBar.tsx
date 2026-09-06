import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './StatusBar.css'

export interface StatusBarProps extends HTMLAttributes<HTMLElement> {
  label?: string
}

export function StatusBar({ label = 'Estado', className, children, ...rest }: StatusBarProps) {
  return (
    <footer {...rest} aria-label={label} className={cx('mcb-status-bar', className)}>
      {children}
    </footer>
  )
}

export interface StatusItemProps extends HTMLAttributes<HTMLSpanElement> {
  /** Renders the value with tabular figures so it stops jittering. */
  numeric?: boolean
  icon?: ReactNode
}

export function StatusItem({ numeric = false, icon, className, children, ...rest }: StatusItemProps) {
  return (
    <span
      {...rest}
      className={cx(
        'mcb-status-bar__item',
        numeric && 'mcb-status-bar__item--numeric',
        className,
      )}
    >
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
    </span>
  )
}

export function StatusSpacer() {
  return <span className="mcb-status-bar__spacer" aria-hidden="true" />
}

export interface StatusMessageProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'danger'
}

export function StatusMessage({
  tone = 'neutral',
  className,
  children,
  ...rest
}: StatusMessageProps) {
  return (
    <span
      {...rest}
      role="status"
      aria-live="polite"
      className={cx(
        'mcb-status-bar__message',
        tone === 'danger' && 'mcb-status-bar__message--danger',
        className,
      )}
    >
      {children}
    </span>
  )
}
