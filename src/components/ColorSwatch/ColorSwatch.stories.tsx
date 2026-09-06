import type { Meta, StoryObj } from '@storybook/react'
import { SAMPLE_BLOCKS } from '../../internal/fixtures'
import { List, ListRow } from '../ListRow/ListRow'
import { ColorSwatch } from './ColorSwatch'

const meta = {
  title: 'Datos/ColorSwatch',
  component: ColorSwatch,
  args: { color: '#a17b4a' },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md'] } },
} satisfies Meta<typeof ColorSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const Labelled: Story = {
  name: 'Con nombre accesible',
  args: { label: 'Tablas de roble' },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-row">
      <ColorSwatch size="xs" color="#a17b4a" />
      <ColorSwatch size="sm" color="#a17b4a" />
      <ColorSwatch size="md" color="#a17b4a" />
    </div>
  ),
}

export const PaleBlock: Story = {
  name: 'Bloque muy claro',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        El borde interno mantiene visible la lana blanca sobre el panel oscuro.
      </p>
      <div className="sb-row">
        <ColorSwatch size="md" color="#e9ecec" label="Lana blanca" />
        <ColorSwatch size="md" color="#ffffff" label="Bloque blanco puro" />
        <ColorSwatch size="md" color="#141519" label="Lana negra" />
      </div>
    </div>
  ),
}

export const MaterialList: Story = {
  name: 'Lista de materiales',
  render: () => (
    <div className="sb-panel-frame">
      <List dense>
        {SAMPLE_BLOCKS.slice(0, 6).map((block, index) => (
          <ListRow
            key={block.id}
            dense
            leading={<ColorSwatch color={block.color} label={block.name} />}
            title={block.name}
            value={String(640 - index * 97)}
          />
        ))}
      </List>
    </div>
  ),
}
