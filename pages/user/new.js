import { Container, Typography } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

export default function UserNew() {
  const { saveUser } = useUserContext()
  return (
    <Container>
      <Typography variant="h5" color="text.primary" align="center">
        New User
      </Typography>
      <UserForm onSubmit={saveUser} />
    </Container>
  )
}
