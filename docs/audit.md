# Relevamiento del design system de MC Blueprint

Este documento tiene tres partes:

1. **Qué había** — el inventario real de `src/styles.css` y de `src/ui/`, medido, no estimado.
2. **Qué extraje tal cual y qué colapsé** — cada valor que desapareció y en qué se convirtió.
3. **Qué cambié por decisión propia** — separado del resto a propósito, porque alguien va a
   tener que decidir si lo adopta.

Todo lo medido sale de la app tal como estaba el 6/9/2026, corriendo en
`http://localhost:5180`. Los contrastes se calcularon con la fórmula de WCAG 2.1
(luminancia relativa), no a ojo.

---

## 1. Qué había

### 1.1 El archivo

| Métrica | Valor |
| --- | --- |
| Líneas de `src/styles.css` | 317 |
| Bloques de reglas | 130 |
| Nombres de clase distintos | 84 |
| Apariciones de clases en posición de selector | 165 |
| Custom properties en `:root` | 10 (todas de color) |
| Valores hex escritos a mano fuera de `:root` | **36 apariciones, 30 valores distintos** |
| Estilos en línea (`style={{…}}`) en `App.tsx` + `src/ui/` | 27 |

El relevamiento preliminar hablaba de "~15 hex hardcodeados". Son 36. La diferencia
importa: más de la mitad del vocabulario cromático de la app vivía fuera del sistema de
tokens.

### 1.2 Colores fuera de los tokens

```
3 #0009        sombra de modal, sombra de panel flotante, fondo de .coord-readout
2 #ffb3b3      texto de error en .boot-error pre y en .row.cat-error .ev
2 #e2b04a      categoría "tool" del registro y .debug-panel header .warn
2 #b58cff      categoría "camera" y .debug-rows .g
2 #10151b      fondo de .kbd y de .boot-error pre
1 #6ba7ff      DUPLICADO A MANO de --accent, en .row.cat-pointer
1 #ffffff08    hover de fila del registro
1 #fff         fondo del lienzo de la guía
1 #ffd97a / #4b3d12   badge "repetir N×"
1 #dbeaff      texto de button.on
1 #d98cc0      categoría "design"
1 #8fd06a / #6aa348   gradiente del cubo de la marca
1 #8899aa      categoría "view"
1 #7f8b9c      .debug-rows .data
1 #5f6b7c      .debug-rows .t
1 #4ec9c9      categoría "keyboard"
1 #4a2226      hover de button.danger
1 #415063 / #41506380  borde de hover (dos formas del mismo color)
1 #2c5f48      borde de .chip.cloud
1 #2b3543      fondo de hover de botón
1 #1b212ae0    fondo de .view-tools button (--panel con alfa)
1 #1a1f27      fondo del visor
1 #141a22      fondo de los campos de texto
1 #0e1218      fondo de .blk
1 #060a0ecc    scrim del overlay
1 #0007 / #0006  borde interno de las muestras de color
```

Tres hallazgos acá:

- **Hay una paleta categórica completa escondida en el panel de telemetría.** Ocho tonos
  (`#6ba7ff`, `#b58cff`, `#63d19e`, `#e2b04a`, `#4ec9c9`, `#8899aa`, `#d98cc0`,
  `#ff6b6b`) que se distinguen bien entre sí sobre fondo oscuro y que nadie nombró.
  Sirven para categorías de eventos, leyendas de capa y series de un gráfico.
- **Hay tres "superficies hundidas" que hacen dos trabajos distintos**: `#0e1218` (tile de
  bloque), `#10151b` (tecla, bloque de código) y `#141a22` (campo de texto). Las dos
  primeras son más oscuras que el fondo; la tercera es más clara.
- **`#6ba7ff` está escrito a mano una vez** aunque `--accent` ya existía.

### 1.3 Espaciado

No había ni un token. Los valores de `padding`, `gap` y `margin` que aparecen:

| Valor | Apariciones (px totales en el archivo) |
| --- | --- |
| 1px | 27 |
| 8px | 15 |
| 10px | 15 |
| 12px | 14 |
| 6px | 11 |
| 3px | 11 |
| 5px | 10 |
| 11px | 10 |
| 9px | 9 |
| 7px | 8 |
| 4px | 7 |
| 2px | 7 |
| 24 / 22 / 20 / 18 / 16 / 14 px | 3–4 cada uno |

**Veintiocho combinaciones distintas de `padding`** para 130 reglas. Nueve `gap`
distintos. Cinco `margin-bottom` distintos entre 8 y 16 px. La única forma de saber cuánto
espacio poner era mirar la regla de al lado.

Los 27 usos de `1px` son todos `border-width`: eso sí era consistente.

### 1.4 Radios

Diez valores para diez roles: `3, 4, 5, 6, 7, 8, 9, 10, 12, 999`. Dos apariciones cada
uno. Cada componente eligió el suyo.

### 1.5 Tipografía

- **Una sola declaración de fuente**, en `body`: `13px/1.45 system-ui, -apple-system,
  "Segoe UI", Roboto, sans-serif`.
