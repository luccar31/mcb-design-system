import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './Callout.css'

export type CalloutTone = 'info' | 'warn' | 'danger'

const ICONS: Record<CalloutTone, string> = { info: 'ℹ', warn: '▲', danger: '✕' }

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: CalloutTone
  title?: ReactNode
  actions?: ReactNode
  /** Verbatim technical detail — a stack trace, a failed import. */
  detail?: string
  hideIcon?: boolean
}

export function Callout({
  tone = 'info',
  title,
  actions,
  detail,
  hideIcon = false,
  className,
  children,
  ...rest
}: CalloutProps) {
  return (
    <div
      {...rest}
      role={tone === 'danger' ? 'alert' : 'note'}
      className={cx('mcb-callout', `mcb-callout--${tone}`, className)}
    >
      {hideIcon ? null : (
        <span className="mcb-callout__icon" aria-hidden="true">
          {ICONS[tone]}
        </span>
      )}
      <div className="mcb-callout__content">
        {title ? <strong className="mcb-callout__title">{title}</strong> : null}
        {children ? <div className="mcb-callout__body">{children}</div> : null}
        {detail ? <pre className="mcb-callout__detail">{detail}</pre> : null}
        {actions ? <div className="mcb-callout__actions">{actions}</div> : null}
      </div>
    </div>
  )
}
