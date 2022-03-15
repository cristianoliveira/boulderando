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

import {
  SESSION_FORM_ERROR_MESSAGE_CONTAINER,
  SESSION_FORM_SUCCESS_MESSAGE_CONTAINER,
  SESSION_FORM_ADD_CUSTOM_SESSION
} from '../../constants/data-testid'

const StyledAlert = styled(Alert)`
  overflow-wrap: anywhere;
  margin: auto;
`

function SessionList({
  sessions,
  result,
  error,
  isProcessing,
  hasSubmitted,
  scheduleSession,
  addCustomSession,
}) {
  const resMessage = result
    ? `🧗🧗🧗🧗🧗
${result.gym_name} ${result.human_date} ${result.scheduled_time}
🧗🧗🧗🧗🧗
`
    : ''

  return (
    <>
      <div>
        <Button data-testid={SESSION_FORM_ADD_CUSTOM_SESSION} onClick={addCustomSession}>
          <AddBoxIcon />
          Custom session
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableCell>Gym</TableCell>
          <TableCell>Day</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Actions</TableCell>
        </TableHead>
        {sessions.map((session, i) => (
          <TableRow key={i} fullWidth>
            <TableCell>
              <Typography variant="h6" color="text.secondary" align="left">
                {session.gym_name}
              </Typography>
            </TableCell>
            <TableCell>
              {(session.human_date || '').replace(/this/, '')}
            </TableCell>
            <TableCell>{session.time}</TableCell>
            <TableCell>
              <Button
                disabled={isProcessing}
                variant="contained"
                type="submit"
                onClick={() => {
                  scheduleSession(session)
                }}
                fullWidth
              >
                Schedule
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan="6">
            {error && hasSubmitted && !isProcessing && (
              <StyledAlert
                data-testid={SESSION_FORM_ERROR_MESSAGE_CONTAINER}
                severity={'error'}
                fullWidth
                maxWidth="sm"
              >
                <AlertTitle>Schedule error</AlertTitle>
                {error}
              </StyledAlert>
            )}
            {result && hasSubmitted && !isProcessing && (
              <StyledAlert
                data-testid={SESSION_FORM_SUCCESS_MESSAGE_CONTAINER}
                severity={'success'}
                action={
                  <Button color="inherit" size="small">
                    <ContentCopyIcon
                      onClick={() => {
                        navigator.clipboard.writeText(resMessage)
                      }}
                    />
                  </Button>
                }
              >
                <AlertTitle>Success check your email</AlertTitle>
                {`${resMessage}`}
              </StyledAlert>
            )}
          </TableCell>
        </TableRow>
      </Table>
    </>
  )
}

export default SessionList
