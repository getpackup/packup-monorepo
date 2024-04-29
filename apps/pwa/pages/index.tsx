/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { TripMemberStatus, TripType } from '@packup/common'
import {
  AppState,
  setActivePackingListFilter,
  setActivePackingListTab,
  setPackingListSearchValue,
  setTripsDefaultView,
} from '@packup/redux'
import { PackingListFilterOptions, TabOptions, trackEvent } from '@packup/utils'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FaArrowRight, FaCalendar, FaList, FaPlusCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

import {
  Box,
  Button,
  ButtonGroup,
  CalendarView,
  FlexContainer,
  Heading,
  HorizontalRule,
  ListView,
  NoGearCloset,
  PageContainer,
  TripCard,
} from '../components'

export default function Index() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const trips: Array<TripType> = useSelector((state: AppState) => state.firestore.ordered['trips'])
  const fetchedGearCloset = useSelector((state: AppState) => state.firestore.ordered['gearCloset'])
  const { tripsDefaultView } = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch()
  const router = useRouter()

  const [activeView, setActiveView] = useState<'list' | 'calendar'>(tripsDefaultView || 'list')

  useFirestoreConnect([
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
    {
      collection: 'gear-closet',
      storeAs: 'gearCloset',
      doc: auth.uid,
    },
    // the following is a somewhat hacky way to load more users in, because sometimes the similar
    // query in TripCard meant some users would be missing sometimes, probably based on order of the
    // api calls being sent out for each tripcard. It will be fixed by having a proper following/follower
    // aka friending model where we would just load all of a user's friends once on load
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        [
          ...new Set([
            ...[
              trips
                ? trips
                    .map((trip) => (trip.tripMembers ? Object.keys(trip.tripMembers) : ''))
                    .flat()
                : [],
            ].flat(),
            auth.uid || [],
          ]),
        ].slice(0, 9),
      ],
    },
  ])

  useEffect(() => {
    // reset filters and tab for packing list each time All Trips page is visited
    dispatch(setActivePackingListFilter(PackingListFilterOptions.All))
    dispatch(setActivePackingListTab(TabOptions.Personal))
    dispatch(setPackingListSearchValue(''))
  }, [dispatch])

  useEffect(() => {
    dispatch(setTripsDefaultView(activeView))
  }, [activeView, dispatch])

  useEffect(() => {
    if (auth && auth.isLoaded && auth.isEmpty) {
      router.push('/login')
    }
  }, [auth, router])

  const nonArchivedTrips: TripType[] =
    isLoaded(trips) && Array.isArray(trips) && trips && trips.length > 0
      ? trips.filter((trip: TripType) => trip.archived !== true)
      : []

  const pendingTrips = nonArchivedTrips
    ?.filter(
      (trip) =>
        trip.tripMembers &&
        trip.tripMembers[auth.uid] &&
        trip.tripMembers[auth.uid].status === TripMemberStatus.Pending
    )
    .sort((a, b) => b.startDate.seconds - a.startDate.seconds)

  const renderTrip = (trip: TripType, pending?: boolean) => (
    <TripCard
      trip={trip}
      isPending={pending}
      key={trip.tripId}
      onClick={
        pending
          ? () => null
          : () => {
              router.push(`/trips/${trip.tripId}/`)
              trackEvent('Trip Card Link Clicked', { trip })
            }
      }
    />
  )

  // Handle scenario where a user was invited to a trip, but havent set up their gear closet yet
  // Filter out the pending trips, and then use this below in the early return to NoGearCloset
  const nonArchivedTripsWithoutPending = nonArchivedTrips.filter(
    (trip) =>
      trip.tripMembers &&
      trip.tripMembers[auth.uid] &&
      trip.tripMembers[auth.uid].status !== TripMemberStatus.Pending
  )

  if (
    isLoaded(fetchedGearCloset) &&
    fetchedGearCloset.length === 0 &&
    isLoaded(trips) &&
    nonArchivedTripsWithoutPending.length === 0
  ) {
    return <NoGearCloset />
  }

  return (
    <PageContainer>
      <Head>
        <title>My Trips | Packup</title>
      </Head>
      <Box>
        <FlexContainer justifyContent="space-between" alignItems="center">
          <Button
            type="link"
            to="/trips/new"
            iconLeft={<FaPlusCircle />}
            onClick={() => trackEvent('New Trip Button clicked', { location: 'Trips Page Header' })}
          >
            New Trip
          </Button>

          <ButtonGroup>
            <Button
              type="button"
              onClick={() => setActiveView('list')}
              size="small"
              color={activeView === 'list' ? 'tertiaryAlt' : 'tertiary'}
            >
              <FaList />
            </Button>
            <Button
              type="button"
              onClick={() => setActiveView('calendar')}
              size="small"
              color={activeView === 'calendar' ? 'tertiaryAlt' : 'tertiary'}
            >
              <FaCalendar />
            </Button>
          </ButtonGroup>
        </FlexContainer>

        <HorizontalRule compact />

        {pendingTrips?.length > 0 && (
          <>
            <Heading as="h2" altStyle>
              Pending Trip Invitations
            </Heading>
            {pendingTrips.map((trip) => renderTrip(trip, true))}
          </>
        )}

        {isLoaded(trips) && nonArchivedTrips.length > 0 && activeView === 'calendar' && (
          <CalendarView
            events={nonArchivedTrips.map((trip) => ({
              allDay: true,
              title: trip.name,
              start: trip.startDate.toDate(),
              end: trip.endDate.toDate(),
              resource: trip,
            }))}
          />
        )}

        {isLoaded(trips) && nonArchivedTrips.length > 0 && activeView === 'list' && (
          <ListView trips={nonArchivedTrips} auth={auth} />
        )}

        {!isLoaded(trips) && (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <TripCard trip={{} as TripType} key={`loadingTrip${index}`} />
            ))}
          </>
        )}

        {/* NO TRIPS AT ALL, BUT HAS GEAR CLOSET */}
        {isLoaded(trips) && nonArchivedTrips.length === 0 && (
          <Box>
            No upcoming trips planned currently,{' '}
            <Link href="/trips/new">
              <a
                onClick={() =>
                  trackEvent('New Trip Button clicked', {
                    location: 'Trips Page Create One Now',
                  })
                }
              >
                create one now! <FaArrowRight />
              </a>
            </Link>
          </Box>
        )}
      </Box>
    </PageContainer>
  )
}
