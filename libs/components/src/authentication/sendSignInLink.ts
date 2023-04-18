import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'

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
    dynamicLinkDomain:
      process.env.NODE_ENV === 'production' ? 'packup.page.link' : 'packupapp.page.link',
  }

  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
}
