import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react'

import Index from '../pages'

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index />)
    expect(baseElement).toBeTruthy()
  })
})
