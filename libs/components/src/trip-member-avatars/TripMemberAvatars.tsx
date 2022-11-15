import { TripType, UserType, TRIP_PARTY_AVATARS_TO_SHOW } from '@getpackup-group/common'
import { Avatar, StackedAvatars } from '@getpackup-group/components'
import { acceptedTripMembersOnly } from '@getpackup-group/utils'

type TripMemberAvatarsProps = {
  trip: TripType
  users: UserType[]
}

export const TripMemberAvatars = ({ trip, users }: TripMemberAvatarsProps): JSX.Element | null => {
  const tripMembers = trip && trip.tripMembers ? acceptedTripMembersOnly(trip) : []

  if (tripMembers.length === 1) {
    return null
  }
  return (
    <>
      {tripMembers.length > 1 && (
        <StackedAvatars>
          {users &&
            tripMembers
              .slice(
                0,
                tripMembers.length === TRIP_PARTY_AVATARS_TO_SHOW
                  ? TRIP_PARTY_AVATARS_TO_SHOW
                  : TRIP_PARTY_AVATARS_TO_SHOW - 1 // to account for the +N avatar below
              )
              .map((tripMember: any) => {
                const matchingUser: UserType | undefined = users[tripMember.uid]
                  ? users[tripMember.uid]
                  : undefined
                if (!matchingUser) return <Avatar staticContent="" size="sm" username={undefined} />
                return (
                  <Avatar
                    src={matchingUser.photoURL}
                    gravatarEmail={matchingUser.email}
                    size="sm"
                    key={matchingUser.uid + trip.tripId}
                    username={matchingUser.username.toLocaleLowerCase()}
                  />
                )
              })}
          {users && tripMembers.length > TRIP_PARTY_AVATARS_TO_SHOW && (
            <Avatar
              // never want to show +1, because then we could have just rendered the photo.
              // Instead, lets add another so its always at least +2
              staticContent={`+${tripMembers.length - TRIP_PARTY_AVATARS_TO_SHOW + 1}`}
              size="sm"
              username={`+${tripMembers.length - TRIP_PARTY_AVATARS_TO_SHOW + 1} more`}
            />
          )}
        </StackedAvatars>
      )}
    </>
  )
}
