import { render } from '@testing-library/react'

import GlobalAlerts from './GlobalAlerts'

describe('GlobalAlerts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlobalAlerts />)
    expect(baseElement).toBeTruthy()
  })
})
