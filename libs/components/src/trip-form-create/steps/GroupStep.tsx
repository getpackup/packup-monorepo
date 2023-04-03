import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { RootState } from '@packup/redux'
import { MAX_TRIP_PARTY_SIZE, UserType } from '@packup/common'
import { Box, Button, Column, Heading, HorizontalRule, Row, UserMediaObject, UserSearch } from '@packup/components'
import toast from 'react-hot-toast'

export default function GroupStep(props: any) {
  const [isSearchBarDisabled, setIsSearchBarDisabled] = useState(false);
  const users = useSelector((state: RootState) => state.firestore.data['users']);

  const {
    activeLoggedInUser,
    membersToInvite,
    auth,
    setMembersToInvite,
  } = props;

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
  ]);

  const updateTripMembers = (uid: string, email: string, greetingName: string) => {
    // Object.values(acceptedTripMembersOnly(activeTrip)).length + 1 accounts for async data updates
    if (membersToInvite && membersToInvite.length + 1 > MAX_TRIP_PARTY_SIZE) {
      setIsSearchBarDisabled(true)
      // send us a Slack message so we can follow up
      axios.get(
        process.env.NODE_ENV === 'production'
          ? `https://us-central1-getpackup.cloudfunctions.net/notifyOnTripPartyMaxReached?tripId=new`
          : `https://us-central1-packup-test-fc0c2.cloudfunctions.net/notifyOnTripPartyMaxReached?tripId=new`
      )
      toast.error(`At this time, Trip Parties are limited to ${MAX_TRIP_PARTY_SIZE} people.`)

      return
    }

    setMembersToInvite((prevState: any) => [...prevState, { uid, email, greetingName }]);
  };

  return (
    <>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Heading as={'h3'}>Who else is coming along?</Heading>
        </Column>
      </Row>
      <Row>
        <Column xs={8} xsOffset={2}>
          <Box>
            {activeLoggedInUser && (
              <UserMediaObject user={activeLoggedInUser} showSecondaryContent />
            )}
            {membersToInvite.length > 0 && <HorizontalRule compact />}
            {membersToInvite.length > 0 &&
              membersToInvite.map((tripMember: any, index: any) => {
                const matchingUser: UserType =
                  users && users[tripMember.uid] ? users[tripMember.uid] : undefined;
                if (!matchingUser) return null;
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
                );
              })}
          </Box>
          <UserSearch
            activeTrip={undefined}
            updateTrip={(uid, email, greetingName) => {
              updateTripMembers(uid, email, greetingName);
            }}
            isSearchBarDisabled={isSearchBarDisabled}
          />
        </Column>
      </Row>
    </>
  );
}
