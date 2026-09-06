import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SAMPLE_BLOCKS, blockTexture } from '../../internal/fixtures'
import { ListRow } from '../ListRow/ListRow'
import { BlockSwatch, BlockSwatchStatic } from './BlockSwatch'

const oak = SAMPLE_BLOCKS[0]

const meta = {
  title: 'Datos/BlockSwatch',
  component: BlockSwatch,
  args: {
    name: oak.name,
    detail: oak.id,
    texture: blockTexture(oak.color, 3),
    size: 'md',
  },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'fill'] } },
} satisfies Meta<typeof BlockSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const Selected: Story = { name: 'Seleccionado', args: { selected: true } }

export const Disabled: Story = { name: 'Deshabilitado', args: { disabled: true } }

export const Focused: Story = { name: 'Con foco', args: { className: 'is-focus' } }

export const ColorOnly: Story = {
  name: 'Sin textura',
  args: { texture: undefined, color: '#a12722', name: 'Lana roja' },
}

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="sb-row">
      <BlockSwatch size="sm" name="Piedra" texture={blockTexture('#7d7d7d', 5)} />
      <BlockSwatch size="md" name="Piedra" texture={blockTexture('#7d7d7d', 5)} />
      <BlockSwatch size="lg" name="Piedra" texture={blockTexture('#7d7d7d', 5)} />
    </div>
  ),
}

export const AllStates: Story = {
  name: 'Todos los estados',
  render: () => (
    <dl className="sb-grid">
      <dt>Normal</dt>
      <dd>
        <BlockSwatch name="Piedra" texture={blockTexture('#7d7d7d', 5)} />
      </dd>
      <dt>Hover</dt>
      <dd>
        <BlockSwatch name="Piedra" texture={blockTexture('#7d7d7d', 5)} className="is-hover" />
      </dd>
      <dt>Foco</dt>
      <dd>
        <BlockSwatch name="Piedra" texture={blockTexture('#7d7d7d', 5)} className="is-focus" />
      </dd>
      <dt>Seleccionado</dt>
      <dd>
        <BlockSwatch name="Piedra" texture={blockTexture('#7d7d7d', 5)} selected />
      </dd>
      <dt>Deshabilitado</dt>
      <dd>
        <BlockSwatch name="Piedra" texture={blockTexture('#7d7d7d', 5)} disabled />
      </dd>
    </dl>
  ),
}

export const PaletteGrid: Story = {
  name: 'Grilla de paleta',
  render: function PaletteDemo() {
    const [selected, setSelected] = useState<string>(SAMPLE_BLOCKS[0].id)
    return (
      <div className="sb-panel-frame">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {SAMPLE_BLOCKS.map((block, index) => (
            <BlockSwatch
              key={block.id}
              size="fill"
              name={block.name}
              detail={block.id.replace('minecraft:', '')}
              texture={blockTexture(block.color, index + 1)}
              selected={block.id === selected}
              onClick={() => setSelected(block.id)}
            />
          ))}
        </div>
      </div>
    )
  },
}

export const CurrentBlockCard: Story = {
  name: 'Bloque actual',
  render: () => (
    <div className="sb-panel-frame">
      <ListRow
        variant="card"
        leading={
          <BlockSwatchStatic name={oak.name} texture={blockTexture(oak.color, 3)} size="md" />
        }
        title={oak.name}
        meta={oak.id.replace('minecraft:', '')}
        monoMeta
      />
    </div>
  ),
}
