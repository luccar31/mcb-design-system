import { type HTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
import './Kbd.css'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  emphasis?: boolean
}

export function Kbd({ emphasis = false, className, children, ...rest }: KbdProps) {
  return (
    <kbd {...rest} className={cx('mcb-kbd', emphasis && 'mcb-kbd--emphasis', className)}>
      {children}
    </kbd>
  )
}
