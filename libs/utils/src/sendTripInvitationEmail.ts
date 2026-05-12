// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TripType } from '@packup/common'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { stringify } from 'query-string'

import { trackEvent } from './track-events/track-events'

export const sendTripInvitationEmail = ({
  invitedBy,
  email,
  greetingName,
  tripName,
  where,
  why,
  when,
  tags,
}: {
  invitedBy: string
  email: string
  greetingName: string
  tripName: string
  where: string
  why: string
  when: string
  tags: string
}) => {
  const queryParams = stringify({
    invitedBy,
    email,
    greetingName,
    tripName,
    where,
    why,
    when,
    tags,
  })
  const invitationUrl = `https://sendinvitationtotripemail-tgytmbuywa-uc.a.run.app/?${queryParams}`

  return axios
    .post(invitationUrl)
    .then(() => {
      toast.success('Successfully sent invitation email')
      trackEvent('Trip Party Invitation Email Sent', {
        params: queryParams,
        updated: new Date(),
        invitedMember: email,
      })
    })
    .catch((error) => {
      toast.error(
        'Invitation email failed to send, but they will see this invitation when they log in next.'
      )
      trackEvent('Trip Party Invitation Email Send Failure', {
        params: queryParams,
        updated: new Date(),
        invitedMember: email,
      })
      throw new Error(error)
    })
}

export default sendTripInvitationEmail
