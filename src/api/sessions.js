import axios from 'axios';

export const getSessions = async () => {
  try {
    const { data } = await axios.get('/api/sessions');
    return data;
  } catch (e) {
    console.error(e);
    return []
  }
}