- **Dos stacks monoespaciados distintos**: `ui-monospace, monospace` (7 usos) y
  `ui-monospace, SFMono-Regular, Menlo, monospace` (3 usos). El mismo rol, dos listas.
- **Once tamaños de fuente**: 10,5 / 11 / 11,5 / 12 / 12,5 / 13 / 15 / 17 / 18 / 19 / 21.
  Cinco de ellos caen dentro de 2 px entre sí y tres tienen medio píxel.
- **Dos pesos**: 600 (4 usos) y 700 (3 usos).
- **Un solo interlineado** (1.45) para todo, desde una etiqueta de una línea hasta un
  párrafo de ayuda de cuatro renglones.
- **Tres tracking**: `-.2px`, `.05em`, `.07em`.
- **Cero `font-variant-numeric`**, en una app cuya pantalla principal muestra coordenadas
  que cambian con cada movimiento del mouse.

### 1.6 Sombras, transiciones, z-index

- **4 sombras**, todas escritas a mano: `0 24px 60px #0009`, `0 18px 48px #0009`,
  `inset 0 0 0 1px #0006`, `inset 0 0 0 1px #0007`. Las dos últimas son el mismo efecto
  con 7 % de diferencia de alfa.
- **1 transición**, una sola vez: `background .12s, border-color .12s` en `button`. Nada
  más en la app anima nada.
- **5 z-index**: 4, 5, 5, 50, 60. Sin ninguna regla escrita sobre qué va arriba de qué.
  El globo de ayuda que la app no tiene no habría sabido dónde ponerse.

### 1.7 Reglas duplicadas

Cuatro selectores aparecen dos veces en el archivo, con la segunda declaración pisando a
la primera en vez de editarla:

```
.debug-panel        (líneas 259 y 304 — la segunda cambia width y max-height)
.debug-rows .t      (líneas 289 y 310 — la segunda cambia min-width)
.debug-rows .ev     (líneas 291 y 311 — ídem)
.main               (línea 84 y dentro del media query — este es legítimo)
```

### 1.8 Los estilos en línea

27 `style={{…}}` en el JSX. **Trece son puro espaciado**: `marginTop: 5, 6, 6, 6, 7, 8, 10,
12`, `marginBottom: 8, 8`, `margin: '18px 0 8px'`, `margin: '0 0 8px'`,
`margin: '60px auto'`. Eso es exactamente lo que pasa cuando no hay escala de espaciado:
se filtra al JSX, donde ningún linter de CSS la ve.

### 1.9 Los diez componentes

| Componente | Acopla con | Parte presentacional aislable |
| --- | --- | --- |
| `TopBar` | `useEditor` (store completo, no selector), `export/files`, `export/schem`, `export/guide` | Barra de aplicación, grupos de botones, campo de nombre, chip de estado de guardado |
| `ToolPanel` | `useEditor`, `blocks/palette`, `voxel/ops`, `export/guide` | Panel lateral, secciones tituladas, grilla de herramientas, control segmentado, slider con pasos, lista de materiales |
| `PalettePanel` | `useEditor`, `blocks/palette`, `blocks/atlas` | Tarjeta de bloque actual, campo de búsqueda, filtros por categoría, grilla de tiles seleccionables |
| `DesignsPanel` | `useEditor`, `types` (MAX_AXIS), `AuthPanel` | Modal completo, filas de lista con acciones, estado vacío, fila de tres campos numéricos |
| `GuideView` | `useEditor`, `blocks/palette`, `export/guide` | Tabla de leyenda, tira de pasos, navegación anterior/siguiente, badge de repetición |
| `AuthPanel` | `storage` (Supabase), `useEditor` | Sección titulada, campo de email + botón, mensajes de error y de éxito |
| `CoordReadout` | `useEditor` | Lectura flotante sobre el visor — **casi todo presentacional** |
| `ModeIndicator` | `useEditor` | Botón de dos estados sobre el visor — **casi todo presentacional** |
| `DebugPanel` | `debug/*` (ring buffer, eventos, niveles) | Panel flotante con cabecera, fila de chips filtro, filas de registro monoespaciadas, vista de resumen |
| `ErrorBoundary` | `debug` | La caja `.boot-error`: título, ayuda, `<pre>` con el stack, botón |

**Ninguno es reutilizable tal como está**, y la razón es la misma en los ocho primeros: la
lectura del store y el dibujo están en la misma función. `TopBar` y `ToolPanel` ni siquiera
usan selectores — hacen `const s = useEditor()`, así que se vuelven a renderizar ante
cualquier cambio del store, incluso el movimiento del cursor.

---

## 2. Lo que la app hace mal (medido)

Esta es la parte que más sirve. Todo lo de acá está verificado en el navegador o
calculado, no supuesto.

### 2.1 En pantallas angostas el visor 3D desaparece

Con el viewport en 391 px de ancho, medido en la app corriendo:

```
.main      ancho 390
.side      ancho 180
.side.right ancho 210
.viewport  ancho 0        ← el editor 3D
canvas     ancho 378, posición x=180   ← el canvas viejo, encima del panel derecho
.topbar    alto 190       ← la mitad de la pantalla es barra de herramientas
```

