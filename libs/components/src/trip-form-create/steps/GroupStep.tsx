import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { RootState } from '@packup/redux'
import { UserType } from '@packup/common'
import { Button, Heading, HorizontalRule, UserMediaObject, UserSearch } from '@packup/components'

export default function GroupStep(props: any) {
  const [isSearchBarDisabled, setIsSearchBarDisabled] = useState(false)
  const users = useSelector((state: RootState) => state.firestore.data['users'])

  const { activeLoggedInUser, membersToInvite, auth, setMembersToInvite } = props

  useFirestoreConnect([
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        membersToInvite && membersToInvite.length > 0
          ? membersToInvite.map((m: any) => m.uid)
          : [auth.uid],
      ],
    },
  ])

  const updateTripMembers = (uid: string, email: string, greetingName: string) => {
    setMembersToInvite((prevState: any) => [...prevState, { uid, email, greetingName }])
  }

  return (
    <>
      <Heading altStyle as="h3">
        Who else is coming along?
      </Heading>

      {activeLoggedInUser && <UserMediaObject user={activeLoggedInUser} showSecondaryContent />}
      {membersToInvite.length > 0 && <HorizontalRule compact />}
      {membersToInvite.length > 0 &&
        membersToInvite.map((tripMember: any, index: any) => {
          const matchingUser: UserType =
            users && users[tripMember.uid] ? users[tripMember.uid] : undefined
          if (!matchingUser) return null
          return (
            <div key={matchingUser.uid}>
              <UserMediaObject
                user={matchingUser}
                showSecondaryContent
                action={
                  <Button
                    type="button"
                    color="tertiary"
                    size="small"
                    onClick={() =>
                      setMembersToInvite((prevState: any) =>
                        prevState.filter((_: any, i: any) => i !== index)
                      )
                    }
                  >
                    Remove
                  </Button>
                }
              />
              {index !== membersToInvite.length - 1 && <HorizontalRule compact />}
            </div>
          )
        })}

      <HorizontalRule compact />

      <UserSearch
        activeTrip={undefined}
        updateTrip={(uid, email, greetingName) => {
          updateTripMembers(uid, email, greetingName)
        }}
        isSearchBarDisabled={isSearchBarDisabled}
      />
    </>
  )
}
