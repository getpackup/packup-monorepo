import ReactTooltip from 'react-tooltip'
import { Button, Input } from '../'
import { AppState } from '@getpackup-group/redux'
import {
  trackEvent,
  requiredField,
  requiredEmail,
  validateUsername,
  requiredPassword,
  passwordRulesString,
} from '@getpackup-group/utils'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import toast from 'react-hot-toast'
import { FaInfoCircle } from 'react-icons/fa'

export const SignupForm = () => {
  const firebase = useFirebase()

  const initialValues = {
    email: '',
    password: '',
    displayName: '',
    username: '',
  }

  const [isLoading, setIsLoading] = useState(false)

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setIsLoading(true)
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((result: any) => {
            trackEvent('New User Signed Up', { email: values.email })
            if (result.user) {
              return firebase
                .firestore()
                .collection('users')
                .doc(result.user.uid)
                .set({
                  // don't spread, we dont want password in here
                  uid: result.user.uid,
                  email: values.email,
                  displayName: values.displayName,
                  username: values.username,
                  photoURL: '',
                  bio: '',
                  website: '',
                  location: '',
                  lastUpdated: new Date(),
                  createdAt: new Date(),
                })
                .then(() => {
                  trackEvent('New User Signed Up And Created Profile', {
                    email: values.email,
                  })
                })
                .catch((err) => {
                  trackEvent('New User Signed Up And Profile Creation Failed', {
                    email: values.email,
                    error: err,
                  })
                  toast.error(err.message)
                })
            }
            return Promise.resolve()
          })
          .catch((err) => {
            trackEvent('New User Sign Up Failed', {
              email: values.email,
              error: err,
            })
            toast.error(err.message)
          })
          .finally(() => {
            setIsLoading(false)
            setSubmitting(false)
          })

        resetForm()
      }}
    >
      {({ isSubmitting, isValid, errors, values }) => (
        <Form>
          <Field
            as={Input}
            type="text"
            name="displayName"
            label="Full Name"
            validate={requiredField}
            required
            hiddenLabel
          />

          <Field
            as={Input}
            type="username"
            name="username"
            label="Username"
            validate={(value: string) => validateUsername(value, '')}
            required
            hiddenLabel
            helpText={
              values.username.length > 3 && !errors.username
                ? `${values.username} is available!`
                : ''
            }
          />

          <Field
            as={Input}
            type="email"
            name="email"
            label="Email"
            validate={requiredEmail}
            required
            hiddenLabel
          />
          <Field
            as={Input}
            type="password"
            name="password"
            label="Password"
            validate={requiredPassword}
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
            required
            hiddenLabel
          />
          <p>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || isLoading}
              isLoading={isLoading}
              block
            >
              {isLoading ? 'Loading' : 'Sign Up'}
            </Button>
          </p>
        </Form>
      )}
    </Formik>
  )
}
