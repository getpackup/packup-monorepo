import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '@getpackup-group/redux'
import { LoadingPage } from '@getpackup-group/components'

export default function Index() {
  const router = useRouter()

  const auth = useSelector((state: RootState) => state.firebase.auth)

  if (auth && auth.isLoaded && auth.isEmpty) {
    router.push('/login')
  }

  if (!auth || !auth.isLoaded) {
    return <LoadingPage />
  }
  return <p style={{ margin: '3rem' }}>This will be the trip pages</p>
}
