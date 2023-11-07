import { render } from '@testing-library/react'

import NotificationDot from './NotificationDot'

describe('NotificationDot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NotificationDot />)
    expect(baseElement).toBeTruthy()
  })
})
