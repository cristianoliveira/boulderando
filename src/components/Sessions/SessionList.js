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
  Grid,
} from '@mui/material'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import { UserContext } from '../../context/User'
import { SessionContext } from '../../context/Sessions'
import useBookingHistoryContext from '../../context/BookingHistory'
import getNextPossibleDay from '../../modules/weekday'

import {
  SESSION_FORM_ERROR_MESSAGE_CONTAINER,
  SESSION_FORM_SUCCESS_MESSAGE_CONTAINER,
  SESSION_FORM_ADD_CUSTOM_SESSION,
  SESSION_FORM_DELETE_CUSTOM_SESSION,
} from '../../constants/data-testid'

const StyledAlert = styled(Alert)`
  overflow-wrap: anywhere;
  margin: auto;
`

const formatResult = (result) =>
  result
    ? `🧗🧗🧗🧗🧗
${result.gym_name} ${result.day_of_week} ${getNextPossibleDay(result.day_of_week)} ${
        result.scheduled_time
      }
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

export const SESSION_LIST_TABLE_ITEM = 'session_list_table_item';

function SessionList() {
  const [result, setResult] = React.useState(null)
  const { user } = React.useContext(UserContext)
  const sessionContext = React.useContext(SessionContext)
  const bookingHistory = useBookingHistoryContext()

  React.useEffect(() => {
    if (result) {
      bookingHistory.saveBookedSession(result.data)
    }
  }, [result])
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            data-testid={SESSION_FORM_ADD_CUSTOM_SESSION}
            onClick={sessionContext.addCustomSession}
          >
            <AddBoxIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            data-testid={SESSION_FORM_DELETE_CUSTOM_SESSION}
            onClick={sessionContext.deleteCustomSessions}
          >
            <DeleteOutlineIcon />
          </Button>
        </Grid>
      </Grid>
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
                  sessionContext.scheduleSession(session, user).then((res) => {
                    setResult(res)
                  })
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
