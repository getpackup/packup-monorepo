import styled, { keyframes } from 'styled-components'

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

type FadeInProps = {
  children: React.ReactNode
  duration?: number
  delay?: number
}

const FadeIn = ({ children, duration = 400, delay = 0 }: FadeInProps) => {
  return (
    <Wrapper duration={duration} delay={delay}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.span<{ duration: number; delay: number }>`
  animation: ${fade} ${(p) => p.duration}ms ${(p) => p.delay}ms both;
`

export default FadeIn
