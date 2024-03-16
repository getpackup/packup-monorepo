import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { baseSpacer } from '@packup/styles'
import { getLabelColor, LabelColorName } from '@packup/utils'

const ColorInput = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-bottom: ${baseSpacer};
`

const ColorCheckbox = styled.input`
  display: none;
`

const ColorLabel = styled.label`
  display: flex;
  width: 50px;
  height: 30px;
  margin: 5px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 20px;
`

export const ColorPickerInput: FunctionComponent = () => {
  const colors = Object.keys(LabelColorName)
  const [selectedColor, setSelectedColor] = useState('default')

  const handleColorChange = (e: any) => {
    console.log(e.target.value)
    setSelectedColor(e.target.value)
  }

  return (
    <ColorInput>
      {colors.map((color, index) => {
        if (color === 'default') return null

        const mode = localStorage.getItem('color-mode')
        const labelColor = getLabelColor(color, mode ?? 'dark')

        return (
          <>
            <ColorCheckbox
              key={`input-${index}`}
              type="checkbox"
              id={color}
              name=""
              value={color}
              onClick={handleColorChange}
              checked={selectedColor === color}
            />
            <ColorLabel
              key={`label-${index}`}
              htmlFor={color}
              style={{
                backgroundColor: labelColor.bgColor,
                color: labelColor.color,
              }}
            >
              {selectedColor === color ? '✓' : null}
            </ColorLabel>
          </>
        )
      })}
    </ColorInput>
  )
}
