import { TripMemberStatus, TripType } from '@getpackup-group/common'

// eslint-disable-next-line import/prefer-default-export
export const acceptedTripMembersOnly = (trip: TripType) =>
  trip &&
  trip.tripMembers &&
  Object.values(trip.tripMembers).filter(
    (member) =>
      member.status === TripMemberStatus.Accepted || member.status === TripMemberStatus.Owner
  )
