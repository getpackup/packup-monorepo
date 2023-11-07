import { render } from '@testing-library/react'

import TripFormCreate from './TripFormCreate'

describe('TripFormCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TripFormCreate />)
    expect(baseElement).toBeTruthy()
  })
})
