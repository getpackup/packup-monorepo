import { FunctionComponent } from 'react'
import styled, { CSSProperties } from 'styled-components'

interface FlexContainerProps {
  flexDirection?: 'row' | 'column'
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  flexWrap?: 'wrap' | 'nowrap'
  height?: string
  style?: {}
  as?: string
  onClick?: () => void
  onKeyDown?: () => void
  children: React.ReactNode
  role?: string
  id?: string
}

export const FlexContainer: FunctionComponent<FlexContainerProps> = styled.div<FlexContainerProps>`
  display: flex;
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  max-width: 100%;
  width: ${(props) => (props.flexWrap === 'nowrap' ? '100%' : 'auto')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  flex-wrap: ${(props) => props.flexWrap};
  flex-direction: ${(props) => props.flexDirection};
`

FlexContainer.defaultProps = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
}
