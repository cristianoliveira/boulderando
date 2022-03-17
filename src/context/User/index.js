import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as storage from '../../storage/local'

export const UserContext = createContext()

export const UserConsumer = UserContext.Consumer

export function UserProvider({ guard, children }) {
  const router = useRouter()
  const [user, setUser] = useState(storage.getUser())

  const editUser = () => {
    router.push('/user/edit')
  }

  const deleteUser = () => {
    storage.deleteUser()
    setUser(null)
    router.push('/user/new')
  }

  const saveUser = (user) => {
    storage.saveUser(user)
    setUser(user)
    router.push('/')
  }

  useEffect(() => {
    if (!user) {
      router.push('/user/new')
    }
  }, [user])

  return (
    <UserContext.Provider value={{ user, saveUser, deleteUser, editUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default () => {
  return useContext(UserContext);
}
