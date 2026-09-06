import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Controles/Button',
  component: Button,
  args: { children: 'Guardar' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'ghost', 'primary'] },
    tone: { control: 'inline-radio', options: ['neutral', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Solid: Story = {}

export const Primary: Story = {
  args: { variant: 'primary', children: 'Crear diseño' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Redimensionar el actual' },
}

export const Danger: Story = {
  args: { tone: 'danger', children: 'Borrar selección' },
}

export const DangerGhost: Story = {
  name: 'Danger ghost',
  args: { tone: 'danger', variant: 'ghost', children: 'Borrar diseño' },
}

export const Active: Story = {
  args: { active: true, children: 'Grilla', 'aria-pressed': true },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Deshacer' },
}

export const WithIcon: Story = {
  name: 'Con ícono',
  args: { leadingIcon: '✏️', children: 'Construir' },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-row">
      <Button size="sm">Piedra</Button>
      <Button size="md">Hasta acá</Button>
      <Button size="lg">Exportar .schem</Button>
    </div>
  ),
}

export const FullWidth: Story = {
  name: 'Ancho completo',
  render: () => (
    <div className="sb-panel-frame">
      <Button fullWidth variant="primary">
        Guardar diseño
      </Button>
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => (
    <dl className="sb-grid">
      <dt>Solid</dt>
      <dd>
        <Button>Normal</Button>
        <Button className="is-hover">Hover</Button>
        <Button className="is-focus">Foco</Button>
        <Button active aria-pressed>
          Activo
        </Button>
        <Button disabled>Deshabilitado</Button>
      </dd>

      <dt>Ghost</dt>
      <dd>
        <Button variant="ghost">Normal</Button>
        <Button variant="ghost" className="is-hover">
          Hover
        </Button>
        <Button variant="ghost" active aria-pressed>
          Activo
        </Button>
        <Button variant="ghost" disabled>
          Deshabilitado
        </Button>
      </dd>

      <dt>Primary</dt>
      <dd>
        <Button variant="primary">Normal</Button>
        <Button variant="primary" className="is-hover">
          Hover
        </Button>
        <Button variant="primary" disabled>
          Deshabilitado
        </Button>
      </dd>

      <dt>Danger</dt>
      <dd>
        <Button tone="danger">Normal</Button>
        <Button tone="danger" className="is-hover">
          Hover
        </Button>
        <Button tone="danger" disabled>
          Deshabilitado
        </Button>
      </dd>
    </dl>
  ),
}

export const Toolbar: Story = {
  name: 'Barra de acciones',
  render: () => (
    <div className="sb-row">
      <Button>Imprimir guía</Button>
      <Button>Exportar JSON</Button>
      <Button>Exportar .schem</Button>
      <Button>Importar</Button>
      <Button variant="primary">Guardar</Button>
    </div>
  ),
}
