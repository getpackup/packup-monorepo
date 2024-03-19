import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { brandPrimary } from '@packup/styles'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import { LabelColorName } from '@packup/utils'
import { ItemLabel } from '@packup/components'
import toast from 'react-hot-toast'
import { PackingListItemType, ItemLabel as ItemLabelType } from '@packup/common'

const CreateButton = styled.button`
  cursor: pointer;
  background-color: inherit;
  border: none;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  font-weight: 600;
  border-radius: 3px;

  :hover {
    color: ${brandPrimary};
    transition: all 0.2s ease-in-out;
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
  toggleListHandler: (label?: ItemLabelType) => void
  tripId: string
  itemId: string
}

export const ItemLabelList: FunctionComponent<PackingListLabelListProps> = ({ toggleListHandler, tripId, itemId }) => {
  const firebase = useFirebase()
  const { gearItemLabels } = useSelector((state: AppState) => state.client)

  const labelComponents = gearItemLabels.map((label) => {
    // @ts-ignore
    return (
      <ItemLabel
        colorName={label.color as LabelColorName}
        key={label.id}
        variant={'editable'}
        id={label.id}
        toggleForm={toggleListHandler}
        onClick={() => handleSelect(itemId, tripId, label)}
      >
        {label.text}
      </ItemLabel>
    )
  })

  // TODO is there a better way to handle this? Pass label collection into each label doesnt seem right either
  const handleSelect = async (itemId: string, tripId: string, label: ItemLabelType) => {
    const item = await firebase
      .firestore()
      .collection('trips')
      .doc(tripId)
      .collection('packing-list')
      .doc(itemId)
      .get()

    const { labels } = item.data() as PackingListItemType

    await firebase
      .firestore()
      .collection('trips')
      .doc(tripId)
      .collection('packing-list')
      .doc(itemId)
      .update({
        labels: {
          ...labels,
          [label.id]: {
            text: label.text,
            color: label.color
          }
        }
      })

    toast.success(`${label.text} label added!`)
  }

  return (
    <Container>
      <CreateButton onClick={() => {
        toggleListHandler()
      }}>
        + New Label
      </CreateButton>
      { labelComponents.length > 0 && (
        <LabelContainer>
          {labelComponents}
        </LabelContainer>
      )}
    </Container>
  )
}
