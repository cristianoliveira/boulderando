import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getSessions } from '../../api/sessions';

const SessionContext = createContext()

export const SessionConsumer = SessionContext.Consumer

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    getSessions().then(setSessions)
  }, [])

  return (
    <SessionContext.Provider value={{ sessions }}>
      {children}
    </SessionContext.Provider>
  )
}
