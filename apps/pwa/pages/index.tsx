/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { TripMemberStatus, TripType } from '@packup/common'
import {
  Box,
  Button,
  ButtonGroup,
  CalendarView,
  FlexContainer,
  HorizontalRule,
  ListView,
  NoGearCloset,
  PageContainer,
} from '@packup/components'
import {
  AppState,
  setActivePackingListFilter,
  setActivePackingListTab,
  setTripsDefaultView,
} from '@packup/redux'
import { PackingListFilterOptions, TabOptions, trackEvent } from '@packup/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCalendar, FaList, FaPlusCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

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

  if (
    isLoaded(fetchedGearCloset) &&
    fetchedGearCloset.length === 0 &&
    isLoaded(trips) &&
    nonArchivedTrips.length === 0
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
      </Box>
    </PageContainer>
  )
}
