type Booking = {
  scheduled_time: string;
  gym_name: string;
  day_of_week: string;
  human_date: string;
  time: string;
  booking_date: string;
  created_at: string;
}

type BookingHistoryContext = {
  bookingHistory: Booking[];
  deleteBookedSession(booking: Booking): void;
}
