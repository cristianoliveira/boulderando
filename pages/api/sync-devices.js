import { Server } from 'socket.io'

import {
  PUSH_TO_REMOTE,
  PUSH_TO_CLIENT,
} from '../../src/constants/socket-channels'

const connectDevices = (io, socket, code) => {
  if (!code) {
    return
  }

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
    const io = new Server(res.socket.server, { path: '/api/sync-devices' })
    res.socket.server.io = io
  }

  res.send('socket')
}
