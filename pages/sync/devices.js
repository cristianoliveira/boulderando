import { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import QRCode from 'react-qr-code'
import io from 'socket.io-client'

import { save } from '../../src/storage/local'
import {
  PUSH_TO_CLIENT,
  PUSH_TO_REMOTE,
} from '../../src/constants/socket-channels'

export const SYNC_DEVICE_CODE = 'synch_device_code'
export const SYNC_DEVICE_URL = 'synch_device_url'

let socket
const generatedCode = (Math.random() + 1).toString(36).substring(7)
export default function Devices() {
  const [connectedDevice, setConnectedDevice] = useState('')
  const [socketIntance, setSocketIntance] = useState(null)
  const [isSynching, setIsSynching] = useState(false)
  const urlToConnect = `${window.location.origin}/sync-to/${generatedCode}`

  const socketInitializer = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_SOCKET_API_URL}/sync-devices?code=${generatedCode}`)
    socket = socket || io.connect(`${process.env.NEXT_PUBLIC_SOCKET_API_URL}`)
    // socket = io()

    socket.on('connect', () => {
      setSocketIntance(socket)
    })
  }

  useEffect(() => {
    if (!socketIntance) {
      socketInitializer()
      return
    }

    socketIntance.on(PUSH_TO_CLIENT(generatedCode), ({ code, sync }) => {
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

        setInterval(() => {
          socketIntance.emit(PUSH_TO_REMOTE(generatedCode), { type: 'done' })
          window.location.replace('/sessions')
        }, 1000)
      }
    })
    // eslint-disable-next-line
  }, [socketIntance])
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
      >
        <Grid>
          <Typography variant="h4" color="text.primary" align="center">
            Synching devices
          </Typography>
        </Grid>
        <Grid style={{ minWidth: '300px' }} spacing={3}>
          <Typography
            data-testid={SYNC_DEVICE_CODE}
            variant="h4"
            color="success"
            align="center"
          >
            {generatedCode}
          </Typography>
        </Grid>
        {isSynching && (
          <Grid>
            {isSynching && (
              <Typography
                variant="subtitle1"
                color="text.primary"
                align="center"
              >
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
        <Typography variant="body1" color="text.primary" align="center">
          Use the URL below on the device you want to pull data from
        </Typography>
        <Grid item xs={3}>
          <QRCode value={urlToConnect} />
        </Grid>
        <Grid item xs={3}>
          <Typography
            data-testid={SYNC_DEVICE_URL}
            color="text.primary"
            align="center"
          >
            {urlToConnect}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
