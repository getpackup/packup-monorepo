import { render } from '@testing-library/react'

import PreviewCompatibleImage from './PreviewCompatibleImage'

describe('PreviewCompatibleImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PreviewCompatibleImage />)
    expect(baseElement).toBeTruthy()
  })
})
