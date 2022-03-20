import { createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import useStorage from '../../hooks/useStorage'

export const UserContext = createContext()

export const UserConsumer = UserContext.Consumer

export function UserProvider({ children }) {
  const router = useRouter()
  const [user, setUser, removeUser] = useStorage('user')

  const editUser = () => {
    router.push('/user/edit')
  }

  const deleteUser = () => {
    removeUser()
    router.push('/user/new')
  }

  const saveUser = (_user) => {
    setUser(_user)
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

export default () => useContext(UserContext)
