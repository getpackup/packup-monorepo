import { LoadingPage } from '@packup/components'
import Head from 'next/head'
import { useRouter } from 'next/router'

import React, { useEffect } from 'react'

export default function UserManagement() {
  const router = useRouter()
  const { mode, oobCode: actionCode } = router.query

  const isValidMode = typeof mode === 'string' && ['resetPassword', 'verifyEmail'].includes(mode)

  const isValidCode = typeof actionCode === 'string'

  useEffect(() => {
    if (!isValidMode || !isValidCode) {
      router.push('/404')
    }
    if (mode === 'resetPassword' && isValidCode) {
      router.push(`/reset-password?actionCode=${actionCode}`)
    }
    if (mode === 'verifyEmail' && isValidCode) {
      router.push(`/verify-email?actionCode=${actionCode}`)
    }
  }, [isValidCode, isValidMode, router, actionCode, mode])

  return (
    <>
      <Head>
        <title>User Management</title>
      </Head>

      <LoadingPage />
    </>
  )
}