`.main { grid-template-columns: 180px 1fr 210px }` en el media query de 1080 px suma
390 px de paneles fijos. La columna central no tiene `min-width`, así que colapsa a cero.
El `<canvas>` de three.js queda con su tamaño anterior y se dibuja encima del panel
derecho. La app no es "difícil de usar" en celular: **no se puede usar**.

Los paneles laterales tampoco se reordenan ni se colapsan: hay dos breakpoints en todo el
archivo (uno de `.main` y uno implícito en `.modal`), y ninguno contempla que la pantalla
sea más angosta que la suma de los paneles.

### 2.2 El anillo de foco es prácticamente invisible

`input:focus, select:focus { outline: 2px solid var(--accent-dim) }`.

| Par | Contraste | Mínimo WCAG 1.4.11 |
| --- | --- | --- |
| `--accent-dim` (#24405f) sobre el fondo del campo (#141a22) | **1,64:1** | 3:1 |
| `--accent-dim` sobre `--panel` (#1b212a) | **1,52:1** | 3:1 |

La app reemplazó el anillo de foco del navegador —que es de alto contraste por diseño— por
uno que no se ve. Los `<button>` no tienen ninguna regla de foco: se quedan con el del
navegador, así que la app tiene **dos idiomas de foco distintos** y el peor de los dos es
el que escribió a mano.

### 2.3 Los bordes no se ven

| Par | Contraste |
| --- | --- |
| `--line` (#2e3846) sobre `--panel` (#1b212a) | **1,36:1** |
| `--line` sobre `--panel-2` (#222a35) | **1,22:1** |
| `#41506380` (hover) sobre `--panel-2` | **1,76:1** |
| `--panel-2` sobre `--panel` (relleno del botón contra el panel) | **1,12:1** |

Un botón en reposo se distingue del panel por 1,12:1 de relleno y 1,22:1 de borde.
Combinados no llegan a identificar el control. En una app de paneles densos, donde toda la
estructura la llevan los bordes, esto es el problema visual central.

### 2.4 El modal no atrapa el foco ni cierra con Escape

Verificado en el navegador: con el modal "Diseños" abierto, tres Tab llevan el foco a los
botones de la barra superior, **detrás del scrim**. Escape no cierra el diálogo — el
`keydown` global de `App.tsx` intercepta Escape y lo usa para `cancelAnchor()` y
`clearSelection()`. Tampoco hay `role="dialog"` ni `aria-modal`.

### 2.5 Los tres campos de dimensiones se ven distinto que el resto

En `DesignsPanel`, los `<input type="number">` están adentro de un `<label class="label">`.
Como la regla global es `button, input, select, textarea { font: inherit; color: inherit }`,
heredan de la etiqueta:

```
input de nombre     13px   #e6eaf0   (--text)
input de Ancho (X)  11.5px #93a0b1   (--muted)   ← medido en el navegador
input de Alto (Y)   11.5px #93a0b1
input de Largo (Z)  11.5px #93a0b1
```

El número que el usuario escribió se muestra con el estilo de un metadato.

### 2.6 La barra de estado no puede envolver

`.status` es `display: flex` sin `flex-wrap`. Con seis atajos de teclado adentro, en
cualquier ventana menor a ~1100 px el contenido se desborda y el mensaje de estado —lo
único que confirma que un export salió bien— se sale de pantalla.

### 2.7 Nueve acciones de la misma jerarquía visual

La barra superior tiene: Diseños, Guardar, Deshacer, Rehacer, Editar, Guía, Imprimir guía,
Exportar JSON, Exportar .schem, Importar. **Todas se dibujan exactamente igual.** No hay
acción primaria. "Guardar" y "Exportar JSON" pesan lo mismo.

### 2.8 Toda la ayuda es `title=""` del navegador

18 usos de `title` y ni un componente de tooltip. En una herramienta donde hay que
descubrir 7 herramientas, 3 ejes de corte y 3 modos de capa, la única explicación disponible
aparece después de un segundo de espera, sin estilo, y **nunca con el teclado**.

### 2.9 Dos idiomas de selección

- `button.on`: relleno `--accent-dim` + borde `--accent` + texto `#dbeaff`.
- `.blk.sel`: `outline: 2px solid var(--accent); outline-offset: -2px` + borde `--accent`.

Dos formas de decir "esto está elegido", en la misma pantalla.

### 2.10 Un nombre de clase, dos componentes

- `.chip` es a la vez una etiqueta de estado (`<span>` de "☁ nube" en `TopBar`) y un botón
  de filtro (`<button class="chip">` en `DebugPanel`), con `cursor: pointer` agregado
  después en dos reglas separadas.
- `.row` es a la vez una fila de controles de panel (`display:flex; gap:6px`) y una fila
  del registro de telemetría (`.debug-rows .row`, con `border-left` de categoría).
- `.nm` es el nombre del bloque actual (12,5 px, peso 600) y el nombre de un material
  (12 px, peso normal).

### 2.11 Texto que no llega al mínimo de contraste

| Par | Contraste | Dónde |
| --- | --- | --- |
| `#5f6b7c` sobre `--panel` | **2,99:1** | marca de tiempo de cada fila del registro |
| `#7f8b9c` sobre `--panel` | 4,68:1 | datos de cada fila del registro (pasa justo) |
| Botón deshabilitado (`opacity: .4`) sobre `--panel-2` | ~3,20:1 | todos los botones deshabilitados |

### 2.12 CSS muerto

`input[type="email"]` y `select` están estilados en `styles.css`. `select` **no se usa en
ningún componente**: no hay un solo `<select>` en el JSX.

---

## 3. Extracción: qué colapsé y en qué

### 3.1 Color — 30 valores sueltos a 34 tokens con nombre

**Colapsados:**

| Antes | Ahora | Motivo |
| --- | --- | --- |
| `#0e1218` + `#10151b` | `--mcb-surface-sunken: #10151b` | Dos pozos con 2 % de diferencia. `#141a22` se quedó aparte como `--mcb-surface-field` porque es *más claro* que el fondo, no más oscuro: es otro rol. |
| `#415063` + `#41506380` | `--mcb-border-strong` | El mismo color con y sin alfa. |
| `inset 0 0 0 1px #0006` + `#0007` | `--mcb-shadow-inset-edge` con `#0007` | 7 % de alfa de diferencia. |
| `#5f6b7c` + `#7f8b9c` | `--mcb-text-faint: #7f8b9c` | El primero no llegaba a 3:1. Sobrevive el que pasa AA. |
| `#6ba7ff` escrito a mano | `--mcb-accent` | Era el token, duplicado. |
| `ui-monospace, monospace` + la versión con SFMono/Menlo | `--mcb-font-mono` con la lista completa | El mismo rol con dos listas de respaldo. |

**Promovidos a token sin cambiar el valor:** `#1a1f27` (visor), `#1b212ae0` (HUD de
vidrio), `#141a22` (campo), `#060a0ecc` (scrim), `#2b3543` (hover), `#4a2226` (superficie
de peligro), `#ffb3b3` (texto de error), `#e2b04a` + `#ffd97a` + `#4b3d12` (advertencia),
`#2c5f48` (borde de nube), `#dbeaff` (texto sobre acento), `#8fd06a` + `#6aa348` (marca), y
los ocho tonos categóricos.

### 3.2 Espaciado — 28 combinaciones de padding a 12 pasos

Base de 2 px: `0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40`.

| Valor original | Pasa a | Dónde aparecía |
| --- | --- | --- |
| 3 | 4 (o 2 en filas densas) | `padding: 3px 8px` de los filtros, `gap: 3px` de materiales |
| 5 | 4 o 6 | `gap: 5px` de la grilla de bloques, `padding: 5px 8px` de toggles |
| 7 | 6 u 8 | `padding: 7px` de `.current`, `gap: 7px` de `.mat` |
| 9 | 8 o 10 | `padding: 9px 11px` de `.ditem`, `gap: 9px` de `.current` |
| 11 | 10 o 12 | `padding: 6px 11px` de los botones |
| 14 | 16 | `gap: 14px` de `.status` y de `.guide-head` |
| 18 | 16 o 20 | `padding: 18px 20px` del modal |
| 22 | 20 o 24 | `padding: 22px 24px` de `.boot-error` |
| 26 | 24 | `padding: 20px 26px` de `.guide` |

La escala es densa abajo (2, 4, 6, 8, 10, 12) y se abre arriba (16, 20, 24, 32, 40) a
propósito: en una columna de 180–246 px, un salto de 8 a 16 se come el ancho útil.

### 3.3 Radios — 10 valores a 6 roles

| Antes | Ahora | Rol |
| --- | --- | --- |
| 3, 4, 5 | `--mcb-radius-xs: 3px` | Muestra de color, tecla |
| 5, 6 | `--mcb-radius-sm: 6px` | Tile de bloque, chip chico |
| 7, 8, 9 | `--mcb-radius-md: 8px` | Botón, campo, tarjeta |
| 9, 10 | `--mcb-radius-lg: 10px` | Panel, panel flotante |
| 12 | `--mcb-radius-xl: 12px` | Modal |
| 999 | `--mcb-radius-pill` | Chip, pulgar del slider |

Los botones pasan de 7 px a 8 px. Es el único cambio de radio perceptible.

### 3.4 Tipografía — 11 tamaños a 6

| Antes | Ahora |
| --- | --- |
| 10,5 · 11 | `--mcb-font-size-2xs: 11px` |
| 11,5 · 12 | `--mcb-font-size-xs: 12px` |
| 12,5 · 13 | `--mcb-font-size-sm: 13px` |
| 15 | `--mcb-font-size-md: 15px` |
| 17 · 18 · 19 | `--mcb-font-size-lg: 18px` |
| 21 | `--mcb-font-size-xl: 22px` |

Se fueron los tres tamaños con medio píxel. Ningún par que colapsé se distinguía a simple
vista: 10,5 y 11 difieren en medio píxel; 12,5 y 13 también.

Pesos: quedan los dos que existían (600, 700) más el 400 implícito del `body`. **No agregué
un peso 500**: la app no lo usaba y un peso más no resuelve ningún problema medido.

### 3.5 z-index — 5 valores sueltos a 6 con orden

`4 → viewport-overlay`, `5 → hud`, `50 → modal`, `60 → popover`. Agregué `20 → sticky` y
`70 → tooltip` porque el tooltip nuevo tiene que poder aparecer sobre un modal.

### 3.6 Componentes — 84 clases a 21 familias (34 exports)

| Primitiva | Reemplaza a |
| --- | --- |
| `Button` | `button`, `.on`, `.ghost`, `.danger`, `.toggles button`, `.cats button`, `.view-tools button`, `.steps-strip button` |
| `IconButton` | `.tools button`, los `↶ ↷ ✕ ▼ ▲` sueltos |
| `SegmentedControl` | `.toggles` y `.cats` cuando la elección es exclusiva |
| `Toolbar` (+ `Group`, `Spacer`, `Divider`) | `.topbar`, `.grp`, `.spacer`, `.row`, `.debug-filters .sep` |
| `Panel` + `Section` | `.side`, `.side.right`, `.debug-panel`, `.section`, `.section h3` |
| `TextField` | `input[type=text\|number\|email]`, `.name-input`, `.label` como envoltorio |
| `Select` | `select` (que estaba estilado y sin usar) |
| `Chip` / `ToggleChip` | `.chip`, `.chip.cloud`, `.chip.on`, `.rep`, `.debug-filters .chip` |
| `Kbd` | `.kbd` |
| `Slider` | `input[type=range]` + `.slice-num` + la fila `▼ ▲ "de 0 a N"` |
| `BlockSwatch` / `BlockSwatchStatic` | `.blk`, `.blk.sel`, `.blk img`, `.current img` |
| `ColorSwatch` | `.sw` (y su parche en línea dentro de `GuideView`) |
| `Card` / `CardButton` | `.current`, la caja de `.ditem` |
| `List` / `ListRow` | `.dlist`, `.ditem`, `.mats`, `.mat`, `.mat .n`, `.mat .nm` |
| `EmptyState` | `.empty` |
| `Callout` | `.boot-error`, `.err`, `.hint` cuando es un aviso |
| `Modal` | `.overlay`, `.modal`, `.modal h2`, `.modal .sub` |
| `Tooltip` | los 18 `title=""` |
| `HudBar` / `HudReadout` / `ViewportModeFrame` | `.view-tools`, `.coord-readout`, `.viewport.navigate::after` |
| `StatusBar` (+ `Item`, `Spacer`, `Message`) | `.status`, `.status .msg` |
| `DataTable` | `.legend-tbl` y sus cuatro modificadores de celda |

`.mat`, `.ditem` y `.current` eran **la misma forma**: ranura izquierda, texto apilado,
ranura derecha. Los tres son ahora `ListRow` con distintas props.

---

## 4. Lo que cambié por decisión propia

Nada de acá estaba en la app. Cada punto dice qué gana y qué cuesta.

### 4.1 El anillo de foco pasa a `--mcb-accent`

**Cambio:** de `--accent-dim` (1,64:1) a `--accent` (5,93 a 7,51:1 según la superficie), en
todos los controles, con `:focus-visible` y `outline-offset: 2px`.
**Por qué:** es el único incumplimiento de accesibilidad de la app que no se puede
justificar con ningún argumento de densidad ni de estética. El color ya era de la app; sólo
estaba usado el tono equivocado de los dos.
**Costo:** el anillo se nota más. En una herramienta que se maneja con teclado eso es lo
que se busca.

### 4.2 Tres niveles de borde donde había uno

| Token | Valor | Contraste sobre `--surface` | Uso |
| --- | --- | --- | --- |
| `--mcb-border` | `#2e3846` (el original) | 1,36:1 | Separadores internos: filas de tabla, divisiones de panel |
| `--mcb-border-control` | `#445265` | **2,04:1** | Borde de un control interactivo |
| `--mcb-border-strong` | `#6a7b94` | **3,76:1** | Hover y énfasis |

**Esto no llega a cumplir WCAG 1.4.11 en reposo y lo digo en claro.** Para cumplirlo hay
que usar `--mcb-border-strong` como borde por defecto de los controles, que es una línea:

```css
:root { --mcb-border-control: var(--mcb-border-strong); }
```

Cambia bastante el carácter de la interfaz: se vuelve más "de alambre". La historia
**Fundamentos → Contraste → "Bordes: la decisión pendiente"** muestra las tres opciones
lado a lado a tamaño real. Es una decisión del dueño, no algo que yo deba resolver solo.

### 4.3 Cifras tabulares en todo lo que cambia en el lugar

**Cambio:** `font-variant-numeric: tabular-nums` en la lectura de coordenadas, el índice de
capa, los conteos de materiales, las columnas numéricas de tabla y los metadatos de fila.
**Por qué:** la pantalla principal muestra `x 14 · y 7 · z 21` actualizándose con cada
movimiento del mouse. Sin cifras tabulares cada dígito tiene otro ancho y la línea entera
tiembla. Es específico de esta app: es una herramienta de medición.
**Costo:** ninguno. La familia monoespaciada ya estaba elegida para esos lugares.

### 4.4 `opacity` de deshabilitado de 0,4 a 0,5

**Cambio:** `--mcb-disabled-opacity: 0.5`. Sube el contraste de ~3,20:1 a ~4,16:1.
**Por qué:** un botón deshabilitado en esta app lleva información (no hay nada que
deshacer, no hay selección que copiar). Al 40 % no se lee de qué botón se trata.
**Costo:** un poco menos de diferencia entre habilitado y deshabilitado. Sigue siendo un
salto de 2× y se acompaña con `cursor: not-allowed`.

### 4.5 Variante `primary` de botón

**Cambio:** un botón con relleno de acento, además de `solid` y `ghost`.
**Por qué:** la barra superior tiene diez acciones dibujadas exactamente igual. "Guardar" y
"Crear diseño" son las que el usuario busca; "Exportar JSON" no.
**Costo:** hay que decidir cuál es la acción primaria en cada pantalla. Ese es el trabajo,
no el costo.
**Ojo:** el estado activo (`active`) usa el mismo relleno de acento que `primary`. En un
mismo grupo, no mezclar los dos.

### 4.6 Un solo idioma de selección

**Cambio:** `BlockSwatch` seleccionado usa el mismo relleno/borde de acento que
`button.on`, dibujado con un `::after` interno para que la grilla no se mueva un píxel.
**Por qué:** dos formas de decir "elegido" es una de más.
**Costo:** el tile de bloque se ve un poco distinto que antes.

### 4.7 Un componente `Tooltip` de verdad

**Cambio:** globo con estilo propio, que se abre al instante con el teclado y con 350 ms de
espera con el mouse, se cierra con Escape, y usa `aria-describedby` para no pisar el nombre
del control.
**Por qué:** los 18 `title=""` de la app nunca aparecen con el teclado, y los atajos (B, E,
I, L, R, F, S, G, C, X, Z, 1, 2, 3) sólo están documentados ahí.
**Costo:** hay que envolver el control. El `title` nativo sigue funcionando como respaldo:
`IconButton` pone los dos.

### 4.8 El `Modal` atrapa el foco y cierra con Escape

**Cambio:** `role="dialog"`, `aria-modal`, ciclo de Tab dentro del diálogo, foco al primer
control al abrir, foco devuelto al disparador al cerrar, Escape capturado en fase de
captura para que el atajo global de la app no se lo lleve primero.
**Por qué:** hoy, con el modal abierto, tres Tab te dejan operando la barra de arriba.
**Costo:** el `keydown` global de `App.tsx` va a tener que dejar de manejar Escape cuando
hay un diálogo abierto, o el diálogo se lo come primero (que es lo correcto).

### 4.9 La barra de estado envuelve

**Cambio:** `flex-wrap: wrap` con `row-gap`.
**Por qué:** hoy el mensaje de estado se sale de pantalla en cualquier ventana menor a
~1100 px.
**Costo:** la barra puede ocupar dos renglones. Es preferible a perder el mensaje.

### 4.10 Los campos ya no heredan la fuente

**Cambio:** `TextField` y `Select` declaran su `font-family` y su `font-size` explícitos en
lugar de `font: inherit`.
**Por qué:** el bug del punto 2.5: tres campos rendereando a 11,5 px en color de metadato.
**Costo:** ninguno.

### 4.11 Tres interlineados y un tracking menos

**Cambio:** `1.2` (títulos y controles de una línea), `1.45` (el de la app, texto de
interfaz), `1.6` (párrafos de ayuda). Tracking: `-0.01em` y `0.06em` (que colapsa `.05em` y
`.07em`).
**Por qué:** 1.45 en una etiqueta de una línea agranda la altura del control sin motivo, y
en un párrafo de ayuda de cuatro renglones queda apretado.

### 4.12 `prefers-reduced-motion`

**Cambio:** las dos duraciones pasan a 0 ms.
**Por qué:** la app no lo contemplaba. Es una línea.

### 4.13 Lo que decidí NO cambiar

- **Las mayúsculas de los títulos de sección.** Es un tell típico de diseño generado, pero
  acá es el idioma de los editores de contenido (Blender, Figma, Photoshop) y la app ya lo
  tenía. Lo mantuve exactamente igual y no lo extendí a ningún otro lugar.
- **La familia tipográfica.** `system-ui` + `ui-monospace`. Es una herramienta local que se
  usa al lado del juego: una fuente web sería una regresión y fallaría sin conexión.
- **La paleta.** Ni un tono nuevo. El azul frío gris de la app ya es específico y no se
  parece a ningún default.
- **Las superficies casi idénticas** (1,12:1 entre panel y control). Subirlas cambiaría el
  carácter de la app entera. La jerarquía la refuerzo con borde y espacio, no con brillo.

---

## 5. Lo que no se pudo aislar

Y por qué. Esto es lo que le queda pendiente a quien adopte el paquete.

| Qué | Por qué no entra en el design system |
| --- | --- |
| `Scene` y todo `src/scene/` | three.js, `@react-three/fiber`, raycasting. No es UI de paneles. |
| `blockThumbnail` / `src/blocks/atlas` | Genera texturas procedurales a `<canvas>` y devuelve data URLs. Es lógica de dominio; `BlockSwatch` recibe la URL ya hecha. |
| `LayerSvg` de `GuideView` | Es puro (props adentro, SVG afuera) pero recibe un `Guide` y llama a `blockDef(id)`. Es un componente de **dominio**, no una primitiva. Con un `Guide` en las props se puede mover casi tal cual, pero arrastra el modelo de datos. |
| `ErrorBoundary` | Un class component con `componentDidCatch` que además reporta a la telemetría. Extraje su caja visual como `Callout` con `detail`; el límite de error se queda en la app. |
| `DebugPanel` | 8,9 KB de lógica de ring buffer, niveles de captura, formateo de campos y export a `.trace`. Extraje su cáscara (panel flotante, chips de filtro, tabla, tonos categóricos); el resto es telemetría. |
| El estado de modo (`build` / `navigate`) | `spaceDown`/`spaceUp` con temporizador y detección de movimiento de cámara. `ViewportModeFrame` y el `HudBar` dibujan el resultado; la máquina de estados se queda en la app. |
| El acoplamiento `const s = useEditor()` de `TopBar` y `ToolPanel` | No es un problema de estilo, es de arquitectura: esos dos componentes se vuelven a renderizar con cualquier cambio del store. Adoptar las primitivas no lo arregla; hay que pasar a selectores. **Es el trabajo más grande que deja pendiente esta extracción.** |
| El layout de la app (`.app`, `.main`, `.viewport`) | Deliberadamente afuera: el bug del punto 2.1 se arregla en la app, no en el paquete. Un design system no debería decidir la grilla de tres columnas de un editor. |

---

## 6. Verificación

- **Contraste:** calculado con la fórmula WCAG 2.1 en `src/internal/contrast.ts` y mostrado
  en vivo en las historias de **Fundamentos → Contraste**, con el ratio y el objetivo de
  cada par. No hay ningún número escrito a mano en esa tabla.
- **Teclado:** `SegmentedControl` usa roving tabindex con flechas; `Modal` cicla el Tab;
  `Tooltip` se abre con foco. Cada uno tiene su historia.
- **Estados:** cada control tiene historia de normal, hover, foco, activo y deshabilitado.
  Hover y foco se muestran con las clases `is-hover` / `is-focus`, que existen en el CSS
  del componente sólo para poder documentar un estado que no se puede fijar.
- **Addon a11y:** `@storybook/addon-a11y` corre axe sobre cada historia.
- **Compilación:** `npm run typecheck`, `npm run build` y `npm run build-storybook` pasan.

---

## 7. La pasada visual

Todo lo anterior salió de leer el CSS de la app. Esta sección sale de **mirar el
Storybook**: levantarlo en el 6006, recorrer las historias y medir en el DOM lo que se veía
raro. Son cosas que la lectura del código no encontró.

### 7.1 Los controles se desbordaban de su contenedor (el hallazgo grande)

**Qué se veía:** en *Fila de dimensiones*, los tres campos de ancho, alto y largo se leían
como **una sola caja** con tres números adentro. En *Barra superior de la app*, el campo del
nombre se **encimaba** con el botón "Diseños".

**Qué era.** Medido en el DOM, no a ojo:

| | Contenedor | Control | Diferencia |
| --- | --- | --- | --- |
| Fila de dimensiones | 121 px | 143 px | +22 px, se pisaban 14 px |
| Barra superior | 230 px | 252 px | +22 px, se pisaban 16 px |

`box-sizing: border-box` estaba **una sola vez** en todo el paquete, y adentro de
`.mcb-root *`. Ese bloque es opt-in: `base.css` dice literalmente "skip it when embedding
primitives inside another app's styles". Con el modelo de caja por defecto del navegador, un
`<input>` con `width: 100%` mide 100 % **más** sus 20 px de padding y 2 px de borde.

Y `fullWidth` es el valor **por defecto** de `TextField` y de `Select`. O sea: los dos campos
del sistema se desbordaban de fábrica en cualquier consumidor que no se acordara de poner
`.mcb-root` en el `<body>`. Storybook, la vidriera del propio design system, era uno de esos
consumidores.

**Arreglo:** en `base.css`, una regla de `box-sizing` acotada al prefijo propio, fuera del
bloque opt-in:

```css
[class*='mcb-'],
[class*='mcb-']::before,
[class*='mcb-']::after { box-sizing: border-box; }
```

Acotada al prefijo a propósito: el modelo de caja de la app anfitriona no se toca. Medido
después: contenedor 121 px, control 121 px, separación 8 px.

### 7.2 Las historias de "todos los estados" no dejaban comparar nada

Las filas tenían distinta cantidad de columnas — `solid` mostraba cinco estados, `primary`
tres — así que las columnas no se alineaban y no se podía leer un estado hacia abajo, que es
lo único que esa historia tiene que hacer. En `IconButton` era peor: los botones son íconos,
no tenían rótulo, y sin encabezados no se sabía qué estado era cada uno.

Ahora las dos son una `<table>` de verdad, con encabezado de columna por estado y encabezado
de fila por variante, las cinco columnas en todas las filas y una etiqueta real ("Guardar",
"Borrar") en vez del nombre del estado repetido adentro del botón.

Puesta la matriz completa aparecieron dos agujeros que las filas ralas tapaban.

**Uno de documentación.** `.mcb-btn--danger:focus-visible` existía pero
`.mcb-btn--danger.is-focus` no, así que el anillo rojo de foco del botón peligroso era
**imposible de documentar** — la historia mostraba el anillo azul. `IconButton` sí tenía las
dos. Agregado el selector que faltaba.

**Uno de accesibilidad, en el CSS que se publica.** Con la casilla `danger ghost` × `activo`
por fin dibujada, axe la marcó: texto `--mcb-text-muted` (#93a0b1) sobre el relleno
`--mcb-accent-dim` (#24405f), **4,0:1**, por debajo del 4,5:1 de AA. La causa es orden de
fuente, no especificidad: `.mcb-btn--danger.mcb-btn--ghost` y `.mcb-btn.is-active` valen las
dos 0-2-0, y la del tono está más abajo en el archivo, así que le ganaba el color al estado.
No es un problema de la historia: un botón peligroso fantasma en estado seleccionado se veía
así en la app. Ahora el tono se corre solo cuando el botón está activo:

```css
.mcb-btn--danger.mcb-btn--ghost:not(.is-active) { color: var(--mcb-text-muted); }
```

Seleccionado le gana al tono, y el par pasa a text-on-accent sobre accent-dim: 8,73:1.

Pasado axe (WCAG 2.1 A + AA) sobre **las 159 historias**, quedan dos con marcas, las dos en
Fundamentos → Contraste: son las que muestran a propósito los pares que **no** pasan, y la
tabla ya los rotula "no pasa". No hay ninguna otra.

### 7.3 El tooltip parecía un botón más

`Tooltip` usaba `--mcb-surface-raised` con `--mcb-radius-md`: exactamente el fondo y el radio
de `Button`. Al lado del control que describe, el globo se leía como un segundo botón. Pasa a
`--mcb-surface-hud` — el token que la app ya usa para lo que flota sobre el visor — con
`--mcb-radius-sm` y `backdrop-filter`. No hay token nuevo: cambia de familia, de "control" a
"chrome flotante".

### 7.4 Cuatro historias no mostraban lo que decían mostrar

- *Tooltip → Posiciones*: los cuatro globos aparecen con hover, así que la historia se veía
  vacía. `Tooltip` gana `defaultOpen`, que sigue la misma convención que `is-hover` /
  `is-focus`: una manera de fijar un estado que el mouse no deja fotografiar.
- Los botones de esa historia decían `top`, `bottom`, `left`, `right`. Texto de interfaz en
  inglés: ahora Arriba, Abajo, Izquierda, Derecha.
- *Modal → Flujo completo* arranca cerrado, correcto para la historia e inútil como captura.
  Las capturas usan *Por defecto* y *Chico*.

### 7.5 Dos cosas que el paquete prometía y no cumplía

Aparecieron al correr por primera vez los builds de verdad, desde cero.

**`exports` mentía.** El `package.json` publicaba `"./tokens.css": "./dist/tokens.css"` y el
build no emitía ese archivo nunca. Cualquiera que hiciera
`import '@mcb/design-system/tokens.css'` — la única manera de usar los tokens sin traerse
los componentes — se comía un error de resolución. Un plugin de Vite lo copia ahora.

**`npm run build-storybook` no funcionaba en un clon limpio.** `vite-plugin-dts` con
`rollupTypes: true` corre también durante el build de Storybook, porque Storybook usa el
mismo `vite.config.ts`, y falla pidiendo un `dist/index.d.ts` que todavía no existe:

```
[vite:dts] Error parsing src/api-extractor.json:
The "mainEntryPointFilePath" path does not exist: .\dist\index.d.ts
```

Sólo pasaba si antes habías corrido `npm run build` en el mismo árbol, que es exactamente lo
que esconde este tipo de bug. Los dos plugins que existen para armar el paquete ahora se
declaran con `apply: (config) => Boolean(config.build?.lib)`, así que el build de Storybook
los saltea. De paso dejó de escribir `.d.ts` sueltos en `storybook-static/`.

### 7.6 Lo que miré y decidí no tocar

- **El botón `danger` activo se pone azul** y pierde el tono de peligro. La matriz nueva lo
  deja a la vista. Es correcto: activo significa seleccionado, y seleccionado es el acento en
  todo el sistema. Un rojo "activo" competiría con el de error.
- **La flecha ▾ del `Select` es chica y tenue.** Está en la misma jerarquía que el resto de
  los adornos secundarios. Agrandarla la pondría por encima del valor, que es lo que importa.
- **Los `Callout` de *Todos los tonos* no tienen el mismo ancho**: cada uno se ajusta a su
  texto. Emparejarlos es maquetado de la historia, no del componente.
