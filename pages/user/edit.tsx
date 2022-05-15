import { Container } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

import getUrlParam from '../../src/modules/get-url-param'

export default function UserEdit({ setPageTitle }: PageWithTitle): JSX.Element {
  setPageTitle('Edit user')

  const { user, saveUser } = useUserContext()
  return (
    <Container>
      <UserForm
        telegramIdParam={
          getUrlParam('telegram_id') || getUrlParam('telegramId')
        }
        user={user}
        onSubmit={saveUser}
      />
    </Container>
  )
}
