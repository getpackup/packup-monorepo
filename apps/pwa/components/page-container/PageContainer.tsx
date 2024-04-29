import { baseSpacer, breakpoints, doubleSpacer, halfSpacer, quadrupleSpacer } from '@packup/styles'
import styled from 'styled-components'

interface PageContainerProps {
  withVerticalPadding?: boolean
  children: any // TODO narrow down the type
}

export const PageContainer = styled.div`
  position: relative;
  margin-right: auto;
  margin-left: auto;
  padding-right: 0;
  padding-left: 0;
  width: 100%;
  max-width: ${breakpoints.xl};
  ${(props: PageContainerProps) => props.withVerticalPadding && `padding-top: ${doubleSpacer};`}

  @media only screen and (min-width: ${breakpoints.sm}) {
    padding-right: ${baseSpacer};
    padding-left: ${baseSpacer};
    ${(props: PageContainerProps) =>
      props.withVerticalPadding && `padding-top: ${quadrupleSpacer};`}
  }
`

PageContainer.displayName = 'PageContainer'
