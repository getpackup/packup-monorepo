import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import { stringify } from 'query-string'
import { NextRouter } from 'next/router'

export const getQueryStringParams = (router: NextRouter) => router.query

export const mergeQueryParams = (newObj: Record<string, string>, router: NextRouter) => {
  const newParams = {
    ...router.query,
    ...newObj,
  }

  return `?${stringify(pickBy(newParams, identity))}`
}
