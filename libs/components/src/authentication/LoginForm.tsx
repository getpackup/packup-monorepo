import { Button, FlexContainer, Input } from '../'
import { Field, Form, Formik } from 'formik'
import { requiredEmail, trackEvent } from '@packup/utils'

import { FaChevronRight } from 'react-icons/fa'
import { baseSpacer } from '@packup/styles'
import { sendSignInLink } from './sendSignInLink'
import toast from 'react-hot-toast'
import { useFirebase } from 'react-redux-firebase'
import { useRouter } from 'next/router'

export const LoginForm = ({
  setLoginState,
  setActiveTab,
}: {
  setLoginState: (state: 'start' | 'signingInWithEmail') => void
  setActiveTab: (tab: 'login' | 'signup') => void
}) => {
  const firebase = useFirebase()
  const router = useRouter()

  const initialValues = {
    email: '',
  }

  const usersRef = firebase.firestore().collection('users')

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        usersRef
          .where('email', '==', values.email)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              sendSignInLink(values.email)
                .then(() => {
                  setLoginState('signingInWithEmail')
                  window.localStorage.setItem('emailForSignIn', values.email)
                })
                .catch((err) => {
                  trackEvent('User Log In Failure with sendSignInLinkToEmail', {
                    error: err,
                    email: values.email,
                  })
                  toast.error('Unable to log in with those credentials. Please try again.')
                })
                .finally(() => {
                  setSubmitting(false)
                })
            } else {
              trackEvent('User Attempted Passwordless Signin Without Account', {
                email: values.email,
              })
              router.push(`/signup?email=${encodeURIComponent(values.email)}`)
              setActiveTab('signup')
              toast(`It looks like you don't have an account yet. Let's get you signed up!`, {
                icon: '🤦🏻‍♂️',
                duration: 10000,
              })
            }
          })
      }}
    >
      {({ values }) => (
        <Form>
          <FlexContainer justifyContent="space-between" alignItems="flex-end">
            <div style={{ flex: 1, marginRight: baseSpacer }}>
              <Field
                as={Input}
                type="email"
                name="email"
                label="🎉 New Passwordless Login"
                placeholder="Enter your email..."
                validate={requiredEmail}
                noMarginOnWrapper
              />
            </div>
            <Button type="submit" disabled={values.email === ''}>
              <FaChevronRight />
            </Button>
          </FlexContainer>
        </Form>
      )}
    </Formik>
  )
}
