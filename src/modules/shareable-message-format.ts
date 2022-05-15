import getNextPossibleDay from './weekday'

export default (session: Session):string =>
  session
    ? `🧗🧗🧗🧗🧗
${session.gym_name} ${session.day_of_week} ${getNextPossibleDay(
        session.day_of_week
      )} ${session.scheduled_time}
🧗🧗🧗🧗🧗
`
    : ''
