import React from 'react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

import IndexPage from '.'

describe('Form', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <IndexPage setPageTitle={jest.fn()} />
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
