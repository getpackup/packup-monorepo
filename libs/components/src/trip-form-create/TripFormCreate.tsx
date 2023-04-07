import { Form, Formik } from 'formik'
import { TripFormType, TripMemberFormType, TripMemberStatus } from '@packup/common'
import { useSelector } from 'react-redux'
import { AppState, RootState } from '@packup/redux'
import getInitValues from './form-model/formInitialValues'
import newTripFormModel from './form-model/newTripFormModel'
import { useRef, useState } from 'react'
import { getSeason, sendTripInvitationEmail, trackEvent } from '@packup/utils'
import { differenceInCalendarDays, endOfDay, startOfDay } from 'date-fns'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import validationSchema from './form-model/validationSchema'
import { Row } from '../row/Row'
import { Column } from '../column/Column'
import { Button } from '../button/Button'
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import LocationStep from './steps/LocationStep'
import DateStep from './steps/DateStep'
import GroupStep from './steps/GroupStep'
import TitleStep from './steps/TitleStep'
import ImageStep from './steps/ImageStep'
import { useRouter } from 'next/router'
import { useLoggedInUser } from '@packup/hooks'
import { toast } from 'react-hot-toast'
import type { Ref as ConfettiApiRef } from '@packup/components'
import { Confetti } from '@packup/components'

type MembersToInviteType = { uid: string; email: string; greetingName: string }[]

const { formId, formField } = newTripFormModel
const steps = ['Location', 'Date', 'Members', 'Name', 'Image']

/**
 * @param step
 * @param parameters
 */
const renderStepContent = (
  step: number,
  parameters: {
    formValues: TripFormType
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    setFieldTouched: (
      field: string,
      isTouched?: boolean | undefined,
      shouldValidate?: boolean | undefined
    ) => void
    activeLoggedInUser: ReturnType<typeof useLoggedInUser>
    membersToInvite: MembersToInviteType
    setMembersToInvite: (members: MembersToInviteType) => void
    auth: AppState['firebase']['auth']
  }
) => {
  switch (step) {
    case 0:
      return (
        <LocationStep
          formField={formField}
          formValues={parameters.formValues}
          setFieldTouched={parameters.setFieldTouched}
          setFieldValue={parameters.setFieldValue}
        />
      )
    case 1:
      return (
        <DateStep
          formValues={parameters.formValues}
          setFieldValue={parameters.setFieldValue}
          setFieldTouched={parameters.setFieldTouched}
        />
      )
    case 2:
      return (
        <GroupStep
          activeLoggedInUser={parameters.activeLoggedInUser}
          membersToInvite={parameters.membersToInvite}
          auth={parameters.auth}
          setMembersToInvite={parameters.setMembersToInvite}
        />
      )
    case 3:
      return (
        <TitleStep
          formField={formField}
          formValues={parameters.formValues}
          setFieldValue={parameters.setFieldValue}
          setFieldTouched={parameters.setFieldTouched}
        />
      )
    case 4:
      return (
        <ImageStep
          formField={formField}
          formValues={parameters.formValues}
          setFieldValue={parameters.setFieldValue}
        />
      )
    default:
      return <div>Step Not Found</div>
  }
}

export function TripFormCreate() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: RootState) => state.firebase.profile)
  const activeLoggedInUser = useLoggedInUser()
  const firebase = useFirebase()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [membersToInvite, setMembersToInvite] = useState<MembersToInviteType>([])

  const isLastStep = activeStep === steps.length - 1

  const initialValues: TripFormType = getInitValues(auth.uid)
  const currentValidationSchema = validationSchema[activeStep]

  useFirestoreConnect([
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        membersToInvite && membersToInvite.length > 0
          ? membersToInvite.map((m) => m.uid)
          : [auth.uid || ''],
      ],
    },
  ])

  const submitForm = (values: TripFormType) => {
    setIsLoading(true)

    const now = new Date()
    const tripMembers: Record<string, TripMemberFormType> = {}
    tripMembers[`${auth.uid}`] = {
      uid: auth.uid,
      status: TripMemberStatus.Owner,
      invitedAt: now,
      acceptedAt: now,
    }

    membersToInvite.forEach((member) => {
      tripMembers[`${member.uid}`] = {
        uid: member.uid,
        status: TripMemberStatus.Pending,
        invitedAt: now,
        invitedBy: auth.uid,
      }
    })

    firebase
      .firestore()
      .collection('trips')
      .add({
        ...values,
        tags: [],
        created: now,
        tripMembers,
      })
      .then((docRef) => {
        handleConfetti()

        void docRef.update({
          tripId: docRef.id,
        })

        membersToInvite.forEach((member) => {
          void sendTripInvitationEmail({
            tripId: docRef.id,
            invitedBy: profile.username,
            email: member.email,
            greetingName: member.greetingName,
          })
        })

        trackEvent('New Trip Submit Successful', { values: { ...values } })
        setTimeout(() => {
          void router.push(`/trips/${docRef.id}/generator`)
        }, 2000)
      })
      .catch((err) => {
        trackEvent('New Trip Submit Unsuccessful', { values: { ...values }, error: err })
        toast.error(err.message)
        setIsLoading(false)
      })
  }

  const handleConfetti = () => {
    confettiRef.current?.fire({
      scalar: 0.5,
      particleCount: 200,
      startVelocity: 30,
      gravity: 0.5,
      shapes: ['star', 'circle', 'square'],
      origin: { y: 0.8 },
    })
  }

  const handleSubmit = (values: TripFormType, actions: any) => {
    if (isLastStep) {
      const defaultDate = new Date().toString()
      const valuesWithSeason = {
        ...values,
        startDate: startOfDay(new Date(values.startDate as string)),
        endDate: endOfDay(new Date(values.endDate as string)),
        tripLength: differenceInCalendarDays(
          new Date(values.startDate ?? defaultDate),
          new Date(values.endDate ?? defaultDate)
        ),
        season: getSeason(values.lat, values.lng, values.startDate as string),
      }
      trackEvent('New Trip Submit Button Clicked', valuesWithSeason)

      submitForm(valuesWithSeason)
    } else {
      setActiveStep(activeStep + 1)
    }

    actions.setSubmitting(false)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const confettiRef = useRef<ConfettiApiRef | null>(null)

  return (
    <>
      <Confetti ref={confettiRef} manualstart />

      <Formik
        validationSchema={currentValidationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, values, setFieldValue, setFieldTouched }) => (
          <Form autoComplete="off" id={formId}>
            {renderStepContent(activeStep, {
              formValues: values,
              setFieldValue,
              setFieldTouched,
              activeLoggedInUser,
              membersToInvite,
              setMembersToInvite,
              auth,
            })}
            <div>
              <Row>
                <Column xs={6}>
                  {activeStep !== 0 && (
                    <Button
                      type="button"
                      color="text"
                      block
                      disabled={isSubmitting || !isValid || isLoading}
                      onClick={handleBack}
                      iconLeft={<FaChevronLeft />}
                    >
                      Back
                    </Button>
                  )}
                </Column>
                <Column xs={6}>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid || isLoading}
                    isLoading={isLoading}
                    color={isLastStep ? 'success' : 'primary'}
                    block
                    iconLeft={isLastStep ? <FaCheck /> : null}
                    iconRight={isLastStep ? null : <FaChevronRight />}
                  >
                    {isLastStep ? 'Create' : 'Next'}
                  </Button>
                </Column>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default TripFormCreate
