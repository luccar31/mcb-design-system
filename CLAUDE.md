# @mcb/design-system

Design system de **MC Blueprint**, un editor 3D de voxels que genera guías de construcción para Minecraft. Repo propio, consumido como paquete.

21 primitivas, 97 tokens, 159 historias. Oscuro, denso, para una herramienta de paneles — no para un sitio.

Extraído de la app, no inventado: `docs/audit.md` documenta qué había, qué se colapsó y qué se cambió por decisión propia, con las mediciones.

## Comandos

```bash
export PATH="/c/nvm4w/nodejs:$PATH"   # node NO está en el PATH
pnpm dev              # Storybook en el 6006
pnpm typecheck
pnpm build            # tsc + vite en modo librería → dist/
pnpm build-storybook
pnpm shots            # capturas a docs/screenshots/
```

El gestor es **pnpm**, fijado en `packageManager` y bajado por corepack. Si el comando `pnpm` no existe, falta `corepack enable pnpm` una vez en la máquina; `corepack pnpm ...` funciona siempre.

`pnpm install` acá es seguro: este repo tiene su propio `node_modules`, sin junctions. **No es el caso del repo de la app** — ahí está prohibido instalar.

## Trampas

**pnpm bloquea los build scripts.** Un `pnpm install` en un árbol sin `allowBuilds` sale con **exit 1** (`ERR_PNPM_IGNORED_BUILDS`, por esbuild — acá hay dos versiones, 0.21.5 y 0.25.12) y deja esbuild sin su binario de plataforma. Se destraba con `pnpm approve-builds --all`, que escribe `pnpm-workspace.yaml`; ese archivo está commiteado, así que en un clon limpio no debería aparecer. Dos settings que parecen los correctos **no funcionan** en pnpm 12: el campo `pnpm` en `package.json` ya no se lee, y `onlyBuiltDependencies` en `pnpm-workspace.yaml` figura en `pnpm config list` pero no surte efecto. El que sirve es `allowBuilds`.

**No uses `shamefully-hoist`.** El layout estricto es lo que impide que este paquete dependa sin darse cuenta de algo que no declaró — y una dependencia fantasma acá no se rompe en este repo, se rompe en el consumidor. La raíz de `node_modules` tiene 10 entradas contra las ~320 planas de npm: eso es la red de seguridad, no un inconveniente. Si aparece una fantasma, **declará la dependencia**.

**`build-storybook` sobre un árbol limpio.** `vite-plugin-dts` con `rollupTypes: true` comparte `vite.config.ts` y también corre en el build de Storybook, donde explota pidiendo `dist/index.d.ts`. Sólo andaba si antes habías corrido `pnpm build` — o sea, el bug se escondía en el flujo normal. Los plugins de empaquetado llevan `apply: (config) => Boolean(config.build?.lib)`. **Si tocás `vite.config.ts`, probá los dos builds desde `rm -rf dist storybook-static`.**

**`.mcb-root` es una clase, no un provider.** Es el wrapper raíz, y sin esa clase en un ancestro el fallo es **parcial y engañoso** — no "sin estilo". Medido sobre los 21 componentes fuera de `.mcb-root`, en fondo claro: los que traen superficie propia (`Card`, `Panel`, `Callout`, `DataTable`, `Modal`) se ven bien, y eso es justamente lo que engaña; los que heredan el color del contenedor (`EmptyState`, `Kbd`, `Select`, `ColorSwatch`, `ListRow`) quedan con texto casi blanco sobre blanco, ilegibles y **sin tirar error**. El modelo de caja sí viaja con cada componente; lo que falta es fondo, color y tipografía del documento. El decorador `.sb-canvas` de Storybook es un sustituto sólo para las historias, así que algo puede verse bien acá y salir mal en un consumidor. Es la divergencia más peligrosa del repo.

