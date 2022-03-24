import React from 'react'
import styled from '@emotion/styled'
import {
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

import { UserContext } from '../../context/User'
import useSessionContext from '../../context/Sessions'
import useBookingHistoryContext from '../../context/BookingHistory'
import getNextPossibleDay from '../../modules/weekday'

import {
  SESSION_FORM_ERROR_MESSAGE_CONTAINER,
  SESSION_FORM_SUCCESS_MESSAGE_CONTAINER,
} from '../../constants/data-testid'

const StyledAlert = styled(Alert)`
  overflow-wrap: anywhere;
  margin: auto;
`

const formatResult = (result) =>
  result
    ? `🧗🧗🧗🧗🧗
${result.gym_name} ${result.day_of_week} ${getNextPossibleDay(
        result.day_of_week
      )} ${result.scheduled_time}
🧗🧗🧗🧗🧗
`
    : ''

const TbCell = (props) => (
  <TableCell
    sx={{
      padding: '8px',
    }}
    {...props}
  />
)

export const SESSION_LIST_TABLE_ITEM = 'session_list_table_item'

function SessionList() {
  const [result, setResult] = React.useState(null)
  const { user } = React.useContext(UserContext)
  const sessionContext = useSessionContext()
  const bookingHistory = useBookingHistoryContext()

  React.useEffect(() => {
    if (result?.data) {
      bookingHistory.saveBookedSession(result.data)
    }
  }, [result])
  return (
    <>
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
          <TableRow data-testid={SESSION_LIST_TABLE_ITEM} key={i}>
            <TbCell>{session.gym_name}</TbCell>
            <TbCell>
              {session.day_of_week}-{getNextPossibleDay(session.day_of_week)}
            </TbCell>
            <TbCell>{session.time}</TbCell>
            <TbCell>
              <Button
                disabled={sessionContext.isProcessing}
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
