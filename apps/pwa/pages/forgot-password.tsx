import { requiredField, trackEvent } from '@packup/utils'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCaretRight } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'

import {
  Alert,
  Box,
  Button,
  Column,
  FlexContainer,
  Heading,
  Input,
  PageContainer,
  Row,
} from '../components'

type ForgotPasswordForm = {
  email: string
}

export default function ForgotPassword() {
  const firebase = useFirebase()

  const [displayError, setDisplayError] = useState<string>()

  const onSubmit = (
    values: ForgotPasswordForm,
    { resetForm, setSubmitting }: FormikHelpers<ForgotPasswordForm>
  ) => {
    setDisplayError(undefined)

    firebase
      .auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        resetForm()
        trackEvent('Forgot Password Submitted', { email: values.email })
        toast.success('Check your email inbox to reset your password')
      })
      .catch((error: Error) => {
        trackEvent('Forgot Password Submit Failure', { email: values.email, error })
        setDisplayError(error.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const initialValues = {
    email: '',
  }

  return (
    <PageContainer withVerticalPadding>
      <Head>
        <title>Forgot Password | Packup</title>
      </Head>
      <Row>
        <Column md={8} mdOffset={2}>
          <Box>
            <Heading as="h2">Forgot your password?</Heading>
            <p>
              Hey, it&apos;s better to forget your password than an important piece of gear on a
              trip!
            </p>
            <Formik validateOnMount initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting, isValid }) => (
                <Form name="forgot-password">
                  <Field
                    as={Input}
                    type="text"
                    name="email"
                    label="Email"
                    validate={requiredField}
                    required
                    hiddenLabel
                  />
                  {displayError ? <Alert type="danger" message={displayError} /> : null}
                  <FlexContainer justifyContent="space-between">
                    <p>
                      <Button
                        type="submit"
                        iconRight={<FaCaretRight />}
                        disabled={isSubmitting || !isValid}
                      >
                        Submit
                      </Button>
                    </p>

                    <p>
                      <Link href="/login">Back to login</Link>
                    </p>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
