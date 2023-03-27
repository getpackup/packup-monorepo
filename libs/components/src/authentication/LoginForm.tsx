import { Button, FlexContainer, Input } from '../'
import { trackEvent, requiredEmail } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import toast from 'react-hot-toast'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import { FaChevronRight } from 'react-icons/fa'
import { baseSpacer } from '@packup/styles'
import Link from 'next/link'

export const LoginForm = ({
  setLoginState,
}: {
  setLoginState: (state: 'start' | 'signingInWithEmail') => void
}) => {
  const initialValues = {
    email: '',
  }

  const auth = getAuth()

  const actionCodeSettings = {
    url: window.location.origin,
    handleCodeInApp: true, // This must be true
    iOS: {
      bundleId: 'com.packupapp',
    },
    android: {
      packageName: 'com.packupapp.twa',
      installApp: true,
      minimumVersion: '1',
    },
    dynamicLinkDomain:
      process.env.NODE_ENV === 'production' ? 'packup.page.link' : 'packupapp.page.link',
  }

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        setLoginState('signingInWithEmail')

        sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem('emailForSignIn', values.email)
          })
          .catch((err) => {
            trackEvent('User Log In Failure', {
              error: err,
              email: values.email,
            })
            toast.error('Unable to log in with those credentials. Please try again.')
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
    >
      {({ values }) => (
        <Form>
          <FlexContainer justifyContent="space-between">
            <div style={{ flex: 1, marginRight: baseSpacer }}>
              <Field
                as={Input}
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email..."
                validate={requiredEmail}
                required
                hiddenLabel
                noMarginOnWrapper
              />
            </div>
            <Button type="submit" disabled={values.email === ''}>
              <FaChevronRight />
            </Button>
          </FlexContainer>
          <small>
            🎉 New Passwordless Login! Or you can{' '}
            <Link href="/login-with-password">sign in with a password.</Link>
          </small>
        </Form>
      )}
    </Formik>
  )
}
