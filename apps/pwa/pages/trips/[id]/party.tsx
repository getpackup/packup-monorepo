import { Box, NoTripFound, PageContainer, TripParty } from '@packup/components'
import { useActiveTrip } from '@packup/hooks'
import { AppState } from '@packup/redux'
import { trackEvent } from '@packup/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase'

export default function Party() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const activeTrip = useActiveTrip()
  const router = useRouter()
  // the trip ID
  const id = router.query.id as string

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
        <title>Trip Party | Packup</title>
      </Head>

      <PageContainer>
        <TripParty activeTrip={activeTrip} />

        {isLoaded(activeTrip) && (isEmpty(activeTrip) || !activeTrip) && (
          <Box>
            <NoTripFound />
          </Box>
        )}
      </PageContainer>
    </>
  )
}
