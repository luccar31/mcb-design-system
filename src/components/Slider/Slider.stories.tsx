import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './Slider'

const meta = {
  title: 'Controles/Slider',
  component: Slider,
  args: { label: 'Índice de capa', value: 12, min: 0, max: 23, onChange: () => {} },
  decorators: [
    (Story) => (
      <div style={{ width: 226 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

function LayerSlider(props: Partial<Parameters<typeof Slider>[0]>) {
  const [value, setValue] = useState(12)
  return (
    <Slider
      label="Índice de capa"
      min={0}
      max={23}
      value={value}
      onChange={setValue}
      {...props}
    />
  )
}

export const Default: Story = {
  name: 'Por defecto',
  render: () => <LayerSlider />,
}

export const WithValue: Story = {
  name: 'Con lectura de valor',
  render: function ValueDemo() {
    const [value, setValue] = useState(12)
    return (
      <Slider
        label="Índice de capa"
        min={0}
        max={23}
        value={value}
        onChange={setValue}
        displayValue={`y = ${value}`}
      />
    )
  },
}

export const WithSteppers: Story = {
  name: 'Con botones de paso',
  render: function StepperDemo() {
    const [value, setValue] = useState(12)
    return (
      <Slider
        label="Índice de capa"
        min={0}
        max={23}
        value={value}
        onChange={setValue}
        displayValue={`y = ${value}`}
        steppers
        showRange
      />
    )
  },
}

export const AtMinimum: Story = {
  name: 'En el mínimo',
  render: function MinDemo() {
    const [value, setValue] = useState(0)
    return (
      <Slider
        label="Índice de capa"
        min={0}
        max={23}
        value={value}
        onChange={setValue}
        displayValue={`y = ${value}`}
        steppers
        showRange
      />
    )
  },
}

export const Disabled: Story = {
  name: 'Deshabilitado',
  render: () => <LayerSlider disabled steppers showRange displayValue="y = 12" />,
}

export const Focused: Story = {
  name: 'Con foco',
  render: () => <LayerSlider className="mcb-slider--focus-demo" />,
  decorators: [
    (Story) => (
      <div style={{ width: 226 }}>
        <style>{'.mcb-slider--focus-demo .mcb-slider__input { outline: 2px solid var(--mcb-accent); outline-offset: 2px; border-radius: 3px; }'}</style>
        <Story />
      </div>
    ),
  ],
}