**`box-sizing` fuera del bloque opt-in.** `TextField` y `Select` traen `fullWidth` por defecto. Cuando `box-sizing: border-box` vivía sólo dentro de `.mcb-root *`, los dos se desbordaban de su contenedor en cualquier consumidor sin esa clase — medido: contenedor 121 px, input 143 px. La regla ahora está acotada al prefijo propio y fuera del bloque opt-in. No la muevas adentro.

**El orden de fuente decide el color.** Una regla de tono le ganaba a `.is-active` y dejaba `danger ghost` activo en 4,0:1, por debajo de AA. Seleccionado le gana al tono. Al agregar variantes, completá la matriz de estados: fue completarla lo que destapó ese fallo.

**Sin webfonts.** Las familias son stacks del sistema. No agregues una webfont sin decirlo: hoy no hay ninguna clase de fallo por carga de fuentes, y eso es un activo.

## Convenciones

- **El código es sólo en inglés**: identificadores, tipos, comentarios, títulos de historias.
- **Los textos de interfaz van en español**, incluido el contenido de ejemplo de las historias.
- **Comentarios de 20 palabras o menos**, sólo para lo que el código no dice solo.
- **Una historia por variante y por estado**, no una genérica por componente. Las matrices van en `<table>` con encabezado, para poder comparar.
- Fondo oscuro por defecto en Storybook: sobre blanco estos componentes se ven mal y se toman decisiones equivocadas.

## Qué entra al sistema y qué no

**Entra:** algo que se usa en **dos lugares o más** de la app, cuya apariencia, estados y accesibilidad valen la pena centralizar.

**No entra:** el layout de la app (`.app`, `.main`, `.viewport`), nada que dependa del store de Zustand, de three.js o del modelo de datos de MC Blueprint, y cualquier caso único. Un design system no decide la grilla de tres columnas de un editor.

## Pedidos que llegan desde la app

MC Blueprint pide primitivas nuevas por un canal con formato fijo. El proceso completo está en `docs/ds-requests/README.md` **del repo de la app** (`C:/Users/lucas/OneDrive/Desktop/minecraft-3d-designer`).

Hay **dos tipos** y no se tratan igual:

**`DSR-A` · alta.** Falta una primitiva. Llega filtrado: quien lo escribió tuvo que probar que no existe, que no se puede componer con lo que hay, y que **se usa en dos lugares como mínimo**. Si al diseñarlo concluís que **se resuelve componiendo** lo que ya existe, decilo y devolvelo con la composición: es un resultado válido y mejor que agregar.

**`DSR-C` · cambio.** Una primitiva existe pero está mal — contraste por debajo de AA, un estado que falta, un objetivo táctil chico, un foco invisible. Viene de `qa-ux`, que mide, así que trae **el número medido, el valor esperado y la historia de Storybook donde se reproduce**. No hay nada que discutir: es un defecto del sistema, con evidencia.

Y en los dos casos:

- **Llegan aprobados por el dueño.** No se negocia si van o no van.
- **La app no está esperando.** Todo pedido incluye lo que se hace mientras tanto con las primitivas actuales. Nadie está bloqueado: se puede hacer bien en lugar de rápido.
- Cuando sale en `dist/`, avisá. Adoptarlo del lado de la app es una tarea aparte.

## El consumidor

MC Blueprint, en `C:/Users/lucas/OneDrive/Desktop/minecraft-3d-designer`.

**Todavía no consume el paquete.** Sigue con sus 113 selectores y 10 tokens en `src/styles.css`. La adopción es el workstream 10 de ese repo y no ha empezado.

Consecuencia práctica: hoy **no hay nada en producción que se rompa** si cambiás una primitiva. Esa ventana se cierra cuando el workstream 10 caiga; a partir de ahí, cada cambio necesita versión.

## Deuda conocida

**Cero tests automáticos.** No hay runner. Todo se verificó a mano contra el navegador más axe, y nada quedó como regresión. El bug de `box-sizing` puede volver y nadie se enteraría. Es la deuda más grande del repo.
