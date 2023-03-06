import {
  brandDanger,
  brandInfo,
  brandPrimary,
  brandPrimaryHover,
  brandSuccess,
  white,
  doubleSpacer,
  quarterSpacer,
  threeQuarterSpacer,
  fontSizeSmall,
  fontSizeXSmall,
  boxShadow,
  baseBorderStyle,
} from '@packup/styles'
import Link from 'next/link'
import React, { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'

type PillProps = {
  to?: string
  text: string
  color: 'neutral' | 'primary' | 'danger' | 'success' | 'info'
  style?: CSSProperties
}

const renderColor = (color: PillProps['color']) => {
  switch (color) {
    case 'neutral':
      return {
        backgroundColor: `var(--color-background)`,
        hoverBackgroundColor: `var(--color-background)`,
        color: `var(--color-text)`,
      }
    case 'primary':
      return {
        backgroundColor: brandPrimary,
        hoverBackgroundColor: brandPrimaryHover,
        color: white,
      }
    case 'danger':
      return {
        backgroundColor: brandDanger,
        hoverBackgroundColor: brandDanger,
        color: white,
      }
    case 'success':
      return {
        backgroundColor: brandSuccess,
        hoverBackgroundColor: brandSuccess,
        color: white,
      }
    case 'info':
      return {
        backgroundColor: brandInfo,
        hoverBackgroundColor: brandInfo,
        color: white,
      }
    default:
      return {
        backgroundColor: brandPrimary,
        hoverBackgroundColor: brandPrimaryHover,
        color: white,
      }
  }
}

const StyledPill = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.05em;
  border: ${baseBorderStyle};
  padding: ${quarterSpacer} ${threeQuarterSpacer};
  background-color: ${(props: { color: PillProps['color'] }) =>
    props.color && renderColor(props.color).backgroundColor};
  border-radius: ${doubleSpacer};
  margin: ${quarterSpacer};
  transition: all 0.2s ease-in-out;
  color: ${(props) => props.color && renderColor(props.color).color};
  line-height: 1.5;
  white-space: pre;
  font-size: ${fontSizeXSmall};

  &:hover {
    background-color: ${(props) => props.color && renderColor(props.color).hoverBackgroundColor};
  }
`

const StyledLink = styled(Link)`
  display: block;
  color: ${white};
  font-size: ${fontSizeSmall};
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: ${white};
  }
`

export const Pill: FunctionComponent<PillProps> = (props) => {
  return (
    <StyledPill {...props}>
      <small>{props.to ? <StyledLink href={props.to}>{props.text}</StyledLink> : props.text}</small>
    </StyledPill>
  )
}
