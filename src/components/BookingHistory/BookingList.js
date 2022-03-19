import { Table, TableRow, TableCell, TableHead } from '@mui/material'

import useBookingHistoryContext from '../../context/BookingHistory'

const TbCell = (props) => (
  <TableCell
    sx={{
      padding: '8px',
    }}
    {...props}
  />
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
        </TableHead>
        {bookingHistory.map((session, i) => (
          <TableRow
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
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default BookingList
