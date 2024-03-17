import { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { brandPrimary } from '@packup/styles'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import { ItemLabel as ItemLabelType, LabelColorName } from '@packup/utils'
import { ItemLabel } from '@packup/components'

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
  toggleListHandler: (labelId?: string) => void
}

export const ItemLabelList: FunctionComponent<PackingListLabelListProps> = ({ toggleListHandler }) => {
  const [loaded, setLoaded] = useState(false)
  const [labelComponents, setLabelComponents] = useState<JSX.Element[]>([])
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  useEffect(() => {
    const labels: Array<ItemLabelType> = []

    firebase
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .collection('labels')
      .get()
      .then((subcollection) => {
        for(const doc of subcollection.docs) {
          labels.push({
            ...doc.data() as ItemLabelType,
            id: doc.id,
          })
        }

        setLabelComponents(labels.map((label: ItemLabelType) => {
          return (
            <ItemLabel
              colorName={label.color as LabelColorName}
              key={label.id}
              variant={'editable'}
              id={label.id}
              toggleForm={toggleListHandler}
            >
              {label.text}
            </ItemLabel>
          )
        }))

        setLoaded(true)
      })
  }, [loaded])

  return (
    <Container>
      <CreateButton onClick={() => {
        toggleListHandler()
        console.log('create')
      }}>
        + New Label
      </CreateButton>
      <LabelContainer>
        {labelComponents}
      </LabelContainer>
    </Container>
  )
}
