import React from 'react'
import { render, act, waitFor } from '@testing-library/react'

import useSessionContext, { SessionProvider } from '.'

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe('SessionProvider', () => {
  it('provides the booking history context functions and data', async () => {
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

    const session = {
      day_of_week: 'monday',
      gym_name: 'basement',
      scheduled_time: '10:00 - 12:00',
      time: '0',
      human_date: 'monday',
      booking_date: '06/01/2020',
      created_at: '01/01/2020',
    }

    const stubedData = { message: 'Success' }
    const api = {
      postSessionSchedule: jest.fn().mockResolvedValue({ data: stubedData }),
      getSessions: jest.fn().mockResolvedValue([session]),
    }

    let context: SessionContext | any = {}
    const StubComponent = () => {
      context = useSessionContext()
      return <div>Stubed</div>
    }

    const props = { api, children: <StubComponent /> }

    render(<SessionProvider {...props} />)

    await waitFor(() => expect(props.api.getSessions).toHaveBeenCalled())
    expect(context.sessions).toHaveLength(1)

    act(() =>
      context.saveCustomSession({ ...session, day_of_week: 'friday' })
    )

    expect(context.sessions).toHaveLength(2)

    act(() => {
      context.deleteCustomSessions()
    })
    expect(context.sessions).toHaveLength(0)

    await act(() =>
      context.scheduleSession(session, user).then(({ data }: ApiResponse) => {
        expect(data).toEqual({ ...stubedData, ...session })
      })
    )
    expect(props.api.postSessionSchedule).toHaveBeenCalled()
  })
})
