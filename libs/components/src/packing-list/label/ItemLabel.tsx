import React, { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, getLabelColor, LabelColorName } from '@packup/utils'
import { ItemLabelEditButton } from './ItemLabelEditButton'
import { ItemLabelDeleteButton } from './ItemLabelDeleteButton'

type PackingListItemLabelProps = {
  colorName: LabelColorName
  children: string | JSX.Element | JSX.Element[]
  variant?: 'editable' | 'default'
}

type LabelProps = {
  color?: string
  bgColor?: string
}

const PackingItemLabel = styled.span<LabelProps>`
  border: 1px solid ${props => props.color};
  line-height: normal;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 25px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
`

const LabelListItem = styled.span<LabelProps>`
  border: 1px solid ${props => props.color};
  line-height: normal;
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 3px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
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
   children, colorName, variant = 'default'
}) => {
  const { colorMode } = useContext(ThemeContext)
  const labelColor = getLabelColor(colorName, colorMode)

  if (variant === 'editable') {
    return (
      <LabelRow>
        <LabelListItem
          color={labelColor.color}
          bgColor={labelColor.bgColor}
        >
          {children}
        </LabelListItem>
        <ButtonContainer>
          <ItemLabelEditButton onClick={() => console.log('edit')} />
          <ItemLabelDeleteButton onClick={() => console.log('remove')} />
        </ButtonContainer>
      </LabelRow>
    )
  }

  return (
    <PackingItemLabel
      color={labelColor.color}
      bgColor={labelColor.bgColor}
    >
      {children}
    </PackingItemLabel>
  )
}
