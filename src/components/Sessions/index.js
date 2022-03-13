import React from 'react'
import { SessionProvider, SessionConsumer } from '../../context/Sessions'
import SessionList from './SessionList'

function Session() {
  return (
    <SessionProvider>
      <SessionConsumer>
        {({ sessions }) => <SessionList sessions={sessions} />}
      </SessionConsumer>
    </SessionProvider>
  )
}

export default Session
