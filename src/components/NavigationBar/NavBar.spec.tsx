import React from 'react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

/* eslint-disable */
import { UserProvider } from '../../../src/context/User'
import { SessionProvider } from '../../../src/context/Sessions'
/* eslint-enable */

import NavBar from './NavBar'

describe('NavBar', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <UserProvider api={undefined as any}>
            <SessionProvider api={undefined as any}>
              <NavBar pageTitle="MyPaget Title" />
            </SessionProvider>
          </UserProvider>
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
