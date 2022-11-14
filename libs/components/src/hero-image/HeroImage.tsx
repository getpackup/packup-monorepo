import { PreviewCompatibleImage } from '@getpackup-group/components'
import { white, zIndexHeroImage, baseSpacer } from '@getpackup-group/styles'
import { useWindowSize } from '@getpackup-group/utils'
/* eslint-disable no-nested-ternary */
import React, { FunctionComponent } from 'react'
import styled, { CSSProperties } from 'styled-components'

// TODO fix any types
type HeroImageProps = {
  imgSrc?: any
  mobileImgSrc?: any
  staticImgSrc?: string
  aspectRatio?: number
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  fullHeight?: boolean
  children: React.ReactNode
}

const HeroImageWrapper = styled.div`
  position: relative;
  min-height: ${(props: { aspectRatio?: number; fullHeight?: boolean }) =>
    !props.fullHeight && props.aspectRatio ? `calc(100vw / ${props.aspectRatio})` : 'initial'};
  height: ${(props) => (props.fullHeight ? '100vh' : 'auto')};
`

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: ${(props: HeroImageProps) => props.justifyContent || 'center'};
  align-items: ${(props: HeroImageProps) => props.alignItems || 'center'};
  height: 100%;
  text-align: center;
  color: ${white};
  padding: ${baseSpacer};
  z-index: ${zIndexHeroImage};

  // force white text over image with text-shadow
  & h1,
  & p {
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
    color: ${white};
  }
`

export const HeroImage: FunctionComponent<HeroImageProps> = ({
  imgSrc,
  children,
  mobileImgSrc,
  staticImgSrc,
  aspectRatio,
  justifyContent,
  alignItems,
  fullHeight,
}) => {
  const size = useWindowSize()

  return (
    <HeroImageWrapper
      fullHeight={fullHeight}
      aspectRatio={
        aspectRatio || // if a specific aspectRatio is passed in use that, otherwise use fluid image ratios. default to 16/9 if nothing is there
        (size.isExtraSmallScreen && mobileImgSrc
          ? mobileImgSrc.fluid.aspectRatio
          : imgSrc && imgSrc.fluid
          ? imgSrc.fluid.aspectRatio
          : undefined)
      }
    >
      <PreviewCompatibleImage
        imageInfo={{
          image:
            imgSrc || mobileImgSrc // if imgSrc or mobileImgSrc, use one of those, otherwise that means a staticImgSrc was passed in
              ? size.isExtraSmallScreen && mobileImgSrc
                ? mobileImgSrc
                : imgSrc
              : (staticImgSrc as string),
          alt: '',
        }}
        layout="fill"
        // height={fullHeight ? '100vh' : 'auto'}
      />
      <ChildrenWrapper justifyContent={justifyContent} alignItems={alignItems}>
        {children}
      </ChildrenWrapper>
    </HeroImageWrapper>
  )
}
