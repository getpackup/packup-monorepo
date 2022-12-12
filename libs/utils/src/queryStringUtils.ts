import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import { parse, stringify } from 'query-string'

export const getQueryStringParams = (location: Window['location']) => parse(location.search)

export const mergeQueryParams = (newObj: Record<string, string>, location: Window['location']) => {
  const existingParams = parse(location.search)
  const newParams = {
    ...existingParams,
    ...newObj,
  }

  return `?${stringify(pickBy(newParams, identity))}`
}
