import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import useStorage from '../../hooks/useStorage'
import { USER } from '../../storage/items'
import { getRedirectParam, browserRedirectTo } from '../../modules/redirect-to'

type UserContextValue = {
  user: StorageData<User>
  saveUser(user: User): void
  deleteUser(): void
  editUser(): void
}

export const UserContext = createContext<UserContextValue>(undefined as any)

export const UserConsumer = UserContext.Consumer

const URI_USER_NEW = '/user/new'
const URI_USER_EDIT = '/user/edit'

export function UserProvider({
  children,
  api,
}: WithChildren & WithApi): JSX.Element {
  const router = useRouter()
  const [user, setUser, removeUser] = useStorage<User>(USER)

  const editUser = () => {
    router.push(URI_USER_EDIT)
  }

  const deleteUser = () => {
    removeUser()
    router.push(URI_USER_NEW)
  }

  const saveUser = (userToSave: User) => {
    api.postCreateUser(userToSave).then(() => {
      const redirectTo = getRedirectParam()
      if (redirectTo) {
        browserRedirectTo(redirectTo)
      }

      setUser(userToSave)
      router.push('/')
    })
  }

  useEffect(() => {
    if (
      !user &&
      !router.pathname.includes('sync') &&
      !router.pathname.includes(URI_USER_NEW)
    ) {
      router.push(URI_USER_NEW)
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, saveUser, deleteUser, editUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default () => useContext<UserContextValue>(UserContext)
