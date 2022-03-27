import express from 'express'


import http from 'http'
import { Server } from 'socket.io'

import cors from 'cors'
import { PUSH_TO_REMOTE, PUSH_TO_CLIENT } from './channels'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 4444

const emitTo = (deviceCode) => (data) =>
  io.emit(PUSH_TO_CLIENT(deviceCode), data)

const connectDevices = (deviceCode) => (socket) =>
  socket.on(PUSH_TO_REMOTE(deviceCode), emitTo(deviceCode))

app.use(cors())
app.get('/', (req, res) => {
  res.send('Boulderando socket api')
})

app.get('/sync-devices', (req, res) => {
  const { code } = req.query
  if (!code) {
    return
  }
  io.on('connection', connectDevices(code))
  res.end()
})

server.listen(port, () => {
  // eslint-disable-next-line
  console.log('listening on:', port)
})
