import { Container, Typography } from '@mui/material'
import SessionsForm from '../../src/components/Sessions/Form'

import useSessionContext from '../../src/context/Sessions'

export default function New() {
  const { saveCustomSession } = useSessionContext()
  return (
    <Container>
      <Typography variant="h5" color="text.primary" align="center">
        Adding custom session
      </Typography>
      <SessionsForm onSubmit={saveCustomSession} />
    </Container>
  )
}
