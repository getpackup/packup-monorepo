import { useLoggedInUser } from '@packup/hooks'
import { AppState } from '@packup/redux'
import { postFormUrlEncoded, trackEvent } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'

import { Box, Button, Column, Heading, Input, PageContainer, Row } from '../components'

export default function AccountDelete() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const activeLoggedInUser = useLoggedInUser()
  const router = useRouter()

  const [submitted, setSubmitted] = useState(false)

  return (
    <PageContainer withVerticalPadding>
      <Head>
        <title>Delete My Account | Packup</title>
      </Head>
      <Row>
        <Column md={8} mdOffset={2}>
          <Box>
            <Formik
              validateOnMount
              initialValues={{
                name: activeLoggedInUser?.displayName || '',
                email: activeLoggedInUser?.email || '',
                authEmail: auth.email,
                privacyConcerns: false,
                noLongerUseful: false,
                otherChoice: false,
                lessScreenTime: false,
                otherReason: '',
              }}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                if (!activeLoggedInUser) {
                  toast.error('You must be logged in to delete your account')
                  return
                }
                postFormUrlEncoded('accountDelete', values)
                  .then(() => {
                    trackEvent('Account Delete Form Submitted', values)
                    setSubmitting(false)
                    // show success message
                    setSubmitted(true)
                    resetForm()
                  })
                  .catch((err) => {
                    trackEvent('Account Delete Request Failure', { ...values, error: err })
                    toast.error(err.message)
                  })
              }}
            >
              {({ values, isSubmitting, isValid }) => (
                <Form
                  name="accountDelete"
                  method="post"
                  netlify-honeypot="bot-field"
                  data-netlify="true"
                >
                  {submitted ? (
                    <>
                      <Heading>👋 Adios</Heading>
                      <p>We will process your account deletion request within one week.</p>
                      <p>Thank you for trying out Packup. You can now logout or navigate away.</p>
                      <Button type="link" to="/logout">
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Heading>What prompted you to deactivate your account?</Heading>
                      <p>
                        No hard feelings, we just want to use this feedback to improve. Select all
                        that apply.
                      </p>
                      <input
                        type="hidden"
                        name="name"
                        value={activeLoggedInUser?.displayName || ''}
                      />
                      <input type="hidden" name="email" value={activeLoggedInUser?.email || ''} />
                      <input type="hidden" name="authEmail" value={auth?.email || ''} />
                      <Field
                        as={Input}
                        type="checkbox"
                        name="privacyConcerns"
                        label="I have privacy concerns"
                        checked={values.privacyConcerns}
                      />
                      <Field
                        as={Input}
                        type="checkbox"
                        name="noLongerUseful"
                        label="I don't find this useful anymore"
                        checked={values.noLongerUseful}
                      />
                      <Field
                        as={Input}
                        type="checkbox"
                        name="lessScreenTime"
                        label="I'm trying to experience more of life not behind a screen"
                        checked={values.lessScreenTime}
                      />
                      <Field
                        as={Input}
                        type="checkbox"
                        name="otherChoice"
                        label="Other"
                        checked={values.otherChoice}
                      />
                      {values.otherChoice && (
                        <Field
                          as={Input}
                          type="textarea"
                          placeholder="Why are you leaving?"
                          name="otherReason"
                          label="Reason"
                        />
                      )}
                      <p>Once you click submit, we will process your request within a week.</p>
                      <Button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        color="success"
                        rightSpacer
                      >
                        Submit
                      </Button>
                      <Button type="button" color="text" onClick={() => router.back()}>
                        Cancel
                      </Button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
