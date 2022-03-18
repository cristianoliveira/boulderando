import { createContext, useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'

import * as storage from '../../storage/local'

export const BookingHistoryContext = createContext()

export const BookingConsumer = BookingHistoryContext.Consumer

export function BookingHistoryProvider({ children }) {
  const [bookingHistory, setBookingHistory] = useState(
    storage.get('booking-history') || []
  )

  const saveBookedSession = (session) => {
    const history = storage.push('booking-history', {
      ...session,
      created_at: dayjs().format('DD/MM/YYYY'),
    })
    setBookingHistory(history)
  }

  return (
    <BookingHistoryContext.Provider
      value={{ bookingHistory, saveBookedSession }}
    >
      {children}
    </BookingHistoryContext.Provider>
  )
}

export default () => {
  return useContext(BookingHistoryContext)
}
