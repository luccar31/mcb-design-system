import type { Meta, StoryObj } from '@storybook/react'
import { Button, type ButtonProps } from './Button'

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

const STATES = ['Normal', 'Hover', 'Foco', 'Activo', 'Deshabilitado'] as const

const VARIANTS = [
  { row: 'Solid', label: 'Guardar', props: {} },
  { row: 'Ghost', label: 'Guardar', props: { variant: 'ghost' } },
  { row: 'Primary', label: 'Guardar', props: { variant: 'primary' } },
  { row: 'Danger', label: 'Borrar', props: { tone: 'danger' } },
  { row: 'Danger ghost', label: 'Borrar', props: { variant: 'ghost', tone: 'danger' } },
] as const satisfies readonly { row: string; label: string; props: Partial<ButtonProps> }[]

/** The class the story adds to pin a state the mouse or keyboard would own. */
const stateProps = (state: (typeof STATES)[number]): Partial<ButtonProps> => {
  if (state === 'Hover') return { className: 'is-hover' }
  if (state === 'Foco') return { className: 'is-focus' }
  if (state === 'Activo') return { active: true, 'aria-pressed': true }
  if (state === 'Deshabilitado') return { disabled: true }
  return {}
}

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => (
    <table className="sb-matrix">
      <thead>
        <tr>
          <th>
            <span className="mcb-visually-hidden">Variante</span>
          </th>
          {STATES.map((state) => (
            <th key={state} scope="col">
              {state}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map(({ row, label, props }) => (
          <tr key={row}>
            <th scope="row">{row}</th>
            {STATES.map((state) => (
              <td key={state}>
                <Button {...props} {...stateProps(state)}>
                  {label}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
