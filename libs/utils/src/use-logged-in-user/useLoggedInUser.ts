import { useSelector } from 'react-redux'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '@getpackup-group/redux'
import { UserType } from '@getpackup-group/common'

export const useLoggedInUser = () => {
  const loggedInUser = useSelector((state: RootState) => state.firestore.ordered.loggedInUser)
  const activeLoggedInUser: UserType | undefined =
    loggedInUser && loggedInUser.length > 0 ? loggedInUser[0] : undefined

  return activeLoggedInUser
}

export default useLoggedInUser
