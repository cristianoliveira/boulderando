import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import { Paper, Typography, Link, Container } from '@mui/material'
import UserForm from '../src/components/User/Form'
import { UserProvider, UserConsumer } from '../src/context/User'

export default function Home() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ user, saveUser }) => (
          <>
            <Head>
              <title>Booking required data</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <Paper>
              <Typography variant="h5" color="text.primary" align="center">
                Booking required data with Urban Sports
              </Typography>
              <UserForm
                user={user}
                onSubmit={(data) => {
                  saveUser(data)
                }}
              ></UserForm>
            </Paper>
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
        )}
      </UserConsumer>
    </UserProvider>
  )
}
