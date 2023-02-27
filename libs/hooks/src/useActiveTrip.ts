/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import { TripType } from '@packup/common'

export const useActiveTrip = () => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const activeTripById: TripType[] = useSelector(
    // eslint-disable-next-line dot-notation
    (state: AppState) => state.firestore.ordered['activeTripById']
  )

  const isTripOwner: boolean =
    activeTripById && activeTripById.length > 0 && activeTripById[0].owner === auth.uid

  const activeTrip: TripType | undefined =
    (activeTripById &&
      activeTripById.length > 0 &&
      Object.keys(activeTripById[0].tripMembers).some((member) => member === auth.uid)) ||
    isTripOwner
      ? activeTripById[0]
      : undefined

  return activeTrip
}

export default useActiveTrip
