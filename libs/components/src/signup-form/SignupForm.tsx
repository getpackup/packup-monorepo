import { Alert, Button, Column, Input, Row } from '..'
import { trackEvent, requiredEmail } from '@getpackup-group/utils'
import { Field, Form, Formik } from 'formik'
// import addToMailchimp, { MailchimpResponse } from 'gatsby-plugin-mailchimp'
import React, { FunctionComponent, useState } from 'react'

interface SignupFormProps {
  location: string
}

export const SignupForm: FunctionComponent<SignupFormProps> = (props) => {
  const [response, setResponse] = useState({ msg: '', result: '' })
  const initialValues = { [`email-${props.location}`]: '' }

  const getTextFromHtmlString = (s: string) => s.replace(/<.*?>*<\/.*?>/g, '')
  const getHrefFromHtmlString = (s: string) => s.match(/href="([^"]*)/)?.[1]
  const getLinkTextFromHtmlString = (s: string) => s.replace(/.*<.*?>(.*)<\/.*?>/g, '$1')
  const error = response.result === 'error'
  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      onSubmit={() => {
        console.log('Probably should send request to mailchimp at this point')
      }}
      // onSubmit={(values, { setSubmitting }) => {
      //   addToMailchimp(values[`email-${props.location}`]).then((res: MailchimpResponse) => {
      //     setSubmitting(false)
      //     setResponse(res)
      //     trackEvent('Signed Up For Newsletter', {
      //       email: values[`email-${props.location}`],
      //       response: res,
      //       location: props.location,
      //     })
      //   })
      // }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Row>
            <Column sm={8}>
              <Field
                as={Input}
                hiddenLabel
                type="email"
                name={`email-${props.location}`}
                label="Email"
                validate={requiredEmail}
              />
            </Column>
            <Column sm={4}>
              <Button color="secondary" type="submit" block disabled={isSubmitting || !isValid}>
                Subscribe
              </Button>
            </Column>
          </Row>

          {response.msg ? (
            <Alert
              type={error ? 'danger' : 'success'}
              message={error ? getTextFromHtmlString(response.msg) : response.msg}
              callToActionLink={error ? getHrefFromHtmlString(response.msg) : undefined}
              callToActionLinkText={error ? getLinkTextFromHtmlString(response.msg) : undefined}
            />
          ) : null}
        </Form>
      )}
    </Formik>
  )
}

export default SignupForm