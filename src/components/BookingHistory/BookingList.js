import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { Table, TableRow, TableCell, TableHead, Button } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

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

dayjs.extend(customParseFormat)
const sortByBookingDate = (sessions) =>
  sessions.filter(s => s.booking_date).sort(
    (a, b) =>
      dayjs(b.booking_date, 'DD/MM/YYYY').toDate() -
      dayjs(a.booking_date, 'DD/MM/YYYY').toDate()
  )

function BookingList() {
  const { bookingHistory } = useBookingHistoryContext()
  return (
    <>
      <Table>
        <TableHead>
          <TbCell>Gym</TbCell>
          <TbCell>Date</TbCell>
          <TbCell>Time</TbCell>
          <TbCell>Created At</TbCell>
          <TbCell>Copy</TbCell>
        </TableHead>
        {sortByBookingDate(bookingHistory).map((session, i) => (
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
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default BookingList
