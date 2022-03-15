import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as storage from '../../storage/local'

const UserContext = createContext()

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
    router.push('/')
  }

  const saveUser = (user) => {
    storage.saveUser(user)
    setUser(user)
    router.push('/sessions')
  }

  useEffect(() => {
    if (!storage.getUser()) {
      router.push('/')
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, saveUser, deleteUser, editUser }}>
      {children}
    </UserContext.Provider>
  )
}
