import io from 'socket.io-client'
import {
  PUSH_TO_REMOTE,
  PUSH_TO_CLIENT,
  EVENT_CONNECTION_INIT,
} from '../constants/socket-channels'

const socketApiUrl = `${process.env.NEXT_PUBLIC_SOCKET_API_URL}`

type SocketChannelConnect = (channelCode: string) => Promise<SocketIO>

type SocketChannelConnectionArgs = {
  channelCode: string
  socketConnect: SocketChannelConnect
}

type SocketChannelConnection = {
  onEvent(handler: SocketHandler): void
  dispatch(data: any): void
}

const connectSocket: SocketChannelConnect = async (channelCode) => {
  await fetch(`${socketApiUrl}/sync-devices?code=${channelCode}`)
  const s = io.connect(`${socketApiUrl}`)

  return new Promise((resolve) => {
    s.on('connect', () => {
      resolve(s)
    })
  })
}

export default async ({
  channelCode,
  socketConnect = connectSocket,
}: SocketChannelConnectionArgs): Promise<SocketChannelConnection> => {
  const socket = await socketConnect(channelCode)
  const listeners: SocketHandler[] = []

  socket.emit(PUSH_TO_REMOTE(channelCode), {
    type: EVENT_CONNECTION_INIT,
  })

  socket.on(PUSH_TO_CLIENT(channelCode), (data) => {
    listeners.forEach((listener) => {
      listener(data)
    })
  })

  return {
    onEvent: (handler: SocketHandler) => {
      listeners.push(handler)
    },
    dispatch: (data: any) => {
      socket.emit(PUSH_TO_REMOTE(channelCode), data)
    },
  }
}
