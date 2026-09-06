/** Story fixtures only. Not exported from the package entry point. */

type Rgb = [number, number, number]

function toRgb(hex: string): Rgb {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb
}

function shift([r, g, b]: Rgb, amount: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v + amount)))
  return `rgb(${clamp(r)},${clamp(g)},${clamp(b)})`
}

/**
 * A 16x16 noise tile that reads like a Minecraft texture at swatch size,
 * so stories need no binary assets.
 */
export function blockTexture(hex: string, seed = 1): string {
  const base = toRgb(hex)
  let state = seed * 9301 + 49297
  const next = () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
  const cells: string[] = []
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const amount = Math.round((next() - 0.5) * 34)
      cells.push(
        `<rect x="${x}" y="${y}" width="1" height="1" fill="${shift(base, amount)}"/>`,
      )
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" shape-rendering="crispEdges">${cells.join('')}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const SAMPLE_BLOCKS = [
  { id: 'minecraft:oak_planks', name: 'Tablas de roble', color: '#a17b4a' },
  { id: 'minecraft:stone', name: 'Piedra', color: '#7d7d7d' },
  { id: 'minecraft:cobblestone', name: 'Adoquín', color: '#7a7a7a' },
  { id: 'minecraft:stone_bricks', name: 'Ladrillos de piedra', color: '#7b7b7b' },
  { id: 'minecraft:bricks', name: 'Ladrillos', color: '#96604a' },
  { id: 'minecraft:glass', name: 'Vidrio', color: '#b4d6df' },
  { id: 'minecraft:oak_log', name: 'Tronco de roble', color: '#9a7d4d' },
  { id: 'minecraft:white_wool', name: 'Lana blanca', color: '#e9ecec' },
  { id: 'minecraft:red_wool', name: 'Lana roja', color: '#a12722' },
  { id: 'minecraft:lime_wool', name: 'Lana lima', color: '#70b219' },
  { id: 'minecraft:blue_concrete', name: 'Concreto azul', color: '#2c2e8f' },
  { id: 'minecraft:sand', name: 'Arena', color: '#dbd3a0' },
] as const
