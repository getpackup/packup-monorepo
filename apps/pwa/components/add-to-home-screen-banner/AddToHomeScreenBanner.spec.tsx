import { render } from '@testing-library/react'

import AddToHomeScreenBanner from './AddToHomeScreenBanner'

describe('AddToHomeScreenBanner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddToHomeScreenBanner />)
    expect(baseElement).toBeTruthy()
  })
})
