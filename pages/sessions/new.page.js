import { Container } from '@mui/material'
import SessionsForm from '../../src/components/Sessions/Form'

import useSessionContext from '../../src/context/Sessions'

export default function New({ setPageTitle }) {
  setPageTitle("Booking session")

  const { saveCustomSession } = useSessionContext()
  return (
    <Container>
      <SessionsForm onSubmit={saveCustomSession} />
    </Container>
  )
}
