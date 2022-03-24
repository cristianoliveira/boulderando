import Head from 'next/head'
import { Typography, Link, Box } from '@mui/material'
import NavBar from '../src/components/NavBar'
import DryRunBadge from '../src/components/DryRunBadge'

import { UserProvider } from '../src/context/User'
import { SessionProvider } from '../src/context/Sessions'
import { BookingHistoryProvider } from '../src/context/BookingHistory'

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
     <DryRunBadge isVisible={JSON.parse(process.env.NEXT_PUBLIC_DRY_RUN || "false")}/>

      <UserProvider>
        <SessionProvider>
          <BookingHistoryProvider>
            <NavBar />
            <Component {...pageProps} />
          </BookingHistoryProvider>
        </SessionProvider>
      </UserProvider>

      <Box>
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
      </Box>
    </>
  )
}

export default MyApp
