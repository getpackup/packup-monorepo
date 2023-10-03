import { FunctionComponent, useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext, getLabelColor } from '@packup/utils'

type PackingListItemLabelProps = {
  colorName: 'green' | 'red' | 'orange'
  children: string | JSX.Element | JSX.Element[]
}

type StyledLabelProps = {
  color?: string
  bgColor?: string
}

const StyledLabel = styled.span<StyledLabelProps>`
  border: 1px solid ${props => props.color};
  line-height: normal;
  font-size: 15px;
  padding: 5px 10px;
  border-radius: 25px;
  color: ${props => props.color};
  background-color: ${props => props.bgColor};
`

export const PackingListItemLabel: FunctionComponent<PackingListItemLabelProps> = ({
   children, colorName
}) => {
  // Will return `dark` for dark mode
  const { colorMode } = useContext(ThemeContext)

  const labelColor = getLabelColor(colorName, colorMode)

  return (
    <StyledLabel
      color={labelColor.color}
      bgColor={labelColor.bgColor}
    >
      {children}
    </StyledLabel>
  )
}
