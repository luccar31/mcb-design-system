import type { Meta, StoryObj } from '@storybook/react'
import { SAMPLE_BLOCKS } from '../../internal/fixtures'
import { ColorSwatch } from '../ColorSwatch/ColorSwatch'
import { DataTable, type DataTableColumn } from './DataTable'

type Material = { code: string; name: string; color: string; count: number }

const MATERIALS: Material[] = SAMPLE_BLOCKS.slice(0, 7).map((block, index) => ({
  code: String.fromCharCode(65 + index),
  name: block.name,
  color: block.color,
  count: 642 - index * 83,
}))

function stacksLabel(count: number): string {
  const stacks = Math.floor(count / 64)
  const rest = count % 64
  if (stacks === 0) return `${rest}`
  return rest === 0 ? `${stacks} stacks` : `${stacks} stacks + ${rest}`
}

const COLUMNS: DataTableColumn<Material>[] = [
  { key: 'code', header: 'Cód.', variant: 'code', width: '1%', render: (row) => row.code },
  {
    key: 'name',
    header: 'Bloque',
    render: (row) => (
      <>
        <ColorSwatch color={row.color} style={{ marginRight: 6 }} />
        {row.name}
      </>
    ),
  },
  {
    key: 'count',
    header: 'Total',
    align: 'right',
    variant: 'mono',
    render: (row) => row.count.toLocaleString('es-AR'),
  },
  { key: 'stacks', header: 'Stacks', variant: 'mono', render: (row) => stacksLabel(row.count) },
]

const meta = {
  title: 'Datos/DataTable',
  component: DataTable,
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Por defecto',
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <DataTable columns={COLUMNS} rows={MATERIALS} rowKey={(row) => row.code} />
    </div>
  ),
}

export const WithCaption: Story = {
  name: 'Con título de tabla',
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <DataTable
        caption="Materiales totales del diseño"
        columns={COLUMNS}
        rows={MATERIALS}
        rowKey={(row) => row.code}
      />
    </div>
  ),
}

export const WithoutHeader: Story = {
  name: 'Sin cabecera',
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <DataTable
        hideHeader
        caption="Bloques de esta capa"
        hideCaption
        columns={COLUMNS.slice(0, 3)}
        rows={MATERIALS.slice(0, 4)}
        rowKey={(row) => row.code}
      />
    </div>
  ),
}

export const SingleRow: Story = {
  name: 'Una sola fila',
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <DataTable columns={COLUMNS} rows={MATERIALS.slice(0, 1)} rowKey={(row) => row.code} />
    </div>
  ),
}

export const Empty: Story = {
  name: 'Sin filas',
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <DataTable columns={COLUMNS} rows={[]} rowKey={(row) => row.code} />
    </div>
  ),
}

export const Narrow: Story = {
  name: 'Más ancha que su contenedor',
  render: () => (
    <div style={{ width: 260, border: '1px dashed var(--mcb-border-control)' }}>
      <DataTable columns={COLUMNS} rows={MATERIALS.slice(0, 4)} rowKey={(row) => row.code} />
    </div>
  ),
}
