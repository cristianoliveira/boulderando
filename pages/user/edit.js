import { Container, Typography } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

export default function UserEdit() {
  const { user, saveUser } = useUserContext()
  return (
    <Container>
      <Typography variant="h5" color="text.primary" align="center">
        Editing User
      </Typography>
      <UserForm user={user} onSubmit={saveUser} />
    </Container>
  )
}
