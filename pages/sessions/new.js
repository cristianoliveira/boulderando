import { useContext } from 'react'
import { Paper, Typography } from '@mui/material'
import SessionsForm from '../../src/components/Sessions/Form'

import { SessionContext } from '../../src/context/Sessions'

export default function New() {
  const sessionContext = useContext(SessionContext);
  return (
    <Paper>
      <Typography variant="h5" color="text.primary" align="center">
        Adding custom session
      </Typography>
      <SessionsForm
        onSubmit={(data) => {
          sessionContext.saveCustomSession(data)
        }}
      ></SessionsForm>
    </Paper>
  )
}
