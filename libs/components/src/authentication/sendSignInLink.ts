import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'

import { trackEvent } from '@packup/utils'

export const sendSignInLink = (email: string) => {
  const auth = getAuth()

  const actionCodeSettings = {
    url: `${window.location.origin}/signin`,
    handleCodeInApp: true,
  }

  trackEvent('Send Sign In Link Request', { email })

  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
}
