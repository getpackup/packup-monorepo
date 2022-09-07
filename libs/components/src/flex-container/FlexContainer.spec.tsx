import { render } from '@testing-library/react'

import FlexContainer from './FlexContainer'

describe('FlexContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlexContainer />)
    expect(baseElement).toBeTruthy()
  })
})
