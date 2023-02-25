import { useRouter } from 'next/router'
import { TripFormType, TripType, UserType } from '@getpackup-group/common'
import {
  Box,
  Column,
  DayPickerInput,
  EditableInput,
  HeroImageUpload,
  HorizontalRule,
  Input,
  NoTripFound,
  PageContainer,
  Pill,
  Row,
  StaticMapImage,
  TripNavigation,
  UserMediaObject,
} from '@getpackup-group/components'
import toast from 'react-hot-toast'
import { AppState } from '@getpackup-group/redux'

import {
  gearListAccommodations,
  gearListActivities,
  gearListCampKitchen,
  gearListOtherConsiderations,
  getSeason,
  isUserTripOwner,
  trackEvent,
  requiredField,
  createOptionsFromArrayOfObjects,
  formattedDateRange,
} from '@getpackup-group/utils'
import { endOfDay, startOfDay } from 'date-fns'
import { Field, Form, Formik } from 'formik'
import Head from 'next/head'
import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase'

export default function Details() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const users = useSelector((state: AppState) => state.firestore.data.users)
  const activeTripById: Array<TripType> = useSelector(
    (state: AppState) => state.firestore.ordered.activeTripById
  )
  const router = useRouter()
  // the trip ID
  const id = router.query.id as string

  const isTripOwner: boolean =
    activeTripById && activeTripById.length > 0 && activeTripById[0].owner === auth.uid

  const activeTrip: TripType | undefined =
    (activeTripById &&
      activeTripById.length > 0 &&
      Object.keys(activeTripById[0].tripMembers).some((member) => member === auth.uid)) ||
    isTripOwner
      ? activeTripById[0]
      : undefined

  useFirestoreConnect([
    {
      collection: 'trips',
      doc: id,
      storeAs: 'activeTripById',
    },
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        activeTrip && activeTrip.tripMembers && Object.keys(activeTrip.tripMembers).length > 0
          ? Object.keys(activeTrip.tripMembers)
          : [auth?.uid || ''],
      ],
    },
    {
      collection: 'gear-closet',
      storeAs: 'gearCloset',
      doc: auth.uid,
    },
  ])

  const firebase = useFirebase()

  const [isLoading, setIsLoading] = useState(false)

  const updateTrip = (values: TripFormType) => {
    setIsLoading(true)
    if (activeTrip) {
      const updatedValues = {
        ...values,
        season: getSeason(values.lat, values.lng, values.startDate as string),
        startDate: startOfDay(new Date(values.startDate as string)),
        endDate: endOfDay(new Date(values.endDate as string)),
        updated: new Date(),
        tripLength: values.tripLength,
      }
      firebase
        .firestore()
        .collection('trips')
        .doc(activeTrip.tripId)
        .update({
          ...updatedValues,
        })
        .then(() => {
          trackEvent('Trip Details Updated', {
            ...updatedValues,
          })
          setIsLoading(false)
        })
        .catch((err) => {
          trackEvent('Trip Details Update Failure', {
            ...updatedValues,
          })
          setIsLoading(false)
          toast.error(err.message)
        })
    }
  }

  const formattedTripDates =
    activeTrip &&
    formattedDateRange(activeTrip.startDate.seconds * 1000, activeTrip.endDate.seconds * 1000)

  const onlyActivityTags = activeTrip
    ? activeTrip.tags.filter((item) =>
        gearListActivities.some((activity) => item === activity.label)
      )
    : []

  const onlyAccommodationOrCampKitchenTags = activeTrip
    ? activeTrip.tags.filter(
        (item) =>
          gearListAccommodations.some((activity) => item === activity.label) ||
          gearListCampKitchen.some((activity) => item === activity.label)
      )
    : []

  const onlyOtherConsiderationsTags = activeTrip
    ? activeTrip.tags.filter((item) =>
        gearListOtherConsiderations.some((activity) => item === activity.label)
      )
    : []

  if (!id) {
    trackEvent('Trip By Id Had No Id')
    return null
  }

  return (
    <>
      <Head>
        <title key="title">Trip Details | Packup</title>
      </Head>

      <PageContainer>
        {typeof activeTrip !== 'undefined' && activeTrip && (
          <>
            <TripNavigation
              activeTrip={activeTrip}
              userIsTripOwner={isUserTripOwner(activeTrip, auth.uid)}
            />
            <HeroImageUpload type="trip" image={activeTrip.headerImage} id={activeTrip.tripId} />
            <Box>
              <Formik
                validateOnMount
                initialValues={
                  {
                    ...activeTrip,
                    startDate: new Date(activeTrip.startDate.seconds * 1000),
                    endDate: new Date(activeTrip.endDate.seconds * 1000),
                    activityTags: [...onlyActivityTags],
                    accommodationAndKitchenTags: [...onlyAccommodationOrCampKitchenTags],
                    otherConsiderationTags: [...onlyOtherConsiderationsTags],
                  } as TripFormType & {
                    activityTags?: string[]
                    accommodationAndKitchenTags?: string[]
                    otherConsiderationTags?: string[]
                  }
                }
                onSubmit={(values, { setSubmitting }) => {
                  const valuesToSave = {
                    ...values,
                    tags: [
                      ...(values.activityTags || []),
                      ...(values.accommodationAndKitchenTags || []),
                      ...(values.otherConsiderationTags || []),
                    ],
                  }
                  delete valuesToSave.activityTags
                  delete valuesToSave.accommodationAndKitchenTags
                  delete valuesToSave.otherConsiderationTags
                  updateTrip(valuesToSave)
                  setSubmitting(false)
                }}
              >
                {({ values, setFieldValue, setFieldTouched, initialValues, ...rest }) => (
                  <Form autoComplete="off">
                    <Row>
                      <Column md={7} lg={8}>
                        <EditableInput
                          label="Trip Name"
                          isLoading={isLoading}
                          value={activeTrip.name}
                        >
                          <Field
                            as={Input}
                            type="text"
                            name="name"
                            label="Trip Name"
                            validate={requiredField}
                            required
                            autoComplete="off"
                            hiddenLabel
                          />
                        </EditableInput>
                        <EditableInput
                          label="Trip Date"
                          isLoading={isLoading}
                          value={formattedTripDates as string}
                        >
                          <DayPickerInput
                            hiddenLabel
                            label="Trip Date"
                            initialValues={initialValues}
                            values={values}
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                          />
                        </EditableInput>
                        <EditableInput
                          label="Location"
                          isLoading={isLoading}
                          value={
                            !!activeTrip.lat && !!activeTrip.lng ? (
                              <StaticMapImage
                                lat={activeTrip.lat}
                                lng={activeTrip.lng}
                                height={200}
                                width="100%"
                                zoom={13}
                                label={activeTrip.startingPoint}
                              />
                            ) : (
                              activeTrip.startingPoint
                            )
                          }
                        >
                          <Field
                            as={Input}
                            type="geosuggest"
                            types={[]}
                            name="startingPoint"
                            label="Starting Location"
                            validate={requiredField}
                            required
                            hiddenLabel
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            {...rest}
                          />
                        </EditableInput>
                        <EditableInput
                          label="Description"
                          isLoading={isLoading}
                          value={activeTrip.description || 'No description provided'}
                        >
                          <Field
                            as={Input}
                            type="textarea"
                            name="description"
                            label="Description"
                            hiddenLabel
                          />
                        </EditableInput>
                        <EditableInput
                          label="Activities"
                          isLoading={isLoading}
                          value={
                            onlyActivityTags && onlyActivityTags.length > 0 ? (
                              <>
                                {onlyActivityTags.map((tag: string) => (
                                  <Pill key={`${tag}tag`} text={tag} color="neutral" />
                                ))}
                              </>
                            ) : (
                              'No activities selected'
                            )
                          }
                        >
                          <Field
                            as={Input}
                            type="select"
                            isMulti
                            name="activityTags"
                            label="Activity Tags"
                            hiddenLabel
                            options={createOptionsFromArrayOfObjects(gearListActivities, 'label')}
                            required
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            {...rest}
                          />
                        </EditableInput>
                        <EditableInput
                          label="Accommodations/Kitchen"
                          isLoading={isLoading}
                          value={
                            onlyAccommodationOrCampKitchenTags &&
                            onlyAccommodationOrCampKitchenTags.length > 0 ? (
                              <>
                                {onlyAccommodationOrCampKitchenTags.map((tag: string) => (
                                  <Pill key={`${tag}tag`} text={tag} color="neutral" />
                                ))}
                              </>
                            ) : (
                              'No accommodations or kitchen setups selected'
                            )
                          }
                        >
                          <Field
                            as={Input}
                            type="select"
                            isMulti
                            name="accommodationAndKitchenTags"
                            label="Accommodation & Kictchen Tags"
                            hiddenLabel
                            options={createOptionsFromArrayOfObjects(
                              [...gearListAccommodations, ...gearListCampKitchen],
                              'label'
                            )}
                            required
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            {...rest}
                          />
                        </EditableInput>
                        <EditableInput
                          label="Other Considerations"
                          isLoading={isLoading}
                          value={
                            onlyOtherConsiderationsTags &&
                            onlyOtherConsiderationsTags.length > 0 ? (
                              <>
                                {onlyOtherConsiderationsTags.map((tag: string) => (
                                  <Pill key={`${tag}tag`} text={tag} color="neutral" />
                                ))}
                              </>
                            ) : (
                              'No other considerations selected'
                            )
                          }
                        >
                          <Field
                            as={Input}
                            type="select"
                            isMulti
                            name="otherConsiderationTags"
                            label="Other Consideration Tags"
                            hiddenLabel
                            options={createOptionsFromArrayOfObjects(
                              gearListOtherConsiderations,
                              'label'
                            )}
                            required
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            {...rest}
                          />
                        </EditableInput>
                      </Column>
                      <Column md={4} mdOffset={1} lg={3} lgOffset={1}>
                        <p>
                          <strong>Created</strong>
                        </p>
                        <p>
                          {activeTrip.created?.toDate().toLocaleDateString()}{' '}
                          {activeTrip.created?.toDate().toLocaleTimeString()}
                        </p>
                        <HorizontalRule compact />
                        {activeTrip.updated && (
                          <>
                            <p>
                              <strong>Last Updated</strong>
                            </p>
                            <p>
                              {activeTrip.updated?.toDate().toLocaleDateString()}{' '}
                              {activeTrip.updated?.toDate().toLocaleTimeString()}
                            </p>
                            <HorizontalRule compact />
                          </>
                        )}
                        <p>
                          <strong>Party Members</strong>{' '}
                          <small>
                            <Link href={`/trips/${activeTrip.tripId}/party`}>Edit &rarr;</Link>
                          </small>
                        </p>

                        {users &&
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          Object.values(activeTrip.tripMembers).map((tripMember: any) => {
                            const matchingUser: UserType | undefined = users[tripMember.uid]
                              ? users[tripMember.uid]
                              : undefined
                            if (!matchingUser) return null
                            return (
                              <Fragment key={matchingUser.uid}>
                                <UserMediaObject user={matchingUser} showSecondaryContent />
                                <br />
                              </Fragment>
                            )
                          })}
                      </Column>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Box>
          </>
        )}
      </PageContainer>

      {isLoaded(activeTripById) && (isEmpty(activeTripById) || !activeTrip) && <NoTripFound />}
    </>
  )
}
