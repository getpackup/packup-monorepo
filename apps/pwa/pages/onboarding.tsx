/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { TripMemberStatus, TripType } from '@packup/common'
import {
  Box,
  Button,
  Column,
  FlexContainer,
  FormErrors,
  Heading,
  HorizontalRule,
  IconCheckbox,
  InlineLoader,
  PageContainer,
  Row,
} from '@packup/components'
import { AppState } from '@packup/redux'
import { doubleSpacer, halfSpacer, textColor, textColorLight } from '@packup/styles'
import {
  ActivityTypes,
  gearListAccommodations,
  gearListActivities,
  gearListCampKitchen,
  gearListKeys,
  gearListOtherConsiderations,
  trackEvent,
} from '@packup/utils'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import pickBy from 'lodash/pickBy'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaCheck, FaChevronLeft, FaChevronRight, FaCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'

const Slide = styled.div`
  height: 100%;
`

const CenteredText = styled.div`
  text-align: center;
`

export default function Onboarding() {
  const firebase = useFirebase()
  const router = useRouter()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const trips: Array<TripType> = useSelector((state: AppState) => state.firestore.ordered.trips)

  useFirestoreConnect([
    {
      collection: 'gear-closet',
      storeAs: 'gearCloset',
      doc: auth.uid,
    },
    {
      collection: 'trips',
      where: [
        [
          `tripMembers.${auth.uid}.status`,
          'not-in',
          [TripMemberStatus.Declined, TripMemberStatus.Removed],
        ],
      ],
    },
  ])

  const nonArchivedTrips: TripType[] =
    isLoaded(trips) && Array.isArray(trips) && trips && trips.length > 0
      ? trips.filter((trip: TripType) => trip.archived !== true)
      : []

  const pendingTrips = nonArchivedTrips?.filter(
    (trip) =>
      trip.tripMembers &&
      trip.tripMembers[auth.uid] &&
      trip.tripMembers[auth.uid].status === TripMemberStatus.Pending
  )

  const [activeTab, setActiveTab] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const initialValues: { [key: string]: boolean } = {}

  gearListKeys.forEach((item) => {
    initialValues[item] = false
  })

  useEffect(() => {
    if (auth && auth.isLoaded && (!profile || profile.isEmpty)) {
      toast(`Looks like you don't have an account yet. Let's get you signed up!`, {
        icon: '👋',
      })
      firebase
        .auth()
        .signOut()
        .then(() => {
          router.push('/signup')
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }
  }, [auth, profile, router, firebase])

  const onSubmit = (
    values: typeof initialValues,
    { resetForm, setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setIsLoading(true)

    firebase
      .firestore()
      .collection('gear-closet')
      .doc(auth.uid)
      .set({
        categories: Object.keys(pickBy(values, (val) => val === true)),
        owner: auth.uid,
        id: auth.uid,
        removals: [],
      })
      .then(() => {
        resetForm()
        // navigate('/app/gear-closet');
        trackEvent('Gear Closet Generation Successfully Completed', { values })
      })
      .catch((error: Error) => {
        trackEvent('Gear Closet Generation Failed', { values, error })
        toast.error('Failed to create your closet, please try again.')
      })
      .finally(() => {
        setIsLoading(false)
        setSubmitting(false)
      })
  }

  const onSwitch = (index: number) => {
    setActiveTab(index)
    window.scrollTo(0, 0)
  }

  const renderPageIndicators = () => (
    <div style={{ marginTop: doubleSpacer }}>
      <FlexContainer>
        <FaCircle
          style={{ margin: halfSpacer }}
          color={activeTab === 0 ? textColor : textColorLight}
        />
        <FaCircle
          style={{ margin: halfSpacer }}
          color={activeTab === 1 ? textColor : textColorLight}
        />
        <FaCircle
          style={{ margin: halfSpacer }}
          color={activeTab === 2 ? textColor : textColorLight}
        />
        <FaCircle
          style={{ margin: halfSpacer }}
          color={activeTab === 3 ? textColor : textColorLight}
        />
      </FlexContainer>
    </div>
  )

  return (
    <PageContainer>
      <Head>
        <title>Initial Account Setup | Packup</title>
      </Head>
      <Box>
        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const numberOfCheckedCategories = Object.keys(values)
              .filter((valueKey) => gearListKeys.includes(valueKey as keyof ActivityTypes))
              .filter((item) => values[item] === true).length
            return numberOfCheckedCategories === 0
              ? {
                  selectOne:
                    'You must select at least one category from any section before proceeding',
                }
              : {}
          }}
        >
          {({ isSubmitting, isValid, values, errors, handleSubmit }) => (
            <Form>
              <Row>
                <Column md={8} mdOffset={2}>
                  <SwipeableViews
                    index={activeTab}
                    disabled
                    slideStyle={{ overflowX: 'hidden', padding: 8 }}
                  >
                    <Slide>
                      <CenteredText>
                        <Heading>Welcome! 🤝</Heading>
                        <p>
                          We are glad you are here. Let&apos;s set up your account. Tell us all the
                          activities you&apos;re interested in doing.
                        </p>
                        <p>
                          <small>
                            <em>
                              Select all that apply. Don&apos;t see your favorite activity? You will
                              have a chance to add it later.
                            </em>
                          </small>
                        </p>
                      </CenteredText>

                      <Row>
                        {gearListActivities.map((item) => (
                          <Column xs={4} md={3} key={item.name}>
                            <Field
                              as={IconCheckbox}
                              icon={item.icon}
                              checked={values[item.name] ?? false}
                              name={item.name}
                              label={item.label}
                            />
                          </Column>
                        ))}
                      </Row>

                      <Row>
                        <Column sm={6} smOffset={6}>
                          <Button
                            type="button"
                            block
                            onClick={() => onSwitch(1)}
                            iconRight={<FaChevronRight />}
                          >
                            Next
                          </Button>
                        </Column>
                      </Row>
                      {renderPageIndicators()}
                    </Slide>
                    <Slide>
                      <CenteredText>
                        <Heading>Accommodations</Heading>
                        <p>What types of accommodations do you stay in?</p>
                        <p>
                          <small>
                            <em>Select all that apply.</em>
                          </small>
                        </p>
                      </CenteredText>

                      <Row>
                        {gearListAccommodations.map((item) => (
                          <Column xs={4} md={3} key={item.name}>
                            <Field
                              as={IconCheckbox}
                              icon={item.icon}
                              checked={values[item.name] ?? false}
                              name={item.name}
                              label={item.label}
                            />
                          </Column>
                        ))}
                      </Row>
                      <HorizontalRule />
                      <CenteredText>
                        <Heading>Kitchen</Heading>
                        <p>What kinds of setups will you need on your trips?</p>
                        <p>
                          <small>
                            <em>Select all that apply.</em>
                          </small>
                        </p>
                      </CenteredText>

                      <Row>
                        {gearListCampKitchen.map((item) => (
                          <Column xs={4} md={3} key={item.name}>
                            <Field
                              as={IconCheckbox}
                              icon={item.icon}
                              checked={values[item.name] ?? false}
                              name={item.name}
                              label={item.label}
                            />
                          </Column>
                        ))}
                      </Row>

                      <Row>
                        <Column sm={6} xsSpacer smOrder={2}>
                          <Button
                            type="button"
                            block
                            onClick={() => onSwitch(2)}
                            iconRight={<FaChevronRight />}
                          >
                            Next
                          </Button>
                        </Column>
                        <Column sm={6} smOrder={1}>
                          <Button
                            type="button"
                            color="text"
                            block
                            onClick={() => onSwitch(0)}
                            iconLeft={<FaChevronLeft />}
                          >
                            Go Back
                          </Button>
                        </Column>
                      </Row>
                      {renderPageIndicators()}
                    </Slide>
                    <Slide>
                      <CenteredText>
                        <Heading>Other Considerations</Heading>
                        <p>
                          Sometimes trips need additional items. Select those that are important to
                          you.
                        </p>
                        <p>
                          <small>
                            <em>Select all that apply. You can always add custom items later.</em>
                          </small>
                        </p>
                      </CenteredText>

                      <Row>
                        {/* remove '10 essentials' category, the last item in the array */}
                        {[...gearListOtherConsiderations.slice(0, -1)].map((item) => (
                          <Column xs={4} md={3} key={item.name}>
                            <Field
                              as={IconCheckbox}
                              icon={item.icon}
                              checked={values[item.name] ?? false}
                              name={item.name}
                              label={item.label}
                            />
                          </Column>
                        ))}
                      </Row>
                      <FormErrors dirty errors={errors} />
                      <Row>
                        <Column sm={6} xsSpacer smOrder={2}>
                          <Button
                            type="button"
                            color="success"
                            block
                            isLoading={isLoading}
                            disabled={isSubmitting || !isValid}
                            onClick={() => {
                              onSwitch(3)
                              handleSubmit()
                            }}
                            iconLeft={<FaCheck />}
                          >
                            Finish
                          </Button>
                        </Column>
                        <Column sm={6}>
                          <Button
                            type="button"
                            color="text"
                            block
                            onClick={() => onSwitch(1)}
                            iconLeft={<FaChevronLeft />}
                          >
                            Go Back
                          </Button>
                        </Column>
                      </Row>
                      {renderPageIndicators()}
                    </Slide>
                    <Slide>
                      <CenteredText>
                        {isLoading ? (
                          <>
                            <InlineLoader />
                            <Heading>Please Wait</Heading>
                            <p>We are setting up your account.</p>
                          </>
                        ) : (
                          <>
                            <Heading>Success!</Heading>
                            <p>
                              We have personalized your account for your interests, and have set up
                              your inventory of packing list recommendations for your trips.
                            </p>
                            <br />
                            {pendingTrips?.length > 0 ? (
                              <>
                                <Heading as="h2" altStyle>
                                  Look&apos;s like someone has already invited you on a trip 😎
                                </Heading>
                                <br />
                                <br />

                                <Button
                                  type="link"
                                  to="/"
                                  iconRight={<FaChevronRight />}
                                  onClick={() =>
                                    trackEvent('New Trip Button clicked', {
                                      location: 'Onboarding Finish Button - Pending Trip',
                                    })
                                  }
                                >
                                  View Invitation
                                </Button>
                              </>
                            ) : (
                              <>
                                <Heading as="h2" altStyle>
                                  Let&apos;s get started by making your first trip!
                                </Heading>
                                <br />
                                <br />

                                <Button
                                  type="link"
                                  to="/trips/new"
                                  iconRight={<FaChevronRight />}
                                  onClick={() =>
                                    trackEvent('New Trip Button clicked', {
                                      location: 'Onboarding Finish Button',
                                    })
                                  }
                                >
                                  Create First Trip
                                </Button>
                              </>
                            )}
                          </>
                        )}
                      </CenteredText>
                    </Slide>
                  </SwipeableViews>
                </Column>
              </Row>
            </Form>
          )}
        </Formik>
      </Box>
    </PageContainer>
  )
}
