import { brandDanger, brandInfo, brandSuccess, white } from '@packup/styles'
import { baseSpacer, borderRadius, doubleSpacer, halfSpacer } from '@packup/styles'
import { FunctionComponent } from 'react'
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaLongArrowAltRight,
  FaTimes,
} from 'react-icons/fa'
import { animated } from '@react-spring/web'
import styled from 'styled-components'

import { RelativeOrExternalLink } from '../relative-or-external-link/RelativeOrExternalLink'

export interface AlertProps {
  type: 'success' | 'danger' | 'info'
  callToActionLink?: string
  callToActionLinkText?: string
  message: string
  close?: () => void
  alertNumber?: number
  alertNumberTotal?: number
  dismissable?: boolean
  life?: number
  id?: string
  style?: {}
}

const renderColor = (type: AlertProps['type']) => {
  if (type === 'success') {
    return brandSuccess
  }
  if (type === 'danger') {
    return 'var(--color-danger)'
  }
  if (type === 'info') {
    return 'var(--color-info)'
  }
  return 'var(--color-danger)'
}

const renderIcon = (type: AlertProps['type']) => {
  if (type === 'danger') {
    return <FaExclamationCircle />
  }
  if (type === 'success') {
    return <FaCheckCircle />
  }
  if (type === 'info') {
    return <FaInfoCircle />
  }
  return <FaInfoCircle />
}

const AlertWrapper = styled.div`
  background-color: ${(props: { type: AlertProps['type'] }) =>
    props.type && renderColor(props.type)};
  padding: ${baseSpacer} ${doubleSpacer} ${baseSpacer} ${baseSpacer};
  color: ${white};
  margin-bottom: ${baseSpacer};
  border-radius: ${borderRadius};
  text-align: center;
  position: relative;
  & > p {
    margin-bottom: 0;
  }
`

const StyledLink = styled(RelativeOrExternalLink)`
  color: ${white};
  margin-left: ${halfSpacer};
  border-bottom: 1px solid ${white};
  &:hover,
  &:focus {
    color: ${white};
  }
`

const CloseButton = styled.span`
  position: absolute;
  top: ${halfSpacer};
  right: ${halfSpacer};
  opacity: 0.65;
  cursor: pointer;
  color: ${white};
  &:hover {
    opacity: 1;
  }
`

const Life = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: auto;
  background-color: rgba(255, 255, 255, 0.25);
  height: 5px;
`

export const Alert: FunctionComponent<AlertProps> = (props) => (
  <AlertWrapper {...props}>
    {renderIcon(props.type)} {props.message}{' '}
    {props.callToActionLink && (
      <StyledLink to={props.callToActionLink}>
        {props.callToActionLinkText} <FaLongArrowAltRight />
      </StyledLink>
    )}
    {props.alertNumber && !!props.alertNumberTotal && props.alertNumberTotal > 1 && (
      <small>
        <em>
          {' '}
          (Message {props.alertNumber} of {props.alertNumberTotal})
        </em>
      </small>
    )}
    {props.dismissable && (
      <CloseButton onClick={props.close}>
        <FaTimes />
      </CloseButton>
    )}
    {props.life && <Life style={{ right: props.life }} />}
  </AlertWrapper>
)
