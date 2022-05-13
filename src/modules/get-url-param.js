export default (paramName) => {
  if (typeof window === 'undefined') {
    return '';
  }

  const usp = new URLSearchParams(window.location.search)
  return usp.get(paramName)
};
