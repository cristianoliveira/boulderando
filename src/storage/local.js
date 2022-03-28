
/* eslint-disable consistent-return */
export const get = (key, defaultValue) => {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  const data = window.localStorage.getItem(key)
  if (!data) {
    return defaultValue
  }

  return JSON.parse(data)
}

export const save = (key, data) => {
  if (typeof window === 'undefined') {
    return null
  }

  window.localStorage.setItem(key, JSON.stringify(data))

  return data
}

export const remove = (key) => {
  if (typeof window === 'undefined') {
    return null
  }

  window.localStorage.removeItem(key)
}
