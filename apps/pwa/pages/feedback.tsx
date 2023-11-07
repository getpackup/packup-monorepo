// this page is mainly just ofr netlify forms to pick up so we can use the feedback modal to submit
import { AppState } from '@packup/redux'
import { postFormUrlEncoded, trackEvent } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { FaCaretRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'

import { Box, Button, Column, Heading, Input, PageContainer, Row } from '../components'

export default function Feedback() {
  const auth = useSelector((state: AppState) => state.firebase.auth)

  const initialValues = {
    email: auth?.email || '',
    displayName: auth?.displayName || '',
    liked: '',
    disliked: '',
    differently: '',
    missing: '',
    message: '',
  }

  return (
    <PageContainer withVerticalPadding>
      <Head>
        <title>Feedback | Packup</title>
      </Head>
      <Row>
        <Column md={8} mdOffset={2}>
          <Box>
            <Formik
              validateOnMount
              initialValues={initialValues}
              onSubmit={(values, { resetForm, setSubmitting }) => {
                postFormUrlEncoded('feedback', values)
                  .then(() => {
                    trackEvent('Feedback Form Submitted', values)
                    setSubmitting(false)
                    resetForm()
                  })
                  .catch((err) => {
                    trackEvent('Feedback Form Submitted', { ...values, error: err })
                    toast.error(err.message)
                  })
              }}
            >
              {({ isSubmitting, isValid, values }) => (
                <Form
                  name="feedback"
                  method="post"
                  netlify-honeypot="bot-field"
                  data-netlify="true"
                >
                  <input type="hidden" name="form-name" value="feedback" />
                  <input type="hidden" name="email" value={values.email} />
                  <input type="hidden" name="displayName" value={values.displayName} />
                  <Heading as="h2">Thank you! 🤝</Heading>
                  <p>
                    We really appreciate you taking the time to provide us feedback on our app. Your
                    thoughts mean so much to us and we can&apos;t thank you enough!
                  </p>
                  <Field
                    as={Input}
                    type="textarea"
                    name="liked"
                    label="What did you like about it?"
                  />

                  <Field
                    as={Input}
                    type="textarea"
                    name="disliked"
                    label="What didn't you like about it?"
                  />
                  <Field
                    as={Input}
                    type="textarea"
                    name="differently"
                    label="What would you do differently?"
                  />
                  <Field
                    as={Input}
                    type="textarea"
                    name="missing"
                    label="Is there anything we are missing or not thinking of that you would add?"
                  />
                  <Field as={Input} type="textarea" name="message" label="Any other feedback?" />
                  <p>
                    <Button
                      type="submit"
                      rightSpacer
                      iconRight={<FaCaretRight />}
                      disabled={isSubmitting || !isValid}
                    >
                      Submit
                    </Button>
                  </p>
                </Form>
              )}
            </Formik>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
