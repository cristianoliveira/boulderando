import React from 'react'
import styled from '@emotion/styled'
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import getNextPossibleDay from '../../modules/weekday'
import shareableMessageFormat from '../../modules/shareable-message-format'

import {
  SESSION_FORM_ERROR_MESSAGE_CONTAINER,
  SESSION_FORM_SUCCESS_MESSAGE_CONTAINER,
} from '../../constants/data-testid'

const StyledAlert = styled(Alert)`
  overflow-wrap: anywhere;
  margin: auto;
`

const TbCell = (props) => (
  <TableCell
    sx={{
      padding: '8px',
    }}
    {...props}
  />
)

export const SESSION_LIST_TABLE_ITEM = 'session_list_table_item'

function SessionList({ sessionContext, bookingHistory, user }) {
  const [result, setResult] = React.useState(null)

  React.useEffect(() => {
    if (result?.data) {
      bookingHistory.saveBookedSession(result.data)
    }
  }, [result])
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TbCell>Gym</TbCell>
            <TbCell>Day</TbCell>
            <TbCell>Time</TbCell>
            <TbCell>Schedule</TbCell>
          </TableRow>
        </TableHead>
        {sessionContext.sessions.map((session, i) => (
          <TableRow
            data-testid={SESSION_LIST_TABLE_ITEM}
            key={i}
            sx={{
              color: bookingHistory.hasBookedSession(
                session.gym_name,
                getNextPossibleDay(session.day_of_week)
              )
                ? 'gray'
                : 'green',
            }}
          >
            <TbCell>{session.gym_name}</TbCell>
            <TbCell>
              {session.day_of_week}-{getNextPossibleDay(session.day_of_week)}
            </TbCell>
            <TbCell>{session.time}</TbCell>
            <TbCell>
              <Button
                disabled={
                  sessionContext.isProcessing ||
                  bookingHistory.hasBookedSession(
                    session.gym_name,
                    getNextPossibleDay(session.day_of_week)
                  )
                }
                variant="contained"
                type="submit"
                onClick={() => {
                  sessionContext.scheduleSession(session, user).then(setResult)
                }}
              >
                <EventAvailableIcon />
              </Button>
            </TbCell>
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
                  maxWidth="sm"
                >
                  <AlertTitle>Schedule error</AlertTitle>
                  {`${JSON.stringify(result?.error)}`}
                </StyledAlert>
              )}
            {result?.data &&
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
                            shareableMessageFormat(result?.data)
                          )
                        }}
                      />
                    </Button>
                  }
                >
                  <AlertTitle>Success check your email</AlertTitle>
                  {`${shareableMessageFormat(result?.data)}`}
                </StyledAlert>
              )}
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  )
}

export default SessionList
