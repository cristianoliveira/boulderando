import { TableContainer, Table, TableRow, TableCell, TableHead, Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import useBookingHistoryContext from '../../context/BookingHistory'

const TbCell = (props) => (
  <TableCell
    sx={{
      padding: '8px',
    }}
    {...props}
  />
)

const formatSession = (result) =>
  result
    ? `🧗🧗🧗🧗🧗
${result.gym_name} ${result.day_of_week} ${result.booking_date} ${result.scheduled_time}
🧗🧗🧗🧗🧗
`
    : ''

export const BOOKING_HISTORY_LIST_ITEM = 'booking_history_list_item'
export const BOOKING_HISTORY_DELETE_BTN = 'booking_history_delete_btn';

function BookingList() {
  const { bookingHistory, deleteBookedSession } = useBookingHistoryContext()
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TbCell>Gym</TbCell>
          <TbCell>Date</TbCell>
          <TbCell>Time</TbCell>
          <TbCell>Created At</TbCell>
          <TbCell>Copy</TbCell>
          <TbCell>Delete</TbCell>
        </TableHead>
        {bookingHistory.map((session, i) => (
          <TableRow
            data-testid={BOOKING_HISTORY_LIST_ITEM}
            key={i}
            sx={{
              color: session.error ? 'red' : 'green',
            }}
            fullWidth
          >
            <TbCell>{session.gym_name}</TbCell>
            <TbCell>
              {(session.human_date || '').replace(/this/, '')}-
              {session.booking_date}
            </TbCell>
            <TbCell>{session.time}</TbCell>
            <TbCell>{session.created_at}</TbCell>
            <TbCell>
              <Button color="inherit" size="small">
                <ContentCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(formatSession(session))
                  }}
                />
              </Button>
            </TbCell>
            <TbCell>
              <Button data-testid={BOOKING_HISTORY_DELETE_BTN} color="inherit" size="small">
                <DeleteOutlineIcon
                  onClick={() => {
                    deleteBookedSession(session)
                  }}
                />
              </Button>
            </TbCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  )
}

export default BookingList
