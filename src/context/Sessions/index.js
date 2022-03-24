import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useListStorage from '../../hooks/useListStorage'

export const SessionContext = createContext()

export const SessionConsumer = SessionContext.Consumer

export function SessionProvider({ children, api }) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessions, setSessions, resetSessions] = useListStorage('sessions', [])
  const router = useRouter()

  const scheduleSession = (session, user) => {
    setHasSubmitted(true)
    setIsProcessing(true)
    return api.postSessionSchedule(user, session).then(({ data, error }) => {
      setIsProcessing(false)

      if (data) {
        return { data: { ...data, ...session } };
      }

      return { error }
    })
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
      api.getSessions().then((defaultSessions) => {
        setSessions(defaultSessions)
      })
    }
  }, [])

  return (
    <SessionContext.Provider
      value={{
        sessions,
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
