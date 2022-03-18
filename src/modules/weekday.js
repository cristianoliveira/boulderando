import dayjs from 'dayjs'

const daysOfTheWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export default function getNextPossible(nextWeekDay, refDate = new Date()) {
  const today = dayjs(refDate)
  const nextPossibleDayOfTheWeek = daysOfTheWeek.indexOf(nextWeekDay)

  if (today.day() + 1 > nextPossibleDayOfTheWeek) {
    return today.add(1, 'week').day(nextPossibleDayOfTheWeek).format('DD/MM/YYYY')
  }

  return today.day(nextPossibleDayOfTheWeek).format('DD/MM/YYYY')
}
