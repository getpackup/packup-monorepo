import { Box, Column, Heading, PageContainer, Row, TripFormCreate } from '@packup/components'
import { fontSizeSmall } from '@packup/styles'
import Head from 'next/head'

export default function NewTripSummary() {
  return (
    <PageContainer>
      <Box>
        <Head>
          <title>New Trip | Packup</title>
        </Head>

        <Row>
          <Column md={8} mdOffset={2}>
            <Heading
              altStyle
              as="h2"
              uppercase
              style={{ fontSize: fontSizeSmall, letterSpacing: '1' }}
            >
              Create New Trip
            </Heading>
            <TripFormCreate />
          </Column>
        </Row>
      </Box>
    </PageContainer>
  )
}
