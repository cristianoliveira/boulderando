import { Paper } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

export default function UserEdit() {
  const { user, saveUser } = useUserContext()
  if (!user) {
    debugger
  }
  return (
    <Paper>
      <UserForm
        user={user}
        onSubmit={(data) => {
          saveUser(data)
        }}
      ></UserForm>
    </Paper>
  )
}
