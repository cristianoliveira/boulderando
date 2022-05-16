import { createContext, useContext } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import getNextPossibleDay from '../../modules/weekday'

import useListStorage from '../../hooks/useListStorage'
import { BOOKING_HISTORY } from '../../storage/items'

export const BookingHistoryContext = createContext<BookingHistoryContext>(
  undefined as any
)

export const BookingConsumer = BookingHistoryContext.Consumer

dayjs.extend(customParseFormat)
const sortByBookingDate = (bookings: Booking[]) =>
  bookings
    .filter((s) => s.booking_date)
    .sort(
      (a, b) =>
        dayjs(b.booking_date, 'DD/MM/YYYY').toDate().getDate() -
        dayjs(a.booking_date, 'DD/MM/YYYY').toDate().getDate()
    )

export function BookingHistoryProvider({
  children,
}: JSX.ElementChildrenAttribute) {
  const [bookingHistory, setBookingHistory] = useListStorage(
    BOOKING_HISTORY,
    []
  )

  const context: BookingHistoryContext = {
    bookingHistory: sortByBookingDate(bookingHistory),
    saveBookedSession: (session: Booking): void => {
      const history = {
        ...session,
        booking_date: getNextPossibleDay(session.day_of_week),
        created_at: dayjs().format('DD/MM/YYYY'),
      }
      setBookingHistory(history)
    },

    deleteBookedSession: (bookingHistoryToDelete: Booking) => {
      const restOfBookingHistory = bookingHistory.filter(
        (s) =>
          !(
            s.gym_name === bookingHistoryToDelete.gym_name &&
            s.booking_date === bookingHistoryToDelete.booking_date
          )
      )
      setBookingHistory(restOfBookingHistory)
    },

    hasBookedSession: (gymName: string, date: string): Booking => {
      const sessionDate = dayjs(date, 'DD/MM/YYYY')
      return bookingHistory.find(
        (book) =>
          book.gym_name === gymName &&
          sessionDate.isSame(dayjs(book.booking_date, 'DD/MM/YYYY'))
      )
    },
  }

  return (
    <BookingHistoryContext.Provider value={context}>
      {children}
    </BookingHistoryContext.Provider>
  )
}

export default () => useContext(BookingHistoryContext)
