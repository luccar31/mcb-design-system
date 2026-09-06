import type { Meta, StoryObj } from '@storybook/react'
import { fontFamily, fontSize, fontWeight, leading } from './tokens'
import './foundations.css'

const meta: Meta = { title: 'Fundamentos/Tipografía' }
export default meta
type Story = StoryObj

const SAMPLE = 'Guía de construcción · capa y = 12 · 1 284 bloques'

export const Sizes: Story = {
  name: 'Escala',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Once tamaños pasaron a seis. Se fueron los medios píxeles (10,5 / 11,5 / 12,5):
        no se renderizan igual en todos los navegadores y ninguno de los pares que
        separaban se distinguía a simple vista.
      </p>
      <div style={{ width: '100%' }}>
        {Object.entries(fontSize).map(([key, value]) => (
          <div key={key} className="fx-type-row">
            <code>
              --mcb-font-size-{key} · {value}
            </code>
            <span style={{ fontSize: value }}>{SAMPLE}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Weights: Story = {
  name: 'Pesos',
  render: () => (
    <div style={{ width: '100%' }}>
      {Object.entries(fontWeight).map(([key, value]) => (
        <div key={key} className="fx-type-row">
          <code>
            --mcb-font-weight-{key} · {value}
          </code>
          <span style={{ fontWeight: value, fontSize: 'var(--mcb-font-size-md)' }}>{SAMPLE}</span>
        </div>
      ))}
    </div>
  ),
}

export const Families: Story = {
  name: 'Familias',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Dos familias del sistema, sin fuentes web. Es una herramienta local que se usa
        junto al juego: una descarga de fuente sería una regresión y fallaría sin conexión.
      </p>
      <div style={{ width: '100%' }}>
        <div className="fx-type-row">
          <code>--mcb-font-sans</code>
          <span style={{ fontFamily: fontFamily.sans, fontSize: 'var(--mcb-font-size-md)' }}>
            Interfaz, etiquetas, prosa
          </span>
        </div>
        <div className="fx-type-row">
          <code>--mcb-font-mono</code>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 'var(--mcb-font-size-md)' }}>
            x 14 · y 7 · z 21 · oak_planks
          </span>
        </div>
      </div>
    </div>
  ),
}

export const LineHeights: Story = {
  name: 'Interlineado',
  render: () => (
    <div className="sb-stack">
      {Object.entries(leading).map(([key, value]) => (
        <div key={key} style={{ maxWidth: '62ch' }}>
          <code style={{ color: 'var(--mcb-text-muted)', fontSize: 'var(--mcb-font-size-2xs)' }}>
            --mcb-leading-{key} · {value}
          </code>
          <p style={{ lineHeight: value, margin: '4px 0 0' }}>
            La guía divide la construcción en capas horizontales. Cada paso muestra una
            capa con los bloques codificados por letra, y la capa anterior en gris claro
            para que puedas alinear sin contar desde el borde.
          </p>
        </div>
      ))}
    </div>
  ),
}

export const TabularNumerals: Story = {
  name: 'Cifras tabulares',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Las coordenadas y los conteos cambian mientras el cursor se mueve. Sin cifras
        tabulares, cada dígito tiene otro ancho y la línea entera tiembla. Mirá la columna
        de la derecha: los mismos números, sin tabular.
      </p>
      <div className="fx-tabular">
        <strong style={{ fontSize: 'var(--mcb-font-size-2xs)', color: 'var(--mcb-text-muted)' }}>
          Con tabular-nums
        </strong>
        <strong style={{ fontSize: 'var(--mcb-font-size-2xs)', color: 'var(--mcb-text-muted)' }}>
          Sin tabular-nums
        </strong>
        {['x 111 · y 111 · z 111', 'x 148 · y 703 · z 219', 'x 900 · y 888 · z 444'].map((row) => (
          <div key={row} style={{ display: 'contents' }}>
            <span className="fx-tabular__on">{row}</span>
            <span className="fx-tabular__off">{row}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
