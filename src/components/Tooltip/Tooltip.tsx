import { useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './Tooltip.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  content: ReactNode
  /** Keyboard shortcut shown after the text, e.g. "B". */
  shortcut?: string
  placement?: TooltipPlacement
  /** Hover delay in ms. Focus always opens immediately. */
  delay?: number
  children: ReactElement
  className?: string
}

export function Tooltip({
  content,
  shortcut,
  placement = 'top',
  delay = 350,
  children,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false)
  const timer = useRef<number>()
  const id = useId()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const show = (immediate: boolean) => {
    window.clearTimeout(timer.current)
    if (immediate) setOpen(true)
    else timer.current = window.setTimeout(() => setOpen(true), delay)
  }

  const hide = () => {
    window.clearTimeout(timer.current)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <span
      className={cx('mcb-tooltip', className)}
      onMouseEnter={() => show(false)}
      onMouseLeave={hide}
      onFocusCapture={() => show(true)}
      onBlurCapture={hide}
    >
      {/* aria-describedby, not aria-label: the control keeps its own name. */}
      <span aria-describedby={open ? id : undefined} style={{ display: 'contents' }}>
        {children}
      </span>
      <span
        id={id}
        role="tooltip"
        data-open={open}
        className={cx('mcb-tooltip__bubble', `mcb-tooltip__bubble--${placement}`)}
      >
        {content}
        {shortcut ? <span className="mcb-tooltip__shortcut">{shortcut}</span> : null}
      </span>
    </span>
  )
}
