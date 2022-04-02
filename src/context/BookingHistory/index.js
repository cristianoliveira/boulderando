import { createContext, useContext } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import getNextPossibleDay from '../../modules/weekday'

import useListStorage from '../../hooks/useListStorage'
import { BOOKING_HISTORY } from '../../storage/items'

export const BookingHistoryContext = createContext()

export const BookingConsumer = BookingHistoryContext.Consumer

dayjs.extend(customParseFormat)
const sortByBookingDate = (sessions) =>
  sessions
    .filter((s) => s.booking_date)
    .sort(
      (a, b) =>
        dayjs(b.booking_date, 'DD/MM/YYYY').toDate() -
        dayjs(a.booking_date, 'DD/MM/YYYY').toDate()
    )

export function BookingHistoryProvider({ children }) {
  const [bookingHistory, setBookingHistory] = useListStorage(
    BOOKING_HISTORY,
    []
  )

  const saveBookedSession = (session) => {
    const history = {
      ...session,
      booking_date: getNextPossibleDay(session.day_of_week),
      created_at: dayjs().format('DD/MM/YYYY'),
    }
    setBookingHistory(history)
  }

  const deleteBookedSession = (bookingHistoryToDelete) => {
    const restOfBookingHistory = bookingHistory.filter(
      (s) =>
        !(
          s.gym_name === bookingHistoryToDelete.gym_name &&
          s.booking_date === bookingHistoryToDelete.booking_date
        )
    )
    setBookingHistory(restOfBookingHistory)
  }

  const hasBookedSession = (gymName, date) => {
    const sessionDate = dayjs(date, 'DD/MM/YYYY')
    return bookingHistory.find(
      (book) =>
        book.gym_name === gymName &&
        sessionDate.isSame(dayjs(book.booking_date, 'DD/MM/YYYY'))
    )
  }

  return (
    <BookingHistoryContext.Provider
      value={{
        hasBookedSession,
        bookingHistory: sortByBookingDate(bookingHistory),
        saveBookedSession,
        deleteBookedSession,
      }}
    >
      {children}
    </BookingHistoryContext.Provider>
  )
}

export default () => useContext(BookingHistoryContext)
