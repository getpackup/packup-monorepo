import { LoadingPage, PageContainer } from '@getpackup-group/components'
import toast from 'react-hot-toast'
import { trackEvent } from '@getpackup-group/utils'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { actionTypes } from 'redux-firestore'

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
