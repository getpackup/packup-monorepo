import { boxShadow, white, z1Shadow } from '@getpackup-group/styles'
import { baseBorderStyle, borderRadius } from '@getpackup-group/styles'
import { baseSpacer, breakpoints, doubleSpacer, quadrupleSpacer } from '@getpackup-group/styles'
import { ImageProps } from 'next/image'
import React, { CSSProperties, FunctionComponent } from 'react'
import styled, { css } from 'styled-components'

interface BoxProps {
  textAlign?: 'center' | 'left' | 'right'
  height?: number
  zindex?: 1 | 2 | 3 | 4
  largePadding?: boolean
  backgroundAccent?: boolean
  footer?: JSX.Element
  bgSrc?: {
    childImageSharp: {
      fluid: ImageProps
    }
  }
  onClick?: () => void
  style?: CSSProperties
  children: React.ReactNode
}

const StyledBox = styled.div<BoxProps>`
  padding: ${baseSpacer};
  border-radius: ${borderRadius};
  margin-bottom: ${baseSpacer};
  // border: ${baseBorderStyle};
  // box-shadow: 0 6px 14px 0 rgb(0 0 0 / 6%);
  box-shadow: ${boxShadow};
  text-align: ${(props) => props.textAlign};
  // height: ${(props) => (props.height ? `${props.height}px` : `calc(100% - ${baseSpacer})`)};
  background: ${(props) =>
    props.bgSrc
      ? `url(${props.bgSrc.childImageSharp.fluid.src}) center center / cover no-repeat`
      : white};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'initial')};
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.footer &&
    css`
      position: relative;
      padding-bottom: ${quadrupleSpacer};
    `}

  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${(props) => (props.largePadding ? quadrupleSpacer : doubleSpacer)};
  }
`

const StyledBoxBackground = styled.div`
  background-color: ${white};
  padding: ${doubleSpacer};
`

const BackgroundImageOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  height: 100%;
  padding: ${baseSpacer};
`

const StyledBoxFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Box: FunctionComponent<BoxProps> = ({
  textAlign,
  height,
  zindex,
  children,
  largePadding,
  backgroundAccent,
  bgSrc,
  footer,
  ...rest
}) => (
  <StyledBox
    bgSrc={bgSrc}
    textAlign={textAlign}
    height={height}
    zindex={zindex}
    largePadding={largePadding}
    footer={footer}
    {...rest}
  >
    {bgSrc && !backgroundAccent && <BackgroundImageOverlay>{children}</BackgroundImageOverlay>}
    {!bgSrc && backgroundAccent && <StyledBoxBackground>{children}</StyledBoxBackground>}
    {!bgSrc && !backgroundAccent && children}
    {footer && <StyledBoxFooter>{footer}</StyledBoxFooter>}
  </StyledBox>
)

Box.defaultProps = {
  zindex: 1,
}
