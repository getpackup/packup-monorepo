import {
  zIndexModal,
  baseBorderStyle,
  z1Shadow,
  baseSpacer,
  borderRadius,
  doubleSpacer,
  halfSpacer,
  screenSizes,
} from '@packup/styles'
import { FunctionComponent, ComponentType } from 'react'
import { FaTimes } from 'react-icons/fa'
import ReactModal from 'react-modal'
import styled from 'styled-components'

type ModalProps = {
  isOpen: boolean
  toggleModal: () => void
  hideCloseButton?: boolean
  largePadding?: boolean
  children: React.ReactNode
  overflow?:
    | 'visible'
    | 'hidden'
    | 'clip'
    | 'scroll'
    | 'auto'
    | 'hidden visible'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
}

const CloseIcon = styled.span`
  position: absolute;
  top: ${halfSpacer};
  right: ${halfSpacer};
  cursor: pointer;
`

const ModalSafeForReact18 = ReactModal as ComponentType<ReactModal['props']>

export const Modal: FunctionComponent<ModalProps> = (props) => {
  return (
    <ModalSafeForReact18
      isOpen={props.isOpen}
      onRequestClose={props.toggleModal}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      style={{
        content: {
          backgroundColor: 'var(--color-background)',
          border: baseBorderStyle,
          boxShadow: z1Shadow,
          borderRadius,
          maxWidth: screenSizes.medium,
          margin: '0 auto',
          top: '50%',
          position: 'absolute',
          transform: 'translateY(-50%)',
          right: doubleSpacer,
          left: doubleSpacer,
          bottom: 'initial',
          marginBottom: doubleSpacer,
          WebkitOverflowScrolling: 'touch',
          padding: props.largePadding ? doubleSpacer : baseSpacer,
          maxHeight: '80vh',
          overflow: props.overflow ?? 'auto',
        },
        overlay: {
          backgroundColor: 'rgba(0,0,0,.75)',
          position: 'fixed',
          height: '100%',
          overflow: props.overflow ?? 'auto',
          zIndex: zIndexModal,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        },
      }}
    >
      {!props.hideCloseButton && (
        <CloseIcon onClick={props.toggleModal}>
          <FaTimes />
        </CloseIcon>
      )}
      {props.children}
    </ModalSafeForReact18>
  )
}

export default Modal
