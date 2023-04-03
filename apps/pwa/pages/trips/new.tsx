import {
  Box,
  Heading,
  PageContainer,
  TripFormCreate,
} from '@packup/components'
import Head from 'next/head'

export default function NewTripSummary() {
  return (
    <PageContainer>
      <Box>
        <Heading altStyle as="h2">
          Create New Trip
        </Heading>

        <Head>
          <title>New Trip | Packup</title>
        </Head>

        <TripFormCreate />
      </Box>
    </PageContainer>
  )
}
