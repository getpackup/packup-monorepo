import { AnimatedContainer, Button, FlexContainer, Input, LoadingSpinner } from '../'
import { trackEvent, requiredField, requiredEmail, validateUsername } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { useFirebase } from 'react-redux-firebase'
import toast from 'react-hot-toast'
import { FaChevronRight } from 'react-icons/fa'
import { baseSpacer } from '@packup/styles'
import { UserCredential } from 'firebase/auth'

/**
 * Generates a random password of the specified length.
 *
 * @param length The length of the password to generate.
 * @returns A Promise that resolves to a string containing the generated password.
 * @throws An error if the length argument is less than 1.
 */
const generatePassword = async (length: number): Promise<string> => {
  if (length < 1) {
    throw new Error('Length must be greater than 0')
  }

  // Create a new Uint8Array with the specified length.
  const buffer = new Uint8Array(length)

  // Get the browser's crypto object for generating random numbers.
  const crypto = window.crypto || (window as any).msCrypto // For compatibility with IE11.

  // Generate random values and store them in the buffer.
  const array = await crypto.getRandomValues(buffer)

  // Initialize an empty string to hold the generated password.
  let password = ''

  // Define the characters that can be used in the password.
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  // Iterate over the array of random values and add characters to the password.
  for (let i = 0; i < length; i++) {
    // Use the modulus operator to get a random index in the characters string
    // and add the corresponding character to the password.
    password += characters.charAt(array[i] % characters.length)
  }

  // Return the generated password.
  return password
}

export const SignupForm = (props: { email?: string }) => {
  const firebase = useFirebase()

  const initialValues = {
    email: props.email || '',
    displayName: '',
    username: '',
  }

  const [formStep, setFormStep] = useState<
    'email' | 'displayName' | 'username' | 'submitting' | 'error' | 'done'
  >('email')

  const createUserFromAuthResult = (
    result: UserCredential,
    username: string,
    displayName: string
  ) => {
    console.log('createUserFromAuthResult', result, username)
    return firebase
      .firestore()
      .collection('users')
      .doc(result.user.uid)
      .set({
        // don't spread, we dont want password in here
        uid: result.user.uid,
        email: result.user.email,
        displayName: displayName,
        username: username,
        photoURL: '',
        bio: '',
        website: '',
        location: '',
        lastUpdated: new Date(),
        createdAt: new Date(),
      })
      .then(() => {
        trackEvent('New User Signed Up And Created Profile', {
          email: result.user.email,
        })
      })
      .catch((err) => {
        trackEvent('New User Signed Up And Profile Creation Failed', {
          email: result.user.email,
          error: err,
        })
        toast.error(err.message)
      })
  }

  return (
    <Formik
      validateOnMount
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const password = await generatePassword(16)
        setFormStep('submitting')
        if (props.email) {
          const user = firebase.auth().currentUser
          if (user) {
            user.updatePassword(password).then(() => {
              firebase
                .auth()
                .signInWithEmailAndPassword(props.email!, password)
                .then((result: any) => {
                  if (result.user) {
                    trackEvent('Create New User From Firebase Auth Password Update', {
                      email: props.email,
                    })
                    createUserFromAuthResult(result, values.username, values.displayName)
                  }
                })
            })
          } else {
            trackEvent('Create New User From Firebase Auth Password Update Failure', {
              email: props.email,
            })
          }
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, password)
            .then((result: any) => {
              if (result.user) {
                trackEvent('New User Signed Up', { email: values.email })
                createUserFromAuthResult(result, values.username, values.displayName)
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
              setFormStep('done')
              setSubmitting(false)
            })
        }
        resetForm()
      }}
    >
      {({ isSubmitting, isValid, errors, values, setFieldValue }) => (
        <Form>
          <AnimatedContainer>
            <div aria-hidden={formStep !== 'email'}>
              <FlexContainer justifyContent="space-between" alignItems="flex-end">
                <div style={{ flex: 1, marginRight: baseSpacer }}>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    label="What's your email?"
                    validate={requiredEmail}
                    required
                    noMarginOnWrapper
                    onKeyDown={(event: KeyboardEvent) => {
                      if (
                        event.key === 'Enter' &&
                        formStep === 'email' &&
                        values.email !== '' &&
                        !errors.email
                      ) {
                        setFormStep('displayName')
                      }
                    }}
                  />
                </div>
                <Button
                  type="button"
                  disabled={values.email === '' || !!errors.email}
                  onClick={() => setFormStep('displayName')}
                >
                  <FaChevronRight />
                </Button>
              </FlexContainer>
            </div>
            <div aria-hidden={formStep !== 'displayName'}>
              <FlexContainer justifyContent="space-between" alignItems="flex-end">
                <div style={{ flex: 1, marginRight: baseSpacer }}>
                  <Field
                    as={Input}
                    type="text"
                    name="displayName"
                    label="Your full name?"
                    validate={requiredField}
                    required
                    noMarginOnWrapper
                    onKeyDown={(event: KeyboardEvent) => {
                      const eventKey = event.key.toLowerCase()
                      const isLetter = eventKey >= 'a' && eventKey <= 'z'
                      const isNumber = eventKey >= '0' && eventKey <= '9'
                      if (
                        event.key !== 'Enter' &&
                        formStep === 'displayName' &&
                        (isLetter || isNumber) &&
                        eventKey.length === 1
                      ) {
                        setFieldValue(
                          'username',
                          `${values.displayName
                            .replace(/[^A-Z0-9]/gi, '')
                            .toLowerCase()}${eventKey}`
                        )
                      } else if (
                        event.key === 'Enter' &&
                        formStep === 'displayName' &&
                        values.displayName !== '' &&
                        !errors.displayName
                      ) {
                        event.preventDefault()
                        setFormStep('username')
                      }
                    }}
                  />
                </div>
                <Button
                  type="button"
                  disabled={values.displayName === '' || !!errors.displayName}
                  onClick={() => setFormStep('username')}
                >
                  <FaChevronRight />
                </Button>
              </FlexContainer>
            </div>
            <div aria-hidden={formStep !== 'username'}>
              <FlexContainer justifyContent="space-between" alignItems="flex-end">
                <div style={{ flex: 1, marginRight: baseSpacer }}>
                  <Field
                    as={Input}
                    type="username"
                    name="username"
                    label="Now pick a username!"
                    validate={(value: string) => validateUsername(value, '')}
                    required
                    noMarginOnWrapper
                  />
                </div>
                <Button
                  disabled={
                    formStep !== 'username' ||
                    values.username === '' ||
                    !!errors.username ||
                    isSubmitting ||
                    !isValid
                  }
                  type="submit"
                  isLoading={formStep === 'submitting'}
                >
                  {formStep === 'submitting' ? 'Loading' : `Let's go!`}
                </Button>
              </FlexContainer>
              <p style={{ textAlign: 'left' }}>
                {values.username.length > 3 ? (
                  <>
                    {!errors.username
                      ? `${values.username} is available! 🎉`
                      : `${values.username} is unavailable 😢`}
                  </>
                ) : (
                  ' '
                )}
              </p>
            </div>
            <div aria-hidden={formStep !== 'submitting'}>
              <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
                <LoadingSpinner />
                <p style={{ marginTop: baseSpacer }}>
                  Creating your account now, please hold tight...
                </p>
              </FlexContainer>
            </div>
          </AnimatedContainer>
        </Form>
      )}
    </Formik>
  )
}
