import {
  Table,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'

import getNextPossibleDay from '../../modules/weekday';

import useBookingHistoryContext from '../../context/BookingHistory'

function BookingList() {
  const { bookingHistory } = useBookingHistoryContext();
  return (
    <>
      <Table>
        <TableHead>
          <TableCell>Gym</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Created At</TableCell>
        </TableHead>
        {bookingHistory.map((session, i) => (
          <TableRow key={i} fullWidth>
            <TableCell>
              {session.gym_name}
            </TableCell>
            <TableCell>
              {(session.human_date || '').replace(/this/, '')}
              -
              {getNextPossibleDay((session.human_date || '').replace(/this /, ''))}
            </TableCell>
            <TableCell>{session.time}</TableCell>
            <TableCell>
              {session.created_at}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default BookingList
