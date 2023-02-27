import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { FlexContainer, Heading, PageContainer } from '@packup/components'
import { brandPrimary, octupleSpacer } from '@packup/styles'
import React, { FunctionComponent } from 'react'
import Loader from 'react-loader-spinner'

export const LoadingPage: FunctionComponent<{}> = () => (
  <PageContainer withVerticalPadding>
    <FlexContainer height="75vh" flexDirection="column">
      <Loader type="Rings" color={brandPrimary} height={octupleSpacer} width={octupleSpacer} />
      <Heading as="h6" uppercase>
        Loading...
      </Heading>
    </FlexContainer>
  </PageContainer>
)
