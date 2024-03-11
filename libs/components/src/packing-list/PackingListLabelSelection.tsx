import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import { halfSpacer, white } from '@packup/styles'

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
  min-width: 300px;
  min-height: 500px;
  height: 70vh;

  z-index: 101;
  display: flex;

  background-color: var(--color-background);
  padding: 15px;
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
`

type PackingListLabelSelectionProps = {
  closeWindow: () => void
}

export const PackingListLabelSelection: FunctionComponent<PackingListLabelSelectionProps> = ({
  closeWindow
}) => {
  return (
    <Overlay onClick={closeWindow}>
      <StyledLabelWindow>
        <Header>
          <Title>
            Labels
          </Title>
          <CloseButton onClick={closeWindow}>
            <FaTimes />
          </CloseButton>
        </Header>
      </StyledLabelWindow>
    </Overlay>
  )
}
