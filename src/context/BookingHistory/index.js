import { createContext, useContext } from 'react'
import dayjs from 'dayjs'
import getNextPossibleDay from '../../modules/weekday'

import useStorage from '../../hooks/useStorage'

export const BookingHistoryContext = createContext()

export const BookingConsumer = BookingHistoryContext.Consumer

export function BookingHistoryProvider({ children }) {
  const [bookingHistory, setBookingHistory] = useStorage('booking-history', [])

  const saveBookedSession = (session) => {
    const history = {
      ...session,
      booking_date: getNextPossibleDay(session.day_of_week),
      created_at: dayjs().format('DD/MM/YYYY'),
    };
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

export default () => useContext(BookingHistoryContext)
