import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Retroalimentación/Tooltip',
  component: Tooltip,
  args: { content: 'Encuadrar la construcción', children: <Button>Centrar</Button> },
  decorators: [
    (Story) => (
      <div style={{ padding: 60 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Por defecto',
  args: {
    content: 'Encuadrar la construcción',
    children: <Button>Centrar</Button>,
  },
}

export const WithShortcut: Story = {
  name: 'Con atajo',
  args: {
    content: 'Mostrar u ocultar la grilla',
    shortcut: 'G',
    children: <Button>Grilla</Button>,
  },
}

export const Placements: Story = {
  name: 'Posiciones',
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '72px 120px',
        gridTemplateColumns: 'repeat(2, max-content)',
        padding: '32px 88px',
      }}
    >
      <Tooltip content="Arriba del control" placement="top" defaultOpen>
        <Button>Arriba</Button>
      </Tooltip>
      <Tooltip content="Abajo del control" placement="bottom" defaultOpen>
        <Button>Abajo</Button>
      </Tooltip>
      <Tooltip content="A la izquierda" placement="left" defaultOpen>
        <Button>Izquierda</Button>
      </Tooltip>
      <Tooltip content="A la derecha" placement="right" defaultOpen>
        <Button>Derecha</Button>
      </Tooltip>
    </div>
  ),
}

export const LongContent: Story = {
  name: 'Texto largo',
  args: {
    content:
      'Modo Navegar: el arrastre mueve la cámara. Tocá espacio para volver a construir.',
    children: <Button>🖐 Navegar</Button>,
  },
}

export const OnIconButton: Story = {
  name: 'Sobre botones de ícono',
  render: () => (
    <div className="sb-row">
      <Tooltip content="Pincel" shortcut="B" placement="bottom">
        <IconButton square icon="🖌" label="Pincel" active aria-pressed />
      </Tooltip>
      <Tooltip content="Goma" shortcut="E" placement="bottom">
        <IconButton square icon="🧽" label="Goma" />
      </Tooltip>
      <Tooltip content="Cuentagotas" shortcut="I" placement="bottom">
        <IconButton square icon="💧" label="Cuentagotas" />
      </Tooltip>
      <Tooltip content="Relleno, sólo en modo capa" shortcut="F" placement="bottom">
        <IconButton square icon="🪣" label="Relleno" />
      </Tooltip>
    </div>
  ),
}

export const KeyboardOpens: Story = {
  name: 'Se abre con el teclado',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Tab abre el globo al instante; el mouse espera 350 ms. Escape lo cierra sin mover el foco.
      </p>
      <div className="sb-row">
        <Tooltip content="Deshacer" shortcut="Ctrl+Z">
          <IconButton icon="↶" label="Deshacer" />
        </Tooltip>
        <Tooltip content="Rehacer" shortcut="Ctrl+Shift+Z">
          <IconButton icon="↷" label="Rehacer" />
        </Tooltip>
      </div>
    </div>
  ),
}
