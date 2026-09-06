import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './ListRow.css'

export interface ListRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  leading?: ReactNode
  title: ReactNode
  meta?: ReactNode
  /** Render the meta line with tabular figures — dimensions, dates, counts. */
  monoMeta?: boolean
  /** Right-aligned figure, e.g. how many blocks of this material. */
  value?: ReactNode
  trailing?: ReactNode
  variant?: 'plain' | 'card'
  dense?: boolean
}

export function ListRow({
  leading,
  title,
  meta,
  monoMeta = false,
  value,
  trailing,
  variant = 'plain',
  dense = false,
  className,
  ...rest
}: ListRowProps) {
  return (
    <div
      {...rest}
      className={cx(
        'mcb-list-row',
        variant === 'card' && 'mcb-list-row--card',
        dense && 'mcb-list-row--dense',
        className,
      )}
    >
      {leading ? <span className="mcb-list-row__leading">{leading}</span> : null}
      <span className="mcb-list-row__main">
        <span className="mcb-list-row__title">{title}</span>
        {meta ? (
          <span className={cx('mcb-list-row__meta', monoMeta && 'mcb-list-row__meta--mono')}>
            {meta}
          </span>
        ) : null}
      </span>
      {value !== undefined ? <span className="mcb-list-row__value">{value}</span> : null}
      {trailing ? <span className="mcb-list-row__trailing">{trailing}</span> : null}
    </div>
  )
}

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  dense?: boolean
}

export function List({ dense = false, className, ...rest }: ListProps) {
  return <div {...rest} className={cx('mcb-list', dense && 'mcb-list--dense', className)} />
}
