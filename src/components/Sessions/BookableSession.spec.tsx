import React from 'react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

import BookableSession from './BookableSession'

const session = {
  gym_name: 'basement',
  day_of_week: 'saturday',
  scheduled_time: 'saturday',
  time: '10:30 - 12:30',
}

describe('Form', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <BookableSession
            isProcessing={false}
            hasBeenBooked={false}
            session={session}
            onBookingSubmit={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
