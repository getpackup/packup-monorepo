import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { Heading } from '../'
import { baseSpacer, quadrupleSpacer } from '@packup/styles'
import Loader from 'react-loader-spinner'

export const InlineLoader = () => {
  return (
    <div
      style={{
        margin: baseSpacer,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Loader
        type="Rings"
        color="var(--color-primary)"
        height={quadrupleSpacer}
        width={quadrupleSpacer}
      />
      <Heading as="h6" uppercase>
        Loading...
      </Heading>
    </div>
  )
}
