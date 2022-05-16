import axios from 'axios'

export const getSessions = () => async () => {
  try {
    const { data } = await axios.get('/api/bouldering-sessions')
    return data
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return []
  }
}

export const postSessionSchedule =
  (configs: ApiConfiguration) => async (user: User, session: Session) => {
    try {
      const res = await axios.post(
        `${configs.apiUrl}/sessions`,
        {
          user,
          session,
          dry_run: configs.isDryRun,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      return { data: res.data }
    } catch (error: any) {
      return {
        error: {
          message: error.response?.data?.error || error.message,
        },
      }
    }
  }

export const postCreateUser =
  (configs: ApiConfiguration) => async (user: User) => {
    const res = await axios.post(
      `${configs.apiUrl}/users`,
      { user },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return { data: res.data }
  }

export default (configs: ApiConfiguration): Api => ({
  getSessions: getSessions(),
  postSessionSchedule: postSessionSchedule(configs),
  postCreateUser: postCreateUser(configs),
})
