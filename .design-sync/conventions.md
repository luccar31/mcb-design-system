# Convenciones de @mcb/design-system

Design system para **editores densos y oscuros** (visores 3D, paneles de
herramientas, tablas de datos). 21 componentes y 97 tokens, todos montados desde
`window.McbDesignSystem`. Es un sistema **oscuro por diseño**: no tiene tema claro.

## 1. Envolvé todo en `.mcb-root`

No hay provider de React. La raíz del design system es una **clase CSS**:

```jsx
<div className="mcb-root">{/* toda la UI va acá adentro */}</div>
```

`.mcb-root` aporta el `background`, el `color`, la familia y el tamaño de fuente
base. Ponela una sola vez, lo más arriba posible, y enlazá la hoja única:
`<link rel="stylesheet" href="styles.css">`.

**Sin esa clase el diseño falla de una manera que engaña:** los componentes con
superficie propia (`Card`, `Panel`, `Callout`, `DataTable`, `Modal`) se siguen
viendo bien, así que parece que todo anda — pero los que heredan color del
contenedor (`EmptyState`, `Kbd`, `Select`, `ColorSwatch`, `ListRow`) quedan con
texto casi blanco (`--mcb-text` es `#e6eaf0`) sobre fondo blanco: ilegibles.

## 2. Los componentes se estilan por props, no por clases

Las clases `.mcb-*` son internas: **no son API y no hay que escribirlas**. Toda la
expresividad está en las props. Las verificadas:

| Prop | Valores | Componentes |
|---|---|---|
| `variant` | `solid` · `ghost` · `primary` | `Button`, `IconButton` |
| `tone` | `neutral` · `danger` (acciones) — `info` · `warn` · `danger` (`Callout`) | `Button`, `Callout`, `Chip` |
| `size` | `sm` · `md` · `lg` | `Button`, `IconButton`, `TextField`, `Select` |
| `elevation` / `edge` | `flat` · `raised` / `none` · `left` · `right` | `Panel` |
| `gap` / `bar` | `tight` · `normal` · `loose` / booleano | `Toolbar` |
| `mono` | booleano — cifras tabulares para coordenadas y conteos | `TextField` |

Detalles que ahorran un error: `TextField` **exige** `label` (usá `hideLabel` si
la UI ya lo nombra); `Panel` acepta `title`, `actions` y `footer` como nodos;
`Button` toma `leadingIcon`. El `.d.ts` de cada componente es el contrato exacto.

## 3. Para tu propio layout, usá los tokens

Todo lo que escribas alrededor de los componentes va con `var(--mcb-*)`, nunca
con valores fijos. Las 97 propiedades, por familia:

- **Superficies** `--mcb-bg`, `--mcb-surface`, `--mcb-surface-raised`,
  `--mcb-surface-field`, `--mcb-surface-sunken`, `--mcb-surface-hover`,
  `--mcb-surface-viewport`, `--mcb-surface-hud`, `--mcb-surface-paper`, `--mcb-scrim`
- **Texto** `--mcb-text`, `--mcb-text-muted`, `--mcb-text-faint`,
  `--mcb-text-on-accent`, `--mcb-text-on-paper`
- **Bordes** `--mcb-border`, `--mcb-border-control`, `--mcb-border-strong`,
  `--mcb-border-width`, `--mcb-border-width-thick`
- **Semántica** — no es una grilla regular, usá exactamente estos:
  `--mcb-accent` `--mcb-accent-strong` `--mcb-accent-dim`;
  `--mcb-danger` `--mcb-danger-text` `--mcb-danger-surface`;
  `--mcb-warn` `--mcb-warn-text` `--mcb-warn-surface`;
  `--mcb-ok` `--mcb-ok-border`; `--mcb-brand-light` `--mcb-brand-dark`
- **Categorías** `--mcb-cat-1` … `--mcb-cat-8`, para series y leyendas
- **Espaciado** `--mcb-space-0` … `--mcb-space-40` (escala `2 4 6 8 10 12 16 20 24 32 40`)
- **Tipografía** `--mcb-font-sans`, `--mcb-font-mono`; tamaños `--mcb-font-size-2xs`
  `--mcb-font-size-xs` `--mcb-font-size-sm` `--mcb-font-size-md` `--mcb-font-size-lg`
  `--mcb-font-size-xl`; pesos `--mcb-font-weight-regular` `--mcb-font-weight-semibold`
  `--mcb-font-weight-bold`; interlineado `--mcb-leading-tight` `--mcb-leading-normal`
  `--mcb-leading-relaxed`; tracking `--mcb-tracking-tight` `--mcb-tracking-normal`
  `--mcb-tracking-wide`
- **Forma y profundidad** `--mcb-radius-xs` … `-xl` y `-pill`,
  `--mcb-shadow-panel|modal|hud|inset-edge`
- **Controles y foco** `--mcb-control-height-sm|md|lg`, `--mcb-focus-ring-color|width|offset`,
  `--mcb-disabled-opacity`, `--mcb-duration-fast|base`, `--mcb-ease`, `--mcb-transition-control`
- **Capas** `--mcb-z-viewport-overlay`, `-hud`, `-sticky`, `-popover`, `-tooltip`, `-modal`

## 4. Dónde está la verdad

Antes de estilar, leé los archivos reales: `styles.css` y el `_ds_bundle.css` que
importa traen los 97 tokens y todas las reglas de los componentes. Por componente,
su `.d.ts` (el contrato de props) y su `.prompt.md` (cómo componerlo). Eso siempre
gana sobre este resumen.

## 5. Ejemplo idiomático

Componentes de la librería para los controles; tokens para tu pegamento de layout.

```jsx
<div className="mcb-root">
  <Panel
    title="Materiales"
    elevation="raised"
    actions={<Button size="sm" variant="ghost">Importar</Button>}
  >
    <Toolbar label="Acciones del bloque" gap="tight">
      <Button variant="primary" leadingIcon="✏️">Construir</Button>
      <Button>Centrar</Button>
      <ToolbarSpacer />
      <Kbd>Ctrl</Kbd>
    </Toolbar>

    <div style={{ display: 'grid', gap: 'var(--mcb-space-12)', marginTop: 'var(--mcb-space-16)' }}>
      <TextField label="Nivel de captura" mono size="sm" />
      <Callout tone="warn" title="Sin conexión">
        Los cambios quedan en este navegador.
      </Callout>
    </div>
  </Panel>
</div>
```

Además de los 21 componentes con tarjeta, el bundle exporta piezas de composición
sin tarjeta propia: `Section`, `CardButton`, `List`, `ToggleChip`,
`ToolbarGroup`, `ToolbarDivider`, `ToolbarSpacer`, `StatusItem`, `StatusMessage`,
`StatusSpacer`, `HudReadout`, `ViewportModeFrame`, `BlockSwatchStatic`.
