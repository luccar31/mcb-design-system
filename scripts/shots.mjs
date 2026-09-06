/**
 * Captures docs/screenshots: the app as it is today (before) and the same
 * material as Storybook primitives (after).
 *
 *   npm run dev                 # Storybook on 6006
 *   (in the app repo) npm run dev -- --port 5180
 *   npm run shots
 *
 * Both servers must already be running; this script never starts them.
 */
import { mkdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'docs/screenshots')

const APP = process.env.APP_URL ?? 'http://localhost:5180'
const SB = process.env.SB_URL ?? 'http://localhost:6006'

/** The app, at the three widths where its layout decisions show. */
const appShots = [
  { file: 'antes-01-app-1440.png', width: 1440, height: 900 },
  { file: 'antes-02-app-1100.png', width: 1100, height: 760 },
  { file: 'antes-03-app-820.png', width: 820, height: 760 },
]

/**
 * Story shots. `height` is only the minimum: fullPage grows to the content,
 * so a 4-button row does not ship as 900px of empty panel.
 */
const storyShots = [
  ['despues-01-fundamentos-color', 'fundamentos-color--surfaces', 980, 200],
  ['despues-02-fundamentos-contraste', 'fundamentos-contraste--text-on-surfaces', 980, 200],
  ['despues-03-fundamentos-tipografia', 'fundamentos-tipografía--sizes', 980, 200],
  ['despues-04-fundamentos-espaciado', 'fundamentos-espaciado--scale', 980, 200],
  ['despues-05-button-estados', 'controles-button--all-states', 1120, 200],
  ['despues-06-button-barra', 'controles-button--toolbar', 900, 200],
  ['despues-07-iconbutton-estados', 'controles-iconbutton--all-states', 900, 200],
  ['despues-08-segmentedcontrol', 'controles-segmentedcontrol--sizes', 720, 200],
  ['despues-09-textfield-dimensiones', 'controles-textfield--dimension-row', 720, 200],
  ['despues-10-textfield-estados', 'controles-textfield--sizes', 720, 200],
  ['despues-11-select', 'controles-select--sizes', 720, 200],
  ['despues-12-slider', 'controles-slider--with-steppers', 720, 200],
  ['despues-13-panel-columna', 'superficies-panel--side-column', 760, 200],
  ['despues-14-toolbar-app', 'superficies-toolbar--app-bar', 1200, 200],
  ['despues-15-statusbar', 'superficies-statusbar--with-shortcuts', 1200, 200],
  ['despues-16-hud-visor', 'superficies-hud-del-visor--build-mode', 900, 200],
  ['despues-17-blockswatch-paleta', 'datos-blockswatch--palette-grid', 760, 200],
  ['despues-18-listrow-materiales', 'datos-listrow--materials-list', 760, 200],
  ['despues-19-datatable', 'datos-datatable--default', 900, 200],
  ['despues-20-chip-tonos', 'datos-chip--all-tones', 900, 200],
  ['despues-21-callout-tonos', 'retroalimentación-callout--all-tones', 820, 200],
  ['despues-22-emptystate', 'retroalimentación-emptystate--with-action', 720, 200],
  ['despues-23-tooltip-posiciones', 'retroalimentación-tooltip--placements', 900, 200],
  ['despues-24-modal', 'superficies-modal--default', 1000, 620, false],
  ['despues-25-modal-confirmacion', 'superficies-modal--small', 900, 560, false],
]

async function shootApp(browser) {
  for (const { file, width, height } of appShots) {
    const page = await browser.newPage({ viewport: { width, height } })
    try {
      await page.goto(APP, { waitUntil: 'networkidle', timeout: 45_000 })
      // three.js paints on its own clock, after the network goes quiet.
      await page.waitForTimeout(3500)
      await page.screenshot({ path: resolve(OUT, file) })
      console.log('  ok  ' + file)
    } catch (error) {
      console.log('  --  ' + file + ': ' + error.message.split('\n')[0])
    } finally {
      await page.close()
    }
  }
}

async function shootStories(browser) {
  for (const [name, id, width, height, fullPage = true] of storyShots) {
    const page = await browser.newPage({ viewport: { width, height } })
    try {
      const url = SB + '/iframe.html?id=' + encodeURIComponent(id) + '&viewMode=story'
      await page.goto(url, { waitUntil: 'load', timeout: 45_000 })
      await page.waitForFunction(() => {
        const root = document.querySelector('#storybook-root')
        return Boolean(root && root.children.length > 0)
      }, { timeout: 30_000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(400)
      await page.screenshot({ path: resolve(OUT, name + '.png'), fullPage })
      console.log('  ok  ' + name + '.png')
    } catch (error) {
      console.log('  --  ' + name + '.png: ' + error.message.split('\n')[0])
    } finally {
      await page.close()
    }
  }
}

async function reachable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) })
    return response.ok
  } catch {
    return false
  }
}

const only = process.argv[2]
const wantApp = only !== 'stories'
const wantStories = only !== 'app'

if (wantStories && !(await reachable(SB + '/index.json'))) {
  console.error('Storybook is not answering on ' + SB + '. Run `npm run dev` first.')
  process.exit(1)
}
if (wantApp && !(await reachable(APP))) {
  console.error('The app is not answering on ' + APP + '. Skipping the before shots.')
}

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
try {
  if (wantApp && (await reachable(APP))) {
    console.log('antes — ' + APP)
    await shootApp(browser)
  }
  if (wantStories) {
    console.log('despues — ' + SB)
    await shootStories(browser)
  }
} finally {
  await browser.close()
}
console.log('\nescrito en docs/screenshots')
