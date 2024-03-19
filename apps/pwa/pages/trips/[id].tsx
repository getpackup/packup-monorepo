import { ItemLabel as ItemLabelType, PackingListItemType } from '@packup/common'
import { Box, NoTripFound, PackingList, PageContainer } from '@packup/components'
import { useActiveTrip } from '@packup/hooks'
import {
  AppState,
  setActivePackingListFilter,
  setActivePackingListTab,
  setGearItemLabels,
  setPersonalListScrollPosition,
  setSharedListScrollPosition} from '@packup/redux'
import { PackingListFilterOptions, TabOptions, trackEvent } from '@packup/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import { actionTypes } from 'redux-firestore'

export default function TripById() {
  const dispatch = useDispatch()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const firebase = useFirebase()

  const packingList: PackingListItemType[] = useSelector(
    (state: AppState) => state.firestore.ordered.packingList
  )

  const activeTrip = useActiveTrip()

  const router = useRouter()
  // the trip ID
  const id = router.query.id as string

  useEffect(() => {
    // Load gear item labels and store in Redux
    firebase
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .collection('labels')
      .get()
      .then((subcollection) => {
        const tempLabels: Array<ItemLabelType> = []

        // Looks and feels weird, but let
        for (const doc of subcollection.docs) {
          tempLabels.push({
            id: doc.id,
            ...doc.data() as ItemLabelType,
          })
        }

        dispatch(setGearItemLabels(tempLabels))
      })
  }, [])

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
  }, [dispatch, id])

  if (!id) {
    trackEvent('Trip By Id Had No Id')
    return null
  }

  return (
    <>
      <Head>
        <title key="title">{activeTrip?.name || 'Trip Summary'}</title>
      </Head>

      <PageContainer>
        <Box>
          <PackingList
            packingList={packingList || []}
            tripId={id}
            trip={activeTrip}
            tripIsLoaded={isLoaded(activeTrip) && (isEmpty(activeTrip) || !activeTrip)}
          />
          {isLoaded(activeTrip) && (isEmpty(activeTrip) || !activeTrip) && <NoTripFound />}
        </Box>
      </PageContainer>
    </>
  )
}
