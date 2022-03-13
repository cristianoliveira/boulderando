import Head from 'next/head'
import Image from 'next/image'
import {
  Paper,
  Typography,
  Link,
  Container,
  FormControl,
  Button,
} from '@mui/material'
import { UserProvider, UserConsumer } from '../src/context/User'

export default function SessionSelectPage() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ deleteUser }) => (
          <Container>
            <Head>
              <title>Sessions to schedule</title>
              <meta
                name="description"
                content="Here you schedule the sessions for the week"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <Typography variant="h5" color="text.primary" align="center">
              Schedule required data
            </Typography>

            <Paper>
              <FormControl fullWidth>
                <Button variant="contained" type="submit" onClick={deleteUser}>
                  Delete data
                </Button>
              </FormControl>
            </Paper>

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
          </Container>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
