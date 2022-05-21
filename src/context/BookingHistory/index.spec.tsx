import React from 'react'
import { render, act, waitFor } from '@testing-library/react'

import useBookingHistoryContext, { BookingHistoryProvider } from '.'

describe('BookingHistoryProvider', () => {
  const defaultProps = {}

  it('provides the booking history context functions and data', () => {
    let context: BookingHistoryContext | any = {}
    const StubComponent = () => {
      context = useBookingHistoryContext()
      return <div>Stubed</div>
    }

    const props = { ...defaultProps, children: <StubComponent /> }

    render(<BookingHistoryProvider {...props} />)

    expect(context).toEqual(expect.objectContaining({ bookingHistory: [] }))

    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
    const session = {
      day_of_week: 'monday',
      gym_name: 'basement',
      scheduled_time: '10:00 - 12:00',
      time: '0',
      human_date: 'monday',
      booking_date: '06/01/2020',
      created_at: '01/01/2020',
    }

    waitFor(() => expect(context.bookingHistory).not.toBeUndefined())
    act(() => {
      context.saveBookedSession(session)
    })

    expect(context).toEqual(
      expect.objectContaining({ bookingHistory: [session] })
    )

    expect(
      context.hasBookedSession(session.gym_name, session.booking_date)
    ).toBeTruthy()

    act(() => {
      context?.deleteBookedSession(session)
    })

    expect(context).toEqual(expect.objectContaining({ bookingHistory: [] }))
  })
})
