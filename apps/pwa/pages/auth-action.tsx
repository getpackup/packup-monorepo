import { LoadingPage } from '@packup/components'
import React from 'react'
import styled from 'styled-components'

const AppContainer = styled.div`
  margin-right: 0;
  margin-left: 0;
  background-color: var(--color-background);
  min-height: 100vh;
`

export async function getServerSideProps({ query }) {
  const { mode, link } = query

  if (link && mode) {
    return {
      redirect: {
        destination: link,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function AuthAction() {
  return (
    <AppContainer>
      <LoadingPage />
    </AppContainer>
  )
}
