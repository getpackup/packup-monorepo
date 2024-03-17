import { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { brandPrimary } from '@packup/styles'
import { useFirebase } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import { ItemLabel, LabelColorName } from '@packup/utils'
import { PackingListItemLabel } from './PackingListItemLabel'

const CreateButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 10px;

  :hover {
    color: ${brandPrimary};
    transition: color 0.2s ease-in-out;
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column;
`

const LabelContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`

type PackingListLabelListProps = {
  toggleListHandler: (e?: any) => void
}

export const PackingListLabelList: FunctionComponent<PackingListLabelListProps> = ({ toggleListHandler }) => {
  const [labels, setLabels] = useState([])
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
        setLabels(labels)
      }
    })

  const labelComponents = labels.map((label: ItemLabel, index) => {
    return (
      <PackingListItemLabel colorName={label.color as LabelColorName} key={index} variant={'editable'}>
        {label.text}
      </PackingListItemLabel>
    )
  })

  return (
    <Container>
      <CreateButton onClick={toggleListHandler}>
        + New Label
      </CreateButton>
      <LabelContainer>
        {labelComponents}
      </LabelContainer>
    </Container>
  )
}
