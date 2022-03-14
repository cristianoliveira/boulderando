import axios from 'axios'

export const getSessions = async () => {
  try {
    const { data } = await axios.get('/api/sessions')
    return data
  } catch (e) {
    console.error(e)
    return []
  }
}

export const postSessionSchedule = async (user, session) => {
  try {
    const res = await axios.post(
      `https://murmuring-caverns-56233.herokuapp.com/sessions`,
      {
        user,
        session,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return { data: JSON.stringify(res) }
  } catch (error) {
    return {
      error: {
        message: error.response?.data?.error || error.message,
      },
    }
  }
}
