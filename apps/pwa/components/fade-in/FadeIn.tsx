import styled, { keyframes } from 'styled-components'

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Wrapper = styled.span<{ duration: number; delay: number }>`
  animation: ${fade} ${(p) => p.duration}ms ${(p) => p.delay}ms both;
`

type FadeInProps = {
  children: React.ReactNode
  duration?: number
  delay?: number
}

export const FadeIn = ({ children, duration = 400, delay = 0 }: FadeInProps) => (
  <Wrapper duration={duration} delay={delay}>
    {children}
  </Wrapper>
)

export default FadeIn
