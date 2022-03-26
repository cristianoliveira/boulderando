import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Container, Grid, Typography, Button } from '@mui/material'

import { PUSH_TO_REMOTE, PUSH_TO_CLIENT } from '../../src/constants/socket-channels'

import { get } from '../../src/storage/local'
import * as ITEMS from '../../src/storage/items'

const storageItems = Object.keys(ITEMS)
  .map((k) => ({ [ITEMS[k]]: get(ITEMS[k]) }))
  .reduce((c, a) => ({ ...a, ...c }), {})

const Connect = () => {
  const [socketInstance, setSocket] = useState(null)
  const [isDone, setIsDone] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const code = 'remote-id'

  let socket
  const socketInitializer = async () => {
    await fetch(`/api/sync-devices?code=${id}`)
    socket = socket || io()

    socket.on('connect', () => {
      setSocket(socket)
    })
  }

  // eslint-disable-next-line
  useEffect(() => {
    if (!socketInstance) {
      socketInitializer()
      return
    }

    socketInstance.emit(PUSH_TO_REMOTE(id), { type: 'connect-device', code })
    socketInstance.on(PUSH_TO_CLIENT(id), ({ type }) => {
      if (type === 'done') {
        setIsDone(true)
      }
    })
    // eslint-disable-next-line
  }, [socketInstance])

  return (
    <Container>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >
        <Grid item xs={1}>
          <Typography variant="h5" color="text.primary" align="center">
            Sync devices data
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            You are about to push this device app data to the connected
    device
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {socketInstance && (
            <Button
              color="secondary"
              size="big"
              onClick={() => {
                socketInstance.emit(PUSH_TO_REMOTE(id), {
                  type: 'sync-data',
                  code,
                  sync: storageItems,
                })
              }}
            >
              Push data
            </Button>
          )}
        </Grid>
        <Grid item xs={1}>
          <Typography variant="subtitle1" color="text.secondary" align="center">
            {isDone && "Sync is completed"}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Connect
