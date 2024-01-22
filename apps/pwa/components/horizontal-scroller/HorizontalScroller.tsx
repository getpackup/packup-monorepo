import { baseSpacer, baseBorderStyle } from '@packup/styles'
import { FunctionComponent } from 'react'
import styled from 'styled-components'

type HorizontalScrollerProps = {
  withBorder?: boolean
  children: React.ReactNode
}

/* https://dev.to/joostkiens/creating-practical-instagram-like-galleries-and-horizontal-lists-with-css-scroll-snapping-580e */
const HorizontalScrollerWrapper = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  scrollbar-width: none;
  /* overscroll-behavior: contain; */
  /* touch-action: pan-x; */
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  cursor: ew-resize;
  border: ${(props: HorizontalScrollerProps) => (props.withBorder ? baseBorderStyle : 'none')};

  &::-webkit-scrollbar {
    display: none;
  }

  & span {
    flex-shrink: 0;
  }
`

export const HorizontalScroller: FunctionComponent<HorizontalScrollerProps> = ({
  withBorder,
  children,
}) => {
  return <HorizontalScrollerWrapper withBorder={withBorder}>{children}</HorizontalScrollerWrapper>
}
