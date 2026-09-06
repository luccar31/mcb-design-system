import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { EmptyState } from '../EmptyState/EmptyState'
import { IconButton } from '../IconButton/IconButton'
import { List, ListRow } from '../ListRow/ListRow'
import { Section } from '../Panel/Panel'
import { TextField } from '../TextField/TextField'
import { Modal } from './Modal'

const meta = {
  title: 'Superficies/Modal',
  component: Modal,
  args: { open: true, onClose: () => {}, title: 'Diseños' },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Por defecto',
  args: {
    open: true,
    onClose: () => {},
    title: 'Diseños',
    description: 'Guardados en este navegador. Exportá a JSON para llevarlos a otra máquina.',
    children: 'Contenido del diálogo.',
    footer: <Button>Cerrar</Button>,
  },
}

export const Small: Story = {
  name: 'Chico',
  args: {
    open: true,
    onClose: () => {},
    size: 'sm',
    title: '¿Borrar el diseño?',
    description: 'Esta acción no se puede deshacer.',
    footer: (
      <>
        <Button variant="ghost">Cancelar</Button>
        <Button tone="danger">Borrar</Button>
      </>
    ),
  },
}

export const Large: Story = {
  name: 'Grande',
  args: {
    open: true,
    onClose: () => {},
    size: 'lg',
    title: 'Telemetría',
    description: '1 024 eventos registrados · 4,2 MB en memoria.',
    children: 'Un diálogo ancho para tablas y registros.',
  },
}

export const EmptyList: Story = {
  name: 'Lista vacía',
  args: {
    open: true,
    onClose: () => {},
    title: 'Diseños',
    description: 'Guardados en este navegador.',
    children: (
      <EmptyState
        title="Todavía no guardaste ningún diseño"
        description="Guardá el diseño actual y va a aparecer acá."
      />
    ),
  },
}

export const FullFlow: Story = {
  name: 'Flujo completo',
  render: function FlowDemo() {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Abrir diseños
        </Button>
        <p className="sb-note" style={{ marginTop: 12 }}>
          Escape cierra, el foco queda atrapado adentro mientras esté abierto y vuelve al
          botón al cerrar.
        </p>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Diseños"
          description="Guardados en este navegador. Exportá a JSON para llevarlos a otra máquina."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={() => setOpen(false)}>
                Crear diseño
              </Button>
            </>
          }
        >
          <Section title="Nuevo diseño">
            <div style={{ display: 'grid', gap: 8 }}>
              <TextField label="Nombre" defaultValue="Casa nueva" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                <TextField label="Ancho (X)" type="number" mono defaultValue={32} />
                <TextField label="Alto (Y)" type="number" mono defaultValue={24} />
                <TextField label="Largo (Z)" type="number" mono defaultValue={32} />
              </div>
            </div>
          </Section>

          <Section title="Guardados" count="2">
            <List>
              {['Casa de la colina', 'Granja de hierro'].map((name) => (
                <ListRow
                  key={name}
                  variant="card"
                  title={name}
                  meta="32×24×32 · 1 284 bloques"
                  monoMeta
                  trailing={
                    <>
                      <Button size="md">Abrir</Button>
                      <IconButton
                        size="md"
                        variant="ghost"
                        tone="danger"
                        icon="✕"
                        label={`Borrar ${name}`}
                      />
                    </>
                  }
                />
              ))}
            </List>
          </Section>
        </Modal>
      </>
    )
  },
}
