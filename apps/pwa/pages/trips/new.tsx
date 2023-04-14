import { Box, Column, Heading, PageContainer, Row, TripFormCreate } from '@packup/components'
import { AppState } from '@packup/redux'
import { fontSizeSmall } from '@packup/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function NewTripSummary() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const router = useRouter()

  useEffect(() => {
    if (auth.isLoaded && (!profile || profile.isEmpty)) {
      toast.error(
        'There was an error loading necessary info for creating a trip. Please login again.'
      )
      router.push('/logout')
    }
  }, [profile, auth, router])

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
