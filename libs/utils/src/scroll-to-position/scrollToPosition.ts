import { ScrollTimeout } from '..'

export const scrollToPosition = (offset: number): void => {
  setTimeout(() => {
    window?.scrollTo(0, offset)
  }, ScrollTimeout.default)
}

export default scrollToPosition
