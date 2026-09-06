# Notas de design-sync — @mcb/design-system

Gotchas específicos de este repo. Leelo antes de cualquier re-sync.

## Entorno (Windows)

- **Node no está en el PATH de la sesión.** Está instalado con nvm-windows en
  `C:\Users\lucas\AppData\Local\nvm\v24.20.0` (v24.20.0, npm 11.19.0). Todo comando
  necesita `export PATH="/c/Users/lucas/AppData/Local/nvm/v24.20.0:$PATH"` primero,
  o falla con `node: command not found` / `tsc no se reconoce`.
- **`npm ci` falla con EPERM y rompe `node_modules`.** Procesos `esbuild.exe`
  huérfanos de sesiones previas de Vite/Storybook mantienen abierto
  `node_modules/@esbuild/win32-x64/esbuild.exe`; `npm ci` borra el árbol y después
  muere al no poder unlinkear ese binario, dejando `node_modules` a medias (sin
  `.bin`, sin react ni typescript). **Usar `npm install`**, que se recupera sin
  tocar procesos. Si hiciera falta `npm ci`, cerrar antes los procesos esbuild/node
  huérfanos.
- Chromium de Playwright ya está en caché (`~/AppData/Local/ms-playwright/chromium-1243`).

## Forma del design system

- **No hay provider de React.** El wrapper raíz es una **clase CSS, `.mcb-root`**
  (definida en `src/tokens/base.css`, opt-in: "add the class when the design system
  owns the document"). Aporta `background`, `color`, `font-family` y `font-size`.
  Por eso `cfg.provider` no aplica acá: no existe un componente exportado que envuelva.
- **Las fuentes son stacks del sistema** (`--mcb-font-sans: system-ui...`,
  `--mcb-font-mono: ui-monospace...`). No hay webfonts que embarcar, así que
  `[FONT_MISSING]` no debería aparecer nunca.
- El CSS de `dist/mcb-design-system.css` lleva las 97 custom properties y `.mcb-root`
  (index.ts importa `tokens.css` + `base.css` como side-effect; `cssCodeSplit: false`).
- `dist/tokens.css` lo copia un plugin propio de `vite.config.ts` (`emitTokensCss`),
  no rollup — por eso su timestamp puede quedar viejo respecto del resto de `dist/`.

## Storybook

- `.storybook/preview.tsx` aplica un decorator `.sb-canvas` cuyos estilos viven en
  `.storybook/storybook.css` ("Storybook chrome only. Nothing here ships in dist.").
  `.sb-canvas` replica lo que `.mcb-root` hace en producción (fondo oscuro, padding,
  tipografía). Las stories además usan clases de andamiaje de ese mismo archivo
  (`.sb-grid`, `.sb-matrix`). **Riesgo de fidelidad:** si esos estilos no llegan a los
  previews, todo el roster se ve claro/sin padding contra un storybook oscuro.
- `src/tokens/foundations.css` lo importan sólo las 5 stories de Fundamentos; no
  entra en `dist`.
- Los títulos son en español y con jerarquía propia: `Fundamentos`, `Controles`,
  `Superficies`, `Datos`, `Retroalimentación`.
- `Superficies/HUD del visor` es el único título cuyo último segmento no coincide
  con un export (los exports son `HudBar`, `HudReadout`, `ViewportModeFrame`).

## Hallazgos de la fase solo (primer sync)

- **[GENERAL] Los previews renderizaban sobre blanco.** Síntoma: los 21 componentes
  claros contra un Storybook oscuro; los que tienen superficie propia (Card,
  Callout, Panel, DataTable) sobrevivían, pero los que heredan color del
  contenedor (EmptyState, Kbd, Select, ColorSwatch, ListRow) quedaban con texto
  casi blanco sobre blanco. Causa: el fondo lo aporta el decorator `.sb-canvas`,
  cuyos estilos viven en `.storybook/storybook.css` y **no viajan en `dist`**; el
  conversor sí bundlea el JS del decorator (`_vendor/preview-decorators.js`) y
  hasta emite su CSS (`_vendor/preview-decorators.css`), pero **ningún HTML lo
  enlaza**. Arreglo: `.design-sync/preview-chrome.css` (importa `storybook.css`)
  inyectado en cada wrapper por el fork `preview-gen-storybook.mjs`, más
  `cfg.storyImports.loaders {".css": "css"}` para que compile en vez de quedar
  vacío. Aterriza en `_preview/<Name>.css`, que `emit.mjs` enlaza solo.
  **No se puede resolver con `cssEntry` ni `tokensGlob`:** esos entran al cierre de
  `styles.css`, que es lo único que reciben los diseños renderizados — le
  enseñaría al agente de diseño clases `sb-*` que no son API del DS.
- **[GENERAL] `cfg.provider` no aplica en este repo.** Exige un componente
  exportado del bundle y acá la raíz es una clase CSS (`.mcb-root`). Inventar un
  `McbRoot` vía `extraEntries` sería peor: el agente escribiría código que no
  compila contra el paquete real.
- **[GENERAL] Geometría alineada al pixel.** El preview aplicaba su
  `body{padding:24px}` **más** el padding del canvas, quedando 24px corrido
  respecto de Storybook (que sólo aplica el del canvas). `.ds-single{margin:-24px}`
  lo cancela en modo single (capturas `?story=` y tarjetas `cardMode:"single"`).
  Con eso una diferencia de posición pasa a ser señal real, no ruido de encuadre.
- **`min-height` del canvas es modo-dependiente.** En la grilla hay que anularlo
  (`.ds-grid .sb-canvas{min-height:0}`) o cada celda mediría 100vh. En modo single
  hay que **conservarlo**: sin altura, un componente enteramente `position:fixed`
  (Modal) colapsa a 0px y dispara `[RENDER_THIN]`.
- **[GENERAL] El texto MONO se ve distinto entre los dos paneles de compare, en
  TODOS los componentes que lo usan — y es un artefacto del arnés, no del DS.**
  Síntoma: en Storybook los glifos mono salen con serifas y ~9% más anchos
  (ensanchando lo que los envuelve: el `<pre>` de Callout pasa de 403px a 436px,
  los chips de StatusBar corren la fila). Se ve en DataTable (columnas CÓD. y
  STACKS), Callout/Con detalle técnico, las 5 de StatusBar y Kbd.
  Causa raíz: `compare.mjs` fotografía los dos lados con APIs distintas — el lado
  Storybook con `elementHandle.screenshot()` sobre `#storybook-root`, el preview
  con `page.screenshot()`. `element.screenshot()` pasa por
  `Emulation.setDeviceMetricsOverride` y ahí Blink re-aplica sus `WebPreferences`
  con el default *hardcodeado* de fuente fija (**Courier New**) en lugar de la
  preferencia real del perfil (**Consolas**). A 7x se ve sin ambigüedad: el cero
  del preview lleva la barra diagonal de Consolas, el de Storybook es un óvalo
  liso de Courier New. A/B decisivo sobre la MISMA página de Storybook:
  `page.screenshot()` → Consolas, `root.screenshot()` → Courier New.
  **El lado fiel es el PREVIEW**, que es justamente el que se embarca. No es un
  delta calificable y no se arregla desde un `.tsx`.
  Precisión (medida sobre la MISMA página, misma sesión de Chromium): no es
  exclusivo de `elementHandle.screenshot()`, es **toda ruta de captura que excede
  el viewport** — `page.screenshot({fullPage:true})` da mono ANCHO,
  `page.screenshot({fullPage:false})` da ANGOSTO, y
  **`page.screenshot({clip})` da ANGOSTO incluso con un clip mayor que el
  viewport** (clip 900×748 sobre viewport 900×700). O sea: `clip` no dispara el
  bug. Cambiar la captura del lado Storybook a `page.screenshot({clip: bbox de
  #storybook-root})` alinearía los dos paneles sin tocar viewports.
  *Aun así NO se forkeó `compare.mjs`: el oráculo no se forkea* — perder la
  independencia de la verificación cuesta más que este ruido, y `.ds-sync/` se
  regenera en cada sync, así que el parche no sobreviviría igual. Es un hallazgo
  para reportar aguas arriba, no para parchear acá.
  Herramienta para inspeccionar: `.ds-sync/zoom-compare.mjs` (amplía la misma
  región de las dos capturas y las apila). Ojo al elegir la región: un recorte
  sobre una columna sans no muestra el efecto y lleva a concluir de más — es el
  error que se cometió en la primera pasada de este sync.
- **Causa de fondo, y esto sí es del DS:** `--mcb-font-mono` es
  `ui-monospace, SFMono-Regular, Menlo, monospace` y **ninguna de esas familias
  existe en Windows**, así que siempre cae en el genérico `monospace` — que es
  justo el valor que cambia entre las dos rutas de captura. Funciona (Chrome
  resuelve el genérico a Consolas), pero el stack no tiene ninguna familia de
  Windows explícita. Si algún día se quiere estabilizar, agregar `Consolas` y
  `Cascadia Mono` al stack lo haría determinista. **No se cambió en este sync:
  es una decisión del DS, no del sync.**
- El sans (`--mcb-font-sans` → Segoe UI) **no tiene ningún delta** entre paneles,
  verificado a 2x y 4x en los dos componentes con más texto (Callout, EmptyState).
- **El canario `[ASSETS_BLOCKED]` no aplica.** Ninguna story carga imágenes ni
  fuentes remotas: los "íconos" son emoji y los swatches son CSS. No hay riesgo
  de que un shell sin egress apruebe grados falsamente.
- `[GRID_OVERFLOW]`: 8 componentes se salían de su celda (`cardMode:"column"`) y
  Modal posiciona fuera de toda celda (`cardMode:"single"` + `primaryStory`).
  Todos resueltos en `overrides`.
- Las 5 páginas de `Fundamentos` (Color, Contraste, Espaciado, Radios y sombras,
  Tipografía) se excluyen con `titleMap: null`: son documentación de tokens, no
  componentes exportados. Los tokens igual viajan (`tokens/` + `styles.css`).

## Método para juzgar diferencias finas (de la fase de fan-out)

Antes de afirmar que un delta sutil es real, tres pasos — los tres se hacen con el
`playwright` de `node_modules` y `.ds-sync/storybook/http-serve.mjs`:

1. Diff de píxeles con bounding box por bandas, para **localizar** la diferencia.
2. Buscar el desplazamiento `(dx,dy)` que la minimiza: si algún entero da MAD=0,
   es un corrimiento de rasterizado, no de layout.
3. Recapturar los dos lados en **una sola sesión de Chromium**. Si ahí el diff es
   0, la diferencia la introdujo el arnés, no el componente.

Un residuo subpíxel (0.01–0.12% de píxeles) confinado a glifos de numerales mono
**no es señal** — es la misma asimetría de captura descrita arriba.

**El `iframe.html` de Storybook no monta desde `file://`**: hay que servirlo por
HTTP (`http-serve.mjs`) o la página queda vacía y las sondas devuelven nada.

## Notas operativas

- **El scratchpad es compartido entre subagentes concurrentes.** En esta corrida
  un agente pisó el `probe2.mjs` de otro a mitad de investigación. Si se vuelve a
  hacer fan-out, cada tanda debe prefijar sus scripts con el nombre del lote.
- `Tooltip/Sobre botones de ícono` usa el emoji 🪣, que en esta máquina sale como
  caja tofu — **en los dos paneles**, así que no afecta la fidelidad. Sí es un
  dato para quien diseñe con el sistema: ese emoji no se ve en Windows sin una
  fuente de emoji actualizada.
- `Tooltip` no necesita `cardMode:"single"`: en captura `?story=` sus globos
  abiertos quedan dentro del frame de 900×700. El `cardMode:"column"` alcanza.
- `docs/audit.md` (690 líneas) se copia a `guidelines/` por el glob por defecto
  (`docs/*.md`). Es el relevamiento de cómo se extrajo el DS de la app previa;
  su sección 1 describe el CSS **viejo** (84 clases que ya no existen). Se dejó
  porque es la única documentación del repo y separa con claridad lo histórico,
  pero conviene revisar si se quiere que el agente de diseño lo lea.

## Riesgos para el próximo re-sync

- **Los 5 veredictos `close` son todos el mismo artefacto de captura mono**
  (Kbd/`Línea de atajos`, ListRow/`Con metadatos`, HudBar/`Lectura de
  coordenadas`, `Modo Construir`, `Modo Navegar`). Ninguno es un defecto del
  preview: en los tres casos el contenido, los glifos y la geometría exterior son
  idénticos, y sólo la corrida de texto mono termina 10–26px antes. **Si un
  futuro `compare.mjs` iguala las rutas de captura, esos 5 deberían pasar a
  `match` solos.** Si en cambio aparece un `close` NUEVO fuera de texto mono, eso
  sí es señal: investigarlo.
- **Verificación parcial declarada:** se capturó con `--max-stories 12`, que cubre
  las 139 stories de los 21 componentes (el máximo por componente es 12, en
  Button). No quedó ninguna story sin capturar. Varios componentes usaron la regla
  de muestreo (`basis: "sibling-trusted"`): Callout 5, IconButton 5, TextField 5,
  EmptyState 4, SegmentedControl 4, Select 4, Card 3, StatusBar 3. Esas stories se
  fotografiaron pero no se juzgaron una por una.
- **No hay ningún `.design-sync/previews/*.tsx` propio.** Es deliberado: los
  wrappers generados reproducen las stories exactamente, y un preview propio
  quedaría para siempre haciendo sombra al generado. Si un re-sync futuro necesita
  uno, que sea por una causa específica de ese componente, nunca por una global.
- **El build asumió:** Node 24.20.0 (nvm-windows, fuera del PATH), Storybook
  8.6.18, chromium-1243 de Playwright, y `dist/` reconstruido con `npm run build`
  antes del conversor. Ningún asset se descarga de la red.
- **`.ds-sync/` se regenera en cada sync** (incluidos los helpers que se usaron
  acá: `zoom-compare.mjs`, `validate-names.mjs`, `font-probe.mjs`). Si hacen falta
  de nuevo, hay que reescribirlos — lo durable es esta nota.
