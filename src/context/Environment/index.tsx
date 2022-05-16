import { createContext, useContext } from 'react'
import initApiClient from '../../api/bouldering-sessions'

type EnvironmentConfiguration = {
  isDryRun: boolean;
  apiUrl: string
  telegramInviteLink: string
  socketApiUrl: string
}

type EnvironmentContextValue = {
  configs: EnvironmentConfiguration
} & WithApi

export const EnvironmentContext = createContext<EnvironmentContextValue>(
  undefined as any
)

export const EnvironmentConsumer = EnvironmentContext.Consumer

export function EnvironmentProvider({ children }: WithChildren) {
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

  const api: Api = initApiClient(configs)

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
