import { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import QRCode from 'react-qr-code'
import io from 'socket.io-client'

import { save, get } from '../../src/storage/local'
import { PUSH_TO_CLIENT } from '../../src/constants/socket-channels'

let socket
export default function Devices() {
  const [connectedDevice, setConnectedDevice] = useState('')
  const [socketIntance, setSocketIntance] = useState(null)
  const [isSynching, setIsSynching] = useState(false)
  const code = 'device-id'
  const urlToConnect = `${window.location.origin}/sync/${code}`

  const socketInitializer = async () => {
    await fetch('/api/sync-devices')
    socket = io()

    socket.on('connect', () => {
      setSocketIntance(socket)
    })
  }

  useEffect(() => socketInitializer(), [])
  useEffect(() => {
    if (!socketIntance) {
      return
    }

    socketIntance.on(PUSH_TO_CLIENT(code), ({ code, sync }) => {
      if (code) {
        setConnectedDevice(code)
      }

      if (sync) {
        setIsSynching(true)
        Object.keys(sync).forEach((key) => {
          const data = sync[key]
          if (data) {
            save(key, data)
          }
        })

        Object.keys(sync).forEach((key) => {
          const data = get(key)
          if (data) {
            // eslint-disable-next-line
            console.debug('item synched:', key)
          }
        })

        setInterval(() => {
          window.location.replace('/')
        }, 1000)
      }
    })
    // eslint-disable-next-line
  }, [socketIntance])
  return (
    <Container>
      <Typography variant="h5" color="text.primary" align="center">
        Sync devices
      </Typography>

      {isSynching && (
        <Grid>
          {isSynching && (
            <Typography variant="h5" color="text.primary" align="center">
              Synching... You are going to be redirected.
            </Typography>
          )}
        </Grid>
      )}
      <Grid>
        {connectedDevice && (
          <Typography variant="h5" color="text.primary" align="center">
            Connected with {connectedDevice}
          </Typography>
        )}
      </Grid>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Typography variant="h5" color="text.primary" align="center">
            Enter in {urlToConnect}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <QRCode value={urlToConnect} />
        </Grid>
      </Grid>
    </Container>
  )
}
