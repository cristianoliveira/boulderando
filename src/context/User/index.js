import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as storage from '../../storage/local';

const UserContext = createContext()

export const UserConsumer = UserContext.Consumer

export function UserProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(storage.getUser())

  const deleteUser = () => {
    storage.deleteUser()
    setUser(null)
  }

  const saveUser = (user) => {
    storage.saveUser(user)
    setUser(user)
  }

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      router.push('/sessions')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <UserContext.Provider value={{ user, saveUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}
