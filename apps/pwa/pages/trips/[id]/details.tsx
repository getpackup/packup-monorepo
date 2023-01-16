import { TripType } from '@getpackup-group/common'
import { useRouter } from 'next/router'

import { NoTripFound, PageContainer, TripDetails } from '@getpackup-group/components'
import { AppState } from '@getpackup-group/redux'

import { trackEvent } from '@getpackup-group/utils'

import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import Head from 'next/head'

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
  ])

  if (!id) {
    trackEvent('Trip By Id Had No Id')
    return null
  }

  return (
    <>
      <Head>
        <title>Trip Details</title>
      </Head>

      <PageContainer>
        <TripDetails activeTrip={activeTrip} users={users} />
      </PageContainer>

      {isLoaded(activeTripById) && (isEmpty(activeTripById) || !activeTrip) && <NoTripFound />}
    </>
  )
}
