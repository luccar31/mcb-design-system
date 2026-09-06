import type { Meta, StoryObj } from '@storybook/react'
import { contrast } from '../internal/contrast'
import { categorical, color } from './tokens'
import './foundations.css'

const meta: Meta = { title: 'Fundamentos/Contraste' }
export default meta
type Story = StoryObj

type Pair = {
  label: string
  fg: string
  bg: string
  /** 4.5 for body text, 3 for large text and UI boundaries. */
  target: number
  note?: string
}

function Row({ pair }: { pair: Pair }) {
  const ratio = contrast(pair.fg, pair.bg)
  const pass = ratio >= pair.target
  const close = !pass && ratio >= pair.target - 1
  return (
    <tr>
      <td>{pair.label}</td>
      <td>
        <span className="fx-contrast__sample" style={{ color: pair.fg, background: pair.bg }}>
          Capa y = 12
        </span>
      </td>
      <td className="fx-contrast__ratio">{ratio.toFixed(2)}:1</td>
      <td className="fx-contrast__ratio">{pair.target}:1</td>
      <td
        className={
          pass
            ? 'fx-contrast__grade--pass'
            : close
              ? 'fx-contrast__grade--warn'
              : 'fx-contrast__grade--fail'
        }
      >
        {pass ? 'pasa' : 'no pasa'}
      </td>
      <td style={{ color: 'var(--mcb-text-faint)' }}>{pair.note}</td>
    </tr>
  )
}

function Table({ pairs, caption }: { pairs: Pair[]; caption: string }) {
  return (
    <table className="fx-contrast">
      <caption
        style={{
          captionSide: 'top',
          textAlign: 'left',
          paddingBottom: 8,
          color: 'var(--mcb-text-muted)',
          fontSize: 'var(--mcb-font-size-xs)',
        }}
      >
        {caption}
      </caption>
      <thead>
        <tr>
          <th>Par</th>
          <th>Muestra</th>
          <th className="fx-contrast__ratio">Ratio</th>
          <th className="fx-contrast__ratio">Objetivo</th>
          <th>Estado</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        {pairs.map((pair) => (
          <Row key={pair.label} pair={pair} />
        ))}
      </tbody>
    </table>
  )
}

export const TextOnSurfaces: Story = {
  name: 'Texto sobre superficies',
  render: () => (
    <Table
      caption="Texto pequeño: objetivo 4,5:1 (WCAG 2.1 AA)."
      pairs={[
        { label: 'text / bg', fg: color.text, bg: color.bg, target: 4.5 },
        { label: 'text / surface', fg: color.text, bg: color.surface, target: 4.5 },
        { label: 'text / surface-raised', fg: color.text, bg: color.surfaceRaised, target: 4.5 },
        { label: 'text-muted / surface', fg: color.textMuted, bg: color.surface, target: 4.5 },
        {
          label: 'text-muted / surface-raised',
          fg: color.textMuted,
          bg: color.surfaceRaised,
          target: 4.5,
        },
        {
          label: 'text-faint / surface',
          fg: color.textFaint,
          bg: color.surface,
          target: 4.5,
          note: 'Sólo válido sobre surface, bg y sunken',
        },
        {
          label: 'text-faint / surface-raised',
          fg: color.textFaint,
          bg: color.surfaceRaised,
          target: 4.5,
          note: 'Por eso el token prohíbe esta combinación',
        },
        {
          label: 'text-on-accent / accent-dim',
          fg: color.textOnAccent,
          bg: color.accentDim,
          target: 4.5,
        },
        { label: 'danger-text / surface', fg: color.dangerText, bg: color.surface, target: 4.5 },
        { label: 'warn-text / warn-surface', fg: color.warnText, bg: color.warnSurface, target: 4.5 },
      ]}
    />
  ),
}

export const FocusAndBorders: Story = {
  name: 'Foco y bordes',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Objetivo 3:1 (WCAG 2.1 criterio 1.4.11, contraste de componentes no textuales).
        Las dos primeras filas son lo que hacía la app; las siguientes, lo que hace este
        sistema.
      </p>
      <Table
        caption="Anillo de foco y bordes de control."
        pairs={[
          {
            label: 'ANTES · accent-dim como anillo / campo',
            fg: color.accentDim,
            bg: color.surfaceField,
            target: 3,
            note: 'El anillo de foco original de la app',
          },
          {
            label: 'ANTES · border original / surface',
            fg: '#2e3846',
            bg: color.surface,
            target: 3,
            note: 'El único borde que existía',
          },
          {
            label: 'AHORA · accent como anillo / campo',
            fg: color.accent,
            bg: color.surfaceField,
            target: 3,
          },
          {
            label: 'AHORA · accent como anillo / surface',
            fg: color.accent,
            bg: color.surface,
            target: 3,
          },
          {
            label: 'AHORA · border-control / surface',
            fg: color.borderControl,
            bg: color.surface,
            target: 3,
            note: 'Todavía por debajo: ver la historia "Bordes: la decisión pendiente"',
          },
          {
            label: 'AHORA · border-strong / surface',
            fg: color.borderStrong,
            bg: color.surface,
            target: 3,
          },
          {
            label: 'AHORA · border-strong / surface-raised',
            fg: color.borderStrong,
            bg: color.surfaceRaised,
            target: 3,
          },
        ]}
      />
    </div>
  ),
}

export const BorderDecision: Story = {
  name: 'Bordes: la decisión pendiente',
  render: () => (
    <div className="sb-stack">
      <p className="sb-note">
        Un control en reposo se identifica por su borde. Con <code>--mcb-border-control</code>{' '}
        el borde llega a 2,04:1 contra el panel: se ve mucho mejor que el 1,36:1 original,
        pero no alcanza el 3:1 que pide la norma. Subirlo a{' '}
        <code>--mcb-border-strong</code> sí cumple, y cambia bastante el carácter de la
        interfaz. Es una línea de CSS y una decisión del dueño, no un accidente.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 24 }}>
        {[
          { label: 'Original · 1,36:1', border: '#2e3846' },
          { label: 'Ahora · 2,04:1', border: color.borderControl },
          { label: 'Opción AA · 3,76:1', border: color.borderStrong },
        ].map((option) => (
          <div key={option.label} className="sb-stack" style={{ gap: 8 }}>
            <code style={{ fontSize: 'var(--mcb-font-size-2xs)', color: 'var(--mcb-text-muted)' }}>
              {option.label}
            </code>
            <div
              style={{
                padding: 12,
                background: 'var(--mcb-surface)',
                borderRadius: 'var(--mcb-radius-lg)',
                display: 'flex',
                gap: 8,
              }}
            >
              {['Guardar', 'Importar'].map((text) => (
                <span
                  key={text}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: 'var(--mcb-control-height-lg)',
                    padding: '0 var(--mcb-space-12)',
                    background: 'var(--mcb-surface-raised)',
                    border: `1px solid ${option.border}`,
                    borderRadius: 'var(--mcb-radius-md)',
                    fontSize: 'var(--mcb-font-size-sm)',
                    fontWeight: 600,
                  }}
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const CategoricalOnPanel: Story = {
  name: 'Categorías sobre el panel',
  render: () => (
    <Table
      caption="Los ocho tonos categóricos como texto de 11 px sobre el panel."
      pairs={categorical.map((value, index) => ({
        label: `cat-${index + 1}`,
        fg: value,
        bg: color.surface,
        target: 4.5,
      }))}
    />
  ),
}
