import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const LEVELS = [
  { value: 'actions', label: 'Acciones' },
  { value: 'normal', label: 'Normal' },
  { value: 'all', label: 'Todo' },
]

const meta = {
  title: 'Controles/Select',
  component: Select,
  args: { label: 'Nivel de captura', options: LEVELS, defaultValue: 'normal' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 260 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const WithHint: Story = {
  name: 'Con ayuda',
  args: { hint: 'Normal suma rendimiento por frame y raycasts.' },
}

export const WithError: Story = {
  name: 'Con error',
  args: { error: 'Ese nivel no está disponible en este navegador.' },
}

export const Disabled: Story = { name: 'Deshabilitado', args: { disabled: true } }

export const WithDisabledOption: Story = {
  name: 'Con opción deshabilitada',
  args: {
    options: [...LEVELS, { value: 'trace', label: 'Traza completa', disabled: true }],
  },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-stack" style={{ width: 240 }}>
      <Select size="sm" label="Nivel" options={LEVELS} defaultValue="actions" />
      <Select size="md" label="Nivel" options={LEVELS} defaultValue="normal" />
      <Select size="lg" label="Nivel de captura" options={LEVELS} defaultValue="all" />
    </div>
  ),
}
