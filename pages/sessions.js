import styled from '@emotion/styled'

import Head from 'next/head'
import Image from 'next/image'
import {
  Paper,
  Typography,
  Link,
  Grid,
  FormControl,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UserIcon from '@mui/icons-material/Person'
import { UserProvider, UserConsumer } from '../src/context/User'
import { SessionProvider, SessionConsumer } from '../src/context/Sessions'
import Sessions from '../src/components/Sessions'

function Item({ children }) {
  return <div>{children}</div>
}

const UserProfile = styled.span`
  vertical-align: super;
`

export default function SessionSelectPage() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ user, deleteUser }) => (
          <>
            <Head>
              <title>Sessions to schedule</title>
              <meta
                name="description"
                content="Here you schedule the sessions for the week"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>

          {user && (
            <Grid container spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="left"
            >
              <Grid item xs={2}>
                <UserIcon />
              </Grid>
              <Grid item xs={4}>
                <UserProfile>
                  {user.name}
                </UserProfile>
              </Grid>
              <Grid item xs={3}>
                <Button type="submit" onClick={deleteUser}>
                  <DeleteIcon />
                  Delete
                </Button>
              </Grid>
            </Grid>
          )}

            <Typography variant="h5" color="text.primary" align="center">
              Schedule required data
            </Typography>

            <Sessions user={user} />

            <footer>
              <Typography variant="span" color="text.secondary" align="center">
                Developed by Bouldering Fans.
              </Typography>
              <Link
                href="https://github.com/cristianoliveira/boulderando"
                target="_blank"
                rel="noopener noreferrer"
                align="center"
                variant="body2"
              >
                Repo on Github
              </Link>
            </footer>
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
