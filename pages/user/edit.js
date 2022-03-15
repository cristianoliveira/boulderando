import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import { Paper, Typography, Link, Container } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import { UserProvider, UserConsumer } from '../../src/context/User'

export default function UserEdit() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ user, saveUser }) => (
          <Paper>
            <Typography variant="h5" color="text.primary" align="center">
              Editing User
            </Typography>

            <UserForm
              user={user}
              onSubmit={(data) => {
                saveUser(data)
              }}
            ></UserForm>
          </Paper>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
