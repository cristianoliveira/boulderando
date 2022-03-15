import { useContext } from 'react'
import { Paper, Typography } from '@mui/material'
import SessionsForm from '../../src/components/Sessions/Form'

import { SessionProvider, SessionConsumer } from '../../src/context/Sessions'

export default function UserNew() {
  return (
    <SessionProvider>
      <SessionConsumer>
        {({ saveCustomSession }) => (
          <Paper>
            <Typography variant="h5" color="text.primary" align="center">
              Adding custom session
            </Typography>
            <SessionsForm
              onSubmit={(data) => {
                saveCustomSession(data)
              }}
            ></SessionsForm>
          </Paper>
        )}
      </SessionConsumer>
    </SessionProvider>
  )
}
