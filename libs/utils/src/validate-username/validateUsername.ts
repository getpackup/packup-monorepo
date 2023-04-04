import { algoliaClient } from '../algoliaSearch'
import { isAlphaNumeric } from '../validations/validations'

const searchIndex = algoliaClient.initIndex('Users')

const reservedRouteNamesThatCannotBeUsernames = [
  'about',
  'links',
  'contact',
  'terms',
  'privacy',
  'tags',
  'blog',
  '404',
  'feedback',
  'login',
  'signup',
  'logout',
  'admin',
  'app',
  'gear-closet',
  'offline',
  'account-delete',
  'forgot-password',
  'reset-password',
  'login-with-password',
  'onboarding',
  'profile',
  'signin',
  'user-mgmt',
  'verify-email',
]

export const validateUsername = async (value: string, initialValue: string) => {
  if (value === '' || value === initialValue || !value || String(value).trim() === '') {
    // return out early to avoid api calls below
    return 'This field is required'
  }

  if (value.length < 3) {
    return 'Username must be at least 3 characters long'
  }

  if (value.length > 30) {
    return 'Username must be less than 30 characters long'
  }

  if (isAlphaNumeric(value) !== undefined) {
    return 'Username can only contain letters and numbers'
  }

  const searchValue = value.toLowerCase()

  const response = await searchIndex.search(searchValue, {
    restrictSearchableAttributes: ['username'],
    typoTolerance: false,
    // filters: `username:${searchValue}`,
  })

  let error
  if (reservedRouteNamesThatCannotBeUsernames.includes(searchValue) || response.nbHits !== 0) {
    error = `Sorry, ${value} is unavailable`
  }
  return error
}

export default validateUsername
