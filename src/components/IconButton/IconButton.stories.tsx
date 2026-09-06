import type { Meta, StoryObj } from '@storybook/react'
import { IconButton, type IconButtonProps } from './IconButton'

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

const STATES = ['Normal', 'Hover', 'Foco', 'Activo', 'Deshabilitado'] as const

const VARIANTS = [
  { row: 'Solid', icon: '🖌', label: 'Pincel', props: {} },
  { row: 'Ghost', icon: '▲', label: 'Subir capa', props: { variant: 'ghost' } },
  { row: 'Danger', icon: '✕', label: 'Borrar', props: { tone: 'danger' } },
  {
    row: 'Danger ghost',
    icon: '✕',
    label: 'Cerrar',
    props: { variant: 'ghost', tone: 'danger' },
  },
] as const satisfies readonly {
  row: string
  icon: string
  label: string
  props: Partial<IconButtonProps>
}[]

/** The class the story adds to pin a state the mouse or keyboard would own. */
const stateProps = (state: (typeof STATES)[number]): Partial<IconButtonProps> => {
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
        {VARIANTS.map(({ row, icon, label, props }) => (
          <tr key={row}>
            <th scope="row">{row}</th>
            {STATES.map((state) => (
              <td key={state}>
                <IconButton
                  {...props}
                  {...stateProps(state)}
                  icon={icon}
                  label={`${label} — ${state}`}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
