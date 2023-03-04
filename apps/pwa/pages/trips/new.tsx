import Head from 'next/head'
import {
  UserType,
  TripFormType,
  TripMemberStatus,
  MAX_TRIP_PARTY_SIZE,
  TripMemberFormType,
} from '@packup/common'
import {
  Box,
  Button,
  DayPickerInput,
  FlexContainer,
  FormErrors,
  Heading,
  HorizontalRule,
  Input,
  PageContainer,
  UserMediaObject,
  UserSearch,
  StyledLabel,
} from '@packup/components'
import toast from 'react-hot-toast'
import { AppState } from '@packup/redux'
import { getSeason, requiredField, trackEvent, sendTripInvitationEmail } from '@packup/utils'

import axios from 'axios'
import { endOfDay, startOfDay, differenceInCalendarDays } from 'date-fns'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { useLoggedInUser } from '@packup/hooks'

type MembersToInviteType = { uid: string; email: string; greetingName: string }[]

export default function NewTripSummary() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const users = useSelector((state: AppState) => state.firestore.data.users)
  const activeLoggedInUser = useLoggedInUser()
  const firebase = useFirebase()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isSearchBarDisabled, setIsSearchBarDisabled] = useState(false)
  const [membersToInvite, setMembersToInvite] = useState<MembersToInviteType>([])

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

  const updateTripMembers = (uid: string, email: string, greetingName: string) => {
    // Object.values(acceptedTripMembersOnly(activeTrip)).length + 1 accounts for async data updates
    if (membersToInvite && membersToInvite.length + 1 > MAX_TRIP_PARTY_SIZE) {
      setIsSearchBarDisabled(true)
      // send us a slack message so we can follow up
      axios.get(
        process.env.NODE_ENV === 'production'
          ? `https://us-central1-getpackup.cloudfunctions.net/notifyOnTripPartyMaxReached?tripId=new`
          : `https://us-central1-packup-test-fc0c2.cloudfunctions.net/notifyOnTripPartyMaxReached?tripId=new`
      )
      toast.error(`At this time, Trip Parties are limited to ${MAX_TRIP_PARTY_SIZE} people.`)

      return
    }

    setMembersToInvite((prevState) => [...prevState, { uid, email, greetingName }])
  }

  const addNewTrip = (values: TripFormType) => {
    setIsLoading(true)
    setIsSearchBarDisabled(true)
    const tripMembers: Record<string, TripMemberFormType> = {}
    tripMembers[`${auth.uid}`] = {
      uid: auth.uid,
      status: TripMemberStatus.Owner,
      invitedAt: new Date(),
      acceptedAt: new Date(),
    }

    membersToInvite.forEach((member) => {
      tripMembers[`${member.uid}`] = {
        uid: member.uid,
        status: TripMemberStatus.Pending,
        invitedAt: new Date(),
        invitedBy: auth.uid,
      }
    })

    firebase
      .firestore()
      .collection('trips')
      .add({
        ...values,
        tags: [], // added in next step
        created: new Date(),
        tripMembers,
      })
      .then((docRef) => {
        docRef.update({
          tripId: docRef.id,
        })
        membersToInvite.forEach((member) => {
          sendTripInvitationEmail({
            tripId: docRef.id,
            invitedBy: profile.username,
            email: member.email,
            greetingName: member.greetingName,
          })
        })
        trackEvent('New Trip Submit Successful', { values: { ...values } })
        router.push(`/trips/${docRef.id}/image`)
      })
      .catch((err) => {
        trackEvent('New Trip Submit Unsuccessful', { values: { ...values }, error: err })
        toast.error(err.message)
      })
  }

  const initialValues: TripFormType = {
    owner: auth.uid,
    tripId: '',
    name: '',
    description: '',
    startingPoint: '',
    startDate: undefined,
    endDate: undefined,
    timezoneOffset: new Date().getTimezoneOffset(),
    tripLength: 1,
    season: undefined,
    lat: 0,
    lng: 0,
    archived: false,
  }

  return (
    <PageContainer>
      <Box>
        <Heading altStyle as="h2">
          Create New Trip
        </Heading>
        <>
          <Head>
            <title>New Trip | Packup</title>
          </Head>

          <Formik
            validateOnMount
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              const valuesWithSeason = {
                ...values,
                startDate: startOfDay(new Date(values.startDate as string)),
                endDate: endOfDay(new Date(values.endDate as string)),
                tripLength: differenceInCalendarDays(
                  new Date(values.startDate),
                  new Date(values.endDate)
                ),
                season: getSeason(values.lat, values.lng, values.startDate as string),
              }
              trackEvent('New Trip Submit Button Clicked', valuesWithSeason)

              addNewTrip(valuesWithSeason)

              setSubmitting(false)
            }}
          >
            {({
              isSubmitting,
              isValid,
              values,
              setFieldValue,
              dirty,
              errors,
              setFieldTouched,
              touched,
              ...rest
            }) => (
              <Form autoComplete="off">
                <Field
                  as={Input}
                  type="text"
                  name="name"
                  label="Trip Name"
                  validate={requiredField}
                  required
                  autoComplete="off"
                  maxLength={50}
                />

                <DayPickerInput
                  label="Trip Date"
                  initialValues={initialValues}
                  values={values}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />

                <Field as={Input} type="textarea" name="description" label="Description" />

                <Field
                  as={Input}
                  type="geosuggest"
                  types={[]}
                  name="startingPoint"
                  label="Trip Location"
                  validate={requiredField}
                  required
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  {...rest}
                />

                <StyledLabel>Trip Party</StyledLabel>

                <Box>
                  {activeLoggedInUser && (
                    <UserMediaObject user={activeLoggedInUser} showSecondaryContent />
                  )}
                  {membersToInvite.length > 0 && <HorizontalRule compact />}
                  {membersToInvite.length > 0 &&
                    membersToInvite.map((tripMember, index) => {
                      const matchingUser: UserType =
                        users && users[tripMember.uid] ? users[tripMember.uid] : undefined
                      if (!matchingUser) return null
                      return (
                        <div key={matchingUser.uid}>
                          <UserMediaObject
                            user={matchingUser}
                            showSecondaryContent
                            action={
                              <Button
                                type="button"
                                color="tertiary"
                                size="small"
                                onClick={() =>
                                  setMembersToInvite((prevState) =>
                                    prevState.filter((_, i) => i !== index)
                                  )
                                }
                              >
                                Remove
                              </Button>
                            }
                          />
                          {index !== membersToInvite.length - 1 && <HorizontalRule compact />}
                        </div>
                      )
                    })}
                </Box>
                <UserSearch
                  activeTrip={undefined}
                  updateTrip={(uid, email, greetingName) => {
                    updateTripMembers(uid, email, greetingName)
                  }}
                  isSearchBarDisabled={isSearchBarDisabled}
                />

                <HorizontalRule />

                <FormErrors dirty={dirty} errors={errors} />
                <FlexContainer justifyContent="space-between">
                  <Button
                    type="link"
                    to="../"
                    color="tertiary"
                    rightSpacer
                    iconLeft={<FaChevronLeft />}
                    onClick={() =>
                      trackEvent('New Trip Form Cancelled', {
                        values: { ...values },
                        errors: { ...errors },
                        touched: { ...touched },
                        dirty,
                        isValid,
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid || isLoading}
                    isLoading={isLoading}
                    color="success"
                    iconRight={<FaChevronRight />}
                  >
                    Continue
                  </Button>
                </FlexContainer>
              </Form>
            )}
          </Formik>
        </>
      </Box>
    </PageContainer>
  )
}
