import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'

import { trackEvent } from '@packup/utils'

export const sendSignInLink = (email: string) => {
  const auth = getAuth()

  const actionCodeSettings = {
    url: `${window.location.origin}/signin`,
    handleCodeInApp: true, // This must be true
    iOS: {
      bundleId: 'com.packupapp',
    },
    android: {
      packageName: 'com.packupapp.twa',
      installApp: true,
      minimumVersion: '1',
    },
  }

  trackEvent('Send Sign In Link Request', { email })

  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
}
