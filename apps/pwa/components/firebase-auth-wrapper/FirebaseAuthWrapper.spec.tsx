import { render } from '@testing-library/react'

import FirebaseAuthWrapper from './FirebaseAuthWrapper'

describe('FirebaseAuthWrapper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FirebaseAuthWrapper />)
    expect(baseElement).toBeTruthy()
  })
})
