import { Alert, Box, Button, Heading, Input, PageContainer } from '@packup/components'
import { passwordRulesString, requiredPassword, trackEvent } from '@packup/utils'
import * as Sentry from '@sentry/nextjs'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCaretRight, FaInfoCircle } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'
import ReactTooltip from 'react-tooltip'

type ResetFormType = {
  password: string
}

export default function ResetPassword() {
  const [email, setEmail] = useState<string>()

  const firebase = useFirebase()
  const router = useRouter()

  const { actionCode } = router.query

  const unrecoverableError = useCallback(
    (err) => {
      toast.error(err.message || 'Something went wrong, try resetting your password again')

      trackEvent('Reset Password Unrecoverable Error')
      router.push('/404')
    },
    [router]
  )

  useEffect(() => {
    if (actionCode) {
      try {
        firebase
          .auth()
          .verifyPasswordResetCode(actionCode as string)
          .then((userEmail) => {
            setEmail(userEmail)
            trackEvent('Reset Password Verified', { userEmail })
          })
          .catch((err) => {
            unrecoverableError(err)
            Sentry.captureException(err)
          })
      } catch (err2) {
        unrecoverableError(err2)
        Sentry.captureException(err2)
      }
    }
  }, [firebase, actionCode, unrecoverableError])

  const onSubmit = (values: ResetFormType, { setSubmitting }: FormikHelpers<ResetFormType>) => {
    if (actionCode) {
      firebase
        .auth()
        .confirmPasswordReset(actionCode as string, values.password)
        .then((): Promise<void> => {
          if (!email) {
            trackEvent('Reset Password No Email')
            toast.error('No email was found, please try again')
            return Promise.reject(new Error('Something went wrong, please try again'))
          }

          // Password reset has been confirmed and new password updated, navigate to home page
          return firebase
            .auth()
            .signInWithEmailAndPassword(email, values.password)
            .then(() => {
              toast.success('Password reset successful')
              trackEvent('Reset Password Confirmed And Signed In', { email })
              router.push('/')
            })
        })
        .catch((error: Error) => {
          toast.error(error.message)
        })
        .finally(() => {
          setSubmitting(false)
        })
    }
  }

  const initialValues = {
    password: '',
  }

  return (
    <PageContainer>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Box>
        <Heading as="h2">Reset Password</Heading>
        <p>Enter your new password below.</p>
        <Formik validateOnMount initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field
                as={Input}
                type="password"
                name="password"
                label="Password"
                validate={requiredPassword}
                required
                helpText={
                  <span data-tip={passwordRulesString} data-for="requirements">
                    Password requirements <FaInfoCircle />
                    <ReactTooltip
                      id="requirements"
                      place="bottom"
                      type="dark"
                      effect="solid"
                      className="tooltip customTooltip customTooltip200"
                      delayShow={500}
                    />
                  </span>
                }
                hiddenLabel
              />
              {!actionCode && (
                <Alert
                  type="danger"
                  message="No password reset token was found, please try the link from your email again."
                />
              )}
              <p>
                <Button
                  type="submit"
                  iconRight={<FaCaretRight />}
                  disabled={!actionCode || isSubmitting || !isValid}
                >
                  Submit
                </Button>
              </p>
            </Form>
          )}
        </Formik>
      </Box>
    </PageContainer>
  )
}
