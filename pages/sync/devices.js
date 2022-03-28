import { useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@mui/material'
import QRCode from 'react-qr-code'

import { save } from '../../src/storage/local'
import useSocketChannel from '../../src/hooks/useSocketChannel'
import { EVENT_DEVICE_CONNECTED } from '../../src/constants/socket-channels'

export const SYNC_DEVICE_CODE = 'synch_device_code'
export const SYNC_DEVICE_URL = 'synch_device_url'

const generatedCode = (Math.random() + 1).toString(36).substring(7)
export default function Devices() {
  const [isConnectedDevice, setConnectedDevice] = useState(false)

  const [isSynching, setIsSynching] = useState(false)
  const urlToConnect = `${window.location.origin}/sync-to/${generatedCode}`

  const channel = useSocketChannel({
    channelCode: generatedCode,
  })
  useEffect(() => {
    if (!channel) {
      return
    }

    channel.onEvent(({ type, sync }) => {
      if (type === EVENT_DEVICE_CONNECTED) {
        setConnectedDevice(true)
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
          channel.dispatch({ type: 'done' })
          window.location.replace('/sessions')
        }, 1000)
      }
    })
  }, [channel])

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
          {isConnectedDevice && (
            <Typography variant="h5" color="text.primary" align="center">
              Connected with remote device
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
