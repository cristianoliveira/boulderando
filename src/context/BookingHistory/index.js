import { createContext, useContext } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import getNextPossibleDay from '../../modules/weekday'

import useListStorage from '../../hooks/useListStorage'
import { BOOKING_HISTORY } from '../../storage/items';

export const BookingHistoryContext = createContext()

export const BookingConsumer = BookingHistoryContext.Consumer


dayjs.extend(customParseFormat)
const sortByBookingDate = (sessions) =>
  sessions.filter(s => s.booking_date).sort(
    (a, b) =>
      dayjs(b.booking_date, 'DD/MM/YYYY').toDate() -
      dayjs(a.booking_date, 'DD/MM/YYYY').toDate()
  )

export function BookingHistoryProvider({ children }) {
  const [bookingHistory, setBookingHistory] = useListStorage(BOOKING_HISTORY, [])

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
      value={{ bookingHistory: sortByBookingDate(bookingHistory), saveBookedSession }}
    >
      {children}
    </BookingHistoryContext.Provider>
  )
}

export default () => useContext(BookingHistoryContext)
