import { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { MdArrowBackIos } from 'react-icons/md'
import { ItemLabelForm, ItemLabelList } from '@packup/components'
import { brandPrimary } from '@packup/styles'

const spacing = '15px'

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`

const StyledLabelWindow = styled.div`
  width: 300px;
  max-height: 500px;
  height: fit-content;
  border-radius: 3px;

  z-index: 101;
  display: flex;
  flex-flow: column;

  background-color: var(--color-background);
  padding: ${spacing};
`

const Header = styled.header`
  width: 100%;
  height: fit-content;
  border-bottom: 1px solid var(--color-border);
  display: grid;
  text-align: center;
  grid-template-columns: 32px 1fr 32px;
`

const Title = styled.h2`
  font-size: 1.5rem;
  grid-column: 1 / span 3;
  grid-row: 1;
  padding: 0 32px;
`

const CloseButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  grid-column: 3;
  grid-row: 1;
  width: 32px;
  height: 32px;

  :hover {
    color: ${brandPrimary};
    transition: color 0.2s ease-in-out;
  }
`

const BackButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  grid-column: 1;
  grid-row: 1;
  width: 32px;
  height: 32px;

  :hover {
    color: ${brandPrimary};
    transition: color 0.2s ease-in-out;
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 3px;
  margin-top: ${spacing};
  background-color: var(--color-backgroundTertiary);
  padding: ${spacing};
`

type PackingListLabelSelectionProps = {
  closeWindow: () => void
}

export const ItemLabelSelection: FunctionComponent<PackingListLabelSelectionProps> = ({
  closeWindow
}) => {
  const [showList, setShowList] = useState(true)
  const [labelId, setLabelId] = useState('')
  const [title, setTitle] = useState('Select Label')

  const toggleShowForm = (labelId?: string) => {
    setShowList(!showList)
    setLabelId(labelId ?? '')
  }

  useEffect(() => {
    console.log(labelId)
    if (showList) {
      setTitle('Select Label')
    }
    else if (labelId) {
      setTitle('Update Label')
    } else {
      setTitle('Create Label')
    }
  }, [showList, labelId])

  return (
    // TODO Fix the overlay click event to stop applying to child elements
    // <Overlay onClick={closeWindow}>
    <Overlay>
      <StyledLabelWindow>
        <Header>
          {
            !showList &&
            <BackButton onClick={() => toggleShowForm()}>
              <MdArrowBackIos />
            </BackButton>
          }
          <Title>
            {title}
          </Title>
          <CloseButton onClick={closeWindow}>
            <FaTimes />
          </CloseButton>
        </Header>
        <Container>
          {
            showList ?
              <ItemLabelList toggleListHandler={toggleShowForm} /> :
              <ItemLabelForm toggleListHandler={toggleShowForm} labelId={labelId} />
          }
        </Container>
      </StyledLabelWindow>
    </Overlay>
  )
}
