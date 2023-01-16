import { PackingListItemType, TripType } from '@getpackup-group/common'
import { useRouter } from 'next/router'

import { NoTripFound, PageContainer, PackingList } from '@getpackup-group/components'
import {
  AppState,
  setActivePackingListFilter,
  setActivePackingListTab,
  setPersonalListScrollPosition,
  setSharedListScrollPosition,
} from '@getpackup-group/redux'

import { PackingListFilterOptions, TabOptions, trackEvent } from '@getpackup-group/utils'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import { actionTypes } from 'redux-firestore'
import Head from 'next/head'

export default function TripById() {
  const dispatch = useDispatch()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const activeTripById: Array<TripType> = useSelector(
    (state: AppState) => state.firestore.ordered.activeTripById
  )
  const packingList: PackingListItemType[] = useSelector(
    (state: AppState) => state.firestore.ordered.packingList
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
      collection: 'trips',
      doc: id,
      subcollections: [{ collection: 'packing-list' }],
      storeAs: 'packingList',
      orderBy: ['category', 'asc'],
    },
  ])

  useEffect(() => {
    // reset filters, tab, and scroll positions for packing list each time tripId changes
    dispatch(setActivePackingListFilter(PackingListFilterOptions.All))
    dispatch(setActivePackingListTab(TabOptions.Personal))
    dispatch(setPersonalListScrollPosition(0))
    dispatch(setSharedListScrollPosition(0))
    return () => {
      // disconnect listening and remove data from redux store
      // so next trip can fetch without `activeTripById` already being populated with
      // now-stale data
      dispatch({
        type: actionTypes.CLEAR_DATA,
        preserve: {
          data: ['loggedInUser', 'trips', 'users'],
          ordered: ['loggedInUser', 'trips', 'users'],
        },
      })
    }
  }, [dispatch])

  if (!id) {
    trackEvent('Trip By Id Had No Id')
    return null
  }

  return (
    <>
      <Head>
        <title>{activeTrip?.name || 'Trip Summary'}</title>
      </Head>

      <PageContainer>
        <PackingList
          packingList={packingList || []}
          tripId={id}
          trip={activeTrip}
          tripIsLoaded={isLoaded(activeTripById) && (isEmpty(activeTripById) || !activeTrip)}
        />
      </PageContainer>

      {isLoaded(activeTripById) && (isEmpty(activeTripById) || !activeTrip) && <NoTripFound />}
    </>
  )
}
