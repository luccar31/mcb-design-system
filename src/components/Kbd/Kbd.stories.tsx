import type { Meta, StoryObj } from '@storybook/react'
import { Kbd } from './Kbd'

const meta = {
  title: 'Datos/Kbd',
  component: Kbd,
  args: { children: 'Ctrl+Z' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const Emphasis: Story = { name: 'Con énfasis', args: { emphasis: true, children: 'Esc' } }

export const SingleKey: Story = { name: 'Una sola tecla', args: { children: 'B' } }

export const ShortcutLine: Story = {
  name: 'Línea de atajos',
  render: () => (
    <p style={{ color: 'var(--mcb-text-muted)', fontSize: 'var(--mcb-font-size-xs)', margin: 0 }}>
      <Kbd>click</Kbd> colocar · <Kbd>shift+click</Kbd> borrar · <Kbd>alt+click</Kbd> cuentagotas ·{' '}
      <Kbd>arrastrar</Kbd> pintar · <Kbd emphasis>espacio</Kbd> construir/navegar ·{' '}
      <Kbd>rueda</Kbd> zoom
    </p>
  ),
}

export const InlineHint: Story = {
  name: 'Dentro de una ayuda',
  render: () => (
    <p className="sb-note" style={{ margin: 0 }}>
      Ancla puesta. Segundo click para confirmar · <Kbd>Esc</Kbd> cancela.
    </p>
  ),
}
