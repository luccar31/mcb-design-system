import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Callout } from './Callout'

const meta = {
  title: 'Retroalimentación/Callout',
  component: Callout,
  args: { children: 'La guía se abre en una pestaña nueva, lista para imprimir o guardar como PDF.' },
  argTypes: { tone: { control: 'inline-radio', options: ['info', 'warn', 'danger'] } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = { args: { tone: 'info' } }

export const Warn: Story = {
  args: {
    tone: 'warn',
    title: 'Se descartaron 12 eventos',
    children: 'El buffer se llenó. Bajá el nivel de captura para no perder eventos.',
  },
}

export const Danger: Story = {
  args: {
    tone: 'danger',
    title: 'No se pudo importar el archivo',
    children: 'El JSON no tiene el campo "dims". Exportalo de nuevo desde MC Blueprint.',
  },
}

export const WithTitle: Story = {
  name: 'Con título',
  args: {
    tone: 'info',
    title: 'La nube no está configurada',
    children:
      'Definí VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para guardar los diseños en tu cuenta.',
  },
}

export const WithActions: Story = {
  name: 'Con acciones',
  args: {
    tone: 'warn',
    title: 'Este navegador no tiene WebGL',
    children:
      'El editor 3D necesita WebGL. Probá con Chrome, Edge o Firefox actualizados, o activá la aceleración por hardware.',
    actions: (
      <>
        <Button variant="primary">Ver la guía</Button>
        <Button variant="ghost">Reintentar</Button>
      </>
    ),
  },
}

export const WithDetail: Story = {
  name: 'Con detalle técnico',
  args: {
    tone: 'danger',
    title: 'La app no pudo arrancar',
    children: 'Copiá este detalle si querés reportarlo. Probá recargar antes.',
    detail:
      'TypeError: Cannot read properties of undefined (reading "dims")\n    at buildGuide (guide.ts:118:22)\n    at GuideView (GuideView.tsx:74:5)\n    at renderWithHooks (react-dom.development.js:15486:18)',
    actions: <Button>Recargar</Button>,
  },
}

export const AllTones: Story = {
  name: 'Todos los tonos',
  render: () => (
    <div className="sb-stack" style={{ width: 560 }}>
      <Callout tone="info" title="Información">
        El gris claro del plano es la capa anterior: usalo para alinear.
      </Callout>
      <Callout tone="warn" title="Advertencia">
        Redimensionar descarta todo lo que quede fuera de las nuevas dimensiones.
      </Callout>
      <Callout tone="danger" title="Error">
        No se pudo guardar en la nube. El diseño quedó guardado en este navegador.
      </Callout>
    </div>
  ),
}
