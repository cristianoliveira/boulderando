/* eslint-disable consistent-return */
export const get = (key) => {
  if (typeof window === 'undefined') {
    return null
  }

  const data = window.localStorage.getItem(key)
  if (!data) {
    return null
  }

  return JSON.parse(data)
}

export const save = (key, data) => {
  if (typeof window === 'undefined') {
    return null
  }

  window.localStorage.setItem(key, JSON.stringify(data))

  return data;
}

export const push = (key, item) => {
  if (typeof window === 'undefined') {
    return null
  }

  const list = get(key)
  const updatedList = [...(list || []), item]
  window.localStorage.setItem(key, JSON.stringify(updatedList))

  return updatedList
}

export const remove = (key) => {
  if (typeof window === 'undefined') {
    return null
  }

  window.localStorage.removeItem(key)
}
