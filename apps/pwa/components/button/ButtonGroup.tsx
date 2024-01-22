import styled from 'styled-components'

export const ButtonGroup = styled.div`
  display: inline-flex;
  & button {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:first-child):not(:last-child) {
      border-radius: 0;
      border-left-width: 0;
      border-right-width: 0;
    }
  }
`

export default ButtonGroup
