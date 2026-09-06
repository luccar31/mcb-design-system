import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { categorical } from '../../tokens/tokens'
import { Chip, ToggleChip } from './Chip'

const meta = {
  title: 'Datos/Chip',
  component: Chip,
  args: { children: 'este navegador' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'accent', 'ok', 'warn', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = { args: { icon: '💾' } }

export const Accent: Story = { args: { tone: 'accent', children: 'modo capa' } }

export const Ok: Story = { args: { tone: 'ok', icon: '☁', children: 'nube' } }

export const Warn: Story = { args: { tone: 'warn', children: 'repetir 4×' } }

export const Danger: Story = { args: { tone: 'danger', children: '12 descartados' } }

export const WithValue: Story = {
  name: 'Con valor',
  args: { children: 'bloques', value: '1 284' },
}

export const WithDot: Story = {
  name: 'Con punto de color',
  args: { dot: categorical[1], children: 'camera' },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-row">
      <Chip size="sm">pequeño</Chip>
      <Chip size="md">normal</Chip>
    </div>
  ),
}

export const AllTones: Story = {
  name: 'Todos los tonos',
  render: () => (
    <dl className="sb-grid">
      <dt>Estático</dt>
      <dd>
        <Chip>neutral</Chip>
        <Chip tone="accent">accent</Chip>
        <Chip tone="ok" icon="☁">
          ok
        </Chip>
        <Chip tone="warn">warn</Chip>
        <Chip tone="danger">danger</Chip>
      </dd>
      <dt>Categorías</dt>
      <dd>
        {['pointer', 'camera', 'edit', 'tool', 'keyboard', 'view', 'design', 'error'].map(
          (name, index) => (
            <Chip key={name} dot={categorical[index]} size="sm">
              {name}
            </Chip>
          ),
        )}
      </dd>
    </dl>
  ),
}

export const Toggle: Story = {
  name: 'ToggleChip — estados',
  render: function ToggleDemo() {
    const [on, setOn] = useState(true)
    return (
      <dl className="sb-grid">
        <dt>Interactivo</dt>
        <dd>
          <ToggleChip pressed={on} onClick={() => setOn((v) => !v)}>
            pointer
          </ToggleChip>
        </dd>
        <dt>Estados</dt>
        <dd>
          <ToggleChip pressed={false}>normal</ToggleChip>
          <ToggleChip pressed={false} className="is-hover">
            hover
          </ToggleChip>
          <ToggleChip pressed={false} className="is-focus">
            foco
          </ToggleChip>
          <ToggleChip pressed>activo</ToggleChip>
          <ToggleChip pressed={false} disabled>
            deshabilitado
          </ToggleChip>
        </dd>
      </dl>
    )
  },
}

export const FilterRow: Story = {
  name: 'Fila de filtros',
  render: function FilterDemo() {
    const names = ['pointer', 'camera', 'edit', 'tool', 'keyboard', 'view', 'design', 'error']
    const [hidden, setHidden] = useState<string[]>(['view'])
    return (
      <div className="sb-row">
        {names.map((name, index) => (
          <ToggleChip
            key={name}
            size="sm"
            dot={categorical[index]}
            pressed={!hidden.includes(name)}
            onClick={() =>
              setHidden((prev) =>
                prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
              )
            }
          >
            {name}
          </ToggleChip>
        ))}
      </div>
    )
  },
}
