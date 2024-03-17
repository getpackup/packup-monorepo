import React, { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, getLabelColor, LabelColorName } from '@packup/utils'
import { brandPrimary, halfSpacer, lightestGray } from '@packup/styles'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import { IconWrapper } from '@packup/components'

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
export const PackingListItemLabel: FunctionComponent<PackingListItemLabelProps> = ({
   children, colorName, variant = 'default'
}) => {
  const { colorMode } = useContext(ThemeContext)
  const labelColor = getLabelColor(colorName, colorMode)

  // const iconColor = packingListItemBeingEdited === props.item.id
  //   ? 'var(--color-primary)'
  //   : 'var(--color-lightGray)'

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
          <IconWrapper
            onClick={() => console.log('edit')}
            hoverColor={brandPrimary}
            data-tip="Edit Label"
            data-for="editLabelIcon"
          >
            <FaPencilAlt />
            <ReactTooltip
              id="editLabelIcon"
              place="top"
              type="dark"
              effect="solid"
              className="tooltip customTooltip"
            />
          </IconWrapper>

          <IconWrapper
            onClick={() => console.log('remove')}
            data-tip="Delete Label"
            data-for="deleteIcon"
            hoverColor="var(--color-danger)"
          >
            <FaTrash />
            <ReactTooltip
              id="deleteIcon"
              place="top"
              type="dark"
              effect="solid"
              className="tooltip customTooltip"
            />
          </IconWrapper>
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
