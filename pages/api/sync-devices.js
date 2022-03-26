import { Server } from 'socket.io'

import {
  PUSH_TO_CLIENT,
  PUSH_TO_REMOTE,
} from '../../src/constants/socket-channels'

// First device access /api/sync-devices
// Second device access /api/sync-devices?code=foo
//
// First device receive message (connect-requested)
// First device accept or not the connection by {code}
// Second device receive a confirmation of connection (or not)
const connectDevices = (io, socket, code) => {
  if (!code) {
    return
  }

  console.debug('Connecting to device', code)
  socket.on(PUSH_TO_REMOTE(code), (data) => {
    io.emit(PUSH_TO_CLIENT(code), data)
  })
}

export default function handler(req, res) {
  const { code } = req.query
  if (res.socket.server.io) {
    const { io } = res.socket.server
    io.on('connection', (socket) => {
      connectDevices(io, socket, code)
    })
  } else {
    const io = new Server(res.socket.server)
    res.socket.server.io = io
  }
  res.end()
}
