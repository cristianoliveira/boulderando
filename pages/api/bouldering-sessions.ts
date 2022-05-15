// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//
import type { NextApiRequest, NextApiResponse } from 'next'

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
    day_of_week: DAYS_OF_THE_WEEK.SATURDAY.replace(/this /, ''),
    human_date: DAYS_OF_THE_WEEK.SATURDAY,
    time: SESSIONS_TIME.MORNING_10_30,
  },
  {
    gym_name: GYMS.BKK,
    day_of_week: DAYS_OF_THE_WEEK.TUESDAY.replace(/this /, ''),
    human_date: DAYS_OF_THE_WEEK.TUESDAY,
    time: SESSIONS_TIME.EVENING_19_00,
  },
  {
    gym_name: GYMS.BKK,
    day_of_week: DAYS_OF_THE_WEEK.THURSDAY.replace(/this /, ''),
    human_date: DAYS_OF_THE_WEEK.THURSDAY,
    time: SESSIONS_TIME.EVENING_19_00,
  },
  {
    gym_name: GYMS.BASEMENT,
    day_of_week: DAYS_OF_THE_WEEK.THURSDAY.replace(/this /, ''),
    human_date: DAYS_OF_THE_WEEK.THURSDAY,
    time: SESSIONS_TIME.EVENING_18_30,
  },
]

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(sessions)
}
