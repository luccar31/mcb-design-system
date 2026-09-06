import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './Panel.css'

export type PanelEdge = 'none' | 'left' | 'right'
export type PanelElevation = 'flat' | 'raised'

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode
  /** Controls shown at the right of the header. */
  actions?: ReactNode
  footer?: ReactNode
  /** Full-height column: drops the radius and keeps one border edge. */
  edge?: PanelEdge
  elevation?: PanelElevation
  scroll?: boolean
  /** Skip the body padding when the content brings its own. */
  bare?: boolean
}

export function Panel({
  title,
  actions,
  footer,
  edge = 'none',
  elevation = 'flat',
  scroll = false,
  bare = false,
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <section
      {...rest}
      className={cx(
        'mcb-panel',
        elevation === 'raised' && 'mcb-panel--raised',
        edge !== 'none' && `mcb-panel--edge-${edge}`,
        scroll && 'mcb-panel--scroll',
        className,
      )}
    >
      {title || actions ? (
        <header className="mcb-panel__header">
          {title ? <h2 className="mcb-panel__title">{title}</h2> : null}
          {actions ? <div className="mcb-panel__header-actions">{actions}</div> : null}
        </header>
      ) : null}
      <div
        className="mcb-panel__body"
        style={bare ? { padding: 0 } : undefined}
      >
        {children}
      </div>
      {footer ? <footer className="mcb-panel__footer">{footer}</footer> : null}
    </section>
  )
}

export interface SectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  /** Trailing figure in the heading, e.g. how many materials. */
  count?: ReactNode
}

export function Section({ title, count, className, children, ...rest }: SectionProps) {
  return (
    <div {...rest} className={cx('mcb-section', className)}>
      <h3 className="mcb-section__title">
        {title}
        {count !== undefined ? <span className="mcb-section__count">{count}</span> : null}
      </h3>
      {children}
    </div>
  )
}
