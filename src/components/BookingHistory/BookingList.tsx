import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  Button,
  TableCellProps,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import shareableMessageFormat from '../../modules/shareable-message-format'
import {
BOOKING_HISTORY_LIST_ITEM,
BOOKING_HISTORY_DELETE_BTN,
} from './data-testid'

const TbCell = (props: TableCellProps): JSX.Element => (
  <TableCell
    sx={{
      padding: '8px',
    }}
    {...props}
  />
)

function BookingHistoryList({
  bookingHistory,
  deleteBookedSession,
}: Pick<
  BookingHistoryContext,
  'bookingHistory' | 'deleteBookedSession'
>): JSX.Element {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TbCell>Gym</TbCell>
          <TbCell>Date</TbCell>
          <TbCell>Time</TbCell>
          <TbCell>Created At</TbCell>
          <TbCell align="right">Copy</TbCell>
          <TbCell align="right">Delete</TbCell>
        </TableHead>
        {bookingHistory?.map((session: Booking, i: number) => (
          <TableRow data-testid={BOOKING_HISTORY_LIST_ITEM} key={i}>
            <TbCell>{session.gym_name}</TbCell>
            <TbCell>
              {(session.human_date || '').replace(/this/, '')}-
              {session.booking_date}
            </TbCell>
            <TbCell>{session.time}</TbCell>
            <TbCell>{session.created_at}</TbCell>
            <TbCell align="right">
              <Button color="inherit" size="small">
                <ContentCopyIcon
                  onClick={() => {
                    navigator.clipboard.writeText(
                      shareableMessageFormat(session)
                    )
                  }}
                />
              </Button>
            </TbCell>
            <TbCell align="right">
              <Button
                data-testid={BOOKING_HISTORY_DELETE_BTN}
                color="inherit"
                size="small"
              >
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

export default BookingHistoryList
