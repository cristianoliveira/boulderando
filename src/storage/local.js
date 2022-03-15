export const saveUser = (user) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const user = window.localStorage.getItem('user')
  if (!user) {
    return null
  }

  return JSON.parse(user)
}

export const deleteUser = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem('user')
}

export const save = (key, data) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(key, JSON.stringify(data))
}

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

export const remove = (key) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(key)
}
