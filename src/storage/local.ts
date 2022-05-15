/* eslint-disable consistent-return */
export const get = (key: string, defaultValue: StorageData = null): StorageData => {
  if (typeof window === 'undefined') {
    return defaultValue
  }

  const data = window.localStorage.getItem(key)
  if (!data) {
    return defaultValue
  }

  return JSON.parse(data)
}

export const save = (key: string, data: StorageData): StorageData => {
  if (typeof window === 'undefined') {
    return null
  }

  window.localStorage.setItem(key, JSON.stringify(data))

  return data
}

export const remove = (key: string) => {
  if (typeof window === 'undefined') {
    return null
  }

  window.localStorage.removeItem(key)
}
