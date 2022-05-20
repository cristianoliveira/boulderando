import React from 'react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

import Form from './Form'

describe('Form', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <Form onSubmit={jest.fn()} />
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
