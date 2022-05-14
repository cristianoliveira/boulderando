import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

import getUrlParam from '../../src/modules/get-url-param'

export default function UserNew({ setPageTitle }) {
  setPageTitle('New user')

  const { saveUser } = useUserContext()

  const router = useRouter()
  const telegramId = getUrlParam('telegram_id') || getUrlParam('telegramId')
  if (!telegramId) {
    router.push('/user/invite')
  }

  return (
    <Container>
      <UserForm telegramIdParam={telegramId} onSubmit={saveUser} />
    </Container>
  )
}
