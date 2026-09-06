import type { Meta, StoryObj } from '@storybook/react'
import { duration, radius, shadow } from './tokens'
import './foundations.css'

const meta: Meta = { title: 'Fundamentos/Radios y sombras' }
export default meta
type Story = StoryObj

const RADIUS_ROLE: Record<string, string> = {
  xs: 'Muestra de color, tecla',
  sm: 'Tile de bloque, chip chico',
  md: 'Botón, campo, tarjeta',
  lg: 'Panel, panel flotante',
  xl: 'Modal',
  pill: 'Chip, pulgar del slider',
}

export const Radii: Story = {
  name: 'Radios',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        El radio codifica el tamaño del elemento, no un gusto: cuanto más grande la
        superficie, más redondeada. Diez valores de la app colapsados a seis roles.
      </p>
      <div className="fx-radius-row">
        {Object.entries(radius).map(([key, value]) => (
          <div key={key} className="fx-radius">
            <span className="fx-radius__box" style={{ borderRadius: value }} />
            <code>
              {key} · {value}
            </code>
            <code style={{ color: 'var(--mcb-text-faint)' }}>{RADIUS_ROLE[key]}</code>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Shadows: Story = {
  name: 'Sombras',
  render: () => (
    <div className="fx-shadow-row">
      {Object.entries(shadow)
        .filter(([key]) => key !== 'insetEdge')
        .map(([key, value]) => (
          <div key={key} className="fx-shadow" style={{ boxShadow: value }}>
            --mcb-shadow-{key}
          </div>
        ))}
      <div
        className="fx-shadow"
        style={{ boxShadow: shadow.insetEdge, background: '#e9ecec', color: '#0f1319' }}
      >
        --mcb-shadow-inset-edge
      </div>
    </div>
  ),
}

export const Motion: Story = {
  name: 'Movimiento',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Dos duraciones. 120 ms es el único valor que la app ya tenía, para el cambio de
        fondo de un botón; 180 ms es para lo que aparece, como un globo de ayuda. Con
        prefers-reduced-motion las dos pasan a 0.
      </p>
      <div className="fx-scale">
        {Object.entries(duration).map(([key, value]) => (
          <div key={key} style={{ display: 'contents' }}>
            <code>--mcb-duration-{key}</code>
            <code>{value}</code>
            <span className="fx-scale__bar" style={{ width: parseInt(value, 10) }} />
          </div>
        ))}
      </div>
    </div>
  ),
}
