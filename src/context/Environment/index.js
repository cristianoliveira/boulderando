import { createContext, useContext } from 'react'
import * as init from '../../api/bouldering-sessions'

export const EnvironmentContext = createContext()

export const EnvironmentConsumer = EnvironmentContext.Consumer

export function EnvironmentProvider({ children }) {
  let hasDryRunParam = false
  if (typeof window !== 'undefined') {
    hasDryRunParam = window.location.search.includes('dry_run')
  }
  const isDryRun =
    JSON.parse(`${process.env.NEXT_PUBLIC_DRY_RUN || 'false'}`) ||
    hasDryRunParam

  const configs = { isDryRun, apiUrl: `${process.env.NEXT_PUBLIC_API_URL}` }

  const api = {
    getSessions: init.getSessions(configs),
    postSessionSchedule: init.postSessionSchedule(configs),
  }

  return (
    <EnvironmentContext.Provider value={{ configs, api }}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export default () => useContext(EnvironmentContext)
