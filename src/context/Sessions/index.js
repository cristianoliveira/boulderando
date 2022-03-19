import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as storage from '../../storage/local'

import { getSessions, postSessionSchedule } from '../../api/bouldering-sessions'

export const SessionContext = createContext()

export const SessionConsumer = SessionContext.Consumer

export function SessionProvider({ children }) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessions, setSessions] = useState([])
  const router = useRouter()

  const scheduleSession = (session, user) => {
    setHasSubmitted(true)
    setIsProcessing(true)
    return postSessionSchedule(user, session).then(({ data, error }) => {
      setIsProcessing(false)

      if (data) {
        return { data: { ...data, ...session } };
      }

      return { error }
    })
  }

  const addCustomSession = () => {
    router.push('/sessions/new')
  }

  const deleteCustomSessions = () => {
    storage.remove('sessions')
    setSessions([])
  }

  const saveCustomSession = (session) => {
    const storedSessions = storage.get('sessions')
    storage.save('sessions', [...(storedSessions || []), session])
    setSessions((curSessions) => [...curSessions, session])
    router.push('/sessions')
  }

  const customSessions = storage.get('sessions')
  useEffect(() => {
    getSessions().then((defaultSessions) => {
      setSessions([...defaultSessions, ...(customSessions || [])])
    })
  }, [sessions.length])

  return (
    <SessionContext.Provider
      value={{
        sessions,
        addCustomSession,
        deleteCustomSessions,
        scheduleSession,
        saveCustomSession,
        isProcessing,
        hasSubmitted,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default () => useContext(SessionContext)
