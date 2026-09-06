import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { Chip } from '../Chip/Chip'
import { IconButton } from '../IconButton/IconButton'
import { TextField } from '../TextField/TextField'
import { Toolbar, ToolbarDivider, ToolbarGroup, ToolbarSpacer } from './Toolbar'

const meta = {
  title: 'Superficies/Toolbar',
  component: Toolbar,
} satisfies Meta<typeof Toolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Por defecto',
  args: {
    label: 'Acciones del diseño',
    children: (
      <>
        <Button>Diseños</Button>
        <Button variant="primary">Guardar</Button>
      </>
    ),
  },
}

export const Groups: Story = {
  name: 'Con grupos y divisores',
  args: {
    label: 'Edición',
    children: (
      <>
        <ToolbarGroup>
          <IconButton icon="↶" label="Deshacer (Ctrl+Z)" />
          <IconButton icon="↷" label="Rehacer (Ctrl+Shift+Z)" disabled />
        </ToolbarGroup>
        <ToolbarDivider />
        <ToolbarGroup>
          <Button active aria-pressed>
            Editar
          </Button>
          <Button>Guía</Button>
        </ToolbarGroup>
      </>
    ),
  },
}

export const AppBar: Story = {
  name: 'Barra superior de la app',
  render: () => (
    <Toolbar bar wrap label="Barra principal">
      <ToolbarGroup>
        <span
          aria-hidden="true"
          style={{
            width: 15,
            height: 15,
            borderRadius: 'var(--mcb-radius-xs)',
            background:
              'linear-gradient(135deg, var(--mcb-brand-light) 0 50%, var(--mcb-brand-dark) 50% 100%)',
            boxShadow: 'var(--mcb-shadow-inset-edge)',
          }}
        />
        <strong style={{ letterSpacing: 'var(--mcb-tracking-tight)' }}>MC Blueprint</strong>
      </ToolbarGroup>

      <div style={{ maxWidth: 230, width: '100%' }}>
        <TextField label="Nombre del diseño" hideLabel defaultValue="Casa de la colina" />
      </div>

      <ToolbarGroup>
        <Button>Diseños</Button>
        <Button variant="primary">Guardar</Button>
      </ToolbarGroup>

      <ToolbarDivider />

      <ToolbarGroup>
        <IconButton icon="↶" label="Deshacer" />
        <IconButton icon="↷" label="Rehacer" disabled />
      </ToolbarGroup>

      <ToolbarSpacer />

      <ToolbarGroup>
        <Button>Imprimir guía</Button>
        <Button>Exportar .schem</Button>
        <Button>Importar</Button>
      </ToolbarGroup>

      <Chip tone="ok" icon="☁">
        nube
      </Chip>
    </Toolbar>
  ),
}

export const Gaps: Story = {
  name: 'Separaciones',
  render: () => (
    <div className="sb-stack">
      <Toolbar gap="tight" label="Ajustada">
        <Button size="sm">Todos</Button>
        <Button size="sm">Piedra</Button>
        <Button size="sm">Madera</Button>
      </Toolbar>
      <Toolbar gap="normal" label="Normal">
        <Button size="sm">Todos</Button>
        <Button size="sm">Piedra</Button>
        <Button size="sm">Madera</Button>
      </Toolbar>
      <Toolbar gap="loose" label="Amplia">
        <Button size="sm">Todos</Button>
        <Button size="sm">Piedra</Button>
        <Button size="sm">Madera</Button>
      </Toolbar>
    </div>
  ),
}
