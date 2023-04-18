import { TripMemberStatus, TripType } from '@packup/common'
import { Heading, TripCard } from '@packup/components'

import { isAfterToday, isBeforeToday, trackEvent } from '@packup/utils'
import { useRouter } from 'next/router'
import { FirebaseReducer } from 'react-redux-firebase'

export function ListView({ trips, auth }: { trips: TripType[]; auth: FirebaseReducer.AuthState }) {
  const router = useRouter()

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
