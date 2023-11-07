import { TripFormType, TripMemberFormType, TripMemberStatus } from '@packup/common'
import { useLoggedInUser } from '@packup/hooks'
import { AppState, RootState } from '@packup/redux'
import { getSeason, sendTripInvitationEmail, trackEvent } from '@packup/utils'
import { differenceInCalendarDays, endOfDay, startOfDay } from 'date-fns'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'

import { Button } from '../button/Button'
import { Column } from '../column/Column'
import type { Ref as ConfettiApiRef } from '../index'
import { Confetti } from '../index'
import { Row } from '../row/Row'
import getInitValues from './form-model/formInitialValues'
import newTripFormModel from './form-model/newTripFormModel'
import validationSchema from './form-model/validationSchema'
import DateStep from './steps/DateStep'
import GroupStep from './steps/GroupStep'
import ImageStep from './steps/ImageStep'
import LocationStep from './steps/LocationStep'
import TitleStep from './steps/TitleStep'

type MembersToInviteType = { uid: string; email: string; greetingName: string }[]

const { formId, formField } = newTripFormModel
const steps = ['Location', 'Date', 'Members', 'Name', 'Image']

/**
 * @param step
 * @param parameters
 */
const renderStepContent = (
  step: number,
  tripId: string | null,
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
          tripId={tripId}
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

  const [tripId, setTripId] = useState<string | null>(null)

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
      if (tripId) {
        sendTripInvitationEmail({
          tripId,
          invitedBy: profile.username,
          email: member.email,
          greetingName: member.greetingName || '',
        })
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
        void docRef.update({
          tripId: docRef.id,
        })
        setTripId(docRef.id)

        trackEvent('New Trip Submit Successful', { values: { ...values } })
      })
      .catch((err) => {
        trackEvent('New Trip Submit Unsuccessful', { values: { ...values }, error: err })
        toast.error(err.message)
        setIsLoading(false)
      })
  }

  const updateTripWithImage = (values: TripFormType) => {
    setIsLoading(true)
    if (tripId) {
      firebase.firestore().collection('trips').doc(tripId).update({
        headerImage: values.headerImage,
      })
      setTimeout(() => {
        void router.push(`/trips/${tripId}/generator`)
      }, 4000)
      handleConfetti()
    }
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
    if (activeStep === 3) {
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
      setActiveStep(activeStep + 1)
    }
    if (isLastStep) {
      updateTripWithImage(values)
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
            {renderStepContent(activeStep, tripId, {
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
