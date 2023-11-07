import { render } from '@testing-library/react'

import ErrorBoundary from './ErrorBoundary'

describe('ErrorBoundary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ErrorBoundary />)
    expect(baseElement).toBeTruthy()
  })
})
