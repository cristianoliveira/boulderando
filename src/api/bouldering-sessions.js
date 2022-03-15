import axios from 'axios'

export const getSessions = async () => {
  try {
    const { data } = await axios.get('/api/bouldering-sessions')
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const postSessionSchedule = async (
  user,
  session,
  dry_run = window.dry_run
) => {
  try {
    const res = await axios.post(
      `https://murmuring-caverns-56233.herokuapp.com/sessions`,
      {
        user,
        session,
        dry_run
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return { data: res.data }
  } catch (error) {
    return {
      error: {
        message: error.response?.data?.error || error.message,
      },
    }
  }
}
