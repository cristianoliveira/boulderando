export const getRedirectParam = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const usp = new URLSearchParams(window.location.search)
  return usp.get('redirect_to')
}

export const browserRedirectTo = (redirectTo: string): void => {
  if (typeof window === 'undefined') {
    return
  }

  if (!redirectTo) {
    return
  }

  window.location.replace(redirectTo)
}
