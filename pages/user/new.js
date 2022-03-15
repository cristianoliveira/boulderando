import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import { Paper, Typography } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import { UserProvider, UserConsumer } from '../../src/context/User'

export default function UserNew() {
  return (
    <UserProvider>
      <UserConsumer>
        {({ saveUser }) => (
          <Paper>
            <Typography variant="h5" color="text.primary" align="center">
              New User
            </Typography>
            <UserForm
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
