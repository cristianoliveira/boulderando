import { useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'

import { NavBar } from '../src/components/NavigationBar'
import DryRunBadge from '../src/components/DryRunBadge'
import GithubForkIt from '../src/components/GithubForkIt'

import {
  EnvironmentProvider,
  EnvironmentConsumer,
} from '../src/context/Environment'
import { UserProvider } from '../src/context/User'
import { SessionProvider } from '../src/context/Sessions'
import { BookingHistoryProvider } from '../src/context/BookingHistory'

function BoulderandoApp({ Component, pageProps }: AppProps): JSX.Element {
  const [pageTitle, setPageTitle] = useState<string>('')
  return (
    <>
      <Head>
        <title>Boulderando</title>
        <meta
          name="description"
          content="Booking bouldering sessions made easy"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EnvironmentProvider>
        <EnvironmentConsumer>
          {({ configs, api }) => (
            <>
              <DryRunBadge isVisible={configs.isDryRun} />
              <UserProvider api={api}>
                <SessionProvider api={api}>
                  <BookingHistoryProvider>
                    <NavBar pageTitle={pageTitle} />
                    <Component {...pageProps} setPageTitle={setPageTitle} />
                    <GithubForkIt />
                  </BookingHistoryProvider>
                </SessionProvider>
              </UserProvider>
            </>
          )}
        </EnvironmentConsumer>
      </EnvironmentProvider>
    </>
  )
}

export default BoulderandoApp
