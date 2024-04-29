import { render } from '@testing-library/react'

import RelativeOrExternalLink from './RelativeOrExternalLink'

describe('RelativeOrExternalLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RelativeOrExternalLink />)
    expect(baseElement).toBeTruthy()
  })
})
