import axios from 'axios'

export const getSessions = async () => {
  try {
    const { data } = await axios.get('/api/bouldering-sessions')
    return data
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
    return []
  }
}

export const postSessionSchedule = async (
  user,
  session,
) => {
  const isDryRun = window.location.search.includes('dry_run')
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sessions`,
      {
        user,
        session,
        dry_run: isDryRun
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
