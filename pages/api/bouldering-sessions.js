// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//
const GYMS = {
  BASEMENT: 'basement',
  BKK: 'boulderklub',
}

const DAYS_OF_THE_WEEK = {
  TUESDAY: 'this tuesday',
  THURSDAY: 'this thursday',
  SATURDAY: 'this saturday',
}

const SESSIONS_TIME = {
  MORNING_10_30: '10:30 - 12:30',
  EVENING_19_00: '19:00 - 21:00',
  EVENING_18_30: '18:30 - 20:30',
}

const sessions = [
  {
    gym_name: GYMS.BASEMENT,
    human_date: DAYS_OF_THE_WEEK.SATURDAY,
    time: SESSIONS_TIME.MORNING_10_30,
  },
  {
    gym_name: GYMS.BKK,
    human_date: DAYS_OF_THE_WEEK.TUESDAY,
    time: SESSIONS_TIME.EVENING_19_00,
  },
  {
    gym_name: GYMS.BKK,
    human_date: DAYS_OF_THE_WEEK.THURSDAY,
    time: SESSIONS_TIME.EVENING_19_00,
  },
  {
    gym_name: GYMS.BASEMENT,
    human_date: DAYS_OF_THE_WEEK.THURSDAY,
    time: SESSIONS_TIME.EVENING_18_30,
  },
]

export default function handler(req, res) {
  res.status(200).json(sessions)
}
