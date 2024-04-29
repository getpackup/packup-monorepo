import { render } from '@testing-library/react'

import PageContainer from './PageContainer'

describe('PageContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageContainer />)
    expect(baseElement).toBeTruthy()
  })
})
