/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import { UserType } from '@packup/common'

export const useLoggedInUser = () => {
  // eslint-disable-next-line dot-notation
  const loggedInUser = useSelector((state: AppState) => state.firestore.ordered['loggedInUser'])
  const activeLoggedInUser: UserType | undefined =
    loggedInUser && loggedInUser.length > 0 ? loggedInUser[0] : undefined

  return activeLoggedInUser
}

export default useLoggedInUser
