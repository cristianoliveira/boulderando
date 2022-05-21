import SessionList from '../../src/components/Sessions/SessionList'
import useSessionContext from '../../src/context/Sessions'
import useBookingHistoryContext from '../../src/context/BookingHistory'
import userContext from '../../src/context/User'

export default function SessionSelectPage({ setPageTitle }) {
  setPageTitle("Sessions")

  const sessionContext = useSessionContext()
  const bookingHistory = useBookingHistoryContext()
  const { user } = userContext()
  return (
    <SessionList
      sessionContext={sessionContext}
      bookingHistory={bookingHistory}
      user={user}
    />
  )
}
