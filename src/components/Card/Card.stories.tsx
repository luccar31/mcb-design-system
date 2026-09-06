import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardButton } from './Card'

const meta = {
  title: 'Superficies/Card',
  component: Card,
  args: { children: 'Casa de la colina · 32×24×32 · 1 284 bloques' },
  argTypes: {
    padding: { control: 'inline-radio', options: ['none', 'tight', 'normal', 'loose'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const Selected: Story = { name: 'Seleccionada', args: { selected: true } }

export const Paddings: Story = {
  name: 'Rellenos',
  render: () => (
    <div className="sb-stack" style={{ width: 380 }}>
      <Card padding="tight">tight — 6px</Card>
      <Card padding="normal">normal — 8px 10px</Card>
      <Card padding="loose">loose — 12px 16px</Card>
    </div>
  ),
}

export const Interactive: Story = {
  name: 'CardButton — estados',
  render: () => (
    <div className="sb-stack" style={{ width: 380 }}>
      <CardButton>Normal</CardButton>
      <CardButton className="is-hover">Hover</CardButton>
      <CardButton className="is-focus">Foco</CardButton>
      <CardButton selected>Seleccionada</CardButton>
      <CardButton disabled>Deshabilitada</CardButton>
    </div>
  ),
}
