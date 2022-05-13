import { Container } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

import getUrlParam from '../../src/modules/get-url-param'

export default function UserNew({ setPageTitle }) {
  setPageTitle('New user')

  const { saveUser } = useUserContext()
  return (
    <Container>
      <UserForm
        telegramIdParam={
          getUrlParam('telegram_id') || getUrlParam('telegramId')
        }
        onSubmit={saveUser}
      />
    </Container>
  )
}
