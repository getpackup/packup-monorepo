import { TripType } from '@getpackup-group/common'
import { addAlert } from '@getpackup-group/redux'
import axios from 'axios'
import { stringify } from 'query-string'

import { trackEvent } from './track-events/track-events'

export const sendTripInvitationEmail = ({
  tripId,
  invitedBy,
  email,
  greetingName,
  dispatch,
}: {
  tripId: TripType['tripId']
  invitedBy: string
  email: string
  greetingName: string
  dispatch: any
}) => {
  const queryParams = stringify({
    to: email,
    greetingName,
    subject: `${invitedBy} has invited you on a trip`,
    username: invitedBy,
    tripId,
    isTestEnv: String(window.location.origin !== 'https://getpackup.com'),
  })
  const invitationUrl =
    window.location.origin === 'https://getpackup.com'
      ? `https://us-central1-getpackup.cloudfunctions.net/sendTripInvitationEmail?${queryParams}`
      : `https://us-central1-packup-test-fc0c2.cloudfunctions.net/sendTripInvitationEmail?${queryParams}`

  return axios
    .post(invitationUrl)
    .then(() => {
      dispatch(addAlert({ type: 'success', message: 'Successfully sent invitation email' }))
      trackEvent('Trip Party Invitation Email Sent', {
        tripId,
        updated: new Date(),
        invitedMember: email,
      })
    })
    .catch((error) => {
      dispatch(
        addAlert({
          type: 'info',
          message:
            'Invitation email failed to send, but will see this invitation when they login next.',
        })
      )
      trackEvent('Trip Party Invitation Email Send Failure', {
        tripId,
        updated: new Date(),
        invitedMember: email,
      })
      throw new Error(error)
    })
}

export default sendTripInvitationEmail
