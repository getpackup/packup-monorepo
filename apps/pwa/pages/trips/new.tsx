import { Box, Column, Heading, PageContainer, Row, TripFormCreate } from '@packup/components'
import { AppState } from '@packup/redux'
import { fontSizeSmall } from '@packup/styles'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

export default function NewTripSummary() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const firebase = useFirebase()

  const user = firebase.auth().currentUser
  useEffect(() => {
    // handle missing user info from signup creation not finishing
    if (!user || !user.uid)
      firebase
        .firestore()
        .collection('users')
        .doc(auth.uid)
        .set({
          uid: user.uid,
          email: auth.email,
          displayName: auth.providerData[0].displayName,
          username: auth.providerData[0].displayName.replace(/[^A-Z0-9]/gi, '').toLowerCase(),
          photoURL: auth.providerData[0].photoURL,
          bio: '',
          website: '',
          location: '',
          lastUpdated: new Date(),
          createdAt: new Date(),
        })
  }, [user, auth, firebase])

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
