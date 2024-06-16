import React, { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, getLabelColor, LabelColorName } from '@packup/utils'
import { ItemLabelEditButton } from './ItemLabelEditButton'
import { ItemLabelDeleteButton } from './ItemLabelDeleteButton'
import { ItemLabel as Label } from '@packup/common'
import { IoClose } from "react-icons/io5"

type LabelProps = {
  color?: string
  bgColor?: string
  clickable?: boolean
}

const PackingItemLabel = styled.span<LabelProps>`
  line-height: normal;
  font-size: 14px;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 25px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
  cursor: ${props => props.clickable ? 'pointer' : 'auto'};
  display: flex;
  align-items: center;
  gap: 5px;

  ${props => props.clickable &&
    ':hover {color: ${props => props.bgColor}; background-color: ${props => props.color}; transition: all 0.2s ease-in-out; }'
  }
`

const LabelListItem = styled.span<LabelProps>`
  line-height: normal;
  font-size: 1.2rem;
  padding: 8px 16px;
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
  gap: 5px;
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
`

type PackingListItemLabelProps = {
  colorName: LabelColorName
  children: string
  id?: string
  variant?: 'editable' | 'removable' | 'default'
  toggleForm?: (label?: Label) => void
  onClick?: (e?: any) => void
}

export const ItemLabel: FunctionComponent<PackingListItemLabelProps> = ({
  children,
  colorName,
  variant = 'default',
  id,
  toggleForm,
  onClick
}) => {
  const [show, setShow] = React.useState(true)
  const { colorMode } = useContext(ThemeContext)
  const labelColor = getLabelColor(colorName, colorMode)

  // TODO would be nice to add animation to fade out in 0.2s
  if (!show) return null

  if (variant === 'editable' && id && toggleForm) {
    return (
      <LabelRow>
        <LabelListItem
          color={labelColor.color}
          bgColor={labelColor.bgColor}
          onClick={onClick}
        >
          {children}
        </LabelListItem>
        <ButtonContainer>
          <ItemLabelEditButton onClick={() => toggleForm({id, color: colorName, text: children})} />
          <ItemLabelDeleteButton id={id} setShow={setShow} />
        </ButtonContainer>
      </LabelRow>
    )
  }

  return (
    <PackingItemLabel
      color={labelColor.color}
      bgColor={labelColor.bgColor}
      onClick={onClick}
      clickable={variant === 'removable'}
    >
      {children}
      {
        variant === 'removable' &&
        <IoClose />
      }
    </PackingItemLabel>
  )
}
