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

import getNextPossibleDay from '../../modules/weekday';
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AddBoxIcon from '@mui/icons-material/AddBox'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import useBookingHistoryContext from '../../context/BookingHistory'

const StyledAlert = styled(Alert)`
  overflow-wrap: anywhere;
  margin: auto;
`

function BookingList() {

  const { bookingHistory } = useBookingHistoryContext();
  console.log('@@@@@@ bookingHistory: ', bookingHistory);
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
