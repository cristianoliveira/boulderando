import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import {
  Typography,
  Grid,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UserIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'

import { UserProvider, UserConsumer } from '../src/context/User'
import { SessionProvider, SessionConsumer } from '../src/context/Sessions'
import SessionsSelector from '../src/components/Sessions'
import { getUser } from '../src/storage/local';

function Item({ children }) {
  return <div>{children}</div>
}

const UserProfile = styled.span`
  vertical-align: super;
`

export default function SessionSelectPage() {
  const router = useRouter()
  if (!getUser()) {
    router.push('/')
  }

  return (
    <UserProvider>
      <UserConsumer>
        {({ user, deleteUser, editUser }) => (
          <>
            {user && (
              <Grid
                container
                spacing={4}
                direction="row"
                alignItems="center"
                justifyContent="left"
              >
                <Grid item xs={2}>
                  <UserIcon />
                </Grid>
                <Grid item xs={4} justifyContent="left">
                  <UserProfile>{user.name}</UserProfile>
                </Grid>
                <Grid item xs={3}>
                  <Button type="submit" onClick={deleteUser}>
                    <DeleteIcon />
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button type="submit" onClick={editUser}>
                    <EditIcon />
                    Edit
                  </Button>
                </Grid>
              </Grid>
            )}

            <Typography variant="h5" color="text.primary" align="center">
              Schedule required data
            </Typography>

            <SessionsSelector user={user} />
          </>
        )}
      </UserConsumer>
    </UserProvider>
  )
}
