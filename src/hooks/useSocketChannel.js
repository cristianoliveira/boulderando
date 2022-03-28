import { useState, useEffect } from 'react'
import io from 'socket.io-client'

import {
  PUSH_TO_REMOTE,
  PUSH_TO_CLIENT,
  EVENT_CONNECTION_INIT,
} from '../constants/socket-channels'

const socketApiUrl = `${process.env.NEXT_PUBLIC_SOCKET_API_URL}`

export default ({ channelCode, apiUrl = socketApiUrl }) => {
  const [socket, setSocket] = useState(null)

  const connectSocket = async () => {
    await fetch(`${apiUrl}/sync-devices?code=${channelCode}`)
    const s = socket || io.connect(`${apiUrl}`)

    return new Promise((resolve) => {
      s.on('connect', () => {
        resolve(s)
      })
    })
  }

  const listeners = []
  const dispatcher = (data) => {
    socket.emit(PUSH_TO_REMOTE(channelCode), data)
  }

  useEffect(() => {
    if (!socket) {
      connectSocket().then(setSocket)
      return
    }

    socket.emit(PUSH_TO_REMOTE(channelCode), {
      type: EVENT_CONNECTION_INIT,
    })

    socket.on(PUSH_TO_CLIENT(channelCode), (data) => {
      listeners.forEach((listener) => {
        listener(data)
      })
    })
  }, [socket])

  if (!socket) {
    return null
  }

  return {
    onEvent: (handler) => listeners.push(handler),
    dispatch: (data) => dispatcher(data),
    socket,
  }
}
