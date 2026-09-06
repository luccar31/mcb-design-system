# @mcb/design-system

Tokens y primitivas de UI para MC Blueprint: el planificador de construcciones de
Minecraft. Están pensadas para lo que la app es — un editor **denso y oscuro**, con paneles
angostos a los costados de un visor 3D, que se maneja tanto con el mouse como con el
teclado.

No es un kit genérico. La paleta, las alturas de control y la densidad salieron de medir
`src/styles.css` de la app, no de un tema de plantilla. Lo que se cambió respecto de la app
está documentado, punto por punto y con su costo, en [`docs/audit.md`](docs/audit.md).

- **21 familias de componentes**, 34 exports, cada una con sus historias por variante y por
  estado.
- **102 custom properties** en `src/tokens/tokens.css`, con un espejo tipado en
  `src/tokens/tokens.ts` para lo que tiene que llegar a JavaScript (three.js, `<canvas>`,
  SVG).
- Contrastes calculados con la fórmula de WCAG 2.1 y mostrados **en vivo** en las historias
  de Fundamentos → Contraste. Ningún número de esa tabla está escrito a mano.

---

## Instalación

Requiere Node 24 y React 18 o 19 (`react` y `react-dom` son peer dependencies).

```bash
npm install
```

El paquete todavía no se publica. Para consumirlo desde la app, compilarlo y apuntar a la
carpeta:

```bash
npm run build          # deja dist/ listo
npm install ../mcb-design-system   # desde el repo de la app
```

## Uso

Importá el componente y la hoja de estilos **una sola vez**, en el punto de entrada:

```tsx
import '@mcb/design-system/styles.css'
import { Button, Panel, Section, TextField } from '@mcb/design-system'

export function ToolPanel() {
  return (
    <Panel edge="right" title="Herramienta">
      <Section title="Dimensiones">
        <TextField label="Ancho (X)" type="number" mono defaultValue={32} />
      </Section>
      <Button variant="primary" fullWidth>
        Guardar
      </Button>
    </Panel>
  )
}
```

Los estilos base del documento son opcionales y se piden con una clase:

```html
<body class="mcb-root">
```

Sin `.mcb-root` los componentes se ven igual — su modelo de caja y su tipografía viajan con
ellos. La clase sólo agrega el fondo, el color y la fuente del documento entero.

### Tokens

Tres maneras de llegar al mismo valor, según dónde estés:

```tsx
// 1. En CSS, que es lo que hace el propio design system
.mi-cosa { color: var(--mcb-text-muted); gap: var(--mcb-space-8); }

// 2. En JavaScript, cuando el valor tiene que ir a un material o a un canvas
import { color, space } from '@mcb/design-system'
material.color.set(color.accent)

// 3. Sólo las custom properties, sin traerse un componente
import '@mcb/design-system/tokens.css'
```

### Puntos de entrada

| Import | Qué trae |
| --- | --- |
| `@mcb/design-system` | Los componentes, los tokens tipados y, de arrastre, el CSS |
| `@mcb/design-system/styles.css` | La hoja completa: tokens, base y componentes |
| `@mcb/design-system/tokens.css` | Sólo las 102 custom properties |

## Storybook

Storybook es la documentación: cada componente tiene una historia por variante y por
estado, incluidos hover y foco.

```bash
npm run dev              # http://localhost:6006
npm run build-storybook  # sitio estático en storybook-static/
```

Empezá por **Fundamentos**: Color, Espaciado, Tipografía, Radios y sombras, y Contraste.
Esas cinco explican de dónde sale todo lo demás.

Hover y foco se muestran con las clases `is-hover` / `is-focus`. Existen en el CSS de cada
componente sólo para poder documentar un estado que el mouse no deja fijar; no las uses en
la app.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Storybook en el puerto 6006 |
| `npm run build` | Chequea tipos y compila `dist/` (ESM, CJS, `.d.ts`, CSS) |
| `npm run build-storybook` | Storybook estático en `storybook-static/` |
| `npm run typecheck` | `tsc --noEmit` sobre `src`, `.storybook` y `scripts` |
| `npm run shots` | Rehace `docs/screenshots/` |

`shots` necesita los dos servidores levantados y no levanta ninguno: Storybook en el 6006 y
la app en el 5180. Se le puede pasar `app` o `stories` para hacer una mitad sola, y
`APP_URL` / `SB_URL` para cambiar las direcciones.

## Cómo está armado

```
src/
  tokens/       tokens.css (102 propiedades), tokens.ts (espejo tipado),
                base.css, foundations.css, y las historias de Fundamentos
  components/   una carpeta por familia: .tsx, .css y .stories.tsx
  internal/     cx(), el cálculo de contraste WCAG y los datos de ejemplo
docs/
  audit.md      qué había en la app, qué hace mal, qué se colapsó en qué,
                y qué se cambió por decisión propia
  screenshots/  el antes (la app) y el después (Storybook)
```

Cada componente es **presentacional**: recibe props, devuelve marcado, no toca el store de
la app ni three.js. Lo que no se pudo aislar, y por qué, está en la sección 5 de
`docs/audit.md`.

## Convenciones

- El código es en inglés — identificadores, tipos, comentarios, títulos de historias.
- Los textos de interfaz son en español, incluido el contenido de ejemplo de las historias.
- Las clases CSS llevan el prefijo `mcb-` y siguen BEM: `.mcb-field__input`,
  `.mcb-btn--ghost`, con `.is-*` para los estados.
- Ningún componente escribe un color, un espacio o un radio literal: todo sale de un token.
