import { TripMemberStatus, TripType } from '@getpackup-group/common'

export const isUserTripOwner = (trip: TripType | undefined, uid: string) =>
  trip &&
  trip.tripMembers &&
  Object.values(trip.tripMembers).find((member) => member.status === TripMemberStatus.Owner)
    ?.uid === uid

export default isUserTripOwner
