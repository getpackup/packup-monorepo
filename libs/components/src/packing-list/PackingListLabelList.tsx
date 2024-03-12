import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { brandPrimary } from '@packup/styles'

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
  toggleListHandler: (e: any) => void
}

export const PackingListLabelList: FunctionComponent<PackingListLabelListProps> = ({ toggleListHandler }) => {
  return (
    <Container>
      <CreateButton onClick={toggleListHandler}>
        + New Label
      </CreateButton>
      <p>Show available labels</p>
    </Container>
  )
}
