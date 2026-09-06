import type { Meta, StoryObj } from '@storybook/react'
import { controlHeight, space, zIndex } from './tokens'
import './foundations.css'

const meta: Meta = { title: 'Fundamentos/Espaciado' }
export default meta
type Story = StoryObj

export const Scale: Story = {
  name: 'Escala',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Base de 2 px. Cubre lo que la app ya usaba (3, 5, 6, 7, 9, 10, 11, 12, 14, 22, 26)
        colapsado a doce pasos. En paneles de 180–246 px el salto 8 → 16 es demasiado
        grande, por eso la escala es densa abajo y se abre arriba.
      </p>
      <div className="fx-scale">
        {Object.entries(space).map(([key, value]) => (
          <div key={key} style={{ display: 'contents' }}>
            <code>--mcb-space-{key}</code>
            <code>{value}</code>
            <span className="fx-scale__bar" style={{ width: value === '0' ? 1 : value }} />
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ControlHeights: Story = {
  name: 'Alturas de control',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Tres alturas medidas en la app: los filtros de categoría rondaban 24 px, los
        toggles 28 px y los botones de la barra 32 px. Ahora tienen nombre.
      </p>
      <div className="fx-scale">
        {Object.entries(controlHeight).map(([key, value]) => (
          <div key={key} style={{ display: 'contents' }}>
            <code>--mcb-control-height-{key}</code>
            <code>{value}</code>
            <span
              style={{
                height: value,
                width: 120,
                background: 'var(--mcb-surface-raised)',
                border: '1px solid var(--mcb-border-control)',
                borderRadius: 'var(--mcb-radius-md)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ZIndex: Story = {
  name: 'Capas (z-index)',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        La app tenía cinco valores sueltos (4, 5, 5, 50, 60) sin ninguna regla que dijera
        cuál va arriba de cuál. Estos seis están ordenados y nombrados por rol.
      </p>
      <div className="fx-scale">
        {Object.entries(zIndex).map(([key, value]) => (
          <div key={key} style={{ display: 'contents' }}>
            <code>--mcb-z-{key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}</code>
            <code>{value}</code>
            <span className="fx-scale__bar" style={{ width: 8 + value * 2 }} />
          </div>
        ))}
      </div>
    </div>
  ),
}
