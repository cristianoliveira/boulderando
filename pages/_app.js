import { useState } from 'react'
import Head from 'next/head'
import NavBar from '../src/components/NavBar'
import DryRunBadge from '../src/components/DryRunBadge'
import GithubForkIt from '../src/components/GithubForkIt'

import {
  EnvironmentProvider,
  EnvironmentConsumer,
} from '../src/context/Environment'
import { UserProvider } from '../src/context/User'
import { SessionProvider } from '../src/context/Sessions'
import { BookingHistoryProvider } from '../src/context/BookingHistory'

function BoulderandoApp({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState('');
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
              <UserProvider>
                <SessionProvider api={api}>
                  <BookingHistoryProvider>
                    <NavBar pageTitle={pageTitle} />
                    <Component setPageTitle={setPageTitle} {...pageProps} />
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
