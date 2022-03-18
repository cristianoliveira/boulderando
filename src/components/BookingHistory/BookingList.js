import { Table, TableRow, TableCell, TableHead } from '@mui/material'

import getNextPossibleDay from '../../modules/weekday'

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
          <TbCell>Result</TbCell>
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
            <TbCell>{session.error ? 'failed' : 'success'}</TbCell>
            <TbCell>{session.data?.gym_name}</TbCell>
            <TbCell>
              {(session.data?.human_date || '').replace(/this/, '')}-
              {getNextPossibleDay(
                (session.data?.human_date || '').replace(/this /, '')
              )}
            </TbCell>
            <TbCell>{session.data?.time}</TbCell>
            <TbCell>{session.created_at}</TbCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}

export default BookingList
