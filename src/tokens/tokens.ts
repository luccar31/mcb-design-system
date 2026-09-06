/**
 * Typed mirror of tokens.css. Import these when a value has to reach
 * JavaScript (canvas, three.js materials, SVG attributes, chart series).
 */

export const color = {
  bg: '#12161c',
  surface: '#1b212a',
  surfaceRaised: '#222a35',
  surfaceHover: '#2b3543',
  surfaceField: '#141a22',
  surfaceSunken: '#10151b',
  surfaceViewport: '#1a1f27',
  surfaceHud: '#1b212ae0',
  surfacePaper: '#ffffff',
  scrim: '#060a0ecc',

  border: '#2e3846',
  borderControl: '#445265',
  borderStrong: '#6a7b94',

  text: '#e6eaf0',
  textMuted: '#93a0b1',
  textFaint: '#7f8b9c',
  textOnAccent: '#dbeaff',
  textOnPaper: '#0f1319',

  accent: '#6ba7ff',
  accentStrong: '#8dbcff',
  accentDim: '#24405f',

  danger: '#ff6b6b',
  dangerText: '#ffb3b3',
  dangerSurface: '#4a2226',
  ok: '#63d19e',
  okBorder: '#2c5f48',
  warn: '#e2b04a',
  warnText: '#ffd97a',
  warnSurface: '#4b3d12',

  brandLight: '#8fd06a',
  brandDark: '#6aa348',
} as const

/** Eight hues that stay apart on a dark ground. Telemetry, legends, charts. */
export const categorical = [
  '#6ba7ff',
  '#b58cff',
  '#63d19e',
  '#e2b04a',
  '#4ec9c9',
  '#8899aa',
  '#d98cc0',
  '#ff6b6b',
] as const

export const space = {
  0: '0',
  2: '2px',
  4: '4px',
  6: '6px',
  8: '8px',
  10: '10px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
} as const

export const radius = {
  xs: '3px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  pill: '999px',
} as const

export const fontFamily = {
  sans: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
} as const

export const fontSize = {
  '2xs': '11px',
  xs: '12px',
  sm: '13px',
  md: '15px',
  lg: '18px',
  xl: '22px',
} as const

export const fontWeight = { regular: 400, semibold: 600, bold: 700 } as const

export const leading = { tight: 1.2, normal: 1.45, relaxed: 1.6 } as const

export const tracking = { tight: '-0.01em', normal: '0', wide: '0.06em' } as const

export const shadow = {
  hud: '0 4px 14px #0007',
  panel: '0 18px 48px #0009',
  modal: '0 24px 60px #0009',
  insetEdge: 'inset 0 0 0 1px #0007',
} as const

export const duration = { fast: '120ms', base: '180ms' } as const

export const easing = { standard: 'cubic-bezier(0.2, 0, 0, 1)' } as const

export const controlHeight = { sm: '24px', md: '28px', lg: '32px' } as const

export const zIndex = {
  viewportOverlay: 4,
  hud: 5,
  sticky: 20,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const

export type ColorToken = keyof typeof color
export type SpaceToken = keyof typeof space
export type RadiusToken = keyof typeof radius
export type FontSizeToken = keyof typeof fontSize
export type ControlSize = keyof typeof controlHeight
