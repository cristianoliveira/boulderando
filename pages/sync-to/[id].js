import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button } from '@mui/material'

import useSocketChannel from '../../src/hooks/useSocketChannel'

import { get } from '../../src/storage/local'
import * as ITEMS from '../../src/storage/items'

const storageItems = Object.keys(ITEMS)
  .map((k) => ({ [ITEMS[k]]: get(ITEMS[k]) }))
  .reduce((c, a) => ({ ...a, ...c }), {})

const Connect = () => {
  const [isDone, setIsDone] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const code = 'remote-id'

  const channel = useSocketChannel({ channelCode: id })
  useEffect(() => {
    if (!channel) {
      return;
    }

    channel.dispatch({ type: 'connect-device', code })
    channel.onEvent(({ type }) => {
      if (type === 'done') {
        setIsDone(true)
      }
    })
    // eslint-disable-next-line
  }, [channel])

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
            You are about to push this device app data to the connected device
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {channel && (
            <Button
              color="secondary"
              size="big"
              onClick={() => {
                channel.dispatch({
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
            {isDone && 'Sync is completed'}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Connect
