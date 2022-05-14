import { createContext, useContext } from 'react'
import * as init from '../../api/bouldering-sessions'

export const EnvironmentContext = createContext()

export const EnvironmentConsumer = EnvironmentContext.Consumer

export function EnvironmentProvider({ children }) {
  if (typeof window === 'undefined') {
    return null
  }

  const hasDryRunParam = window.location.search.includes('dry_run')
  const isDryRun =
    JSON.parse(`${process.env.NEXT_PUBLIC_DRY_RUN || 'false'}`) ||
    hasDryRunParam

  const configs = {
    isDryRun,
    apiUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    telegramInviteLink: `${process.env.NEXT_PUBLIC_TELEGRAM_GROUP_INVITE_LINK}`,
    socketApiUrl: `${process.env.NEXT_PUBLIC_SOCKET_API_URL}`,
  }

  const api = {
    getSessions: init.getSessions(configs),
    postSessionSchedule: init.postSessionSchedule(configs),
    postCreateUser: init.postCreateUser(configs),
  }

  const environment = {
    configs,
    api,
  }

  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export default () => useContext(EnvironmentContext)
