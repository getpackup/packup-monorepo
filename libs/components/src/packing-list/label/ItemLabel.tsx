import React, { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, getLabelColor, LabelColorName } from '@packup/utils'
import { ItemLabelEditButton } from './ItemLabelEditButton'
import { ItemLabelDeleteButton } from './ItemLabelDeleteButton'

type PackingListItemLabelProps = {
  colorName: LabelColorName
  children: string | JSX.Element | JSX.Element[]
  id: string
  variant?: 'editable' | 'removable' | 'default'
  toggleForm: (id?: string) => void
}

type LabelProps = {
  color?: string
  bgColor?: string
  clickable?: boolean
}

const PackingItemLabel = styled.span<LabelProps>`
  border: 1px solid ${props => props.color};
  line-height: normal;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 25px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  cursor: ${props => props.clickable ? 'pointer' : 'auto'};
`

const LabelListItem = styled.span<LabelProps>`
  border: 1px solid ${props => props.color};
  line-height: normal;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 3px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  cursor: pointer;

  :hover {
    color: ${props => props.bgColor};
    background-color: ${props => props.color};
    transition: all 0.2s ease-in-out;
  }
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
`

// TODO Update to make show it as removable when in label selection state
export const ItemLabel: FunctionComponent<PackingListItemLabelProps> = ({
  children,
  colorName,
  variant = 'default',
  id,
  toggleForm
}) => {
  const { colorMode } = useContext(ThemeContext)
  const labelColor = getLabelColor(colorName, colorMode)
  const [show, setShow] = React.useState(true)

  // TODO would be nice to add animation to fade out in 0.2s
  if (!show) return null

  if (variant === 'editable') {
    return (
      <LabelRow>
        <LabelListItem
          color={labelColor.color}
          bgColor={labelColor.bgColor}
          onClick={() => console.log('select')}
        >
          {children}
        </LabelListItem>
        <ButtonContainer>
          <ItemLabelEditButton onClick={() => toggleForm(id)} />
          <ItemLabelDeleteButton id={id} setShow={setShow} />
        </ButtonContainer>
      </LabelRow>
    )
  }

  return (
    <PackingItemLabel
      color={labelColor.color}
      bgColor={labelColor.bgColor}
    >
      {
        variant === 'removable' &&
        '-'
      }
      {children}
    </PackingItemLabel>
  )
}
