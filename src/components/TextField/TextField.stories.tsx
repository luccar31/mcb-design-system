import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './TextField'

const meta = {
  title: 'Controles/TextField',
  component: TextField,
  args: { label: 'Nombre del diseño', defaultValue: 'Casa de la colina' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const WithHint: Story = {
  name: 'Con ayuda',
  args: {
    label: 'Ancho (X)',
    type: 'number',
    defaultValue: 32,
    mono: true,
    hint: 'Entre 1 y 256 bloques.',
  },
}

export const WithError: Story = {
  name: 'Con error',
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'lucas@',
    error: 'Falta el dominio después de la arroba.',
  },
}

export const Disabled: Story = {
  name: 'Deshabilitado',
  args: { disabled: true, defaultValue: 'Casa de la colina' },
}

export const Placeholder: Story = {
  args: {
    label: 'Buscar bloque',
    hideLabel: true,
    defaultValue: '',
    placeholder: 'Buscar bloque…',
  },
}

export const Focused: Story = {
  name: 'Con foco',
  args: { className: 'is-focus' },
  render: (args) => (
    <div className="mcb-field mcb-field--lg mcb-field--block">
      <label className="mcb-field__label" htmlFor="focus-demo">
        {args.label}
      </label>
      <input
        id="focus-demo"
        className="mcb-field__input is-focus"
        defaultValue={String(args.defaultValue)}
      />
    </div>
  ),
}

export const Mono: Story = {
  name: 'Numérico tabular',
  args: { label: 'Índice de capa', mono: true, type: 'number', defaultValue: 12 },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-stack" style={{ width: 260 }}>
      <TextField size="sm" label="Filtro" defaultValue="pointer" />
      <TextField size="md" label="Nombre" defaultValue="Casa nueva" />
      <TextField size="lg" label="Nombre del diseño" defaultValue="Casa de la colina" />
    </div>
  ),
}

export const DimensionRow: Story = {
  name: 'Fila de dimensiones',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, width: 380 }}>
      <TextField label="Ancho (X)" type="number" mono defaultValue={32} />
      <TextField label="Alto (Y)" type="number" mono defaultValue={24} />
      <TextField label="Largo (Z)" type="number" mono defaultValue={32} />
    </div>
  ),
}
