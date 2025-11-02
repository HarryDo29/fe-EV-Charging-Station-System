// src/services/api.js
import axios from 'axios'
import { fetchRefresh } from './authApis'

const baseURL = 'http://localhost:3000'

// create axios instance
const api = axios.create({
  baseURL: baseURL, // URL base
  timeout: 10000, // 10 giây
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Interceptor cho response
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // check if error is 401 and not retried
    // (accessToken expired)
    if (error.response.status === 401 && !originalRequest._retry) {
      // mark as retried
      originalRequest._retry = true

      try {
        // call to /auth/refresh endpoint
        await fetchRefresh()
        // if refresh success, server will set new accessToken into cookie
        // now, try to retry original request (e.g. /profile)
        return api(originalRequest)
      } catch (refreshError) {
        const logoutEvent = new Event('force_logout')
        window.dispatchEvent(logoutEvent) // dispatch event to all windows
        return Promise.reject(refreshError)
      }
    }

    // if other error (not 401), just return error
    return Promise.reject(error)
  }
)

export default api
