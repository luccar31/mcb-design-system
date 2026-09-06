import { type HTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
import './Toolbar.css'

export type ToolbarGap = 'tight' | 'normal' | 'loose'

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the toolbar for assistive tech. */
  label?: string
  gap?: ToolbarGap
  wrap?: boolean
  /** Draw it as a full-width application bar with its own surface. */
  bar?: boolean
}

export function Toolbar({
  label,
  gap = 'normal',
  wrap = false,
  bar = false,
  className,
  children,
  ...rest
}: ToolbarProps) {
  return (
    <div
      {...rest}
      role="toolbar"
      aria-label={label}
      className={cx(
        'mcb-toolbar',
        gap !== 'normal' && `mcb-toolbar--gap-${gap}`,
        wrap && 'mcb-toolbar--wrap',
        bar && 'mcb-toolbar--bar',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function ToolbarGroup({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={cx('mcb-toolbar__group', className)} />
}

export function ToolbarSpacer() {
  return <span className="mcb-toolbar__spacer" aria-hidden="true" />
}

export function ToolbarDivider() {
  return <span className="mcb-toolbar__divider" role="separator" aria-orientation="vertical" />
}
