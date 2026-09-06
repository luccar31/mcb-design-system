import type { Meta, StoryObj } from '@storybook/react'
import { Kbd } from '../Kbd/Kbd'
import { StatusBar, StatusItem, StatusMessage, StatusSpacer } from './StatusBar'

const meta = {
  title: 'Superficies/StatusBar',
  component: StatusBar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof StatusBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Por defecto',
  render: () => (
    <StatusBar>
      <StatusItem numeric>Grilla 32×24×32</StatusItem>
      <StatusItem numeric>1 284 bloques</StatusItem>
    </StatusBar>
  ),
}

export const WithShortcuts: Story = {
  name: 'Con atajos',
  render: () => (
    <StatusBar>
      <StatusItem numeric>Grilla 32×24×32</StatusItem>
      <StatusItem numeric>1 284 bloques</StatusItem>
      <StatusSpacer />
      <StatusItem>
        <Kbd>click</Kbd> colocar · <Kbd>shift+click</Kbd> borrar · <Kbd>alt+click</Kbd> cuentagotas
        · <Kbd>arrastrar</Kbd> pintar · <Kbd emphasis>espacio</Kbd> construir/navegar
      </StatusItem>
    </StatusBar>
  ),
}

export const WithMessage: Story = {
  name: 'Con mensaje',
  render: () => (
    <StatusBar>
      <StatusItem numeric>Grilla 32×24×32</StatusItem>
      <StatusItem numeric>1 284 bloques</StatusItem>
      <StatusSpacer />
      <StatusMessage>Exportado .schem — cargalo con WorldEdit o Litematica</StatusMessage>
    </StatusBar>
  ),
}

export const WithError: Story = {
  name: 'Con error',
  render: () => (
    <StatusBar>
      <StatusItem numeric>Grilla 32×24×32</StatusItem>
      <StatusSpacer />
      <StatusMessage tone="danger">Error al importar: falta el campo "dims"</StatusMessage>
    </StatusBar>
  ),
}

export const Narrow: Story = {
  name: 'En una ventana angosta',
  render: () => (
    <div style={{ width: 380, border: '1px dashed var(--mcb-border-control)' }}>
      <StatusBar>
        <StatusItem numeric>Grilla 32×24×32</StatusItem>
        <StatusItem numeric>1 284 bloques</StatusItem>
        <StatusSpacer />
        <StatusItem>
          <Kbd>click</Kbd> colocar · <Kbd>shift+click</Kbd> borrar · <Kbd>arrastrar</Kbd> pintar
        </StatusItem>
      </StatusBar>
    </div>
  ),
}
