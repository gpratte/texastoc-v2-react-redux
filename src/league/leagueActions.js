
export const API_ERROR = 'API_ERROR'
export const API_ERROR_DONE = 'API_ERROR_DONE'

export function apiError(message) {
  return { type: API_ERROR, message }
}
export function apiErrorDone(message) {
  return { type: API_ERROR_DONE, message }
}
