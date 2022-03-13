import React from 'react'
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

function SessionList({ sessions, result, isFailed }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Gym</TableCell>
          <TableCell>Day</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      {sessions.map((session, i) => (
        <TableRow key={i} fullWidth>
          <TableCell>
            <Typography variant="h6" color="text.secondary" align="left">
              {session.gym_name}
            </Typography>
          </TableCell>
          <TableCell>
            {(session.human_date || '').replace(/this/, '')}
          </TableCell>
          <TableCell>{session.time}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                console.log('@@@@@@ scheduling: ', session)
              }}
              fullWidth
            >
              Schedule
            </Button>
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell>
          {result && (
            <Alert severity={isFailed ? 'error' : 'success'}>
              <AlertTitle>Schedule result</AlertTitle>
              {result}
            </Alert>
          )}
        </TableCell>
      </TableRow>
    </Table>
  )
}

export default SessionList
