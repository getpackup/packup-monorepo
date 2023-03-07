import { AnimatedContainer, Button, Input } from '../'
import { AppState, removeAttemptedPrivatePage } from '@packup/redux'
import { trackEvent, requiredField, requiredEmail } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import toast from 'react-hot-toast'

export const LoginForm = () => {
  const firebase = useFirebase()
  const client = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch()
  const router = useRouter()

  const initialValues = {
    email: '',
    password: '',
  }

  const [isLoading, setIsLoading] = useState(false)
  const [loginState, setLoginState] = useState<'email' | 'password' | 'loading' | 'error'>('email')

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setIsLoading(true)
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
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
            trackEvent('User Log In Failure', {
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
      {({ isSubmitting, isValid, values }) => (
        <Form>
          <AnimatedContainer>
            <div aria-hidden={loginState !== 'email'}>
              <Field
                as={Input}
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email..."
                validate={requiredEmail}
                required
                hiddenLabel
              />
              <Button
                type="button"
                block
                disabled={values.email === ''}
                onClick={() => setLoginState('password')}
                iconRight={<FaArrowRight />}
              >
                Continue
              </Button>
            </div>
            <div aria-hidden={loginState !== 'password'}>
              <Field
                as={Input}
                type="password"
                name="password"
                label="Password"
                validate={requiredField}
                required
                hiddenLabel
              />
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || isLoading}
                isLoading={isLoading}
                block
              >
                {isLoading ? 'Logging In' : 'Log In'}
              </Button>
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
  )
}
