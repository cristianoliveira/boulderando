import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import useListStorage from '../../hooks/useListStorage'
import { SESSIONS } from '../../storage/items'

export const SessionContext = createContext<SessionContext>(undefined as any)

export const SessionConsumer = SessionContext.Consumer

type SessionProviderProps = {
  api: Pick<Api, "postSessionSchedule" | "getSessions">;
} & WithChildren

export function SessionProvider({ children, api }: SessionProviderProps) {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sessions, setSessions, resetSessions] = useListStorage<Session>(
    SESSIONS,
    []
  )
  const router = useRouter()

  const scheduleSession = (session: Session, user: User) => {
    setHasSubmitted(true)
    setIsProcessing(true)
    return api
      .postSessionSchedule(user, session)
      .then(({ data, error }: any) => {
        setIsProcessing(false)

        if (data) {
          return { data: { ...data, ...session } }
        }

        return { error }
      })
  }

  const deleteCustomSessions = () => {
    resetSessions()
  }

  const saveCustomSession = (session: Session) => {
    setSessions([...sessions, session])
    router.push('/sessions')
  }

  useEffect(() => {
    if (!sessions.length) {
      api.getSessions().then((defaultSessions: Session[]) => {
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
