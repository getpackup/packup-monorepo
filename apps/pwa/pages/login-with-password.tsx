import {
  AnimatedContainer,
  Box,
  Button,
  Column,
  FlexContainer,
  Heading,
  Input,
  PageContainer,
  Row,
} from '@packup/components'
import { AppState, removeAttemptedPrivatePage } from '@packup/redux'
import { baseSpacer } from '@packup/styles'
import { requiredEmail, requiredField, trackEvent } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { KeyboardEvent, useState } from 'react'
import { Cookies } from 'react-cookie-consent'
import toast from 'react-hot-toast'
import { FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

export default function LoginWithPasswordForm() {
  const firebase = useFirebase()
  const client = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch()
  const router = useRouter()

  const initialValues = {
    email: '',
    password: '',
  }

  const hasAccount = !!Cookies.get('hasAccount')

  const [isLoading, setIsLoading] = useState(false)
  const [loginState, setLoginState] = useState<'email' | 'password' | 'loading' | 'error'>('email')

  return (
    <PageContainer>
      <Head>
        <title>Log In | Packup</title>
      </Head>
      <Row>
        <Column sm={8} smOffset={2} md={6} mdOffset={3}>
          <Box>
            <Heading as="h1" align="center">
              Welcome Back
            </Heading>
            <p style={{ textAlign: 'center' }}>
              <small>
                Login to access your digital gear inventory and custom packing lists for your
                adventures
              </small>
            </p>
            <Formik
              validateOnMount
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setIsLoading(true)
                firebase
                  .auth()
                  .signInWithEmailAndPassword(values.email, values.password)
                  .then(() => {
                    if (!hasAccount) {
                      // set a cookie so we know they've created an account, and default to the login form next time
                      Cookies.set('hasAccount', 'true')
                    }
                    if (client.location) {
                      trackEvent('User Logged In and Needed Redirection', {
                        location: client.location,
                        email: values.email,
                      })
                      dispatch(removeAttemptedPrivatePage())
                      router.push(client.location)
                    } else {
                      trackEvent('User Logged In', {
                        email: values.email,
                      })
                      router.push('/')
                    }
                  })
                  .catch((err) => {
                    trackEvent('User Log In Failure with Login and Password', {
                      error: err,
                      email: values.email,
                    })
                    toast.error('Unable to log in with those credentials. Please try again.')
                    setLoginState('email')
                  })
                  .finally(() => {
                    setIsLoading(false)
                    setSubmitting(false)
                  })

                resetForm()
              }}
            >
              {({ isSubmitting, isValid, values, errors }) => (
                <Form>
                  <AnimatedContainer>
                    <div aria-hidden={loginState !== 'email'}>
                      <FlexContainer justifyContent="space-between" alignItems="flex-start">
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
                            onKeyDown={(event: KeyboardEvent) => {
                              if (
                                event.key === 'Enter' &&
                                loginState === 'email' &&
                                values.email !== '' &&
                                !errors.email
                              ) {
                                setLoginState('password')
                              }
                            }}
                          />
                        </div>
                        <Button
                          type="button"
                          disabled={values.email === '' || !!errors.email}
                          onClick={() => setLoginState('password')}
                        >
                          <FaChevronRight />
                        </Button>
                      </FlexContainer>
                    </div>
                    <div aria-hidden={loginState !== 'password'}>
                      <FlexContainer justifyContent="space-between" alignItems="flex-start">
                        <div style={{ flex: 1, marginRight: baseSpacer }}>
                          <Field
                            as={Input}
                            type="password"
                            name="password"
                            label="Password"
                            validate={requiredField}
                            required
                            hiddenLabel
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !isValid || isLoading}
                          isLoading={isLoading}
                        >
                          <FaChevronRight />
                        </Button>
                      </FlexContainer>
                      <p>
                        <Link href="/forgot-password">
                          <small
                            onClick={() =>
                              trackEvent('Forgot Password Clicked', { location: 'Login Page' })
                            }
                            onKeyDown={() =>
                              trackEvent('Forgot Password Clicked', { location: 'Login Page' })
                            }
                            role="button"
                            tabIndex={0}
                          >
                            Forgot Password?
                          </small>
                        </Link>
                      </p>
                    </div>
                  </AnimatedContainer>
                </Form>
              )}
            </Formik>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
