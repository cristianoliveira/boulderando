import React from 'react'
import { act } from '@testing-library/react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

import Form from './Form'

const user = {
  name: 'John',
  last_name: 'Doe',
  birthday: '1969-04-20',
  address: 'Mein Str, 22b',
  postal_code: '00000',
  city: 'Berlin',
  phone_number: '000000000000',
  email: 'my@gmail.com',
  usc_number: '000000000',
  type: 'Urban Sports Club',
  telegram_id: '111111',
}

describe('Form', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <Form user={user} telegramIdParam="123123" onSubmit={jest.fn()} />
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
