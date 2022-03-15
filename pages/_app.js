import Head from 'next/head'
import Image from 'next/image'
import { Paper, Typography, Link, Container } from '@mui/material'

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
      <Component {...pageProps} />

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
