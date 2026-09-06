import type { Meta, StoryObj } from '@storybook/react'
import { SAMPLE_BLOCKS, blockTexture } from '../../internal/fixtures'
import { BlockSwatchStatic } from '../BlockSwatch/BlockSwatch'
import { Button } from '../Button/Button'
import { ColorSwatch } from '../ColorSwatch/ColorSwatch'
import { IconButton } from '../IconButton/IconButton'
import { List, ListRow } from './ListRow'

const meta = {
  title: 'Datos/ListRow',
  component: ListRow,
  args: { title: 'Casa de la colina' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { name: 'Por defecto' }

export const WithMeta: Story = {
  name: 'Con metadatos',
  args: {
    meta: '32×24×32 · 1 284 bloques · 6/9/2026, 03:12',
    monoMeta: true,
  },
}

export const AsCard: Story = {
  name: 'Como tarjeta',
  args: {
    variant: 'card',
    meta: '32×24×32 · 1 284 bloques',
    monoMeta: true,
    trailing: (
      <>
        <Button size="md">Abrir</Button>
        <IconButton size="md" variant="ghost" tone="danger" icon="✕" label="Borrar diseño" />
      </>
    ),
  },
}

export const WithValue: Story = {
  name: 'Con cifra a la derecha',
  args: {
    dense: true,
    leading: <ColorSwatch color="#a17b4a" />,
    title: 'Tablas de roble',
    value: '642',
  },
}

export const LongTitle: Story = {
  name: 'Título largo',
  args: {
    variant: 'card',
    leading: <BlockSwatchStatic name="Ladrillos" texture={blockTexture('#96604a', 8)} />,
    title: 'Terracota vidriada magenta con un nombre demasiado largo para la columna',
    meta: 'minecraft:magenta_glazed_terracotta',
    monoMeta: true,
    trailing: <Button size="md">Abrir</Button>,
  },
}

export const SavedDesigns: Story = {
  name: 'Diseños guardados',
  render: () => (
    <List>
      {['Casa de la colina', 'Granja de hierro', 'Puente del río'].map((name, index) => (
        <ListRow
          key={name}
          variant="card"
          title={name}
          meta={`${32 - index * 6}×${24 - index * 4}×${32 - index * 8} · ${1284 - index * 400} bloques`}
          monoMeta
          trailing={
            <>
              <Button size="md">Abrir</Button>
              <IconButton size="md" variant="ghost" tone="danger" icon="✕" label={`Borrar ${name}`} />
            </>
          }
        />
      ))}
    </List>
  ),
}

export const MaterialsList: Story = {
  name: 'Materiales del diseño',
  render: () => (
    <div className="sb-panel-frame">
      <List dense>
        {SAMPLE_BLOCKS.slice(0, 8).map((block, index) => (
          <ListRow
            key={block.id}
            dense
            leading={<ColorSwatch color={block.color} label={block.name} />}
            title={block.name}
            value={String(642 - index * 71)}
          />
        ))}
      </List>
    </div>
  ),
}
