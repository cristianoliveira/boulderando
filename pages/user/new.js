import { Container } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

export default function UserNew({ setPageTitle }) {
  setPageTitle('New user')

  const { saveUser } = useUserContext()
  return (
    <Container>
      <UserForm onSubmit={saveUser} />
    </Container>
  )
}
