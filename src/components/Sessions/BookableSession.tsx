import React from 'react'
import { TableCell, TableCellProps, TableRow, Button } from '@mui/material'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

import getNextPossibleDay from '../../modules/weekday'

import { SESSION_LIST_TABLE_ITEM } from './data-testid'

const TbCell = (props: TableCellProps) => (
  <TableCell
    sx={{
      padding: '8px',
    }}
    {...props}
  />
)

type BookableSessionProps = {
  session: Session
  hasBeenBooked: boolean
  isProcessing: boolean
  onBookingSubmit(sessions: Session): void
}

const BookableSession: React.FC<BookableSessionProps> = ({
  session,
  hasBeenBooked,
  isProcessing,
  onBookingSubmit,
}) => (
  <TableRow
    data-testid={SESSION_LIST_TABLE_ITEM}
    sx={{
      color: hasBeenBooked ? 'gray' : 'green',
    }}
  >
    <TbCell>{session.gym_name}</TbCell>
    <TbCell>
      {session.day_of_week}-{getNextPossibleDay(session.day_of_week)}
    </TbCell>
    <TbCell>{session.time}</TbCell>
    <TbCell align={'right'}>
      <Button
        disabled={isProcessing || hasBeenBooked}
        variant="contained"
        type="submit"
        onClick={() => onBookingSubmit(session)}
      >
        <EventAvailableIcon />
      </Button>
    </TbCell>
  </TableRow>
)

export default BookableSession
