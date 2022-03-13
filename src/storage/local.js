export const saveUser = (user) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () => {
  if (typeof window === 'undefined') {
    return
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
