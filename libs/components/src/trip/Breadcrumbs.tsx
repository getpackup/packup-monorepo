import { TripType } from '@getpackup-group/common'
import { halfSpacer, fontSizeSmall } from '@getpackup-group/styles'
import { truncateText } from '@getpackup-group/utils'
import Link from 'next/link'
import React, { Children, FunctionComponent, memo } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import styled from 'styled-components'

type CrumbProps = {
  text: string
  style?: any
  path: string
  children?: React.ReactNode
  pathname: string
}

const Crumb: FunctionComponent<CrumbProps> = memo(({ text, path, children, pathname }) => {
  const activePage = pathname.split('/').pop()
  const shouldRenderCrumb = pathname.endsWith(activePage || '')
  const hasChildren = Children.count(children) > 0

  return (
    <>
      {hasChildren && <Link href={path}>{text}</Link>}
      {shouldRenderCrumb && hasChildren && (
        <>
          <FaChevronRight style={{ margin: `0 ${halfSpacer}` }} />
          {children}
        </>
      )}
      {!hasChildren && text.toLocaleLowerCase() === activePage && <span>{text}</span>}
    </>
  )
})

Crumb.displayName = 'Crumb'

const BreadcrumbsWrapper = styled.div`
  margin-right: ${halfSpacer};
  text-transform: uppercase;
  font-size: ${fontSizeSmall};
  & a,
  & span {
    font-weight: bold;
  }

  & div {
    display: inline;
  }
`

type BreadcrumbsProps = {
  trip?: TripType
  pathname: string
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = memo(({ trip, pathname }) => {
  if (!trip) {
    return null
  }
  return (
    <BreadcrumbsWrapper>
      <Crumb path="/" text="All Trips" pathname={pathname}>
        <Crumb
          path={`/trips/${trip.tripId}`}
          text={truncateText(trip.name, 20) || 'Trip'}
          pathname={pathname}
        >
          <Crumb path={`/trips/${trip.tripId}/details`} text="Details" pathname={pathname} />
          <Crumb path={`/trips/${trip.tripId}/party`} text="Party" pathname={pathname} />
        </Crumb>
      </Crumb>
      <div style={{ clear: 'both' }} />
    </BreadcrumbsWrapper>
  )
})

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
