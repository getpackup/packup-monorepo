/* eslint-disable no-alert */
import {
  Box,
  Column,
  FlexContainer,
  Heading,
  LoadingSpinner,
  PageContainer,
  Row,
} from '@packup/components'
import { AppState, removeAttemptedPrivatePage } from '@packup/redux'
import { tripleSpacer } from '@packup/styles'
import { trackEvent } from '@packup/utils'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

export default function Signin() {
  const client = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch()
  const router = useRouter()

  const auth = getAuth()

  if (!auth) {
    router.push('/login')
  }

  if (isSignInWithEmailLink(auth, window.location.href)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation')
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        if (client.location) {
          trackEvent('User Logged In and Needed Redirection', {
            location: client.location,
            email: result.user?.email,
          })
          dispatch(removeAttemptedPrivatePage())
          router.push(client.location)
        } else {
          trackEvent('User Logged In', {
            email: result.user?.email,
          })
          router.push('/')
        }
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        trackEvent('User Log In Failure', {
          error,
          email,
        })

        if (error.code === 'auth/invalid-action-code') {
          router.push(`/login?signup=true&email=${encodeURIComponent(email)}`)
          toast(`Looks like you don't have an account yet. Let's get you signed up!`, {
            icon: '👋',
          })
        } else {
          toast.error('Unable to log in with those credentials. Please try again.')
        }
      })
  }

  return (
    <PageContainer>
      <Head>
        <title>Sign In | Packup</title>
      </Head>
      <Row>
        <Column sm={8} smOffset={2} md={6} mdOffset={3}>
          <Box>
            <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
              <LoadingSpinner style={{ margin: tripleSpacer }} />

              <Heading>Signing you in...</Heading>

              <p style={{ textAlign: 'center' }}>
                Please hold! If you are seeing this page for more than a few seconds, you can click{' '}
                <Link href="/">this link</Link> to go to the Trips page.
              </p>
            </FlexContainer>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
