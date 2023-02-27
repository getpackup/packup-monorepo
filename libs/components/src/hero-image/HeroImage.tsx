import { white, zIndexHeroImage, baseSpacer, lightGray } from '@packup/styles'
import React, { FunctionComponent } from 'react'
import styled, { CSSProperties } from 'styled-components'
import Image from 'next/image'

// TODO fix any types
type HeroImageProps = {
  src: string
  aspectRatio?: number
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  fullHeight?: boolean
  children?: React.ReactNode
}

const HeroImageWrapper = styled.div`
  position: relative;
  min-height: ${(props: { aspectRatio?: number; fullHeight?: boolean }) =>
    !props.fullHeight && props.aspectRatio ? `calc(100vw / ${props.aspectRatio})` : 'initial'};
  height: ${(props) => (props.fullHeight ? '100vh' : 'auto')};
  background-color: ${lightGray};
  background-image: url('/images/topo.png');
`

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: ${(props: Omit<HeroImageProps, 'src'>) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
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
  src,
  children,
  aspectRatio,
  justifyContent,
  alignItems,
  fullHeight,
}) => {
  return (
    <HeroImageWrapper fullHeight={fullHeight} aspectRatio={aspectRatio}>
      <Image src={src} layout="fill" />
      <ChildrenWrapper justifyContent={justifyContent} alignItems={alignItems}>
        {children}
      </ChildrenWrapper>
    </HeroImageWrapper>
  )
}
