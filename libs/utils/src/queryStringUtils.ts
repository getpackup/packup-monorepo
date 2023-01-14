import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import { stringify } from 'query-string'
import { NextRouter } from 'next/router'

// eslint-disable-next-line import/prefer-default-export
export const mergeQueryParams = (
  newObj: Record<string, string>,
  existingQueryParams: NextRouter['query']
) => {
  const newParams = {
    ...existingQueryParams,
    ...newObj,
  }

  return `?${stringify(pickBy(newParams, identity))}`
}
