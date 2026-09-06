import type { Meta, StoryObj } from '@storybook/react'
import { categorical, color } from './tokens'
import './foundations.css'

const meta: Meta = { title: 'Fundamentos/Color' }
export default meta
type Story = StoryObj

type Swatch = { token: string; value: string; note: string }

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className="fx-swatches">
      {items.map((item) => (
        <div key={item.token} className="fx-swatch">
          <span className="fx-swatch__chip" style={{ background: item.value }} />
          <div className="fx-swatch__meta">
            <code className="fx-swatch__token">{item.token}</code>
            <code className="fx-swatch__value">{item.value}</code>
            <span className="fx-swatch__note">{item.note}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export const Surfaces: Story = {
  name: 'Superficies',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Seis niveles, todos heredados de la app. Separan poco a propósito: en un editor
        denso la jerarquía la llevan los bordes y el espacio, no el brillo.
      </p>
      <SwatchGrid
        items={[
          { token: '--mcb-bg', value: color.bg, note: 'Fondo de la aplicación' },
          { token: '--mcb-surface', value: color.surface, note: 'Paneles, barras, modales' },
          { token: '--mcb-surface-raised', value: color.surfaceRaised, note: 'Controles y tarjetas' },
          { token: '--mcb-surface-hover', value: color.surfaceHover, note: 'Control bajo el cursor' },
          { token: '--mcb-surface-field', value: color.surfaceField, note: 'Campos de texto' },
          { token: '--mcb-surface-sunken', value: color.surfaceSunken, note: 'Pozos: tecla, textura' },
          { token: '--mcb-surface-viewport', value: color.surfaceViewport, note: 'Fondo del visor 3D' },
        ]}
      />
    </div>
  ),
}

export const Text: Story = {
  name: 'Texto',
  render: () => (
    <div className="sb-stack">
      <SwatchGrid
        items={[
          { token: '--mcb-text', value: color.text, note: 'Texto principal' },
          { token: '--mcb-text-muted', value: color.textMuted, note: 'Etiquetas, metadatos' },
          { token: '--mcb-text-faint', value: color.textFaint, note: 'Sólo sobre surface / bg / sunken' },
          { token: '--mcb-text-on-accent', value: color.textOnAccent, note: 'Sobre accent-dim' },
        ]}
      />
      <div className="fx-text-demo">
        <p style={{ color: color.text }}>Texto principal — 13px, el peso de la interfaz.</p>
        <p style={{ color: color.textMuted }}>Texto atenuado — etiquetas de sección y metadatos.</p>
        <p style={{ color: color.textFaint }}>Texto tenue — marcas de tiempo en el registro.</p>
      </div>
    </div>
  ),
}

export const Borders: Story = {
  name: 'Bordes',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Tres niveles donde antes había uno. El borde tenue separa filas de una tabla; el
        de control dibuja el borde de un botón; el fuerte marca hover y énfasis.
      </p>
      <SwatchGrid
        items={[
          { token: '--mcb-border', value: color.border, note: 'Divisiones internas' },
          { token: '--mcb-border-control', value: color.borderControl, note: 'Borde de un control' },
          { token: '--mcb-border-strong', value: color.borderStrong, note: 'Hover y énfasis' },
        ]}
      />
      <div className="fx-border-demo">
        <div style={{ borderColor: color.border }}>--mcb-border</div>
        <div style={{ borderColor: color.borderControl }}>--mcb-border-control</div>
        <div style={{ borderColor: color.borderStrong }}>--mcb-border-strong</div>
      </div>
    </div>
  ),
}

export const AccentAndStatus: Story = {
  name: 'Acento y estado',
  render: () => (
    <SwatchGrid
      items={[
        { token: '--mcb-accent', value: color.accent, note: 'Selección, foco, énfasis' },
        { token: '--mcb-accent-strong', value: color.accentStrong, note: 'Hover sobre acento' },
        { token: '--mcb-accent-dim', value: color.accentDim, note: 'Relleno del estado activo' },
        { token: '--mcb-ok', value: color.ok, note: 'Guardado, sincronizado' },
        { token: '--mcb-warn', value: color.warn, note: 'Advertencias' },
        { token: '--mcb-warn-text', value: color.warnText, note: 'Texto sobre warn-surface' },
        { token: '--mcb-danger', value: color.danger, note: 'Borrar, error' },
        { token: '--mcb-danger-text', value: color.dangerText, note: 'Texto de error' },
      ]}
    />
  ),
}

export const Categorical: Story = {
  name: 'Categorías',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Ocho tonos que ya vivían sueltos en el panel de telemetría. Sirven para categorías
        de eventos, leyendas de capa y series de un gráfico. Todos superan 5,5:1 sobre el panel.
      </p>
      <SwatchGrid
        items={categorical.map((value, index) => ({
          token: `--mcb-cat-${index + 1}`,
          value,
          note: ['pointer', 'camera', 'edit', 'tool', 'keyboard', 'view', 'design', 'error'][index] ?? '',
        }))}
      />
    </div>
  ),
}
