import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { baseSpacer } from '@packup/styles'
import { getLabelColor, LabelColorName } from '@packup/utils'
import { Field } from 'formik'

const ColorInput = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: ${baseSpacer};
  justify-content: space-between;
  gap: 5px;
`

const ColorCheckbox = styled.input`
  display: none;
`

const ColorLabel = styled.label`
  display: flex;
  width: 50px;
  height: 30px;
  margin: 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 20px;
`

type ColorPickerInputProps = {
  disabled: boolean
  setColor: (e: any) => void
  initialValue?: LabelColorName
}

export const ColorPickerInput: FunctionComponent<ColorPickerInputProps> = ({disabled, setColor, initialValue}) => {
  const colors = Object.keys(LabelColorName)
  const [selectedColor, setSelectedColor] = useState(initialValue ?? LabelColorName.default)

  const handleColorChange = (e: any) => {
    setSelectedColor(e.target.value === selectedColor ? LabelColorName.default : e.target.value)
    setColor(e.target.value === selectedColor ? LabelColorName.default : e.target.value)
  }

  const colourOptions = colors.map((color, index) => {
    if (color === 'default') return

    const mode = localStorage.getItem('color-mode') ?? 'dark'
    const labelColor = getLabelColor(color, mode)

    return (
      <div key={`option-${index}`}>
        <Field
          as={ColorCheckbox}
          key={`input-${index}`}
          type="checkbox"
          id={color}
          name="labelColor"
          value={color}
          onClick={handleColorChange}
          checked={selectedColor === color}
          disabled={disabled}
        />
        <ColorLabel
          key={`label-${index}`}
          htmlFor={color}
          style={{
            backgroundColor: labelColor.bgColor,
            color: labelColor.color,
            borderColor: labelColor.color,
          }}
        >
          {selectedColor === color ? '✓' : null}
        </ColorLabel>
      </div>
    )
  })

  return (
    <ColorInput>
      {colourOptions}
    </ColorInput>
  )
}
