import { useState, useEffect } from 'react'

import socketChannelConnection from '../modules/socket-channel-connection'

export default ({ channelCode }) => {
  const [socket, setSocket] = useState(null)

  socketChannelConnection(channelCode).then(setSocket)

  return socket;
}
