import { trackEvent } from '@packup/utils'
import { useFirebase } from 'react-redux-firebase'

export const sendSignInLink = (email: string) => {
  const firebase = useFirebase()

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
    dynamicLinkDomain:
      process.env.NODE_ENV === 'production' ? 'packup.page.link' : 'packupapp.page.link',
  }

  trackEvent('Send Sign In Link Request', { email })

  return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
}
