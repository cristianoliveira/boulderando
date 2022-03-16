import React from 'react'
import styled from '@emotion/styled'
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { UserContext } from '../../context/User'
import { SessionContext } from '../../context/Sessions'

import {
  SESSION_FORM_ERROR_MESSAGE_CONTAINER,
  SESSION_FORM_SUCCESS_MESSAGE_CONTAINER,
  SESSION_FORM_ADD_CUSTOM_SESSION,
} from '../../constants/data-testid'

const StyledAlert = styled(Alert)`
  overflow-wrap: anywhere;
  margin: auto;
`

const formatResult = (result) =>
  result
    ? `🧗🧗🧗🧗🧗
${result.gym_name} ${result.human_date} ${result.scheduled_time}
🧗🧗🧗🧗🧗
`
    : ''

function SessionList() {
  const [result, setResult] = React.useState(null)
  const { user } = React.useContext(UserContext)
  const sessionContext = React.useContext(SessionContext)
  return (
    <>
      <div>
        <Button
          data-testid={SESSION_FORM_ADD_CUSTOM_SESSION}
          onClick={sessionContext.addCustomSession}
        >
          <AddBoxIcon />
          Custom session
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableCell>Gym</TableCell>
          <TableCell>Day</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Schedule</TableCell>
        </TableHead>
        {sessionContext.sessions.map((session, i) => (
          <TableRow key={i} fullWidth>
            <TableCell>
              {session.gym_name}
            </TableCell>
            <TableCell>
              {(session.human_date || '').replace(/this/, '')}
            </TableCell>
            <TableCell>{session.time}</TableCell>
            <TableCell>
              <Button
                disabled={sessionContext.isProcessing}
                variant="contained"
                type="submit"
                onClick={() => {
                  sessionContext.scheduleSession(session, user).then((res) => {
                    setResult(res)
                  })
                }}
                fullWidth
              >
                <EventAvailableIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan="6">
            {result?.error &&
              sessionContext?.hasSubmitted &&
              !sessionContext.isProcessing && (
                <StyledAlert
                  data-testid={SESSION_FORM_ERROR_MESSAGE_CONTAINER}
                  severity={'error'}
                  fullWidth
                  maxWidth="sm"
                >
                  <AlertTitle>Schedule error</AlertTitle>
                  {`${JSON.stringify(result?.error)}`}
                </StyledAlert>
              )}
            {!result?.error && result?.data &&
              sessionContext?.hasSubmitted &&
              !sessionContext.isProcessing && (
                <StyledAlert
                  data-testid={SESSION_FORM_SUCCESS_MESSAGE_CONTAINER}
                  severity={'success'}
                  action={
                    <Button color="inherit" size="small">
                      <ContentCopyIcon
                        onClick={() => {
                          navigator.clipboard.writeText(
                            formatResult(result?.data)
                          )
                        }}
                      />
                    </Button>
                  }
                >
                  <AlertTitle>Success check your email</AlertTitle>
                  {`${formatResult(result?.data)}`}
                </StyledAlert>
              )}
          </TableCell>
        </TableRow>
      </Table>
    </>
  )
}

export default SessionList
