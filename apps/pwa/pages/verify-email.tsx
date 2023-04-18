import { Alert, Box, Heading, LoadingSpinner, PageContainer } from '@packup/components'
import { trackEvent } from '@packup/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useFirebase } from 'react-redux-firebase'

export default function VerifyEmail() {
  const firebase = useFirebase()
  const router = useRouter()

  const { actionCode } = router.query

  useEffect(() => {
    if (typeof actionCode !== 'string') return

    firebase
      .auth()
      .applyActionCode(actionCode)
      .then(() => {
        trackEvent('Email Address Verified')
        router.push('/')
      })
      .catch((error: Error) => {
        trackEvent('Email Address Verification Failure', { error })
        toast.error(error.message)
      })
  }, [actionCode, firebase, router])

  return (
    <PageContainer>
      <Head>Verify Email</Head>
      <Box>
        <div style={{ textAlign: 'center' }}>
          <LoadingSpinner theme="dark" />
          <Heading>Verifying your email address</Heading>
        </div>

        {!actionCode && (
          <Alert
            type="danger"
            message="No email verification token was found, please try the link from your email again."
          />
        )}
      </Box>
    </PageContainer>
  )
}
