import React from 'react'
import { SessionProvider, SessionConsumer } from '../../context/Sessions'
import SessionList from './SessionList'

function Session({ user }) {
  return (
    <SessionProvider user={user}>
      <SessionConsumer>
        {(context) => (
          <SessionList {...context} />
        )}
      </SessionConsumer>
    </SessionProvider>
  )
}

export default Session
