import { type Key, type ReactNode } from 'react'
import { cx } from '../../internal/cx'
import './DataTable.css'

export type CellVariant = 'text' | 'mono' | 'code'

export interface DataTableColumn<Row> {
  key: string
  header: ReactNode
  align?: 'left' | 'right'
  variant?: CellVariant
  width?: string
  render: (row: Row) => ReactNode
}

export interface DataTableProps<Row> {
  caption?: ReactNode
  /** Keeps the caption for assistive tech only. */
  hideCaption?: boolean
  columns: readonly DataTableColumn<Row>[]
  rows: readonly Row[]
  rowKey: (row: Row) => Key
  /** Hide the header when the columns are self-evident, e.g. a layer legend. */
  hideHeader?: boolean
  className?: string
}

export function DataTable<Row>({
  caption,
  hideCaption = false,
  columns,
  rows,
  rowKey,
  hideHeader = false,
  className,
}: DataTableProps<Row>) {
  return (
    <div className="mcb-table-scroll">
      <table className={cx('mcb-table', className)}>
        {caption ? (
          <caption className={cx('mcb-table__caption', hideCaption && 'mcb-visually-hidden')}>
            {caption}
          </caption>
        ) : null}
        {hideHeader ? null : (
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                  className={cx(column.align === 'right' && 'mcb-table__cell--right')}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cx(
                    column.align === 'right' && 'mcb-table__cell--right',
                    column.variant === 'mono' && 'mcb-table__cell--mono',
                    column.variant === 'code' && 'mcb-table__cell--code',
                  )}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
