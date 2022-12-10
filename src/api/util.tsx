import Cookies from 'js-cookie'

export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

export const getAuthHeaders = () => {
  // Only for developing - it won't have any effect in prod
  const token = localStorage.getItem("auth-token")

  // Only for Prod - will be null in development
  const csrf_token = Cookies.get('csrftoken')

  return {
    "Authorization": token !== undefined && token !== null ? `Token ${token}` : null,
    "X-CSRFToken": csrf_token !== undefined && csrf_token !== null ? csrf_token : null
  }
}
