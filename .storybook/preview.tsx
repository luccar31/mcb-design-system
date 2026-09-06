import type { Decorator, Preview } from '@storybook/react'
import '../src/tokens/tokens.css'
import '../src/tokens/base.css'
import './storybook.css'

/** Every primitive is designed on the panel surface, never on white. */
const onSurface: Decorator = (Story) => (
  <div className="sb-canvas">
    <Story />
  </div>
)

const preview: Preview = {
  decorators: [onSurface],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#12161c' },
        { name: 'panel', value: '#1b212a' },
        { name: 'viewport', value: '#1a1f27' },
        { name: 'paper', value: '#ffffff' },
      ],
    },
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    options: {
      storySort: {
        order: [
          'Fundamentos',
          ['Introducción', 'Color', 'Espaciado', 'Tipografía', 'Radios y sombras', 'Contraste'],
          'Controles',
          'Superficies',
          'Datos',
          'Retroalimentación',
        ],
      },
    },
  },
}

export default preview
