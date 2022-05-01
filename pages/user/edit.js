import { Container } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

export default function UserEdit({ setPageTitle }) {
  setPageTitle('Edit user')

  const { user, saveUser } = useUserContext()
  return (
    <Container>
      <UserForm user={user} onSubmit={saveUser} />
    </Container>
  )
}
