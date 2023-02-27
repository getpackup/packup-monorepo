// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TripType } from '@packup/common'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { stringify } from 'query-string'

import { trackEvent } from './track-events/track-events'

export const sendTripInvitationEmail = ({
  tripId,
  invitedBy,
  email,
  greetingName,
}: {
  tripId: TripType['tripId']
  invitedBy: string
  email: string
  greetingName: string
}) => {
  const queryParams = stringify({
    to: email,
    greetingName,
    subject: `${invitedBy} has invited you on a trip`,
    username: invitedBy,
    tripId,
    isTestEnv: String(window.location.origin !== 'https://packupapp.com'),
  })
  const invitationUrl =
    window.location.origin === 'https://packupapp.com'
      ? `https://us-central1-getpackup.cloudfunctions.net/sendTripInvitationEmail?${queryParams}`
      : `https://us-central1-packup-test-fc0c2.cloudfunctions.net/sendTripInvitationEmail?${queryParams}`

  return axios
    .post(invitationUrl)
    .then(() => {
      toast.success('Successfully sent invitation email')
      trackEvent('Trip Party Invitation Email Sent', {
        tripId,
        updated: new Date(),
        invitedMember: email,
      })
    })
    .catch((error) => {
      toast.error(
        'Invitation email failed to send, but will see this invitation when they login next.'
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
