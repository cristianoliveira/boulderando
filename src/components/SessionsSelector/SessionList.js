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

function SessionList({ sessions, result, error, isProcessing, hasSubmitted, scheduleSession }) {
  return (
    <Table>
      <TableHead>
        <TableCell>Gym</TableCell>
        <TableCell>Day</TableCell>
        <TableCell>Time</TableCell>
        <TableCell>Actions</TableCell>
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
              disabled={isProcessing}
              variant="contained"
              type="submit"
              onClick={() => {
                scheduleSession(session)
              }}
              fullWidth
            >
              Schedule
            </Button>
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan="6">
          {error && hasSubmitted && !isProcessing && (
            <Alert severity={'error'}>
              <AlertTitle>Schedule result</AlertTitle>
              {error}
            </Alert>
          )}
          {result && hasSubmitted && !isProcessing && (
            <Alert severity={'success'}>
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
