import { toast } from 'react-hot-toast'
import { trackEvent } from '@getpackup-group/utils'
import { Button } from '../button/Button'
import { Heading } from '../heading/Heading'

export const SendInviteForm = (): JSX.Element => {
  const title = 'Create an account on Packup so we can collaborate on trips!'
  const text = `Hey, sign up for an account on Packup so we can coordinate trip details together 😎 ${
    window.location.origin || 'https://getpackup.com'
  } Let me know when you have signed up so I can invite you to our trip!`

  const sendInvite = async () => {
    try {
      if (navigator.share) {
        navigator
          .share({
            title,
            text,
            url: window.location.origin,
          })
          .then(() => {
            toast.success('Hopefully they join soon so you can collaborate on your trip 👍')
            trackEvent('Send Invite to New User Successful')
          })
          .catch((err) => {
            trackEvent('Send Invite to New User Cancelled Or Errored', err)
          })
      }
    } catch (err) {
      toast.error('Sorry, something went wrong. Please try again later.')
      trackEvent('Send Invite to New User Failed', {
        canShareEnabled: typeof navigator.share === 'function',
      })
    }
  }
  return (
    <div>
      <Heading as="h2">Invite a Friend</Heading>
      <p>Friend not on Packup yet? Send them a text or an email so they can get started ✅</p>
      {typeof navigator.share === 'function' ? (
        <Button type="button" onClick={sendInvite}>
          Send Text/Email
        </Button>
      ) : (
        <>
          <Button type="link" to={`sms://?&body=${encodeURI(text)}`} rightSpacer>
            Send a text
          </Button>
          <Button
            type="link"
            to={`mailto:?subject=${title}&body=${text}`}
            rightSpacer
            color="secondary"
          >
            Send an email
          </Button>
        </>
      )}
    </div>
  )
}

export default SendInviteForm
