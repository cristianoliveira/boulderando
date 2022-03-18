import { Paper } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import { UserConsumer } from '../../src/context/User'

export default function UserNew() {
  return (
    <UserConsumer>
      {({ saveUser }) => (
        <Paper>
          <UserForm
            onSubmit={(data) => {
              saveUser(data)
            }}
          ></UserForm>
        </Paper>
      )}
    </UserConsumer>
  )
}
