import { trackEvent } from '@packup/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { actionTypes } from 'redux-firestore'

import { LoadingPage, PageContainer } from '../components'

export default function Logout() {
  const dispatch = useDispatch()
  const firebase = useFirebase()
  const router = useRouter()

  useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/login')
      })
      .catch((err) => {
        toast.error(err.message)
      })
    // clear redux store http://react-redux-firebase.com/docs/auth.html#logout
    firebase.logout().then(() => {
      // https://github.com/prescottprue/redux-firestore/issues/114
      dispatch({ type: actionTypes.CLEAR_DATA })
    })
    trackEvent('Logout', { location: 'Logout page' })
    router.push('/login')
  }, [dispatch, firebase, router])

  return (
    <PageContainer>
      {/* TODO: seo  */}
      {/* <Seo title="Log Out" /> */}
      <LoadingPage />
    </PageContainer>
  )
}
