import React from 'react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

import { SessionProvider } from '../src/context/Sessions'
import { UserProvider } from '../src/context/User'
import IndexPage from './index.page'

describe('Form', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <UserProvider api={{} as any}>
            <SessionProvider api={{} as any}>
              <IndexPage setPageTitle={jest.fn()} />
            </SessionProvider>
          </UserProvider>
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
