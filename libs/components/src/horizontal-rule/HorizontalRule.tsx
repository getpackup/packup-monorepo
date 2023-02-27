import { baseBorderStyle } from '@packup/styles'
import { doubleSpacer, halfSpacer } from '@packup/styles'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface HRProps {
  compact?: boolean
}

const StyledHorizontalRule = styled.hr`
  border-top: ${baseBorderStyle};
  border-width: 0;
  width: 100%;
  margin: ${(props: HRProps) => (props.compact ? halfSpacer : doubleSpacer)} 0;
`

export const HorizontalRule: FunctionComponent<HRProps> = ({ compact }) => (
  <StyledHorizontalRule compact={compact} />
)

HorizontalRule.displayName = 'HorizontalRule'
HorizontalRule.defaultProps = {
  compact: false,
}
