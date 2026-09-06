import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cx } from '../../internal/cx'
import './BlockSwatch.css'

export type BlockSwatchSize = 'sm' | 'md' | 'lg' | 'fill'

export interface BlockSwatchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Block name in the player's language — the accessible name and the tooltip. */
  name: string
  /** Texture URL. Falls back to a flat colour when absent. */
  texture?: string
  color?: string
  size?: BlockSwatchSize
  selected?: boolean
  /** Extra line under the name in the tooltip, e.g. the block id. */
  detail?: string
}

export const BlockSwatch = forwardRef<HTMLButtonElement, BlockSwatchProps>(
  function BlockSwatch(
    {
      name,
      texture,
      color = '#7d7d7d',
      size = 'md',
      selected = false,
      detail,
      className,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        aria-pressed={selected}
        aria-label={name}
        title={detail ? `${name}\n${detail}` : name}
        className={cx(
          'mcb-block-swatch',
          'mcb-block-swatch--button',
          `mcb-block-swatch--${size}`,
          className,
        )}
      >
        {texture ? (
          <img className="mcb-block-swatch__image" src={texture} alt="" />
        ) : (
          <span className="mcb-block-swatch__fallback" style={{ background: color }} />
        )}
      </button>
    )
  },
)

export interface BlockSwatchStaticProps {
  name: string
  texture?: string
  color?: string
  size?: BlockSwatchSize
  className?: string
}

/** Read-only tile: the current block, a legend entry, a guide row. */
export function BlockSwatchStatic({
  name,
  texture,
  color = '#7d7d7d',
  size = 'md',
  className,
}: BlockSwatchStaticProps) {
  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cx('mcb-block-swatch', `mcb-block-swatch--${size}`, className)}
    >
      {texture ? (
        <img className="mcb-block-swatch__image" src={texture} alt="" />
      ) : (
        <span className="mcb-block-swatch__fallback" style={{ background: color }} />
      )}
    </span>
  )
}
