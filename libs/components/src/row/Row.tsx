import { baseSpacerUnit } from '@getpackup-group/styles'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface RowProps {
  children: any // TODO narrow it down
}

export const Row: FunctionComponent<RowProps> = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -${baseSpacerUnit / 2}px;
  margin-left: -${baseSpacerUnit / 2}px;
`
