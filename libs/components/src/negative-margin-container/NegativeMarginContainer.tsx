import { baseSpacer } from '@packup/styles'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

type NegativeMarginContainerProps = {
  /** pass the number without px value or minus sign */
  top?: number
  /** pass the number without px value or minus sign */
  right?: number
  /** pass the number without px value or minus sign */
  bottom?: number
  /** pass the number without px value or minus sign */
  left?: number
  height?: string
  aspectRatio?: number
  children: React.ReactNode
}

export const NegativeMarginContainer: FunctionComponent<NegativeMarginContainerProps> = styled.div`
  margin-top: ${(props: NegativeMarginContainerProps) => (props.top ? `-${props.top}px` : 0)};
  margin-right: ${(props: NegativeMarginContainerProps) =>
    props.right ? `-${props.right}px` : baseSpacer};
  margin-bottom: ${(props: NegativeMarginContainerProps) =>
    props.bottom ? `-${props.bottom}px` : baseSpacer};
  margin-left: ${(props: NegativeMarginContainerProps) => (props.left ? `-${props.left}px` : 0)};
  height: ${(props: NegativeMarginContainerProps) => (props.height ? props.height : 'auto')};
  overflow: hidden;
  aspect-ratio: ${(props) => props.aspectRatio || 'initial'};
`
