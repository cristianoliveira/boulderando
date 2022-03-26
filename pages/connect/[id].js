import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Container, Grid, Typography, Button } from '@mui/material'

import { PUSH_TO_REMOTE } from '../../src/constants/socket-channels'

import { get } from '../../src/storage/local'
import * as ITEMS from '../../src/storage/items'

const storageItems = Object.keys(ITEMS)
  .map((k) => ({ [ITEMS[k]]: get(ITEMS[k]) }))
  .reduce((c, a) => ({ ...a, ...c }), {})

const Connect = () => {
  const [socketInstance, setSocket] = useState(false)
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

  useEffect(() => {
    if (!id) {
      return
    }
    socketInitializer()
  }, [id])

  useEffect(() => {
    if (!socketInstance || !id) {
      return null
    }
    socketInstance.emit(PUSH_TO_REMOTE(id), { type: 'connect-device', code })
  }, [socketInstance, id])

  return (
    <Container>
      <Typography variant="h5" color="text.primary" align="center">
        Sync devices
      </Typography>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >
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
              Sync
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Connect
