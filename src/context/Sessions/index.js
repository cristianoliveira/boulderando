import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useListStorage from '../../hooks/useListStorage'

import { getSessions, postSessionSchedule } from '../../api/bouldering-sessions'

export const SessionContext = createContext()

export const SessionConsumer = SessionContext.Consumer

export function SessionProvider({ children }) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessions, setSessions, resetSessions] = useListStorage('sessions', [])
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
    resetSessions()
  }

  const saveCustomSession = (session) => {
    setSessions([...sessions, session])
    router.push('/sessions')
  }

  useEffect(() => {
    if (!sessions.length) {
      getSessions().then((defaultSessions) => {
        setSessions(defaultSessions)
      })
    }
  }, [])

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
