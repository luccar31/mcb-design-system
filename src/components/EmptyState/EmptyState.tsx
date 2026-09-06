import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './EmptyState.css'

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  /** What to do next. An empty panel is an invitation, not a dead end. */
  description?: ReactNode
  icon?: ReactNode
  action?: ReactNode
  compact?: boolean
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  compact = false,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div {...rest} className={cx('mcb-empty', compact && 'mcb-empty--compact', className)}>
      {icon ? (
        <span className="mcb-empty__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="mcb-empty__title">{title}</span>
      {description ? <span className="mcb-empty__body">{description}</span> : null}
      {action ? <span className="mcb-empty__action">{action}</span> : null}
    </div>
  )
}
