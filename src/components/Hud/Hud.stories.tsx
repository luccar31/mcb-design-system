import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { HudBar, HudReadout, ViewportModeFrame } from './Hud'

const meta = {
  title: 'Superficies/HUD del visor',
  component: HudBar,
} satisfies Meta<typeof HudBar>

export default meta
type Story = StoryObj<typeof meta>

export const Bar: Story = {
  name: 'Barra flotante',
  render: () => (
    <div className="sb-viewport-frame">
      <HudBar label="Vista">
        <Button size="md" active aria-pressed leadingIcon="✏️">
          Construir
        </Button>
        <Button size="md">Centrar</Button>
        <Button size="md" active aria-pressed>
          Grilla
        </Button>
      </HudBar>
    </div>
  ),
}

export const Readout: Story = {
  name: 'Lectura de coordenadas',
  render: () => (
    <div className="sb-viewport-frame">
      <HudReadout
        entries={[
          ['x', 14],
          ['y', 7],
          ['z', 21],
          ['capa', 7],
        ]}
      />
    </div>
  ),
}

export const Positions: Story = {
  name: 'Posiciones',
  render: () => (
    <div className="sb-viewport-frame">
      <HudBar position="top-left" label="Arriba a la izquierda">
        <Button size="sm">top-left</Button>
      </HudBar>
      <HudBar position="top-right" label="Arriba a la derecha">
        <Button size="sm">top-right</Button>
      </HudBar>
      <HudBar position="bottom-left" label="Abajo a la izquierda">
        <Button size="sm">bottom-left</Button>
      </HudBar>
      <HudBar position="bottom-right" label="Abajo a la derecha">
        <Button size="sm">bottom-right</Button>
      </HudBar>
    </div>
  ),
}

export const BuildMode: Story = {
  name: 'Modo Construir',
  render: () => (
    <div className="sb-viewport-frame">
      <ViewportModeFrame mode="build" />
      <HudReadout entries={[['x', 14], ['y', 7], ['z', 21]]} />
      <HudBar label="Vista">
        <Button size="md" active aria-pressed leadingIcon="✏️">
          Construir
        </Button>
        <Button size="md">Centrar</Button>
      </HudBar>
    </div>
  ),
}

export const NavigateMode: Story = {
  name: 'Modo Navegar',
  render: () => (
    <div className="sb-viewport-frame">
      <ViewportModeFrame mode="navigate" />
      <HudReadout entries={[['x', 14], ['y', 7], ['z', 21]]} />
      <HudBar label="Vista">
        <Button size="md" leadingIcon="🖐">
          Navegar
        </Button>
        <Button size="md">Centrar</Button>
      </HudBar>
    </div>
  ),
}

export const ModeToggle: Story = {
  name: 'Cambio de modo',
  render: function ModeDemo() {
    const [build, setBuild] = useState(true)
    return (
      <div className="sb-viewport-frame">
        <ViewportModeFrame mode={build ? 'build' : 'navigate'} />
        <HudBar label="Vista">
          <Button
            size="md"
            active={build}
            aria-pressed={!build}
            leadingIcon={build ? '✏️' : '🖐'}
            onClick={() => setBuild((v) => !v)}
          >
            {build ? 'Construir' : 'Navegar'}
          </Button>
          <Button size="md">Centrar</Button>
        </HudBar>
      </div>
    )
  },
}
