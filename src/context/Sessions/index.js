import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getSessions, postSessionSchedule } from '../../api/bouldering-sessions'

const SessionContext = createContext()

export const SessionConsumer = SessionContext.Consumer

export function SessionProvider({ user, children }) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessions, setSessions] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const scheduleSession = (session) => {
    setHasSubmitted(true)
    setIsProcessing(true)
    postSessionSchedule(user, session).then(({ data, error }) => {
      setResult(data)
      setIsProcessing(false)
      setError(error.message)
    })
  }

  useEffect(() => {
    getSessions().then(setSessions)
  }, [])

  return (
    <SessionContext.Provider
      value={{
        sessions,
        scheduleSession,
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
