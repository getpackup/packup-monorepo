import { Box, Button, Heading, PageContainer } from '@packup/components'
import { FunctionComponent } from 'react'
import { FaCalendar } from 'react-icons/fa'

type NoTripFoundProps = {}

export const NoTripFound: FunctionComponent<NoTripFoundProps> = () => {
  return (
    <>
      <Heading>Are You Lost?</Heading>
      <p>
        We couldn&apos;t find that trip for some reason, are you sure you should be on this page?
        Try viewing your list of trips again.
      </p>
      <Button type="link" to="/" iconLeft={<FaCalendar />}>
        View My Trips
      </Button>
    </>
  )
}

export default NoTripFound
