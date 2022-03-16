import Head from 'next/head'
import Image from 'next/image'
import { Paper, Typography, Link, Container } from '@mui/material'
import NavBar from '../src/components/NavBar'

import { UserProvider, UserConsumer } from '../src/context/User'
import { SessionProvider } from '../src/context/Sessions'

function MyApp({ Component, pageProps }) {
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

      <UserProvider>
        <UserConsumer>
          {(user) => (
            <SessionProvider user={user}>
              <NavBar />
              <Component {...pageProps} />
            </SessionProvider>
          )}
        </UserConsumer>
      </UserProvider>

      <Typography variant="small" color="text.primary" align="center">
        <small>Developed by Bouldering Fans. </small>
        <Link
          href="https://github.com/cristianoliveira/boulderando"
          target="_blank"
          rel="noopener noreferrer"
          align="center"
          variant="body2"
        >
          Fork it on Github
        </Link>
      </Typography>
    </>
  )
}

export default MyApp
