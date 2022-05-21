import BookingHistoryList from '../../src/components/BookingHistory/BookingList'
import useBookingHistoryContext from '../../src/context/BookingHistory'

export default function BookingHistoryPage({
  setPageTitle,
}: PageWithTitle): JSX.Element {
  setPageTitle('Booking history')

  const { bookingHistory, deleteBookedSession } = useBookingHistoryContext()
  return (
    <BookingHistoryList
      bookingHistory={bookingHistory}
      deleteBookedSession={deleteBookedSession}
    />
  )
}
