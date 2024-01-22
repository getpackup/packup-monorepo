import { brandPrimary, textColor, doubleSpacer } from '@packup/styles'
import styled from 'styled-components'

export const IconWrapper = styled.div<{ color?: string; hoverColor?: string }>`
  cursor: pointer;
  width: ${doubleSpacer};
  height: ${doubleSpacer};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.color ? props.color : 'var(--color-text)')};
  &:hover {
    color: ${(props) => (props.hoverColor ? props.hoverColor : brandPrimary)};
  }
`

export default IconWrapper
