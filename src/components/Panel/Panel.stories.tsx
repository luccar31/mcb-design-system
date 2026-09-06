import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'
import { List, ListRow } from '../ListRow/ListRow'
import { ColorSwatch } from '../ColorSwatch/ColorSwatch'
import { Panel, Section } from './Panel'

const meta = {
  title: 'Superficies/Panel',
  component: Panel,
} satisfies Meta<typeof Panel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Por defecto',
  args: {
    style: { width: 246 },
    children: 'Contenido del panel.',
  },
}

export const WithTitle: Story = {
  name: 'Con título',
  args: {
    title: 'Telemetría',
    style: { width: 420 },
    children: 'Los eventos aparecen acá, del más nuevo al más viejo.',
  },
}

export const WithActions: Story = {
  name: 'Con acciones en la cabecera',
  args: {
    title: 'Telemetría',
    style: { width: 480 },
    actions: (
      <>
        <Button size="sm" active aria-pressed>
          Flujo
        </Button>
        <Button size="sm">Resumen</Button>
        <IconButton size="sm" variant="ghost" icon="✕" label="Cerrar" />
      </>
    ),
    children: '48 de 1024 eventos pasan el filtro.',
  },
}

export const Raised: Story = {
  name: 'Elevado (flotante)',
  args: {
    title: 'Telemetría',
    elevation: 'raised',
    style: { width: 420 },
    children: 'Un panel que flota sobre el visor lleva sombra.',
  },
}

export const WithFooter: Story = {
  name: 'Con pie',
  args: {
    title: 'Diseños guardados',
    style: { width: 420 },
    children: 'Tres diseños en este navegador.',
    footer: <span style={{ color: 'var(--mcb-text-muted)' }}>Última sincronización: hace 2 min</span>,
  },
}

export const SideColumn: Story = {
  name: 'Columna lateral',
  render: () => (
    <div style={{ display: 'flex', height: 380, background: 'var(--mcb-surface-viewport)' }}>
      <Panel edge="left" scroll style={{ width: 246 }}>
        <Section title="Herramienta">
          <div className="sb-row">
            <IconButton square label="Pincel" icon="🖌" active aria-pressed />
            <IconButton square label="Goma" icon="🧽" />
            <IconButton square label="Cuentagotas" icon="💧" />
            <IconButton square label="Línea" icon="╱" />
          </div>
        </Section>

        <Section title="Materiales" count="1 284">
          <List dense>
            <ListRow
              dense
              leading={<ColorSwatch color="#a17b4a" />}
              title="Tablas de roble"
              value="642"
            />
            <ListRow dense leading={<ColorSwatch color="#7d7d7d" />} title="Piedra" value="410" />
            <ListRow dense leading={<ColorSwatch color="#96604a" />} title="Ladrillos" value="232" />
          </List>
        </Section>
      </Panel>
      <div style={{ flex: 1 }} />
    </div>
  ),
}

export const SectionRhythm: Story = {
  name: 'Ritmo de secciones',
  render: () => (
    <Panel style={{ width: 246 }}>
      <Section title="Modo capa">
        <p className="sb-note" style={{ margin: 0 }}>
          Tres secciones seguidas, con el mismo espacio entre cada una.
        </p>
      </Section>
      <Section title="Simetría">
        <p className="sb-note" style={{ margin: 0 }}>
          El título no lleva línea divisoria: alcanza con el color y el espacio.
        </p>
      </Section>
      <Section title="Selección" count="0">
        <p className="sb-note" style={{ margin: 0 }}>
          El contador va en la misma línea, con cifras tabulares.
        </p>
      </Section>
    </Panel>
  ),
}
