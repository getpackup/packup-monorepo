import styled from 'styled-components'

export const AnimatedContainer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  align-items: center;
  justify-content: center;

  & > * {
    position: relative;
    grid-area: 1/1;
    transition: all 0.3s 0.3s cubic-bezier(0.5, 0, 0.5, 1);
    transition-property: opacity, transform;

    text-align: center;
    display: block;
  }

  & > *[aria-hidden='true'] {
    display: initial;
    pointer-events: none;
    transition-delay: 0s;
    opacity: 0;
    transform: scale(0.8);
  }
`
