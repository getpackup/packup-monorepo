import { zIndexHeroImage, baseSpacer } from '@packup/styles'
import { FunctionComponent } from 'react'
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

const HeroImageWrapper = styled.div<{ aspectRatio: HeroImageProps['aspectRatio'] }>`
  position: relative;
  aspect-ratio: ${(props) => props.aspectRatio || 'initial'};
  background-color: var(--color-background);
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
  color: var(--color-textLight);
  padding: ${baseSpacer};
  z-index: ${zIndexHeroImage};

  // force white text over image with text-shadow
  & h1,
  & p {
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.75);
    color: var(--color-textLight);
  }
`

export const HeroImage: FunctionComponent<HeroImageProps> = ({
  src,
  children,
  aspectRatio,
  justifyContent,
  alignItems,
}) => {
  return (
    <HeroImageWrapper aspectRatio={aspectRatio}>
      <Image src={src} layout="fill" alt="" />
      <ChildrenWrapper justifyContent={justifyContent} alignItems={alignItems}>
        {children}
      </ChildrenWrapper>
    </HeroImageWrapper>
  )
}
