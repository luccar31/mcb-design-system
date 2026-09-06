import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SegmentedControl, type SegmentedOption } from './SegmentedControl'

type SliceView = 'off' | 'below' | 'isolate'
type Axis = 'x' | 'y' | 'z'

const SLICE_VIEWS: SegmentedOption<SliceView>[] = [
  { value: 'off', label: '3D' },
  { value: 'below', label: 'Hasta acá' },
  { value: 'isolate', label: 'Sólo capa' },
]

const AXES: SegmentedOption<Axis>[] = [
  { value: 'y', label: 'Y', title: 'Capas horizontales — pisos' },
  { value: 'x', label: 'X', title: 'Cortes verticales este-oeste — paredes' },
  { value: 'z', label: 'Z', title: 'Cortes verticales norte-sur — fachadas' },
]

const CATEGORIES: SegmentedOption<string>[] = [
  { value: 'all', label: 'Todos' },
  { value: 'stone', label: 'Piedra' },
  { value: 'wood', label: 'Madera' },
  { value: 'nature', label: 'Naturaleza' },
  { value: 'wool', label: 'Lana' },
  { value: 'concrete', label: 'Concreto' },
  { value: 'decorative', label: 'Decorativo' },
]

// A generic component has no single arg shape, so the meta stays untyped.
const meta: Meta = {
  title: 'Controles/SegmentedControl',
}

export default meta
type Story = StoryObj

function SliceViewDemo(props: { size?: 'sm' | 'md' | 'lg'; stretch?: boolean }) {
  const [value, setValue] = useState<SliceView>('off')
  return (
    <SegmentedControl
      label="Modo capa"
      options={SLICE_VIEWS}
      value={value}
      onChange={setValue}
      {...props}
    />
  )
}

export const Default: Story = {
  name: 'Por defecto',
  render: () => <SliceViewDemo />,
}

export const Stretch: Story = {
  name: 'Estirado en un panel',
  render: () => (
    <div className="sb-panel-frame">
      <SliceViewDemo stretch />
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-stack">
      <SliceViewDemo size="sm" />
      <SliceViewDemo size="md" />
      <SliceViewDemo size="lg" />
    </div>
  ),
}

export const Wrapping: Story = {
  name: 'Con salto de línea',
  render: function CategoriesDemo() {
    const [value, setValue] = useState('all')
    return (
      <div className="sb-panel-frame">
        <SegmentedControl
          label="Categoría de bloque"
          options={CATEGORIES}
          value={value}
          onChange={setValue}
          size="sm"
          wrap
        />
      </div>
    )
  },
}

export const WithDisabledOption: Story = {
  name: 'Con opción deshabilitada',
  render: function AxisDemo() {
    const [value, setValue] = useState<Axis>('y')
    return (
      <SegmentedControl
        label="Eje de corte"
        options={[...AXES, { value: 'x' as Axis, label: 'Libre', disabled: true }]}
        value={value}
        onChange={setValue}
        stretch
      />
    )
  },
}

export const KeyboardNavigation: Story = {
  name: 'Navegación con teclado',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Un solo tab entra al grupo. Las flechas mueven la selección y el foco;
        el anillo de foco usa el acento, no el borde tenue.
      </p>
      <SliceViewDemo />
    </div>
  ),
}
