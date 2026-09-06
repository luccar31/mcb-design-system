import type { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './IconButton'

const meta = {
  title: 'Controles/IconButton',
  component: IconButton,
  args: { label: 'Deshacer', icon: '↶' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'ghost'] },
    tone: { control: 'inline-radio', options: ['neutral', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {}

export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Bajar una capa', icon: '▼' },
}

export const Danger: Story = {
  args: { tone: 'danger', label: 'Borrar diseño', icon: '✕' },
}

export const Active: Story = {
  args: { active: true, label: 'Pincel', icon: '🖌', 'aria-pressed': true },
}

export const Disabled: Story = {
  args: { disabled: true, label: 'Rehacer', icon: '↷' },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-row">
      <IconButton size="sm" label="Cerrar" icon="✕" />
      <IconButton size="md" label="Subir una capa" icon="▲" />
      <IconButton size="lg" label="Deshacer" icon="↶" />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => (
    <dl className="sb-grid">
      <dt>Solid</dt>
      <dd>
        <IconButton label="Normal" icon="🖌" />
        <IconButton label="Hover" icon="🖌" className="is-hover" />
        <IconButton label="Foco" icon="🖌" className="is-focus" />
        <IconButton label="Activo" icon="🖌" active aria-pressed />
        <IconButton label="Deshabilitado" icon="🖌" disabled />
      </dd>
      <dt>Ghost</dt>
      <dd>
        <IconButton variant="ghost" label="Normal" icon="▲" />
        <IconButton variant="ghost" label="Hover" icon="▲" className="is-hover" />
        <IconButton variant="ghost" label="Foco" icon="▲" className="is-focus" />
        <IconButton variant="ghost" label="Deshabilitado" icon="▲" disabled />
      </dd>
      <dt>Danger</dt>
      <dd>
        <IconButton tone="danger" label="Normal" icon="✕" />
        <IconButton tone="danger" label="Hover" icon="✕" className="is-hover" />
        <IconButton tone="danger" variant="ghost" label="Ghost" icon="✕" />
      </dd>
    </dl>
  ),
}

export const ToolGrid: Story = {
  name: 'Grilla de herramientas',
  render: () => (
    <div className="sb-panel-frame">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--mcb-space-4)',
        }}
      >
        <IconButton square label="Pincel (B)" icon="🖌" active aria-pressed />
        <IconButton square label="Goma (E)" icon="🧽" />
        <IconButton square label="Cuentagotas (I)" icon="💧" />
        <IconButton square label="Línea (L)" icon="╱" />
        <IconButton square label="Rectángulo (R)" icon="▭" />
        <IconButton square label="Relleno (F)" icon="🪣" />
        <IconButton square label="Selección (S)" icon="⬚" />
      </div>
    </div>
  ),
}
