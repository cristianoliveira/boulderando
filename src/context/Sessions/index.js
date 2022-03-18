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
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  const scheduleSession = (session, user) => {
    setHasSubmitted(true)
    setIsProcessing(true)
    return postSessionSchedule(user, session).then(({ data, error }) => {
      setIsProcessing(false)
      return { data: { ...data, ...session }, error }
    })
  }

  const addCustomSession = () => {
    router.push('/sessions/new')
  }

  const saveCustomSession = (session) => {
    const sessions = storage.get('sessions')
    storage.save('sessions', [...(sessions || []), session])
    setSessions(curSessions => {
      return [...curSessions, session]
    });
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
        scheduleSession,
        saveCustomSession,
        isProcessing,
        result,
        error,
        hasSubmitted,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default () => {
  return useContext(SessionContext)
}
