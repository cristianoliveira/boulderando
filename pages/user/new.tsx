import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

import getUrlParam from '../../src/modules/get-url-param'

type UserPageProps = {
  setPageTitle(title: string): void
}

export default function UserNew({
  setPageTitle,
}: UserPageProps): JSX.Element | null {
  setPageTitle('New user')

  const { user, saveUser } = useUserContext()

  const router = useRouter()
  const telegramId = getUrlParam('telegram_id') || getUrlParam('telegramId')
  if (!telegramId && !user) {
    router.push('/user/invite')
    return null
  }

  if (telegramId && user) {
    router.push(`/user/edit?telegram_id=${telegramId}`)
    return null
  }

  return (
    <Container>
      <UserForm telegramIdParam={telegramId} onSubmit={saveUser} />
    </Container>
  )
}
