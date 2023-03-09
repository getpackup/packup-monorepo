/* eslint-disable dot-notation */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { TripMemberStatus, TripType } from '@packup/common'
import { Box, CalendarView, Heading, TripCard } from '@packup/components'

import { isAfterToday, isBeforeToday, trackEvent } from '@packup/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { FirebaseReducer, isLoaded } from 'react-redux-firebase'

export function ListView({ trips, auth }: { trips: TripType[]; auth: FirebaseReducer.AuthState }) {
  const router = useRouter()

  const pendingTrips = trips
    .filter(
      (trip) =>
        trip.tripMembers &&
        trip.tripMembers[auth.uid] &&
        trip.tripMembers[auth.uid].status === TripMemberStatus.Pending
    )
    .sort((a, b) => b.startDate.seconds - a.startDate.seconds)

  const inProgressTrips = trips
    .filter(
      (trip) =>
        trip.tripMembers &&
        trip.tripMembers[auth.uid] &&
        trip.tripMembers[auth.uid].status !== TripMemberStatus.Pending &&
        isBeforeToday(trip.startDate.seconds * 1000) &&
        isAfterToday(trip.endDate.seconds * 1000)
    )
    .sort((a, b) => b.startDate.seconds - a.startDate.seconds)

  const upcomingTrips = trips
    .filter(
      (trip) =>
        trip.tripMembers &&
        trip.tripMembers[auth.uid] &&
        trip.tripMembers[auth.uid].status !== TripMemberStatus.Pending &&
        isAfterToday(trip.startDate.seconds * 1000)
    )
    .sort((a, b) => a.startDate.seconds - b.startDate.seconds)

  const pastTrips = trips
    .filter(
      (trip) =>
        trip.tripMembers &&
        trip.tripMembers[auth.uid] &&
        trip.tripMembers[auth.uid].status !== TripMemberStatus.Pending &&
        isBeforeToday(trip.endDate.seconds * 1000)
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

  return (
    <>
      {(!isLoaded(trips) || !trips) && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TripCard trip={{} as TripType} key={`loadingTrip${index}`} />
          ))}
        </>
      )}

      {pendingTrips.length > 0 && (
        <>
          <Heading as="h2" altStyle>
            Pending Trip Invitations
          </Heading>
          {pendingTrips.map((trip) => renderTrip(trip, true))}
        </>
      )}

      {/* IN PROGRESS */}
      {inProgressTrips.length > 0 && (
        <>
          <Heading as="h2" altStyle>
            Trips in Progress
          </Heading>
          {inProgressTrips.map((trip) => renderTrip(trip))}
        </>
      )}

      {/* UPCOMING */}
      {upcomingTrips.length > 0 && (
        <>
          <Heading as="h2" altStyle>
            Upcoming Trips
          </Heading>
          {upcomingTrips.map((trip) => renderTrip(trip))}
        </>
      )}

      {/* NO TRIPS AT ALL, BUT HAS GEAR CLOSET */}
      {((isLoaded(trips) && !upcomingTrips) || trips?.length === 0) && (
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

      {/* PAST TRIPS */}
      {pastTrips.length > 0 && (
        <>
          <Heading as="h2" altStyle>
            Past Trips
          </Heading>
          {pastTrips.map((trip) => renderTrip(trip))}
        </>
      )}
    </>
  )
}
