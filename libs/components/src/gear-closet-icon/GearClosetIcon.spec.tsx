import { render } from '@testing-library/react'

import GearClosetIcon from './GearClosetIcon'

describe('GearClosetIcon', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GearClosetIcon />)
    expect(baseElement).toBeTruthy()
  })
})
