import { render } from '@testing-library/react'

import ReactModal from './ReactModal'

describe('ReactModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactModal />)
    expect(baseElement).toBeTruthy()
  })
})
