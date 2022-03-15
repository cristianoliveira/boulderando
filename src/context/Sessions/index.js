import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as storage from '../../storage/local'

import { getSessions, postSessionSchedule } from '../../api/bouldering-sessions'

const SessionContext = createContext()

export const SessionConsumer = SessionContext.Consumer

export function SessionProvider({ user, children }) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessions, setSessions] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()

  const scheduleSession = (session) => {
    setHasSubmitted(true)
    setIsProcessing(true)
    postSessionSchedule(user, session).then(({ data, error }) => {
      setResult({ ...data, ...session })
      setIsProcessing(false)
      setError(error?.message)
    })
  }

  const addCustomSession = () => {
    router.push('/sessions/new')
  }

  const saveCustomSession = (session) => {
    const sessions = storage.get('sessions')
    storage.save('sessions', [...(sessions || []), session])
    router.push('/sessions')
  }

  const customSessions = storage.get('sessions')
  useEffect(() => {
    getSessions().then((defaultSessions) => {
      setSessions([...defaultSessions, ...(customSessions || [])])
    })
  }, [])

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
