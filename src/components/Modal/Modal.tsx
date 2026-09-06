import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import { IconButton } from '../IconButton/IconButton'
import './Modal.css'

export type ModalSize = 'sm' | 'md' | 'lg'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: ModalSize
  /** Clicking the scrim closes it. Turn off for destructive flows. */
  closeOnScrim?: boolean
  closeLabel?: string
  className?: string
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnScrim = true,
  closeLabel = 'Cerrar',
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLElement>(FOCUSABLE)?.focus() ?? dialog?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      // Without this, Tab walks straight out of the dialog into the page behind.
      const items = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      restoreRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="mcb-modal-overlay"
      onMouseDown={(event) => {
        if (closeOnScrim && event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cx('mcb-modal', `mcb-modal--${size}`, className)}
      >
        <header className="mcb-modal__header">
          <div className="mcb-modal__heading">
            <h2 id={titleId} className="mcb-modal__title">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} className="mcb-modal__description">
                {description}
              </p>
            ) : null}
          </div>
          <IconButton
            variant="ghost"
            size="md"
            icon="✕"
            label={closeLabel}
            onClick={onClose}
          />
        </header>
        <div className="mcb-modal__body">{children}</div>
        {footer ? <footer className="mcb-modal__footer">{footer}</footer> : null}
      </div>
    </div>
  )
}
