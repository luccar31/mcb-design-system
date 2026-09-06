import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Retroalimentación/EmptyState',
  component: EmptyState,
  args: { title: 'Todavía no guardaste ningún diseño' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const WithDescription: Story = {
  name: 'Con descripción',
  args: {
    description: 'Guardá el diseño actual y va a aparecer en esta lista.',
  },
}

export const WithAction: Story = {
  name: 'Con acción',
  args: {
    icon: '🧱',
    title: 'Todavía no hay bloques',
    description: 'Volvé al editor y construí algo: la guía se arma sola a partir del diseño.',
    action: <Button variant="primary">Ir al editor</Button>,
  },
}

export const Compact: Story = {
  name: 'Compacta (dentro de un panel)',
  render: () => (
    <div className="sb-panel-frame">
      <EmptyState
        compact
        title="Sin resultados"
        description="Ningún bloque coincide con la búsqueda."
      />
    </div>
  ),
}

export const NoMaterials: Story = {
  name: 'Panel de materiales vacío',
  render: () => (
    <div className="sb-panel-frame">
      <EmptyState compact title="Todavía no hay bloques" description="Pintá en el visor para empezar." />
    </div>
  ),
}
