import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { brandPrimary } from '@packup/styles'
import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@packup/redux'

const CreateButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  :hover {
    color: ${brandPrimary};
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
`

type PackingListLabelListProps = {
  toggleListHandler: (e?: any) => void
}

export const PackingListLabelList: FunctionComponent<PackingListLabelListProps> = ({ toggleListHandler }) => {
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  firebase
    .firestore()
    .collection('users')
    .doc(auth.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const { labels } = doc.data() ?? []
        console.log('labels', labels)
      }
    })

  return (
    <Container>
      <CreateButton onClick={toggleListHandler}>
        + New Label
      </CreateButton>
      <p>Show available labels</p>
    </Container>
  )
}
